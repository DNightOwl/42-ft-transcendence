/*
  Warnings:

  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "room" DROP CONSTRAINT "room_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "owner" SET DATA TYPE TEXT,
ALTER COLUMN "members" SET DATA TYPE TEXT[],
ALTER COLUMN "blocked" SET DATA TYPE TEXT[],
ALTER COLUMN "admins" SET DATA TYPE TEXT[],
ADD CONSTRAINT "room_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "room_id_seq";
