import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// chave secreta pra assinar os tokens jwt
// em producao isso deve vir de uma variavel de ambiente
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_aqui_2024';

// tempo de expiracao do token em horas
const TOKEN_EXPIRY = '24h';

// funcao pra gerar um hash da senha usando bcrypt
// recebe a senha em texto plano e retorna o hash
export const hashSenha = async (senha) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    return senhaHash;
  } catch (erro) {
    throw new Error(`erro ao fazer hash da senha: ${erro.msg}`);
  }
};

// funcao pra comparar a senha digitada com o hash armazenado
// retorna true se forem iguais, false caso contrario
export const compararSenha = async (senhaDigitada, senhaHash) => {
  try {
    const saoIguais = await bcrypt.compare(senhaDigitada, senhaHash);
    return saoIguais;
  } catch (erro) {
    throw new Error(`erro ao comparar senha: ${erro.msg}`);
  }
};

// funcao pra gerar um token jwt
// recebe os dados do medico e retorna o token assinado
export const gerarToken = (dadosMedico) => {
  try {
    const token = jwt.sign(
      {
        id: dadosMedico.id,
        email: dadosMedico.email,
        crm: dadosMedico.crm,
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );
    return token;
  } catch (erro) {
    throw new Error(`erro ao gerar token: ${erro.msg}`);
  }
};

// funcao pra verificar e decodificar um token jwt
// retorna os dados contidos no token se for valido
export const verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (erro) {
    throw new Error(`token invalido ou expirado: ${erro.msg}`);
  }
};

// funcao pra extrair o token do header authorization
// espera o formato: Bearer <token>
export const extrairTokenDoHeader = (authHeader) => {
  if (!authHeader) {
    return null;
  }

  const partes = authHeader.split(' ');
  
  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return null;
  }

  return partes[1];
};
