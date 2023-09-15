import { PrismaClient } from '@prisma/client'

import { NetworkContract } from '@/application/contracts'
import { Network, User } from '@/domain/models'
import _ from 'lodash'

export class PrismaNetworkRepository implements NetworkContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async findById(id: string): Promise<Network | null> {
    const found = await this._prisma.network.findFirst({
      where: { id },
    })

    return found
  }

  async create(follower: User, following: User): Promise<void> {
    if (!follower?.id || !following?.id) return

    await this._prisma.network.create({
      data: {
        follower_id: follower.id,
        following_id: following.id,
      },
    })
  }

  async delete(network: Network): Promise<void> {
    if (!network?.id) return

    await this._prisma.network.delete({
      where: { id: network.id },
    })
  }

  async getAllFollowers(following: User): Promise<User[]> {
    const found = await this._prisma.network.findMany({
      where: { following_id: following.id },
      include: {
        follower_user: {
          select: {
            id: true,
            avatar_url: true,
            username: true,
            name: true,
          },
        },
      },
    })

    return _.map(found, 'follower_user') as User[]
  }

  async getAllFollowing(follower: User): Promise<User[]> {
    const found = await this._prisma.network.findMany({
      where: { follower_id: follower.id },
      include: {
        following_user: {
          select: {
            id: true,
            avatar_url: true,
            username: true,
            name: true,
          },
        },
      },
    })

    return _.map(found, 'following_user') as User[]
  }
}
