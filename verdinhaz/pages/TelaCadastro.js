import React, { useState } from 'react';
import styles from '../styles/TelaCadastro.module.css';

const logoPath = '/logo.png';
const mulherPath = '/mulher-cadastro.png';

export default function TelaCadastro() {
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [crm, setCrm] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    console.log('Dados do formulário:');
    console.log({
      nome,
      email,
      crm,
      localizacao,
      especialidade,
    });
    
    alert('Formulário pronto para enviar! Verifique o console (F12).');
  };
  
  return (
    <div className={styles.containerGeral}>
      <div className={styles.containerFormulario}>

        <div className={styles.logoTopo}>
          <img src={logoPath} alt="Logo VerdinhAZ" />
        </div>

        <div className={styles.formImagem}>
          <img src={mulherPath} alt="Mulher sorrindo segurando uma caneca" />
        </div>

        <form className={styles.formInputs} onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="Insira seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.input}
          />

          <input
            type="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          <input
            type="text"
            placeholder="Insira seu Crm"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            className={styles.input}
          />

          <input
            type="text"
            placeholder="Insira sua localização"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className={styles.input}
          />

          <input
            type="text"
            placeholder="Qual sua especialidade?"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            className={styles.input}
          />

          <a href="#" className={styles.ajudaLink}>
            Precisa de ajuda?
          </a>

          <button type="submit" className={styles.btnProximo}>
            Próximo
          </button>
        </form>

      </div>
    </div>
  );
}