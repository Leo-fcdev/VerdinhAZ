import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('medicoId', data.medico.id);
        localStorage.setItem('medicoNome', data.medico.nome);

        router.push(`/medico/${data.medico.id}`);
      } else {
        setError(data.error || 'Erro ao realizar login.');
      }
    } catch (err) {
      console.error(err);
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <Head>
        <title>Login | VerdinhAZ</title>
      </Head>

      {/* Cartão Verde */}
      <div className="bg-[#00AE4E] p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        
        {/* Logo Solta (Sem fundo) */}
        <div className="mb-6"> 
          <Image 
            src="/logo.png" 
            alt="Logo VerdinhAZ" 
            width={200} 
            height={60} 
            className="object-contain brightness-0 invert" 
            priority
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h1>
        <p className="text-green-100 mb-8 text-sm">Acesse sua conta para gerenciar seu perfil.</p>

        {error && (
          <div className="w-full bg-red-500 border border-red-700 text-white px-4 py-3 rounded mb-4 text-sm text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          
          <div>
            {/* Nome fora da caixa em BRANCO */}
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            {/* Caixa em BRANCO, Texto dentro em CINZA */}
            <input
              type="email"
              name="email"
              required
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white border-none p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition text-gray-800 placeholder-gray-400"
            />
          </div>

          <div>
            {/* Nome fora da caixa em BRANCO */}
            <label className="block text-sm font-medium text-white mb-1">Senha</label>
            {/* Caixa em BRANCO, Texto dentro em CINZA */}
            <input
              type="password"
              name="senha"
              required
              placeholder="Sua senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full bg-white border-none p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition text-gray-800 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 rounded-lg mt-4 transition transform active:scale-95 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

        </form>

        <div className="mt-6 text-sm text-white">
          Ainda não tem conta?{' '}
          <Link href="/TelaCadastro" className="text-white font-bold underline hover:text-green-200">
            Cadastre sua clínica
          </Link>
        </div>
      </div>
    </div>
  );
}