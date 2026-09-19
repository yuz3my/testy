import { getSupabaseAdmin } from '../../lib/supabase';
import { setCookie } from '../../lib/cookies';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method not allowed' });
  }

  const { key } = req.body || {};
  if (!key || typeof key !== 'string') {
    return res.status(400).json({ ok: false, error: 'chave ausente' });
  }

  const trimmed = key.trim().toUpperCase();
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('access_keys')
    .select('access_key, revoked')
    .eq('access_key', trimmed)
    .maybeSingle();

  if (error) {
    return res.status(500).json({ ok: false, error: 'erro no servidor' });
  }
  if (!data || data.revoked) {
    return res.status(403).json({ ok: false, error: 'chave inválida ou revogada' });
  }

  setCookie(res, 'mp5_key', trimmed, { secure: process.env.NODE_ENV === 'production' });
  return res.status(200).json({ ok: true });
}
