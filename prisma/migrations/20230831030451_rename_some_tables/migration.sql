/*
  Warnings:

  - You are about to drop the `BlogArticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConcludedRpgChapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadBlogArticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RpgChapter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogArticle" DROP CONSTRAINT "BlogArticle_author_id_fkey";

-- DropForeignKey
ALTER TABLE "ConcludedRpgChapter" DROP CONSTRAINT "ConcludedRpgChapter_chapter_id_fkey";

-- DropForeignKey
ALTER TABLE "ConcludedRpgChapter" DROP CONSTRAINT "ConcludedRpgChapter_player_id_fkey";

-- DropForeignKey
ALTER TABLE "NarrativeBlock" DROP CONSTRAINT "NarrativeBlock_article_id_fkey";

-- DropForeignKey
ALTER TABLE "NarrativeBlock" DROP CONSTRAINT "NarrativeBlock_chapter_id_fkey";

-- DropForeignKey
ALTER TABLE "ReadBlogArticle" DROP CONSTRAINT "ReadBlogArticle_article_id_fkey";

-- DropForeignKey
ALTER TABLE "ReadBlogArticle" DROP CONSTRAINT "ReadBlogArticle_reader_id_fkey";

-- DropForeignKey
ALTER TABLE "RpgChapter" DROP CONSTRAINT "RpgChapter_difficulty_id_fkey";

-- DropForeignKey
ALTER TABLE "RpgChapter" DROP CONSTRAINT "RpgChapter_hero_id_fkey";

-- DropTable
DROP TABLE "BlogArticle";

-- DropTable
DROP TABLE "ConcludedRpgChapter";

-- DropTable
DROP TABLE "ReadBlogArticle";

-- DropTable
DROP TABLE "RpgChapter";

-- CreateTable
CREATE TABLE "Article" (
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

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadArticle" (
    "id" TEXT NOT NULL,
    "reader_id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConcludedChapter" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConcludedChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
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

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "author_id_idx" ON "Article"("author_id");

-- CreateIndex
CREATE INDEX "reader_id_idx" ON "ReadArticle"("reader_id");

-- CreateIndex
CREATE INDEX "read_article_id_idx" ON "ReadArticle"("article_id");

-- CreateIndex
CREATE INDEX "player_id_idx" ON "ConcludedChapter"("player_id");

-- CreateIndex
CREATE INDEX "chapter_id_idx" ON "ConcludedChapter"("chapter_id");

-- CreateIndex
CREATE INDEX "chapter_hero_id_idx" ON "Chapter"("hero_id");

-- CreateIndex
CREATE INDEX "difficulty_id_idx" ON "Chapter"("difficulty_id");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadArticle" ADD CONSTRAINT "ReadArticle_reader_id_fkey" FOREIGN KEY ("reader_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadArticle" ADD CONSTRAINT "ReadArticle_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcludedChapter" ADD CONSTRAINT "ConcludedChapter_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcludedChapter" ADD CONSTRAINT "ConcludedChapter_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_difficulty_id_fkey" FOREIGN KEY ("difficulty_id") REFERENCES "Difficulty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeBlock" ADD CONSTRAINT "NarrativeBlock_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeBlock" ADD CONSTRAINT "NarrativeBlock_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
