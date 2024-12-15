-- CreateEnum
CREATE TYPE "SenderType" AS ENUM ('store', 'user', 'system');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('text', 'image', 'file', 'system');

-- CreateTable
CREATE TABLE "StoreUserMessage" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "storeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "senderType" "SenderType" NOT NULL,
    "messageType" "MessageType" NOT NULL,
    "content" TEXT,
    "mediaUrl" VARCHAR(2083),
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreUserMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StoreUserMessage_storeId_userId_idx" ON "StoreUserMessage"("storeId", "userId");

-- CreateIndex
CREATE INDEX "StoreUserMessage_createdAt_idx" ON "StoreUserMessage"("createdAt");

-- AddForeignKey
ALTER TABLE "StoreUserMessage" ADD CONSTRAINT "StoreUserMessage_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreUserMessage" ADD CONSTRAINT "StoreUserMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
