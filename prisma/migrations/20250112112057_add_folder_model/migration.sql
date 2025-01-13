-- CreateTable
CREATE TABLE "folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "folder_path_key" ON "folder"("path");
