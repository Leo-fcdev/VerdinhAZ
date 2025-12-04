import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }

  // Agora incluindo dataNascimento
  const { nome, dataNascimento, telefone, mensagem, medicoId } = req.body;

  if (!nome || !telefone || !mensagem || !medicoId) {
    return res.status(400).json({ error: 'Preencha os campos obrigatórios.' });
  }

  try {
    const novaMensagem = await prisma.mensagem.create({
      data: {
        nome,
        // Certifique-se que no schema este campo é String ou DateTime. 
        // Se for DateTime, talvez precise de new Date(dataNascimento).
        // Aqui assumo que você configurou como String no schema ou vai passar a string direta.
        dataNascimento, 
        telefone,
        mensagem,
        medico: {
          connect: { id: parseInt(medicoId) },
        },
      },
    });

    return res.status(201).json(novaMensagem);

  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}