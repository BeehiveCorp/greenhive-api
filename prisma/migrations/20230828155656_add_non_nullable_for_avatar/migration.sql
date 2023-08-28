/*
  Warnings:

  - Made the column `avatar_url` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar_url` on table `Hero` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "avatar_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "Hero" ALTER COLUMN "avatar_url" SET NOT NULL;
