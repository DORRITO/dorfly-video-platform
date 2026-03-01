/*
  Warnings:

  - Added the required column `duration_sec` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "duration_sec" INTEGER NOT NULL;
