/*
  Warnings:

  - You are about to drop the column `link` on the `Product` table. All the data in the column will be lost.
  - Added the required column `URL` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "link",
ADD COLUMN     "URL" TEXT NOT NULL;
