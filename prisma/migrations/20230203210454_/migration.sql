/*
  Warnings:

  - A unique constraint covering the columns `[roomName]` on the table `muted` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "muted_roomName_key" ON "muted"("roomName");
