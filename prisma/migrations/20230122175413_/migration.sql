/*
  Warnings:

  - You are about to drop the column `friendlogin` on the `friends` table. All the data in the column will be lost.
  - You are about to drop the column `userlogin` on the `friends` table. All the data in the column will be lost.
  - Added the required column `friendId` to the `friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_userlogin_fkey";

-- AlterTable
ALTER TABLE "friends" DROP COLUMN "friendlogin",
DROP COLUMN "userlogin",
ADD COLUMN     "friendId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
