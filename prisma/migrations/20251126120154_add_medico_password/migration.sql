/*
  Warnings:

  - Added the required column `senha` to the `Medico` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "biografia" TEXT NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Medico" ("biografia", "crm", "email", "especialidade", "fotoUrl", "id", "localizacao", "nome") SELECT "biografia", "crm", "email", "especialidade", "fotoUrl", "id", "localizacao", "nome" FROM "Medico";
DROP TABLE "Medico";
ALTER TABLE "new_Medico" RENAME TO "Medico";
CREATE UNIQUE INDEX "Medico_email_key" ON "Medico"("email");
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
