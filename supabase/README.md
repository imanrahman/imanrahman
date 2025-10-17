# Supabase Configuration

## Database Schema

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  position text,
  city text,
  state text,
  country text,
  linkedin text,
  seniority text,
  functions text[] default '{}',
  org_name text not null,
  org_website text,
  org_linkedin text,
  founded_year int,
  industry text,
  size text,
  description text,
  specialties text[] default '{}',
  org_city text,
  org_state text,
  org_country text,
  inserted_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists leads_fulltext_idx on public.leads using gin(
  to_tsvector('english', coalesce(first_name,'') || ' ' || coalesce(last_name,'') || ' ' || coalesce(org_name,''))
);
```

## Row Level Security

Enable RLS:

```sql
alter table public.leads enable row level security;
```

Example policies:

```sql
create policy "Allow read for authenticated users"
  on public.leads for select
  using (auth.role() = 'authenticated');

create policy "Allow insert for service role"
  on public.leads for insert
  with check (auth.role() = 'service_role');

create policy "Allow update for service role"
  on public.leads for update
  using (auth.role() = 'service_role');
```

Adjust according to your application requirements. Use [Supabase Auth Helpers](https://supabase.com/docs/guides/auth) when integrating with the frontend.

## Authentication

1. Enable email/password providers in Supabase Authentication settings.
2. Configure redirect URLs for development (`http://localhost:5173`) and production deployments.
3. Optionally enable OAuth providers (Google, Microsoft) to support enterprise sign-ins.

## Local Testing

- Use the SQL snippets to create the schema and RLS policies.
- Run the statements in Supabase SQL editor or via the CLI: `supabase db push`.
- Seed the database using the [seed script](./seed.sql).
- Generate service role and anon keys in the Supabase dashboard and store them securely.
