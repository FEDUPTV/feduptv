
create table if not exists cities (
  id bigint generated always as identity primary key,
  state text not null,
  city text not null
);

create index if not exists idx_cities_state
on cities(state);

