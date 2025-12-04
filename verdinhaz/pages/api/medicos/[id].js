import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }

    const { id } = req.query;

    try {

        const medico = await prisma.medico.findUnique({
            where: { id: parseInt(id) },
            include: {
                publicacoes: true
            }
        });

        if (!medico) {
            return res.status(404).json({error : 'Médico não encontrado'});
        } 

        return res.status(200).json(medico);

    } catch (error) {
        console.error('Erro ao buscar médico:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.'});
    }
}