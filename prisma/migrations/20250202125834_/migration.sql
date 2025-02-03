/*
  Warnings:

  - Made the column `chapter_href` on table `reading_session` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reading_session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chapter_href" TEXT NOT NULL,
    "text_offset" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_reading_session" ("chapter_href", "id", "text_offset") SELECT "chapter_href", "id", "text_offset" FROM "reading_session";
DROP TABLE "reading_session";
ALTER TABLE "new_reading_session" RENAME TO "reading_session";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
