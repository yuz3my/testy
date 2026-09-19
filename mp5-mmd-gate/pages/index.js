import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [status, setStatus] = useState('checking');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/session')
      .then((r) => r.json())
      .then((d) => {
        if (d.valid) {
          window.location.href = '/api/converter';
        } else {
          setStatus('form');
        }
      })
      .catch(() => setStatus('form'));
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setStatus('checking');
    try {
      const r = await fetch('/api/verify-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
      const d = await r.json();
      if (d.ok) {
        window.location.href = '/api/converter';
      } else {
        setError(d.error || 'chave inválida');
        setStatus('form');
      }
    } catch (err) {
      setError('não consegui verificar agora, tenta de novo');
      setStatus('form');
    }
  }

  return (
    <>
      <Head>
        <title>MP5 · MMD para Roblox</title>
      </Head>
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.eyebrow}>MP5 · acesso restrito</div>
          <h1 style={styles.h1}>Conversor MMD → Roblox</h1>
          <p style={styles.p}>
            Gere sua chave no Discord com <code style={styles.code}>/generatekey</code> e cole
            aqui pra entrar.
          </p>
          <form onSubmit={submit} style={styles.form}>
            <input
              style={styles.input}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="MP5-XXXX-XXXX-XXXX"
              autoFocus
              autoCapitalize="characters"
            />
            <button style={styles.button} disabled={status === 'checking' || !key}>
              {status === 'checking' ? 'verificando…' : 'entrar'}
            </button>
          </form>
          {error && <div style={styles.error}>{error}</div>}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#120f1c',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: 24,
  },
  card: {
    maxWidth: 380,
    width: '100%',
    background: '#1a1630',
    border: '1px solid #332c4d',
    borderRadius: 6,
    padding: 28,
  },
  eyebrow: { fontFamily: 'monospace', fontSize: 12, color: '#6bd9c8', marginBottom: 10 },
  h1: { color: '#eae6f7', fontSize: 22, margin: '0 0 10px', fontFamily: 'system-ui, sans-serif' },
  p: { color: '#9089ab', fontSize: 14, lineHeight: 1.5, margin: '0 0 20px' },
  code: { background: '#221c3c', padding: '1px 5px', borderRadius: 3, color: '#eae6f7' },
  form: { display: 'flex', flexDirection: 'column', gap: 10 },
  input: {
    background: '#221c3c',
    border: '1px solid #332c4d',
    color: '#eae6f7',
    padding: '10px 12px',
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: 14,
  },
  button: {
    background: '#6bd9c8',
    color: '#0c1614',
    border: 'none',
    padding: '10px 12px',
    borderRadius: 4,
    fontWeight: 600,
    cursor: 'pointer',
  },
  error: { color: '#e8748a', fontSize: 13, marginTop: 12 },
};
