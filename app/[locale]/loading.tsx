export default function Loading() {
  return (
    <section className="px-8 pt-[212px] pb-24 animate-pulse">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-12 w-3/4 mx-auto rounded-xl bg-muted" />
          <div className="h-6 w-1/2 mx-auto mt-4 rounded-lg bg-muted" />
          <div className="flex justify-center gap-4 mt-8">
            <div className="h-11 w-40 rounded-full bg-muted" />
            <div className="h-11 w-40 rounded-full bg-muted" />
          </div>
        </div>
        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </section>
  );
}
