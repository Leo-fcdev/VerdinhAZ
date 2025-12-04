import prisma from "@/lib/prisma";
import { lerToken } from '@/lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const usuarioLogado = lerToken(req);

    if (!usuarioLogado) {
        return res.status(401).json({ error: 'Você precisa estar logado para postar.' });
    }

    const { titulo, conteudo, imagemUrl } = req.body;

    if (!titulo || !conteudo) {
        return res.status(400).json({ error: 'Título e conteúdo são obrigatorios.'});
    }

    try {
        const novoPublicacao = await prisma.publicacao.create({
            data: {
                titulo,
                conteudo,
                imagemUrl,
                medicoId: usuarioLogado.id
            },
        });

        return res.status(201).json(novoPublicacao)
    } catch (error) {
        console.error('Erro ao criar publicação:', error)
        return res.sttus(500).json({ error: 'Erro interno ao servidor'})
    }
}