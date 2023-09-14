/*
  Warnings:

  - You are about to drop the column `reactions` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `reactions` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "reactions";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "reactions";

-- CreateTable
CREATE TABLE "PostReaction" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReaction" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "post_who_reacted_id_idx" ON "PostReaction"("user_id");

-- CreateIndex
CREATE INDEX "post_reacted_post_id_idx" ON "PostReaction"("post_id");

-- CreateIndex
CREATE INDEX "comment_who_reacted_id_idx" ON "CommentReaction"("user_id");

-- CreateIndex
CREATE INDEX "comment_reacted_post_id_idx" ON "CommentReaction"("post_id");

-- AddForeignKey
ALTER TABLE "PostReaction" ADD CONSTRAINT "PostReaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReaction" ADD CONSTRAINT "PostReaction_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
