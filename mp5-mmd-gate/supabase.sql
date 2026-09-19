-- Rode isso no SQL editor do seu projeto Supabase (o mesmo do mp5-fan-platform,
-- se quiser reaproveitar; ou um novo projeto, tanto faz).

create table if not exists access_keys (
  id bigint generated always as identity primary key,
  discord_id text unique not null,
  discord_username text,
  access_key text unique not null,
  revoked boolean not null default false,
  created_at timestamptz not null default now()
);

alter table access_keys enable row level security;
-- De propósito, nenhuma policy é criada aqui: só o backend (usando a
-- SUPABASE_SERVICE_ROLE_KEY) acessa essa tabela, e a service role ignora RLS.
-- Isso mantém a tabela invisível pra qualquer client anônimo/público.

-- Pra revogar uma chave manualmente (ex: alguém compartilhou a dela):
-- update access_keys set revoked = true where discord_id = '...';
