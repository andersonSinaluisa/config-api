/*
  Warnings:

  - Added the required column `host` to the `Smtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Smtp" ADD COLUMN     "host" TEXT NOT NULL;
