import { prisma } from '../../../lib/prisma.js';
import { hashSenha, gerarToken } from '../../../lib/auth-utils.js';
import { validarDadosCadastro } from '../../../lib/auth-middleware.js';

// funcao pra fazer o cadastro de um novo medico
// recebe os dados do medico, valida, faz hash da senha e salva no banco
const handler = async (req, res) => {
  // so aceita requisicoes do tipo post
  if (req.method !== 'POST') {
    return res.status(405).json({
      sucesso: false,
      msg: 'metodo nao permitido',
    });
  }

  try {
    const { email, senha, nome, crm, especialidade, localizacao, biografia, fotoUrl } = req.body;

    // verifica se ja existe um medico com esse email
    const medicoComEmail = await prisma.medico.findUnique({
      where: { email },
    });

    if (medicoComEmail) {
      return res.status(409).json({
        sucesso: false,
        msg: 'email ja cadastrado',
      });
    }

    // verifica se ja existe um medico com esse crm
    const medicoComCrm = await prisma.medico.findUnique({
      where: { crm },
    });

    if (medicoComCrm) {
      return res.status(409).json({
        sucesso: false,
        msg: 'crm ja cadastrado',
      });
    }

    // faz o hash da senha pra armazenar de forma segura
    const senhaHash = await hashSenha(senha);

    // cria o novo medico no banco de dados
    const novoMedico = await prisma.medico.create({
      data: {
        email,
        senha: senhaHash,
        nome,
        crm,
        especialidade,
        localizacao: localizacao || '',
        biografia: biografia || '',
        fotoUrl: fotoUrl || '',
      },
    });

    // gera um token jwt pra fazer login automaticamente apos o cadastro
    const token = gerarToken(novoMedico);

    // retorna o token e os dados do medico (sem a senha)
    return res.status(201).json({
      sucesso: true,
      msg: 'cadastro realizado com sucesso',
      token,
      medico: {
        id: novoMedico.id,
        nome: novoMedico.nome,
        email: novoMedico.email,
        crm: novoMedico.crm,
        especialidade: novoMedico.especialidade,
        localizacao: novoMedico.localizacao,
        biografia: novoMedico.biografia,
        fotoUrl: novoMedico.fotoUrl,
      },
    });
  } catch (erro) {
    console.error('erro ao fazer cadastro:', erro);
    return res.status(500).json({
      sucesso: false,
      msg: 'erro interno do servidor',
      erro: erro.msg,
    });
  }
};

// aplica o middleware de validacao antes de executar o handler
export default (req, res) => {
  validarDadosCadastro(req, res, () => handler(req, res));
};
