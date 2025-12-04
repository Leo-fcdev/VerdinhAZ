import { prisma } from '../../../lib/prisma.js';

// funcao pra buscar medicos com filtros, paginacao e busca por texto
// aceita parametros: nome, especialidade, localizacao, pagina, limite
const handler = async (req, res) => {
  // so aceita requisicoes do tipo get
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      sucesso: false,
      msg: `metodo ${req.method} nao permitido`,
    });
  }

  try {
    // extrai os parametros de query da requisicao
    const { nome, especialidade, localizacao, pagina = 1, limite = 10 } = req.query;

    // converte pagina e limite pra numero inteiro
    const paginaNum = Math.max(1, parseInt(pagina) || 1);
    const limiteNum = Math.min(50, Math.max(1, parseInt(limite) || 10));

    // calcula quantos registros pular baseado na pagina
    const skip = (paginaNum - 1) * limiteNum;

    // constroi o objeto de filtro dinamicamente
    // so adiciona o filtro se o parametro foi fornecido
    const filtro = {};

    // filtro por nome (busca parcial, case-insensitive)
    if (nome) {
      filtro.nome = {
        contains: nome,
        mode: 'insensitive',
      };
    }

    // filtro por especialidade (busca exata, case-insensitive)
    if (especialidade) {
      filtro.especialidade = {
        contains: especialidade,
        mode: 'insensitive',
      };
    }

    // filtro por localizacao (busca parcial, case-insensitive)
    if (localizacao) {
      filtro.localizacao = {
        contains: localizacao,
        mode: 'insensitive',
      };
    }

    // busca os medicos com os filtros aplicados
    const medicos = await prisma.medico.findMany({
      where: filtro,
      skip,
      take: limiteNum,
      select: {
        id: true,
        nome: true,
        email: true,
        crm: true,
        especialidade: true,
        localizacao: true,
        biografia: true,
        fotoUrl: true,
      },
    });

    // conta o total de medicos que correspondem aos filtros
    // isso eh usado pra calcular o total de paginas
    const totalMedicos = await prisma.medico.count({
      where: filtro,
    });

    // calcula o total de paginas
    const totalPaginas = Math.ceil(totalMedicos / limiteNum);

    // retorna os medicos com informacoes de paginacao
    return res.status(200).json({
      sucesso: true,
      msg: 'medicos encontrados com sucesso',
      dados: {
        medicos,
        paginacao: {
          paginaAtual: paginaNum,
          totalPaginas,
          totalMedicos,
          medicosPorPagina: limiteNum,
        },
      },
    });
  } catch (erro) {
    console.error('erro ao buscar medicos:', erro);
    return res.status(500).json({
      sucesso: false,
      msg: 'erro interno do servidor',
      erro: erro.msg,
    });
  }
};

export default handler;