-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_userLogin_fkey";

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userLogin_fkey" FOREIGN KEY ("userLogin") REFERENCES "users"("login") ON DELETE RESTRICT ON UPDATE CASCADE;
