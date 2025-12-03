import Head from 'next/head';
import Image from 'next/image';
// Importa o arquivo de estilos (CSS Module)
import styles from '../styles/Home.module.css'; 

export default function Home() {
  return (
    // Container principal da página
    <div className={styles.pageContainer}> 
      <Head>
        {/* Define o título que aparece na aba do navegador */}
        <title>VerdinhAZ - Transformando Vidas</title>
      </Head>

      {/* Cabeçalho verde do site */}
      <header className={styles.navbar}>
        {/* Caixa para a logo */}
        <div className={styles.navLogo}>
          <Image src="/logo.png" width={225} height={60} alt="Logo VerdinhAZ" />
        </div>
        {/* Links de navegação */}
        <nav className={styles.navLinks}>
          <a href="#">Quem somos</a>
          <a href="#">Cadastrar Clínica</a>
        </nav>
      </header>
      
      {/* Conteúdo principal (o banner cinza) */}
      <main className={styles.heroContainer}>

        {/* Bloco de texto que fica sobre a imagem de fundo */}
        <div className={styles.heroText}>
          <h1>TRANSFORMANDO VIDAS ATRAVÉS DO CONHECIMENTO.</h1>
          <p>
            Esclarecemos o uso terapêutico do canabidiol.
            Nosso propósito é informar, acolher e transformar.
          </p>

          {/* Botão "Saiba Mais" */}
          <button className={styles.searchButton}>
            <span>SAIBA MAIS</span>
            <Image
              src="/celular.png" // Imagem do ícone
              alt="Ícone de perfil"
              width={50}
              height={50}
              className={styles.buttonIcon}
            />
          </button>
        </div>
      </main>

      {/* Rodapé da página */}
      <footer className={styles.footerBanner}>
        <p>Converse, tire suas dúvidas e receba ajuda com profissionais de verdade!</p>
      </footer>
    </div>
  );
}