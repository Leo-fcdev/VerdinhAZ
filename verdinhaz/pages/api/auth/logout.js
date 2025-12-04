import { verificarAutenticacao } from '../../../lib/auth-middleware.js';

// funcao pra fazer logout
// essa rota eh protegida, precisa de um token valido
// o logout eh feito no frontend removendo o token do localStorage
const handler = async (req, res) => {
  // so aceita requisicoes do tipo post
  if (req.method !== 'POST') {
    return res.status(405).json({
      sucesso: false,
      msg: 'metodo nao permitido',
    });
  }

  try {
    // retorna sucesso
    // o frontend eh responsavel por remover o token do localStorage
    return res.status(200).json({
      sucesso: true,
      msg: 'logout realizado com sucesso',
    });
  } catch (erro) {
    console.error('erro ao fazer logout:', erro);
    return res.status(500).json({
      sucesso: false,
      msg: 'erro interno do servidor',
      erro: erro.msg,
    });
  }
};

// aplica o middleware de autenticacao antes de executar o handler
export default (req, res) => {
  verificarAutenticacao(req, res, () => handler(req, res));
};
