import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'nuossa-cara-invincible';

export async function verificarSenha(senhaDigitada, senhaHashBanco) {
    return await bcrypt.compare(senhaDigitada, senhaHashBanco)
}

export function criarToken(medico) {
  return jwt.sign({ id: medico.id, email: medico.email }, JWT_SECRET, { expiresIn: '7d' });
}

export function lerToken(req) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];

    try {
        const dados = jwt.verify(token, JWT_SECRET);
        return dados;
    } catch (error) {
        return null;
    }
}
