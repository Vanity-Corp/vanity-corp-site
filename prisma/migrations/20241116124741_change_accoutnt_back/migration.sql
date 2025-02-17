/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `accounts_user_id_fkey` ON `accounts`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `name`,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
