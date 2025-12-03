# Documentacao da API de Autenticacao

## Resumo
API robusta de autenticacao pra medicos usando JWT e bcrypt pra seguranca.

---

## Rotas Disponiveis

### 1. POST /api/auth/cadastro
Cria um novo cadastro de medico.

**Dados de Entrada (JSON):**
```json
{
  "email": "medico@email.com",
  "senha": "senha123",
  "nome": "Dr. Joao",
  "crm": "12345",
  "especialidade": "Cardiologia",
  "localizacao": "Sao Paulo, SP",
  "biografia": "Medico experiente...",
  "fotoUrl": "https://..."
}
```

**Campos Obrigatorios:**
- email (deve ser um email valido)
- senha (minimo 6 caracteres)
- nome
- crm (minimo 4 caracteres)
- especialidade

**Campos Opcionais:**
- localizacao
- biografia
- fotoUrl

**Respostas:**

Sucesso (201):
```json
{
  "sucesso": true,
  "msg": "cadastro realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "medico": {
    "id": 1,
    "nome": "Dr. Joao",
    "email": "medico@email.com",
    "crm": "12345",
    "especialidade": "Cardiologia",
    "localizacao": "Sao Paulo, SP",
    "biografia": "Medico experiente...",
    "fotoUrl": "https://..."
  }
}
```

Erro - Email ja cadastrado (409):
```json
{
  "sucesso": false,
  "msg": "email ja cadastrado"
}
```

Erro - CRM ja cadastrado (409):
```json
{
  "sucesso": false,
  "msg": "crm ja cadastrado"
}
```

Erro - Dados invalidos (400):
```json
{
  "sucesso": false,
  "msg": "email, senha, nome, crm e especialidade sao obrigatorios"
}
```

---

### 2. POST /api/auth/login
Faz login de um medico existente.

**Dados de Entrada (JSON):**
```json
{
  "email": "medico@email.com",
  "senha": "senha123"
}
```

**Campos Obrigatorios:**
- email
- senha

**Respostas:**

Sucesso (200):
```json
{
  "sucesso": true,
  "msg": "login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "medico": {
    "id": 1,
    "nome": "Dr. Joao",
    "email": "medico@email.com",
    "crm": "12345",
    "especialidade": "Cardiologia",
    "localizacao": "Sao Paulo, SP",
    "biografia": "Medico experiente...",
    "fotoUrl": "https://..."
  }
}
```

Erro - Email ou senha incorretos (401):
```json
{
  "sucesso": false,
  "msg": "email ou senha incorretos"
}
```

Erro - Dados invalidos (400):
```json
{
  "sucesso": false,
  "msg": "email e senha sao obrigatorios"
}
```

---

### 3. GET /api/auth/verificar
Verifica se o token eh valido e retorna os dados do medico.

**Headers Obrigatorios:**
```
Authorization: Bearer <token>
```

**Respostas:**

Sucesso (200):
```json
{
  "sucesso": true,
  "msg": "token valido",
  "medico": {
    "id": 1,
    "nome": "Dr. Joao",
    "email": "medico@email.com",
    "crm": "12345",
    "especialidade": "Cardiologia",
    "localizacao": "Sao Paulo, SP",
    "biografia": "Medico experiente...",
    "fotoUrl": "https://..."
  }
}
```

Erro - Token nao fornecido (401):
```json
{
  "sucesso": false,
  "msg": "token nao fornecido"
}
```

Erro - Token invalido ou expirado (401):
```json
{
  "sucesso": false,
  "msg": "token invalido ou expirado"
}
```

---

### 4. POST /api/auth/logout
Faz logout de um medico.

**Headers Obrigatorios:**
```
Authorization: Bearer <token>
```

**Respostas:**

Sucesso (200):
```json
{
  "sucesso": true,
  "msg": "logout realizado com sucesso"
}
```

Erro - Token nao fornecido (401):
```json
{
  "sucesso": false,
  "msg": "token nao fornecido"
}
```

---

## Notas Importantes

1. **Token JWT**: O token expira em 24 horas. Apos expirar, o usuario precisa fazer login novamente.

2. **Seguranca da Senha**: As senhas sao armazenadas com hash bcrypt, nunca em texto plano.

3. **Header Authorization**: Sempre use o formato `Bearer <token>` no header Authorization.

4. **Validacoes**: Todos os dados sao validados no backend. Nao confie apenas em validacoes do frontend.

5. **Erros**: Sempre verifique o campo `sucesso` pra saber se a requisicao foi bem-sucedida.

---

## Exemplo de Uso no Frontend

```javascript
// Cadastro
const respCadastro = await fetch('/api/auth/cadastro', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'medico@email.com',
    senha: 'senha123',
    nome: 'Dr. Joao',
    crm: '12345',
    especialidade: 'Cardiologia'
  })
});
const dadosCadastro = await respCadastro.json();
localStorage.setItem('token', dadosCadastro.token);

// Login
const respLogin = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'medico@email.com',
    senha: 'senha123'
  })
});
const dadosLogin = await respLogin.json();
localStorage.setItem('token', dadosLogin.token);

// Verificar Token
const token = localStorage.getItem('token');
const respVerificar = await fetch('/api/auth/verificar', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const dadosVerificacao = await respVerificar.json();

// Logout
await fetch('/api/auth/logout', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` }
});
localStorage.removeItem('token');
```
