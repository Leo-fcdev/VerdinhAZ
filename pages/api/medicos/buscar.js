import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== 'GET'){
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }

    try{
        const medicos = await prisma.medico.findMany();

        return res.status(200).json(medicos);
    } catch (error) {
        console.error('Erro ao buscar médicos:' , error)
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}