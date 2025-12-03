import '../styles/globals.css'; // Importa seu CSS global
import { Kanit } from 'next/font/google'; // Importa a fonte Kanit

// 1. Configura a fonte Kanit
// (Pegando os pesos 400, 500 e 700)
const kanit = Kanit({
  weight: ['400', '500', '700'],
  subsets: ['latin'], // Isso é necessário para o Next.js
});

// 2. Componente principal que "envolve" todas as suas páginas
function MyApp({ Component, pageProps }) {
  return (
    // 3. Aplica a classe da fonte Kanit em todo o site
    <main className={kanit.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;