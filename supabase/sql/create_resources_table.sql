create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  state text not null,
  county text not null,
  category text not null,
  organization_name text not null,
  description text,
  phone text,
  website text,
  address text,
  eligibility text,
  source_url text,
  last_verified date default current_date,
  active boolean default true,
  created_at timestamptz default now()
);

create index if not exists resources_state_idx on public.resources(state);
create index if not exists resources_county_idx on public.resources(county);
create index if not exists resources_category_idx on public.resources(category);
