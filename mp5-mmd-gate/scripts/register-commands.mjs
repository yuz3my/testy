// Run once (and again any time the command definition changes):
//   npm run register-commands
//
// Needs DISCORD_APPLICATION_ID and DISCORD_BOT_TOKEN in your environment
// (put them in .env.local, they're loaded automatically below).
import 'dotenv/config';

const appId = process.env.DISCORD_APPLICATION_ID;
const token = process.env.DISCORD_BOT_TOKEN;
const guildId = process.env.DISCORD_GUILD_ID; // optional, for instant testing in one server

if (!appId || !token) {
  console.error('Faltam DISCORD_APPLICATION_ID e/ou DISCORD_BOT_TOKEN no ambiente.');
  process.exit(1);
}

const command = {
  name: 'generatekey',
  description: 'Gera (ou mostra) sua chave de acesso ao conversor MMD → Roblox',
  type: 1,
};

// Guild-scoped commands show up instantly; global commands can take up to ~1h to propagate.
const url = guildId
  ? `https://discord.com/api/v10/applications/${appId}/guilds/${guildId}/commands`
  : `https://discord.com/api/v10/applications/${appId}/commands`;

const res = await fetch(url, {
  method: 'POST',
  headers: {
    Authorization: `Bot ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(command),
});

const json = await res.json();
console.log(res.status, json);
if (res.ok) {
  console.log(guildId
    ? 'Comando registrado só no servidor DISCORD_GUILD_ID (instantâneo).'
    : 'Comando registrado globalmente — pode levar até 1h pra aparecer em todos os servidores.');
}
