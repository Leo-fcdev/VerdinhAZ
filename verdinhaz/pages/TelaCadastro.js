import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/TelaCadastro.module.css';

const LOGO_PATH = '/logo.png';
const MULHER_PATH = '/mulhercaneca.png';

export default function TelaCadastro() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [crm, setCrm] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [biografia, setBiografia] = useState('');
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!foto) {
      alert('Por favor, selecione uma foto de perfil.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('senha', senha);
      formData.append('crm', crm);
      formData.append('localizacao', localizacao);
      formData.append('especialidade', especialidade);
      formData.append('biografia', biografia);
      formData.append('foto', foto);

      const response = await fetch('/api/medicos/cadastrar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        router.push('/');
      } else {
        alert(`Erro: ${data.error || 'Falha ao cadastrar'}`);
      }

    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.containerGeral}>
      <div className={styles.containerFormulario}>

        <div className={styles.logoTopo}>
          <img src={LOGO_PATH} alt="Logo VerdinhAZ" />
        </div>

        <div className={styles.formImagem}>
          <img src={MULHER_PATH} alt="Mulher sorrindo segurando uma caneca" />
        </div>

        <form className={styles.formInputs} onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="Insira seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
            required
            minLength={6}
          />

          <input
            type="text"
            placeholder="Insira seu Crm"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            className={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Insira sua localização (Ex: São Paulo - SP)"
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
            required
          />
          
          <input
            type="text"
            placeholder="Breve biografia"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            className={styles.input}
          />

          <div className={styles.uploadContainer}>
            <label className={`${styles.customFileUpload} ${foto ? styles.fileSelected : ''}`}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFoto(e.target.files[0])}
                required
              />
              <span className={styles.uploadIcon}>{foto ? '✅' : '📷'}</span>
              <span>
                {foto ? `Arquivo: ${foto.name}` : 'Clique para enviar sua foto de perfil'}
              </span>
            </label>
          </div>

          <a href="#" className={styles.ajudaLink}>
            Precisa de ajuda?
          </a>

          <button 
            type="submit" 
            className={styles.btnProximo}
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

      </div>
    </div>
  );
}