export function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="pb-16 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent-blue">
          {label}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-500 dark:text-navy-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
