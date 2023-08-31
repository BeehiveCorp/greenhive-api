import { Multipart } from '@fastify/multipart'

import fs from 'fs'
import path from 'path'
import util from 'util'

import { pipeline } from 'stream'

const pump = util.promisify(pipeline)

type IUploadFile<T> = {
  folderName: string
  parts: AsyncIterableIterator<Multipart>
  DataClass: new (data: T) => T
}

type IUploadFileResponse<T> = {
  data: T | null
  fileName: string | null
}

async function uploadFile<T>({
  DataClass,
  folderName,
  parts,
}: IUploadFile<T>): Promise<IUploadFileResponse<T>> {
  let processedData: T | null = null
  let fileName: string | null = null

  for await (const part of parts) {
    console.log(part.type)

    if (part.type === 'file') {
      const root = path.join(__dirname, '../../../')
      const folder = path.join(root, 'fake-s3', folderName)
      const timestamp = new Date().getTime()

      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true })
      }

      fileName = `${timestamp}-${part.filename}`

      await pump(
        part.file,
        fs.createWriteStream(`./fake-s3/${folderName}/${fileName}`),
      )
    } else {
      const data = JSON.parse(part.value as string) as never
      processedData = new DataClass(data)
    }
  }

  return { data: processedData, fileName }
}

export { uploadFile }
