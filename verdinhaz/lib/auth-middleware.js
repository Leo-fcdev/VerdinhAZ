import { extrairTokenDoHeader, verificarToken } from './auth-utils.js';

// middleware pra verificar se o usuario tem um token valido
// se tiver, adiciona os dados do usuario no objeto req.usuario
// se nao tiver, retorna erro 401
export const verificarAutenticacao = (req, res, next) => {
  try {
    // extrai o token do header authorization
    const authHeader = req.headers.authorization;
    const token = extrairTokenDoHeader(authHeader);

    // se nao tiver token, retorna erro
    if (!token) {
      return res.status(401).json({
        sucesso: false,
        msg: 'token nao fornecido',
      });
    }

    // verifica se o token eh valido
    const dadosDecodificados = verificarToken(token);

    // adiciona os dados do usuario no objeto req pra usar nas rotas
    req.usuario = dadosDecodificados;

    // chama a proxima funcao
    next();
  } catch (erro) {
    return res.status(401).json({
      sucesso: false,
      msg: 'token invalido ou expirado',
      erro: erro.msg,
    });
  }
};

// middleware pra validar os dados de entrada
// verifica se os campos obrigatorios estao presentes
export const validarDadosLogin = (req, res, next) => {
  try {
    const { email, senha } = req.body;

    // valida se email e senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({
        sucesso: false,
        msg: 'email e senha sao obrigatorios',
      });
    }

    // valida o formato do email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return res.status(400).json({
        sucesso: false,
        msg: 'formato de email invalido',
      });
    }

    // valida se a senha tem no minimo 6 caracteres
    if (senha.length < 6) {
      return res.status(400).json({
        sucesso: false,
        msg: 'senha deve ter no minimo 6 caracteres',
      });
    }

    // chama a proxima funcao
    next();
  } catch (erro) {
    return res.status(400).json({
      sucesso: false,
      msg: 'erro ao validar dados',
      erro: erro.msg,
    });
  }
};

// middleware pra validar os dados de cadastro
export const validarDadosCadastro = (req, res, next) => {
  try {
    const { email, senha, nome, crm, especialidade } = req.body;

    // valida se os campos obrigatorios foram fornecidos
    if (!email || !senha || !nome || !crm || !especialidade) {
      return res.status(400).json({
        sucesso: false,
        msg: 'email, senha, nome, crm e especialidade sao obrigatorios',
      });
    }

    // valida o formato do email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return res.status(400).json({
        sucesso: false,
        msg: 'formato de email invalido',
      });
    }

    // valida se a senha tem no minimo 6 caracteres
    if (senha.length < 6) {
      return res.status(400).json({
        sucesso: false,
        msg: 'senha deve ter no minimo 6 caracteres',
      });
    }

    // valida se o crm tem no minimo 4 caracteres
    if (crm.length < 4) {
      return res.status(400).json({
        sucesso: false,
        msg: 'crm deve ter no minimo 4 caracteres',
      });
    }

    // chama a proxima funcao
    next();
  } catch (erro) {
    return res.status(400).json({
      sucesso: false,
      msg: 'erro ao validar dados',
      erro: erro.msg,
    });
  }
};
