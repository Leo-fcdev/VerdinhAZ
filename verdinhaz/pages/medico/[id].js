import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import prisma from '../../lib/prisma';

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
  const [form, setForm] = useState({ nome: '', telefone: '', mensagem: '' });
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
        alert('Mensagem enviada! O médico entrará em contato em breve.');
        setForm({ nome: '', telefone: '', mensagem: '' });
        onClose();
      } else {
        alert('Erro ao enviar. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
        
        <div className="bg-[#34B755] p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden">
               <Image 
                 src={medico.fotoUrl || '/images/menorzin.png'} 
                 alt={medico.nome}
                 fill
                 className="object-cover"
               />
            </div>
            <div>
              <p className="text-green-100 text-xs font-semibold uppercase tracking-wider">Falar com</p>
              <h3 className="text-white font-bold text-lg leading-tight">{medico.nome}</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-green-700 rounded-full p-1 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Como você se chama?"
                value={form.nome}
                onChange={(e) => setForm({...form, nome: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu WhatsApp</label>
              <input
                type="tel"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChange={(e) => setForm({...form, telefone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea
                required
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder={`Olá, gostaria de saber mais sobre...`}
                value={form.mensagem}
                onChange={(e) => setForm({...form, mensagem: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#34B755] hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition-all transform active:scale-95 flex justify-center items-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PerfilPublico({ medico }) {
  const [showModal, setShowModal] = useState(false);

  if (!medico) return <div className="text-center p-10">Médico não encontrado.</div>;

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{medico.nome} | Perfil</title>
      </Head>

      <div className="relative h-64 w-full bg-[#1e8a4b] overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full p-10">
            <Image 
            src="/logo.png" 
            alt="VerdinhAZ"
            fill
            className="object-contain opacity-20"
            priority
            />
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
              <h1 className="text-3xl font-bold text-gray-800">{medico.nome.toUpperCase()}</h1>
              
              <div className="flex flex-wrap gap-4 mt-2 text-gray-600 text-sm">
                <span className="flex items-center"><IconCase /> {medico.especialidade}</span>
                <span className="flex items-center"><IconCalendar /> Membro desde 10/10/2025</span>
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

        <div className="py-10 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Nenhuma publicação recente.</p>
            <p className="text-sm text-gray-400 mt-1">As novidades do especialista aparecerão aqui em breve.</p>
        </div>

      </div>

      <ModalContato 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        medico={medico} 
      />
      
    </div>
  );
}

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