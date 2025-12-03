import { prisma } from '../../../lib/prisma.js';
import { verificarAutenticacao } from '../../../lib/auth-middleware.js';

// funcao pra verificar se o token eh valido e retornar os dados do medico
// essa rota eh protegida, precisa de um token valido
const handler = async (req, res) => {
  // so aceita requisicoes do tipo get
  if (req.method !== 'GET') {
    return res.status(405).json({
      sucesso: false,
      msg: 'metodo nao permitido',
    });
  }

  try {
    // o middleware ja verificou o token e adicionou os dados em req.usuario
    const usuarioId = req.usuario.id;

    // busca os dados atualizados do medico no banco de dados
    const medico = await prisma.medico.findUnique({
      where: { id: usuarioId },
    });

    // se o medico nao existir, retorna erro
    if (!medico) {
      return res.status(404).json({
        sucesso: false,
        msg: 'medico nao encontrado',
      });
    }

    // retorna os dados do medico (sem a senha)
    return res.status(200).json({
      sucesso: true,
      msg: 'token valido',
      medico: {
        id: medico.id,
        nome: medico.nome,
        email: medico.email,
        crm: medico.crm,
        especialidade: medico.especialidade,
        localizacao: medico.localizacao,
        biografia: medico.biografia,
        fotoUrl: medico.fotoUrl,
      },
    });
  } catch (erro) {
    console.error('erro ao verificar token:', erro);
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
