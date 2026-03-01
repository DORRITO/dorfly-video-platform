/*
  Warnings:

  - You are about to drop the column `category_id` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Video` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subcategory" DROP CONSTRAINT "Subcategory_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_category_id_fkey";

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "category_id",
ADD COLUMN     "categoryId" TEXT;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "category_id",
ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
