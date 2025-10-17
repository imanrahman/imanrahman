# Lead Navigator

Lead Navigator is a dark-themed lead qualification workspace built with Vite, React, TypeScript, Tailwind CSS, and Supabase. It provides rich filtering, responsive data visualisation, and accessibility-focused UI for growth and revenue teams.

## ✨ Features

- **Filter intelligence** – Accordion-driven panel groups person, company, and contact filters with debounce, chips, and Supabase-backed queries.
- **Results experience** – Sortable, paginated data grid with hover states, focus management, and quick actions aligned with Gestalt principles.
- **Dark aesthetic** – Tailwind-powered design tokens with custom palette, spacing, and typography using Inter and Geist Sans.
- **Supabase integration** – Auth-ready client, schema definition, row-level security policies, and SQL seed scripts for realistic lead data.
- **Testing confidence** – Vitest + Testing Library coverage across units (filter panel, accordion, debounce, data table, pagination) and integrations (filter to results sync, Supabase fetch).
- **Deployment ready** – SPA-friendly configuration with environment variables and CI/CD guidance for Vercel or Netlify.

## 📁 Folder Structure

```
.
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── filter/
│   │   ├── layout/
│   │   └── results/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── supabase/
│   ├── README.md
│   └── seed.sql
├── index.html
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:5173 after configuring environment variables.

### Environment Variables

Create a `.env.local` file with:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-anon-key
```

For production deployments (Vercel/Netlify) add these as protected secrets.

## 🛠️ Supabase Setup

1. Create a Supabase project and retrieve the project URL & anon key.
2. Execute the schema in [`supabase/README.md`](supabase/README.md) or via the SQL editor.
3. Seed sample data using [`supabase/seed.sql`](supabase/seed.sql) to provision realistic leads.
4. Enable email/password authentication in Supabase Authentication settings.
5. Apply Row Level Security (RLS) policies from the Supabase docs included in the `supabase` folder.
6. Use the provided `supabase.js` client configuration (already integrated) to fetch and filter leads.

## 🧪 Testing

```bash
npm run test
```

Vitest runs unit and integration suites. Coverage spans UI interactions, debounce behaviour, data table sorting/pagination, and Supabase query orchestration.

## ♿ Accessibility Checklist

- Keyboard navigation across filters, chips, table actions, and pagination.
- Focus rings and aria-labels for interactive elements.
- Dark theme meets WCAG AA contrast targets.
- Tooltips and icons include descriptive semantics.

## 🌐 Deployment

1. Configure CI/CD (Vercel or Netlify) to install dependencies and run `npm run build`.
2. Provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` environment variables.
3. Confirm Supabase connectivity from the deployed preview, then promote to production.
4. Monitor Supabase logs and hosting analytics for ongoing performance checks.

## 🤝 Contributing

1. Fork and clone the repository.
2. Create a feature branch: `git checkout -b feature/amazing-idea`.
3. Install dependencies and run `npm run dev`.
4. Add tests for new functionality.
5. Submit a pull request following the project conventions.

## 🧭 Design Principles

- **Proximity** – Group related filters and table data to accelerate scanning.
- **Similarity** – Reuse consistent shapes, shadows, and iconography.
- **Continuity** – Align content along shared axes to guide the eye.
- **Figure-Ground** – Elevate active elements with contrast and soft glows.

## 📄 License

MIT © 2025 Lead Navigator
