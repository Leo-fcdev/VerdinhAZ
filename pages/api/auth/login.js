import { prisma } from '../../../lib/prisma.js';
import { compararSenha, gerarToken } from '../../../lib/auth-utils.js';
import { validarDadosLogin } from '../../../lib/auth-middleware.js';

// funcao pra fazer o login de um medico
// recebe email e senha, valida e retorna um token jwt
const handler = async (req, res) => {
  // so aceita requisicoes do tipo post
  if (req.method !== 'POST') {
    return res.status(405).json({
      sucesso: false,
      msg: 'metodo nao permitido',
    });
  }

  try {
    const { email, senha } = req.body;

    // busca o medico no banco de dados pelo email
    const medico = await prisma.medico.findUnique({
      where: { email },
    });

    // se o medico nao existir, retorna erro
    if (!medico) {
      return res.status(401).json({
        sucesso: false,
        msg: 'email ou senha incorretos',
      });
    }

    // compara a senha digitada com a senha armazenada no banco
    const senhaEstaCorreta = await compararSenha(senha, medico.senha);

    // se a senha estiver errada, retorna erro
    if (!senhaEstaCorreta) {
      return res.status(401).json({
        sucesso: false,
        msg: 'email ou senha incorretos',
      });
    }

    // gera um token jwt com os dados do medico
    const token = gerarToken(medico);

    // retorna o token e os dados do medico (sem a senha)
    return res.status(200).json({
      sucesso: true,
      msg: 'login realizado com sucesso',
      token,
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
    console.error('erro ao fazer login:', erro);
    return res.status(500).json({
      sucesso: false,
      msg: 'erro interno do servidor',
      erro: erro.msg,
    });
  }
};

// aplica o middleware de validacao antes de executar o handler
export default (req, res) => {
  validarDadosLogin(req, res, () => handler(req, res));
};
