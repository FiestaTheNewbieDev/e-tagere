-- CreateTable
CREATE TABLE "book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "title" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "book_label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id" INTEGER NOT NULL,
    "label_id" INTEGER NOT NULL,
    CONSTRAINT "book_label_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "book_label_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "label" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "book_path_key" ON "book"("path");
