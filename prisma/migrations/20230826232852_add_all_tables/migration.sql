/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('COMMON', 'MANAGER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "Block" AS ENUM ('QUESTION', 'BUBBLE');

-- CreateEnum
CREATE TYPE "PostPlace" AS ENUM ('PUBLIC', 'CORPORATE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ambicoins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "company_id" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hero_id" TEXT,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "permission" "Permission" NOT NULL DEFAULT 'COMMON',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "xp" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fantasy_name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "owner_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lore" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "xp_reward" INTEGER NOT NULL,
    "ambicoins_reward" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadBlogArticle" (
    "id" TEXT NOT NULL,
    "reader_id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadBlogArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Difficulty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hex_code" TEXT NOT NULL,
    "xp_reward" INTEGER NOT NULL,
    "ambicoins_reward" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Difficulty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConcludedRpgChapter" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConcludedRpgChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RpgChapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "xp_reward" INTEGER NOT NULL,
    "ambicoins_reward" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "hero_id" TEXT NOT NULL,
    "difficulty_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RpgChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NarrativeBlock" (
    "id" TEXT NOT NULL,
    "type" "Block" NOT NULL DEFAULT 'BUBBLE',
    "message" TEXT,
    "question" TEXT,
    "answer_explanation" TEXT,
    "order" INTEGER NOT NULL,
    "character_id" TEXT,
    "article_id" TEXT,
    "chapter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NarrativeBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "narrative_block_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "was_accepted" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandCollection" (
    "id" TEXT NOT NULL,
    "picture_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrandCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "reactions" INTEGER NOT NULL,
    "type" "PostPlace" NOT NULL DEFAULT 'PUBLIC',
    "description" TEXT NOT NULL,
    "picture_url" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "company_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "reactions" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_owner_id_key" ON "Company"("owner_id");

-- CreateIndex
CREATE INDEX "owner_id_idx" ON "Company"("owner_id");

-- CreateIndex
CREATE INDEX "author_id_idx" ON "BlogArticle"("author_id");

-- CreateIndex
CREATE INDEX "reader_id_idx" ON "ReadBlogArticle"("reader_id");

-- CreateIndex
CREATE INDEX "read_article_id_idx" ON "ReadBlogArticle"("article_id");

-- CreateIndex
CREATE INDEX "player_id_idx" ON "ConcludedRpgChapter"("player_id");

-- CreateIndex
CREATE INDEX "chapter_id_idx" ON "ConcludedRpgChapter"("chapter_id");

-- CreateIndex
CREATE INDEX "chapter_hero_id_idx" ON "RpgChapter"("hero_id");

-- CreateIndex
CREATE INDEX "difficulty_id_idx" ON "RpgChapter"("difficulty_id");

-- CreateIndex
CREATE INDEX "character_id_idx" ON "NarrativeBlock"("character_id");

-- CreateIndex
CREATE INDEX "article_id_idx" ON "NarrativeBlock"("article_id");

-- CreateIndex
CREATE INDEX "narrative_block_chapter_id_idx" ON "NarrativeBlock"("chapter_id");

-- CreateIndex
CREATE INDEX "narrative_block_id_idx" ON "QuestionOption"("narrative_block_id");

-- CreateIndex
CREATE INDEX "invited_user_id_idx" ON "Invite"("user_id");

-- CreateIndex
CREATE INDEX "inviting_company_id_idx" ON "Invite"("company_id");

-- CreateIndex
CREATE INDEX "user_folower_id_idx" ON "Network"("follower_id");

-- CreateIndex
CREATE INDEX "user_folowing_id_idx" ON "Network"("following_id");

-- CreateIndex
CREATE INDEX "collected_folower_id_idx" ON "BrandCollection"("user_id");

-- CreateIndex
CREATE INDEX "post_author_id_idx" ON "Post"("author_id");

-- CreateIndex
CREATE INDEX "company_posted_id_idx" ON "Post"("company_id");

-- CreateIndex
CREATE INDEX "comment_author_id_idx" ON "Comment"("author_id");

-- CreateIndex
CREATE INDEX "post_comment_id_idx" ON "Comment"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "company_id_idx" ON "User"("company_id");

-- CreateIndex
CREATE INDEX "user_hero_id_idx" ON "User"("hero_id");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Hero"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticle" ADD CONSTRAINT "BlogArticle_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadBlogArticle" ADD CONSTRAINT "ReadBlogArticle_reader_id_fkey" FOREIGN KEY ("reader_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadBlogArticle" ADD CONSTRAINT "ReadBlogArticle_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "BlogArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcludedRpgChapter" ADD CONSTRAINT "ConcludedRpgChapter_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcludedRpgChapter" ADD CONSTRAINT "ConcludedRpgChapter_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "RpgChapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RpgChapter" ADD CONSTRAINT "RpgChapter_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RpgChapter" ADD CONSTRAINT "RpgChapter_difficulty_id_fkey" FOREIGN KEY ("difficulty_id") REFERENCES "Difficulty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeBlock" ADD CONSTRAINT "NarrativeBlock_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeBlock" ADD CONSTRAINT "NarrativeBlock_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "BlogArticle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeBlock" ADD CONSTRAINT "NarrativeBlock_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "RpgChapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_narrative_block_id_fkey" FOREIGN KEY ("narrative_block_id") REFERENCES "NarrativeBlock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Network" ADD CONSTRAINT "Network_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Network" ADD CONSTRAINT "Network_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandCollection" ADD CONSTRAINT "BrandCollection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
