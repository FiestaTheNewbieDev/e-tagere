/*
  Warnings:

  - Added the required column `cover` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "author" TEXT,
    "language" TEXT,
    "identifier" TEXT,
    "publisher" TEXT,
    "subject" TEXT,
    "description" TEXT,
    "date" DATETIME,
    "rights" TEXT,
    "coverage" TEXT,
    "source" TEXT
);
INSERT INTO "new_book" ("author", "coverage", "date", "description", "format", "id", "identifier", "language", "path", "publisher", "rights", "source", "subject", "title") SELECT "author", "coverage", "date", "description", "format", "id", "identifier", "language", "path", "publisher", "rights", "source", "subject", "title" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
CREATE UNIQUE INDEX "book_path_key" ON "book"("path");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
