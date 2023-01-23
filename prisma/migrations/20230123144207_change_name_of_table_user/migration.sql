-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "rToken" TEXT,
    "pictureLink" TEXT,
    "nickname" TEXT DEFAULT '',
    "firstName" TEXT,
    "lastName" TEXT,
    "blocked" TEXT[],
    "two_fa_secret" TEXT,
    "two_fa_enabled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "friends" (
    "id" TEXT NOT NULL,
    "userLogin" TEXT NOT NULL,
    "friendLogin" TEXT NOT NULL,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userLogin_fkey" FOREIGN KEY ("userLogin") REFERENCES "users"("login") ON DELETE RESTRICT ON UPDATE CASCADE;
