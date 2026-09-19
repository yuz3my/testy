import crypto from 'crypto';
import { verifyKey } from 'discord-interactions';
import { getSupabaseAdmin } from '../../lib/supabase';

// Discord signs the raw request body, so we need it unparsed.
export const config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function generateKey() {
  const hex = crypto.randomBytes(10).toString('hex').toUpperCase();
  const groups = hex.match(/.{1,4}/g);
  return 'MP5-' + groups.join('-');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const rawBody = await readRawBody(req);

  const isValid =
    signature &&
    timestamp &&
    verifyKey(rawBody, signature, timestamp, process.env.DISCORD_PUBLIC_KEY);

  if (!isValid) {
    return res.status(401).send('bad request signature');
  }

  const body = JSON.parse(rawBody);

  // Discord PING — required to verify the endpoint in the dev portal.
  if (body.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  // Slash command.
  if (body.type === 2 && body.data && body.data.name === 'generatekey') {
    const discordId = body.member?.user?.id || body.user?.id;
    const username = body.member?.user?.username || body.user?.username || 'unknown';

    if (!discordId) {
      return res.status(200).json({
        type: 4,
        data: { content: 'Não consegui identificar seu usuário do Discord.', flags: 64 },
      });
    }

    const supabase = getSupabaseAdmin();
    const { data: existing } = await supabase
      .from('access_keys')
      .select('access_key, revoked')
      .eq('discord_id', discordId)
      .maybeSingle();

    if (existing && existing.revoked) {
      return res.status(200).json({
        type: 4,
        data: { content: 'Sua chave foi revogada. Fale com um admin do servidor.', flags: 64 },
      });
    }

    let key;
    let intro;
    if (existing) {
      key = existing.access_key;
      intro = 'Você já tem uma chave — aqui está de novo';
    } else {
      key = generateKey();
      intro = 'Sua chave de acesso foi gerada';
      await supabase.from('access_keys').insert({
        discord_id: discordId,
        discord_username: username,
        access_key: key,
      });
    }

    return res.status(200).json({
      type: 4,
      data: {
        content: `${intro}:\n\`${key}\`\n\nCole essa chave no site do conversor pra entrar. Não compartilhe — ela é só sua.`,
        flags: 64, // ephemeral, só quem usou o comando vê
      },
    });
  }

  return res.status(400).send('unrecognized interaction');
}
