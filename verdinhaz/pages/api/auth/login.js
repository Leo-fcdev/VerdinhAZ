import prisma from "@/lib/prisma";
import { verificarSenha, criarToken } from "@/lib/auth";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios'});
    }

    try {
        const medico = await prisma.medico.findUnique({
            where: { email: email},
        });

        if (!medico) {
            return res.status(401).json({ error: 'Email ou senha inválidos.' })
        }

        const senhaValida = await verificarSenha(senha, medico.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: 'Email ou senha inválidos.' })
        }

        const token = criarToken(medico);

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            medico: {
                id: medico.id,
                nome: medico.nome,
                email: medico.email,
                fotoUrl: medico.fotoUrl
            }
        });
    } catch (error) {
        console.error('Erro no login', error);
        return res.status(500).json({ error: 'Errointerno do servidor'});
    }
}
