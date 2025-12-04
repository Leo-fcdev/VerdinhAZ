import Image from 'next/image';
import Link from 'next/link';

//  Importar o cliente Prisma
import prisma from '../lib/prisma.js';

// --- ÍCONES ---
function IconBriefcase() {
  return (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.03 23.03 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m6 0h-6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v11a2 2 0 01-2 2H8a2 2 0 01-2-2V9m12 0h-4a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2a2 2 0 00-2-2z" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

// Componente que recebe os dados direto do Banco de Dados 
function DoctorCard({ medico }) {
  return (
    <div className="flex flex-col sm:flex-row items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <Image
        src={medico.fotoUrl}
        alt={`Foto de ${medico.nome}`}
        width={100}
        height={100}
        className="rounded-full w-24 h-24 object-cover border-2 border-gray-100"
      />
      <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
        <h2 className="text-xl font-bold text-gray-800">{medico.nome}</h2>
        <div className="flex flex-col sm:flex-row sm:space-x-4 text-gray-600 text-sm mt-1 justify-center sm:justify-start">
          <span className="flex items-center justify-center sm:justify-start">
            <IconBriefcase />
            <span className="ml-1.5">{medico.especialidade}</span>
          </span>
          <span className="flex items-center justify-center sm:justify-start mt-1 sm:mt-0">
            <IconLocation />
            <span className="ml-1.5">{medico.localizacao}</span>
          </span>
        </div>
        {/* Biografia e fonte */}
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          {medico.biografia}
        </p>
      </div>
      <div className="ml-0 sm:ml-auto mt-4 sm:mt-0 w-full sm:w-auto">
        <Link href={`/medico/${medico.id}`} passHref>
          <button className="w-full text-center px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors">
            Ver Perfil
          </button>
        </Link>
      </div>
    </div>
  );
}

// Os Medicos e seus dados 
export default function BuscarMedicoPage({ medicos }) {
  return (
    <div className="bg-[#34B755] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 sm:p-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Médicos parceiros
          </h1>
          <div className="flex w-full sm:w-auto gap-2">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Buscar" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button className="px-5 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-200">
              Filtro
            </button>
          </div>
        </div>

        {/* Espaço */}
        <div className="space-y-4">
          {medicos.map((medico) => (
            <DoctorCard key={medico.id} medico={medico} />
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button className="w-9 h-9 flex items-center justify-center bg-green-600 text-white rounded-full font-bold">1</button>
          <button className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200">2</button>
          <button className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200">3</button>
          <span className="text-gray-500">...</span>
        </div>
        
      </div>
    </div>
  );
}

// FUNÇÃO DE BUSCA DE DADOS DO NEXT.JS 
export async function getServerSideProps() {
  
  // Busca todos os médicos no banco de dados
  const medicos = await prisma.medico.findMany();

  // Serializa os dados (converte datas para string) para evitar o erro do Next.js
  const medicosSerializados = JSON.parse(JSON.stringify(medicos));

  // Retorna os médicos como 'props' para o componente da página
  return {
    props: {
      medicos: medicosSerializados,
    },
  };
}