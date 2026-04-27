/*
  Warnings:

  - You are about to drop the column `name` on the `Alimento` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Alimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "validade" TEXT NOT NULL,
    "ingredientes" TEXT NOT NULL,
    "unidades" INTEGER NOT NULL
);
INSERT INTO "new_Alimento" ("id", "ingredientes", "preco", "unidades", "validade") SELECT "id", "ingredientes", "preco", "unidades", "validade" FROM "Alimento";
DROP TABLE "Alimento";
ALTER TABLE "new_Alimento" RENAME TO "Alimento";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tipo_usuario" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("email", "id", "password", "tipo_usuario") SELECT "email", "id", "password", "tipo_usuario" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
