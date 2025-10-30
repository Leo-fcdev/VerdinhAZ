const { PrismaClient } = require('../verdinhaz/node_modules/.prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('iniciandoo seed...');

    await prisma.mensagem.deleteMany();
    await prisma.medico.deleteMany();

    const medico1 = await prisma.medico.create({
        data : {
            nome: 'Dr. Sidarta Machado',
            email:'sidartmachado@clinicaintegrativa.com',
            crm: '12345-SP',
            especialidade: 'Neurologia e Medicina Canabinoide',
            localizacao: 'São Paulo - SP',
            biografia: 'Neurologista com mais de 10 anos de experiência, pós-graduado em tratamento com cannabis medicinal para doenças neurodegenerativas e dor crônica.',
            fotoUrl: '/images/medico1.jpg'
        },
    });

    const medico2 = await prisma.medico.create({
        data : {
            nome: 'Dr. Bruno Mendes',
            email:'bruno.mendes@clinicardador.com',
            crm: '67890-RJ',
            especialidade: 'Clínica da Dor e Terapia Canabinoide',
            localizacao: 'Avenida das Américas, nº 500, Bloco 3 - Barra da Tijuca, Rio de Janeiro - RJ',
            biografia: 'Médico especialista no tratamento da dor crônica, fibromialgia e cuidados paliativos. Utiliza a terapia canabinoide como ferramenta para melhorar a qualidade de vida.',
            fotoUrl: '/images/medico2.jpg',
        },
    });

    const medico3 = await prisma.medico.create({
    data: {
      nome: 'Dra. Alice Nogueira',
      email: 'alice.nogueira@clinicaintegrativa.com',
      crm: '13579-SP',
      especialidade: 'Neurologia e Medicina Canabinoide',
      localizacao: 'Rua Apinajés, nº 1100, Sala 72 - Perdizes, São Paulo - SP',
      biografia:
        'Neurologista com mais de 10 anos de experiência, pós-graduada em tratamentos com cannabis medicinal para doenças neurodegenerativas e dor crônica.',
      fotoUrl: '/images/medico3.jpg', // <-- Verifique se o nome bate
    },
  });

  console.log('Médicos criados:' , medico1, medico2, medico3);
  console.log('Seed finalizado com sucesso!')
}

main()
    .catch((e) =>{
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });