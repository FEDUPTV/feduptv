
create table if not exists public.resource_sources (
  id uuid primary key default gen_random_uuid(),
  source_name text not null,
  source_url text not null,
  category text not null,
  active boolean default true,
  created_at timestamptz default now()
);
