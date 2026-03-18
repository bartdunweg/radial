export default function Loading() {
  return (
    <section className="px-8 pt-[212px] pb-24 animate-pulse">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-xl">
          <div className="h-10 w-2/3 rounded-xl bg-muted" />
          <div className="h-5 w-full mt-4 rounded-lg bg-muted" />
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-muted" />
          ))}
        </div>
        <div className="mt-12 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="h-11 rounded-full bg-muted" />
            <div className="h-11 rounded-full bg-muted" />
          </div>
          <div className="h-11 rounded-full bg-muted" />
          <div className="h-40 rounded-2xl bg-muted" />
          <div className="h-11 w-40 rounded-full bg-muted" />
        </div>
      </div>
    </section>
  );
}
