import { PrismaClient } from '@prisma/client'

import { PostContract } from '@/application/contracts'
import { Post } from '@/domain/models'

export class PrismaPostRepository implements PostContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async create(post: Post): Promise<Post> {
    const created = await this._prisma.post.create({
      data: post,
    })

    return created
  }

  async findAll(): Promise<Post[]> {
    const found = await this._prisma.post.findMany({
      include: { author: true, comments: true, whoReacted: true },
    })

    return found
  }

  async findById(id: string): Promise<Post | null> {
    const found = await this._prisma.post.findFirst({
      where: { id },
      include: { author: true, comments: true, whoReacted: true },
    })

    return found
  }

  async findAllByCompanyId(id: string): Promise<Post[]> {
    const found = await this._prisma.post.findMany({
      where: { company_id: id },
      include: { author: true, comments: true, whoReacted: true },
    })

    return found
  }

  async update(post: Post): Promise<Post> {
    const updated = this._prisma.post.update({
      data: post,
      where: { id: post.id },
    })

    return updated
  }
}
