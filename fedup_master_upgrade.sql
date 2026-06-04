alter table applicants
add column if not exists audition_date date,
add column if not exists audition_time text,
add column if not exists audition_location text,
add column if not exists audition_notes text,
add column if not exists audition_outcome text default 'Pending',
add column if not exists brandi_vote text default 'Maybe',
add column if not exists rashia_vote text default 'Maybe',
add column if not exists vlad_vote text default 'Maybe';

alter table sponsors
add column if not exists amount numeric default 0,
add column if not exists paid boolean default false,
add column if not exists invoice_date date,
add column if not exists renewal_date date,
add column if not exists participation_amount numeric default 0;
