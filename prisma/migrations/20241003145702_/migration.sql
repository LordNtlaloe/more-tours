/*
  Warnings:

  - You are about to drop the column `reservationId` on the `reserved_dates` table. All the data in the column will be lost.
  - You are about to drop the `reservations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingId` to the `reserved_dates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_listingId_fkey`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_userId_fkey`;

-- DropForeignKey
ALTER TABLE `reserved_dates` DROP FOREIGN KEY `reserved_dates_reservationId_fkey`;

-- AlterTable
ALTER TABLE `reserved_dates` DROP COLUMN `reservationId`,
    ADD COLUMN `bookingId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `reservations`;

-- CreateTable
CREATE TABLE `bookings` (
    `id` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `chargeId` VARCHAR(191) NOT NULL,
    `daysDifference` INTEGER NOT NULL,
    `listingId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `listings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reserved_dates` ADD CONSTRAINT `reserved_dates_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
