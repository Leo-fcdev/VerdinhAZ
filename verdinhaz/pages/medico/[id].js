import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import prisma from '../../lib/prisma';

// --- Ícones ---
const IconMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconCase = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.03 23.03 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m6 0h-6" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v11a2 2 0 01-2 2H8a2 2 0 01-2-2V9m12 0h-4a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2a2 2 0 00-2-2z" />
  </svg>
);

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconChat = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

function ModalContato({ isOpen, onClose, medico }) {
  const [form, setForm] = useState({ nome: '', dataNascimento: '', telefone: '', mensagem: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, medicoId: medico.id }),
      });
      if (res.ok) {
        alert('Mensagem enviada!');
        setForm({ nome: '', dataNascimento: '', telefone: '', mensagem: '' });
        onClose();
      } else {
        alert('Erro ao enviar.');
      }
    } catch (error) { console.error(error); alert('Erro de conexão.'); } 
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-[#00AE4E] p-6 flex justify-between items-center text-white">
            <h3 className="font-bold text-xl">Fale com {medico.nome}</h3>
            <button onClick={onClose}>✕</button>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Seu Nome" required className="border p-3 rounded" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
            <input type="text" placeholder="Data de Nascimento" required className="border p-3 rounded" value={form.dataNascimento} onChange={e => setForm({...form, dataNascimento: e.target.value})} />
            <input type="tel" placeholder="Telefone" required className="border p-3 rounded" value={form.telefone} onChange={e => setForm({...form, telefone: e.target.value})} />
            <textarea placeholder="Mensagem..." required className="border p-3 rounded" rows="3" value={form.mensagem} onChange={e => setForm({...form, mensagem: e.target.value})} />
            <button type="submit" disabled={loading} className="bg-[#00AE4E] text-white font-bold py-3 rounded hover:bg-green-700">{loading ? 'Enviando...' : 'Enviar'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PerfilPublico({ medico }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  
  const [isDonoDoPerfil, setIsDonoDoPerfil] = useState(false);
  const [postForm, setPostForm] = useState({ titulo: '', conteudo: '', imagemUrl: '' });
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem('medicoId');
    if (storedId && parseInt(storedId) === medico?.id) {
      setIsDonoDoPerfil(true);
    }
  }, [medico]);

  const handleCriarPublicacao = async (e) => {
    e.preventDefault();
    setLoadingPost(true);

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/publicacoes/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postForm)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Publicação criada com sucesso!');
        setPostForm({ titulo: '', conteudo: '', imagemUrl: '' });
        router.replace(router.asPath);
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    } finally {
      setLoadingPost(false);
    }
  };

  if (!medico) return <div className="text-center p-10 mt-10">Médico não encontrado.</div>;

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{medico.nome} | VerdinhAZ</title>
      </Head>

      <div className="relative h-64 w-full bg-[#1e8a4b] overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full p-10">
            <Image src="/logo.png" alt="VerdinhAZ" fill className="object-contain opacity-20" priority />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mb-20">
        
        <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-8 relative z-10">
          <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white mr-6">
            <Image
              src={medico.fotoUrl || '/images/menorzin.png'}
              alt={medico.nome}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-1 mt-4 md:mt-0 flex flex-col md:flex-row md:justify-between md:items-center w-full">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{medico.nome}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-gray-600 text-sm">
                <span className="flex items-center"><IconCase /> {medico.especialidade}</span>
                <span className="flex items-center"><IconCalendar /> CRM: {medico.crm}</span>
                <span className="flex items-center"><IconMap /> {medico.localizacao}</span>
              </div>
            </div>
            <button 
              onClick={() => setShowModal(true)} 
              className="mt-4 md:mt-0 bg-[#34B755] hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold flex items-center shadow-md transition-transform transform hover:scale-105"
            >
              <IconChat />
              Entrar em Contato
            </button>
          </div>
        </div>

        {isDonoDoPerfil && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10 shadow-sm">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              ✨ Criar Nova Publicação
            </h2>
            <form onSubmit={handleCriarPublicacao} className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Título da publicação" 
                className="border border-green-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={postForm.titulo}
                onChange={(e) => setPostForm({...postForm, titulo: e.target.value})}
                required
              />
              <textarea 
                placeholder="Escreva o conteúdo aqui..." 
                rows="3"
                className="border border-green-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                value={postForm.conteudo}
                onChange={(e) => setPostForm({...postForm, conteudo: e.target.value})}
                required
              />
               <input 
                type="text" 
                placeholder="URL da Imagem (Opcional)" 
                className="border border-green-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={postForm.imagemUrl}
                onChange={(e) => setPostForm({...postForm, imagemUrl: e.target.value})}
              />
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={loadingPost}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loadingPost ? 'Publicando...' : 'Publicar Agora'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-[#34B755] pb-4 px-1 text-sm font-bold text-gray-900">
              Publicações
            </button>
            <button className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
              Sobre
            </button>
          </nav>
        </div>

        <div className="space-y-8">
           {medico.publicacoes && medico.publicacoes.length > 0 ? (
             medico.publicacoes.map((post) => (
               <div key={post.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.titulo}</h3>
                  <p className="text-xs text-gray-400 mb-4">Publicado em: {new Date(post.criadoEm).toLocaleDateString()}</p>
                  <p className="text-gray-600 leading-relaxed mb-4">{post.conteudo}</p>
                  {post.imagemUrl && (
                    <div className="relative h-64 w-full rounded-lg overflow-hidden">
                      <Image src={post.imagemUrl} alt={post.titulo} fill className="object-cover" />
                    </div>
                  )}
               </div>
             ))
           ) : (
            <div className="py-10 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">Nenhuma publicação recente.</p>
                <p className="text-sm text-gray-400 mt-1">As novidades do especialista aparecerão aqui em breve.</p>
            </div>
           )}
        </div>

        <div className="mt-12 prose max-w-none text-gray-700 border-t pt-8">
            <h3 className="text-xl font-bold mb-4">Sobre o Especialista</h3>
            <p className="whitespace-pre-wrap">{medico.biografia || "Sem biografia cadastrada."}</p>
        </div>

      </div>

      <ModalContato isOpen={showModal} onClose={() => setShowModal(false)} medico={medico} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const medico = await prisma.medico.findUnique({
      where: { id: parseInt(id) },
      include: {
        publicacoes: {
          orderBy: { criadoEm: 'desc' }
        }
      }
    });

    if (!medico) return { props: { medico: null } };

    return {
      props: { medico: JSON.parse(JSON.stringify(medico)) },
    };
  } catch (error) {
    return { props: { medico: null } };
  }
}