import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Método ${res.method} não permitido` });
    }

    const { nome, telefone, mensagem, medicoId } = req.body;

    if (!nome || !telefone || !mensagem || !medicoId){
        return res.status(400).json({ error: 'Todos os campos são obrigatorios.' });
    }

    try {
        const novaMensagem = await prisma.mensagem.create({
            data: {
                nome,
                telefone,
                mensagem,
                medico: {
                connect: { id: parseInt(medicoId) },
                },
            },
        });
        return res.status(201).json(novaMensagem);

    } catch (error) {
        console.error('Erro ao salvar mensagem:' , error);
        return res.status(500).json({ error: 'Erro interno no servidor.' })
    }
}