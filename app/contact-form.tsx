"use client";

export function ContactForm() {
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm text-stone-500"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-stone-500 dark:border-stone-800 dark:bg-stone-900/50 dark:text-white dark:placeholder-stone-600 dark:focus:border-stone-600"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm text-stone-500"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-stone-500 dark:border-stone-800 dark:bg-stone-900/50 dark:text-white dark:placeholder-stone-600 dark:focus:border-stone-600"
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="company"
          className="mb-2 block text-sm text-stone-500"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-stone-500 dark:border-stone-800 dark:bg-stone-900/50 dark:text-white dark:placeholder-stone-600 dark:focus:border-stone-600"
          placeholder="Your company"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm text-stone-500"
        >
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full resize-none rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-stone-500 dark:border-stone-800 dark:bg-stone-900/50 dark:text-white dark:placeholder-stone-600 dark:focus:border-stone-600"
          placeholder="What are you building?"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-stone-950 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-stone-800 sm:w-auto dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
      >
        Send Message
      </button>
    </form>
  );
}
