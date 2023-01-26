/*
  Warnings:

  - You are about to drop the column `roomId` on the `muted` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `muted` table. All the data in the column will be lost.
  - Added the required column `roomName` to the `muted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLogin` to the `muted` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "muted" DROP CONSTRAINT "muted_roomId_fkey";

-- AlterTable
ALTER TABLE "muted" DROP COLUMN "roomId",
DROP COLUMN "userId",
ADD COLUMN     "roomName" TEXT NOT NULL,
ADD COLUMN     "userLogin" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "muted" ADD CONSTRAINT "muted_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
