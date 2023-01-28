-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_roomName_fkey";

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "rooms"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
