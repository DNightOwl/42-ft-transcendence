/*
  Warnings:

  - You are about to drop the column `friendId` on the `friends` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `friends` table. All the data in the column will be lost.
  - Added the required column `friendlogin` to the `friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userlogin` to the `friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_userId_fkey";

-- AlterTable
ALTER TABLE "friends" DROP COLUMN "friendId",
DROP COLUMN "userId",
ADD COLUMN     "friendlogin" TEXT NOT NULL,
ADD COLUMN     "userlogin" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userlogin_fkey" FOREIGN KEY ("userlogin") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
