import { getSupabaseAdmin } from '../../lib/supabase';
import { parseCookies } from '../../lib/cookies';
import converterHtml from '../../lib/converterHtml';

export default async function handler(req, res) {
  const cookies = parseCookies(req);
  const key = cookies.mp5_key;

  if (!key) {
    res.writeHead(302, { Location: '/' });
    return res.end();
  }

  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('access_keys')
    .select('revoked')
    .eq('access_key', key)
    .maybeSingle();

  if (!data || data.revoked) {
    res.writeHead(302, { Location: '/' });
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(converterHtml);
}
