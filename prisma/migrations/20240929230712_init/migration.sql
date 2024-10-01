/*
  Warnings:

  - Added the required column `imageData` to the `Images_db` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Images_db` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passworrd` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Images_db` ADD COLUMN `imageData` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `passworrd` VARCHAR(191) NOT NULL;
