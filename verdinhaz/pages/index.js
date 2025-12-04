import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'; 
import styles from '../styles/Home.module.css'; 

export default function Home() {
  return (
    <div className={styles.pageContainer}> 
      <Head>
        <title>VerdinhAZ - Transformando Vidas</title>
      </Head>

      <header className={styles.navbar}>
        <div className={styles.navLogo}>
          <Image src="/logo.png" width={225} height={60} alt="Logo VerdinhAZ" />
        </div>
        
        <nav className={styles.navLinks}>
          <Link href="#">Quem somos</Link>
          
          
          <Link href="/TelaCadastro">
            Cadastrar Clínica
          </Link>
        </nav>
      </header>
      
      <main className={styles.heroContainer}>
        <div className={styles.heroText}>
          <h1>TRANSFORMANDO VIDAS ATRAVÉS DO CONHECIMENTO.</h1>
          <p>
            Esclarecemos o uso terapêutico do canabidiol.
            Nosso propósito é informar, acolher e transformar.
          </p>

          <button className={styles.searchButton}>
            <span>SAIBA MAIS</span>
            <Image
              src="/celular.png"
              alt="Ícone de perfil"
              width={50}
              height={50}
              className={styles.buttonIcon}
            />
          </button>
        </div>
      </main>

      <footer className={styles.footerBanner}>
        <p>Converse, tire suas dúvidas e receba ajuda com profissionais de verdade!</p>
      </footer>
    </div>
  );
}