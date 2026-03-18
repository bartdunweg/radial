export default function Loading() {
  return (
    <section className="px-8 pt-[212px] pb-24 animate-pulse">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-xl mx-auto text-center">
          <div className="h-10 w-1/3 mx-auto rounded-xl bg-muted" />
          <div className="h-5 w-2/3 mx-auto mt-4 rounded-lg bg-muted" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-96 rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </section>
  );
}
