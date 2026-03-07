"use client";

export function ContactForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-navy-500 dark:text-navy-400">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3.5 text-sm text-navy-950 placeholder-navy-400 outline-none transition-colors focus:border-accent-blue dark:border-navy-700 dark:bg-navy-900 dark:text-white dark:placeholder-navy-600"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-navy-500 dark:text-navy-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3.5 text-sm text-navy-950 placeholder-navy-400 outline-none transition-colors focus:border-accent-blue dark:border-navy-700 dark:bg-navy-900 dark:text-white dark:placeholder-navy-600"
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="mb-2 block text-sm text-navy-500 dark:text-navy-400">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3.5 text-sm text-navy-950 placeholder-navy-400 outline-none transition-colors focus:border-accent-blue dark:border-navy-700 dark:bg-navy-900 dark:text-white dark:placeholder-navy-600"
          placeholder="Your company"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-navy-500 dark:text-navy-400">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full resize-none rounded-lg border border-navy-200 bg-white px-4 py-3.5 text-sm text-navy-950 placeholder-navy-400 outline-none transition-colors focus:border-accent-blue dark:border-navy-700 dark:bg-navy-900 dark:text-white dark:placeholder-navy-600"
          placeholder="What are you building?"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-navy-700 px-8 py-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-navy-600 sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}
