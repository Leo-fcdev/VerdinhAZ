import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/QuemSomos.module.css';

export default function QuemSomos() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Quem Somos - VerdinhAZ</title>
      </Head>

      {/* Barra Verde no Topo */}
      <div className={styles.topBar}>
        <div className={styles.headerContent}>
          <Link href="/">
            <Image 
              src="/logo.png" 
              width={200} 
              height={60} 
              alt="Logo VerdinhAZ" 
              className={styles.logo}
            />
          </Link>
        </div>
      </div>

      <main className={styles.card}>
        <h1 className={styles.title}>QUEM SOMOS?</h1>

        <div className={styles.contentWrapper}>
          <div className={styles.imageContainer}>
            <Image 
              src="/unexdesenho.png" 
              width={600} 
              height={400} 
              alt="Ilustração da UNEX" 
              className={styles.illustration}
            />
          </div>

          <div className={styles.textContainer}>
            <p>
              O <strong>VerdinhAZ</strong> nasceu com um propósito claro: transformar vidas através do acesso à informação e à saúde. Desenvolvido por uma equipe dedicada de estudantes do <strong>Centro Universitário de Excelência (UNEX)</strong> em Feira de Santana, nosso projeto busca desmistificar o uso medicinal da cannabis.
            </p>
            <p>
              Atuamos como uma ponte segura e confiável, conectando pacientes que buscam tratamentos alternativos a médicos especialistas qualificados. Acreditamos que o conhecimento é a chave para superar preconceitos e promover bem-estar.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}