import { getSupabaseAdmin } from '../../lib/supabase';
import { parseCookies } from '../../lib/cookies';

export default async function handler(req, res) {
  const cookies = parseCookies(req);
  const key = cookies.mp5_key;
  if (!key) {
    return res.status(200).json({ valid: false });
  }

  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('access_keys')
    .select('revoked')
    .eq('access_key', key)
    .maybeSingle();

  return res.status(200).json({ valid: !!data && !data.revoked });
}
