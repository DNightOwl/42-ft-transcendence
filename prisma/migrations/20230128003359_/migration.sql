-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
