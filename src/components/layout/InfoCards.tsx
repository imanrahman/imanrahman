import { Filter, Layers, ScanSearch } from 'lucide-react';

const cards = [
  {
    title: 'Refine by People',
    description:
      'Search by name, job title, and seniority to zero in on the exact decision-makers you need.',
    icon: Filter
  },
  {
    title: 'Understand the Organisation',
    description:
      'Filter by industry, size, and founding year to prioritise companies aligned with your ICP.',
    icon: Layers
  },
  {
    title: 'Close the Loop',
    description:
      'Ensure every lead has verified contact details and rich context for outreach readiness.',
    icon: ScanSearch
  }
];

const InfoCards = () => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map(({ title, description, icon: Icon }) => (
        <article
          key={title}
          className="rounded-2xl bg-background-surface/80 p-6 shadow-elevated transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
        </article>
      ))}
    </section>
  );
};

export default InfoCards;
