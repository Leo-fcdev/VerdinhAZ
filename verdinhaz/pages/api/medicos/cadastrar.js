

import prisma from '@/lib/prisma';
import { IncomingForm } from 'formidable';
import fs from 'fs'; 
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }

  const tmpDir = path.join(process.cwd(), 'public', 'uploads', 'tmp');
  
  
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  try {
    
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        uploadDir: tmpDir, 
        keepExtensions: true,
      });
      
      
      
      form.parse(req, (err, fields, files) => {
        
        if (err) {
          console.error("ERRO NO FORM.PARSE:", err);
          return reject(err);
        }
        resolve({ fields, files });
      });
    });

    
    const { nome, email, crm, especialidade, localizacao, biografia } = data.fields;
    const fotoFile = data.files.foto[0];

    if (!fotoFile) {
      return res.status(400).json({ error: 'Nenhum arquivo de foto enviado.' });
    }

    
    const oldPath = fotoFile.filepath; 
    
    
    const newFileName = `${Date.now()}_${fotoFile.originalFilename}`;
    const newPath = path.join(uploadDir, newFileName);
    
    fs.renameSync(oldPath, newPath); 

    const fotoUrl = `/uploads/${newFileName}`;

    const novoMedico = await prisma.medico.create({
      data: {
        nome: nome[0],
        email: email[0],
        crm: crm[0],
        especialidade: especialidade[0],
        localizacao: localizacao[0],
        biografia: biografia[0],
        fotoUrl: fotoUrl,
      },
    });

    
    return res.status(201).json(novoMedico);

  } catch (error) {
    console.error('Erro GERAL no handler:', error);
  
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'CRM ou Email já cadastrado.' });
    }
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}