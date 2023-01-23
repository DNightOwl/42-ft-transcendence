/*
  Warnings:

  - You are about to drop the column `blocked` on the `friends` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "friends" DROP COLUMN "blocked";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "blocked" TEXT[];
