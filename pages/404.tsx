import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found | Parv</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-6 text-center dark:bg-zinc-900">
        <p className="font-display text-[8rem] font-bold leading-none text-zinc-200 dark:text-zinc-800">
          404
        </p>
        <div className="-mt-6 space-y-3">
          <h1 className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Page not found
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            That link doesn&apos;t exist — but the rest of the site does.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand/90 hover:shadow-md"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to portfolio
        </Link>
      </div>
    </>
  );
}
