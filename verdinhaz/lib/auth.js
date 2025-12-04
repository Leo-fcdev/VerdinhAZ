import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'nuossa-cara-invincible';

export async function verificarSenha(senhaDigitada, senhaHashBanco) {
    return await bcrypt.compare(senhaDigitada, senhaHashBanco)
}

export function criarToken(medico) {
    const paylord = {
        id: medico.id,
        email: medico.email,
        nome:medico.nome
    };

    return jwt.sign(paylord, JWT_SECRET, { expiresIn: '7d'})
}
