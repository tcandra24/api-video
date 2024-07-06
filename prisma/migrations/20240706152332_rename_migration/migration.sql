/*
  Warnings:

  - You are about to drop the column `link` on the `videos` table. All the data in the column will be lost.
  - Added the required column `video_id` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" DROP COLUMN "link";
ALTER TABLE "videos" ADD COLUMN "video_id" STRING(255) NOT NULL;
