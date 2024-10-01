/*
  Warnings:

  - Added the required column `imageName` to the `Images_db` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Images_db` ADD COLUMN `imageName` VARCHAR(191) NOT NULL;
