/*
  Warnings:

  - Added the required column `dataNascimento` to the `Mensagem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mensagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medicoId" INTEGER NOT NULL,
    CONSTRAINT "Mensagem_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mensagem" ("criadoEm", "id", "medicoId", "mensagem", "nome", "telefone") SELECT "criadoEm", "id", "medicoId", "mensagem", "nome", "telefone" FROM "Mensagem";
DROP TABLE "Mensagem";
ALTER TABLE "new_Mensagem" RENAME TO "Mensagem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
