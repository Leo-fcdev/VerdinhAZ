/*
  Warnings:

  - Added the required column `atualizadoEm` to the `Medico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizadoEm` to the `Publicacao` table without a default value. This is not possible if the table is not empty.

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
    "biografia" TEXT DEFAULT '',
    "fotoUrl" TEXT,
    "senha" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);
INSERT INTO "new_Medico" ("biografia", "crm", "email", "especialidade", "fotoUrl", "id", "localizacao", "nome", "senha") SELECT "biografia", "crm", "email", "especialidade", "fotoUrl", "id", "localizacao", "nome", "senha" FROM "Medico";
DROP TABLE "Medico";
ALTER TABLE "new_Medico" RENAME TO "Medico";
CREATE UNIQUE INDEX "Medico_email_key" ON "Medico"("email");
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");
CREATE TABLE "new_Publicacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "imagemUrl" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "medicoId" INTEGER NOT NULL,
    CONSTRAINT "Publicacao_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Publicacao" ("conteudo", "criadoEm", "id", "imagemUrl", "medicoId", "titulo") SELECT "conteudo", "criadoEm", "id", "imagemUrl", "medicoId", "titulo" FROM "Publicacao";
DROP TABLE "Publicacao";
ALTER TABLE "new_Publicacao" RENAME TO "Publicacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
