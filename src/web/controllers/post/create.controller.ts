import { FastifyReply, FastifyRequest } from 'fastify'

import { Post } from '@/domain/models'

import { PostContract } from '@/application/contracts'
import { CreatePostUseCase } from '@/application/usecases/post'

import { ResponseHandler } from '@/web/utils'
import { InternalServerError } from '@/application/errors'

import { uploadFile } from '@/web/utils/upload-file'

export const createPostController = (repository: PostContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { data: post, fileName } = await uploadFile<Post>({
      DataClass: Post,
      folderName: 'post',
      parts: request.parts(),
    })

    if (!post) {
      ResponseHandler.error(reply, new InternalServerError('Algo deu errado!'))
      return
    }

    post.picture_url = `/fake-s3/post/${fileName}`

    const useCase = new CreatePostUseCase(repository)

    const created = await useCase.execute(post)

    return reply.send(created)
  }
}
