/*
  Warnings:

  - You are about to drop the column `chapter_href` on the `reading_session` table. All the data in the column will be lost.
  - Added the required column `chapter_id` to the `reading_session` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reading_session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chapter_id" TEXT NOT NULL,
    "text_offset" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_reading_session" ("id", "text_offset") SELECT "id", "text_offset" FROM "reading_session";
DROP TABLE "reading_session";
ALTER TABLE "new_reading_session" RENAME TO "reading_session";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
