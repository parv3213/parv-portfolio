import { SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { PageInfo, Social } from "../typings";
import SocialLink from "./SocialLink";

type Props = {
  pageInfo: PageInfo;
  socials: Social[];
};

const ContactMe = ({ pageInfo, socials }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    if (!pageInfo?.email) return;
    try {
      await navigator.clipboard.writeText(pageInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text — handled by the mailto link below
    }
  }, [pageInfo?.email]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      viewport={{ once: true }}
      className="section relative"
    >
      <div className="sectionContainer relative isolate mx-auto max-w-[2000px] justify-center px-4 md:px-10">
        <h2 className="sectionHeading relative z-10">Contact</h2>

        <div className="relative z-10 mt-8 flex w-full flex-col items-center px-2 pb-12 md:mt-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-3xl bg-zinc-100/90 p-8 shadow-lg backdrop-blur-sm dark:border dark:border-zinc-800 dark:bg-zinc-900/50 md:gap-10 md:p-14"
          >
            {/* Headline */}
            <div className="space-y-3 text-center">
              <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
                Let&apos;s work together
              </h3>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base">
                I&apos;m open to new opportunities — full-time, contract, or collaboration. Reach out directly.
              </p>
            </div>

            {/* Email CTA */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={`mailto:${pageInfo?.email}`}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-zinc-900 sm:text-base"
              >
                <SendHorizontal className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                {pageInfo?.email}
              </a>

              <button
                onClick={handleCopyEmail}
                title="Copy email address"
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-medium text-zinc-600 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="flex w-full items-center gap-4">
              <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
              <span className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">or find me on</span>
              <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
            </div>

            {/* Social Links */}
            {socials && socials.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {socials.map((social) => (
                  <SocialLink
                    key={social._id}
                    social={social}
                    size={20}
                    className="group flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-600 shadow-sm transition-all hover:border-brand/40 hover:bg-zinc-50 hover:text-brand dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-brand/40 dark:hover:text-brand"
                  >
                    {social.title}
                  </SocialLink>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-brand/8 blur-[120px] dark:bg-brand/5" />
      </div>
    </motion.div>
  );
};

export default ContactMe;
