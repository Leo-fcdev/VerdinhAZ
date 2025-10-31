# 🌿 VerdinhAZ - Projeto de Conexão Médica

## 1. Visão Geral do Projeto

O **VerdinhAZ** é uma plataforma web que serve como uma ponte de confiança entre pacientes que buscam tratamento com cannabis medicinal e médicos/clínicas especializados.

O objetivo principal é a **descoberta e a conexão**. O paciente pode encontrar profissionais qualificados, ver seus perfis e iniciar o primeiro contato de forma segura.

### Telas do Projeto

Aqui estão os designs que guiam o nosso desenvolvimento:

| Home Page | Página de Busca |
| :---: | :---: |
| ![Home Page](./assets/home%20page.png) | ![Página de Busca](./assets/buscar%20medico.png) |

*(Nota: Para as imagens aparecerem, você pode subi-las no próprio GitHub e colar o link aqui).*

---

## 2. Tecnologias Utilizadas

Este projeto utiliza um "stack" moderno focado em JavaScript e agilidade:

* **Front-end:**
    * **Next.js (React):** Framework principal para as páginas e interface.
    * **Tailwind CSS:** Para estilização rápida baseada nos designs do Figma.
* **Back-end:**
    * **Next.js API Routes:** Nossos endpoints de API (`/api/...`) são construídos diretamente dentro do Next.js.
* **Banco de Dados:**
    * **Prisma:** ORM para "traduzir" nosso código JavaScript em comandos de banco de dados.
    * **SQLite:** Banco de dados simples e local (arquivo `dev.db`) que usamos para desenvolvimento e apresentação.

---

## 3. Status Atual (O que está Pronto)

* **✅ Banco de Dados:**
    * O schema (`Medico`, `Mensagem`) está 100% definido no `prisma/schema.prisma`.
    * O banco `dev.db` está populado com médicos "fake" usando o `prisma/seed.js`.

* **✅ Back-end:**
    * A API de busca (`/api/medicos/buscar`) está **funcionando** e retornando os dados dos médicos do banco.
    * A conexão entre o app (pasta `verdinhaz`) e o banco (pasta `main/prisma`) está 100% configurada.

* **✅ Front-end:**
    * A **Home Page** (`/`) está visualmente construída.
    * A **Página de Busca** (`/buscar-medicos`) está construída E **conectada à API**, exibindo os médicos reais do banco.

---

## 4. Próximos Passos (O que Falta Fazer)

* **Back-end:**
    * 🔲 **API de Contato:** Criar o endpoint `POST /api/contato` para salvar a mensagem do paciente no banco.
    * 🔲 **API de Perfil:** Criar o endpoint `GET /api/medicos/[id]` para buscar os dados de um único médico.
    * 🔲 **API de Filtro:** Melhorar a API `/api/medicos/buscar` para aceitar filtros de busca e localização.

* **Front-end:**
    * 🔲 **Página de Notícias:** Construir a nova tela (`/noticias`).
    * 🔲 **Navegação:** Conectar os links da Home e da página de Notícias.
    * x00f0 * **Página de Perfil:** Construir a tela `pages/medico/[id].js`.
    * 🔲 **Formulário:** Adicionar o formulário de contato na página de perfil e conectá-lo à API de Contato.
    * 🔲 **Filtros:** Conectar a barra de "Buscar" e o botão "Filtro" na página de busca.

* **Apresentação:**
    * 🔲 **Página Admin:** Criar uma página `/admin/mensagens` para provar que o formulário de contato salvou os dados.

---

## 5. Como Rodar o Projeto (Para Colaboradores)

**IMPORTANTE:** Este projeto tem uma estrutura de duas pastas (`main` e `verdinhaz`). Siga os passos com atenção.

1.  **Clone o Repositório:**
    ```bash
    git clone [URL_DO_SEU_GIT]
    cd [NOME_DA_PASTA_MAIN]
    ```

2.  **Instale o Prisma (na pasta `main`):**
    *Isto instala o Prisma CLI para gerenciar o banco.*
    ```bash
    npm install
    ```

3.  **Crie e Migre o Banco (na pasta `main`):**
    *Isto vai ler a pasta `prisma/migrations` e criar seu arquivo `prisma/dev.db` local.*
    ```bash
    npx prisma migrate dev
    ```

4.  **Popule o Banco (na pasta `main`):**
    *Isto roda o `seed.js` e cadastra os médicos "fake".*
    ```bash
    npx prisma db seed
    ```

5.  **Entre na Pasta do App (na pasta `verdinhaz`):**
    ```bash
    cd verdinhaz
    ```

6.  **Instale as Dependências do App (na pasta `verdinhaz`):**
    *Isto instala React, Next, Tailwind, e o `@prisma/client`.*
    ```bash
    npm install
    ```

7.  **Gere o Prisma Client (na pasta `verdinhaz`):**
    *Este passo é **CRUCIAL**. Ele conecta o app à estrutura do banco que está na pasta `main`.*
    ```bash
    npx prisma generate --schema=../prisma/schema.prisma
    ```

8.  **Rode o Servidor (na pasta `verdinhaz`):**
    ```bash
    npm run dev
    ```

Seu app estará rodando em `http://localhost:3000`.