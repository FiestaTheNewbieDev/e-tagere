/*
  Warnings:

  - The primary key for the `label` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book_label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id" INTEGER NOT NULL,
    "label_id" TEXT NOT NULL,
    CONSTRAINT "book_label_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "book_label_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "label" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_book_label" ("book_id", "id", "label_id") SELECT "book_id", "id", "label_id" FROM "book_label";
DROP TABLE "book_label";
ALTER TABLE "new_book_label" RENAME TO "book_label";
CREATE TABLE "new_label" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_label" ("id", "name") SELECT "id", "name" FROM "label";
DROP TABLE "label";
ALTER TABLE "new_label" RENAME TO "label";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
