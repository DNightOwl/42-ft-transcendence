-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "owner" INTEGER NOT NULL,
    "members" INTEGER[],
    "blocked" INTEGER[],
    "type" TEXT NOT NULL DEFAULT 'private',
    "admins" INTEGER[],
    "hash" TEXT,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "room_name_key" ON "room"("name");
