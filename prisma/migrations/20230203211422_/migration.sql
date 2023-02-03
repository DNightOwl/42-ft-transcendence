-- DropForeignKey
ALTER TABLE "muted" DROP CONSTRAINT "muted_roomName_fkey";

-- AddForeignKey
ALTER TABLE "muted" ADD CONSTRAINT "muted_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "rooms"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
