# MP5 MMD → Roblox — conversor com chave de acesso

Site do conversor, protegido por chave. Cada chave é gerada por um Discord
bot (via slash command `/generatekey`) e amarrada a um usuário do Discord —
uma chave por pessoa.

Como funciona, em uma frase: o Discord chama um endpoint HTTP quando alguém
usa `/generatekey` (não precisa de um bot rodando 24/7 em outro lugar — vive
dentro do mesmo projeto Vercel), gera/recupera a chave no Supabase, e o site
verifica essa chave contra o Supabase antes de liberar a página do conversor.

## 1. Supabase

Pode usar o mesmo projeto do `mp5-fan-platform` ou criar um novo.

1. Abra o **SQL Editor** do seu projeto e rode o conteúdo de `supabase.sql`.
2. Em **Settings → API**, copie:
   - `Project URL` → vai virar `SUPABASE_URL`
   - `service_role` key (não a `anon`!) → vai virar `SUPABASE_SERVICE_ROLE_KEY`

## 2. Discord — criar a aplicação

1. Vá em https://discord.com/developers/applications → **New Application**.
2. Em **General Information**, copie:
   - `Application ID` → `DISCORD_APPLICATION_ID`
   - `Public Key` → `DISCORD_PUBLIC_KEY`
3. Vá em **Bot** → **Add Bot** (mesmo sem gateway, precisamos de um bot pra
   ter um token que registra o slash command). Copie o **Token** →
   `DISCORD_BOT_TOKEN` (só precisa disso localmente, não vai pra Vercel).
4. Deixe a aba **Interactions Endpoint URL** em branco por enquanto — só dá
   pra preencher depois que o site estiver no ar (passo 4).

## 3. Deploy na Vercel

1. Suba essa pasta pra um repo no GitHub.
2. Em https://vercel.com → **Add New → Project** → importe o repo.
3. Em **Environment Variables**, adicione:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DISCORD_PUBLIC_KEY`
   - `DISCORD_APPLICATION_ID`
4. Deploy. Você vai ficar com uma URL tipo `https://seu-projeto.vercel.app`.

## 4. Conectar o Discord ao site

1. Volte no Developer Portal → sua aplicação → **General Information**.
2. Em **Interactions Endpoint URL**, cole:
   `https://seu-projeto.vercel.app/api/discord-interactions`
3. Salve. O Discord manda um PING nessa hora pra confirmar — se o deploy
   deu certo, ele aceita direto.

## 5. Registrar o comando `/generatekey`

Local, uma vez só (ou de novo se você mudar a descrição do comando):

```bash
npm install
cp .env.example .env.local   # preencha DISCORD_APPLICATION_ID e DISCORD_BOT_TOKEN
npm run register-commands
```

Dica: se preencher `DISCORD_GUILD_ID` no `.env.local` com o id do seu
servidor de testes, o comando aparece na hora ali. Sem isso, o registro é
global e pode levar até 1h pra propagar em todo lugar.

## 6. Convidar o bot pro servidor

Developer Portal → **OAuth2 → URL Generator** → marque o scope
`applications.commands` (e `bot` se quiser que ele apareça na lista de
membros) → abra o link gerado e adicione ao seu servidor.

## 7. Testar

No Discord: `/generatekey` → recebe uma chave tipo `MP5-A1B2-C3D4-E5F6`
(mensagem só visível pra você). Cola essa chave no site → entra no
conversor.

## Revogar uma chave

No SQL Editor do Supabase:

```sql
update access_keys set revoked = true where discord_id = 'id_do_usuario_aqui';
```

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha os 4 valores de SUPABASE_* e DISCORD_PUBLIC_KEY/APPLICATION_ID
npm run dev
```

O `/api/discord-interactions` só funciona de verdade com uma URL pública
(o Discord precisa conseguir chamar ela), então pra testar essa parte local
seria necessário algo como `ngrok` — não é necessário pro dia a dia, só se
for mexer nesse endpoint.
