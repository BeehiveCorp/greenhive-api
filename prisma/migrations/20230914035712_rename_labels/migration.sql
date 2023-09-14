/*
  Warnings:

  - You are about to drop the column `post_id` on the `CommentReaction` table. All the data in the column will be lost.
  - Added the required column `comment_id` to the `CommentReaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommentReaction" DROP CONSTRAINT "CommentReaction_post_id_fkey";

-- DropIndex
DROP INDEX "comment_reacted_post_id_idx";

-- AlterTable
ALTER TABLE "CommentReaction" DROP COLUMN "post_id",
ADD COLUMN     "comment_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "comment_reacted_post_id_idx" ON "CommentReaction"("comment_id");

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
