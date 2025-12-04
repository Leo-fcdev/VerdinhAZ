import Head from 'next/head';
import Image from 'next/image';
import prisma from '../../lib/prisma';

// Ícones SVG
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

export default function PerfilPublico({ medico }) {
  if (!medico) return <div className="text-center p-10">Médico não encontrado.</div>;

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{medico.nome} | Perfil</title>
      </Head>

      {/* --- BANNER PRINCIPAL --- */}
      {/* Alterado: Fundo verde e Logo */}
      <div className="relative h-64 w-full bg-[#1e8a4b] overflow-hidden flex items-center justify-center">
        
        {/* Logo Centralizada (Estilo marca d'água ou destaque) */}
        <div className="relative w-full h-full p-10">
            <Image 
            src="/logo.png" 
            alt="VerdinhAZ"
            fill
            className="object-contain opacity-20" // Opacidade baixa para ficar elegante no fundo
            priority
            />
        </div>
        
        {/* REMOVIDO: Barra de pesquisa */}
      </div>

      {/* --- CONTEÚDO DO PERFIL --- */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        
        {/* Cabeçalho do Perfil (Foto sobreposta + Dados) */}
        <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-8 relative z-10">
          
          {/* Foto Circular */}
          <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white mr-6">
            <Image
              src={medico.fotoUrl || '/images/menorzin.png'}
              alt={medico.nome}
              fill
              className="rounded-full object-cover"
            />
          </div>

          {/* Dados e Botão */}
          <div className="flex-1 mt-4 md:mt-0 flex flex-col md:flex-row md:justify-between md:items-center w-full">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{medico.nome.toUpperCase()}</h1>
              
              <div className="flex flex-wrap gap-4 mt-2 text-gray-600 text-sm">
                <span className="flex items-center"><IconCase /> {medico.especialidade}</span>
                <span className="flex items-center"><IconCalendar /> Membro desde 10/10/2025</span>
                <span className="flex items-center"><IconMap /> {medico.localizacao}</span>
              </div>
            </div>

            {/* Botão de Contato */}
            <button className="mt-4 md:mt-0 bg-[#34B755] hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold flex items-center shadow-md transition-transform transform hover:scale-105">
              <IconChat />
              Entrar em Contato
            </button>
          </div>
        </div>

        {/* --- ABAS (Mantidas para estrutura futura) --- */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-[#34B755] pb-4 px-1 text-sm font-bold text-gray-900">
              Publicações
            </button>
            <button className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Mídia
            </button>
            <button className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Sobre
            </button>
          </nav>
        </div>

        {/* --- CONTEÚDO (Feed removido) --- */}
        <div className="py-10 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Nenhuma publicação recente.</p>
            <p className="text-sm text-gray-400 mt-1">As novidades do especialista aparecerão aqui em breve.</p>
        </div>

      </div>
    </div>
  );
}

// --- BACKEND ---
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const medico = await prisma.medico.findUnique({
      where: { id: parseInt(id) },
    });

    if (!medico) return { props: { medico: null } };

    return {
      props: {
        medico: JSON.parse(JSON.stringify(medico)),
      },
    };
  } catch (error) {
    return { props: { medico: null } };
  }
}