export default function Loading() {
  return (
    <section className="px-8 pt-[212px] pb-24 animate-pulse">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-xl">
          <div className="h-10 w-2/3 rounded-xl bg-muted" />
          <div className="h-5 w-full mt-4 rounded-lg bg-muted" />
        </div>
        <div className="mt-12 h-80 rounded-2xl bg-muted" />
        <div className="mt-12 space-y-4">
          <div className="h-4 w-full rounded-lg bg-muted" />
          <div className="h-4 w-5/6 rounded-lg bg-muted" />
          <div className="h-4 w-4/6 rounded-lg bg-muted" />
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </section>
  );
}
