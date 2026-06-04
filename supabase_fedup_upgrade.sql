alter table applicants
add column if not exists producer_one_rating integer default 0,
add column if not exists producer_two_rating integer default 0,
add column if not exists producer_three_rating integer default 0,
add column if not exists audition_date date,
add column if not exists audition_time text,
add column if not exists audition_location text,
add column if not exists audition_notes text,
add column if not exists video_urls text[];

create table if not exists sponsors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  company text,
  contact_name text,
  email text,
  phone text,
  package text,
  revenue numeric default 0,
  status text default 'Lead',
  website_listing text,
  notes text
);
