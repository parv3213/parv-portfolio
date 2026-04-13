import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity";
import { Achievement } from "../typings";

function coverImageUrl(image: Achievement["image"]) {
  const hasAsset = Boolean(image?.asset);
  if (!hasAsset) return null;
  const u = urlFor(image).url();
  if (u.includes("-1x1.")) return null;
  return u;
}

const Achievements = ({ achievements }: { achievements: Achievement[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="section relative h-screen"
    >
      <div className="sectionContainer relative mx-auto max-w-[2000px] justify-center px-4 md:px-10">
        <h2 className="sectionHeading z-30">Achievements &amp; publications</h2>

        <div className="scrollbarThin relative z-20 mt-10 flex w-full max-h-[65vh] flex-col items-center overflow-y-auto px-2 pb-20">
          <div className="grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
            {achievements?.map((achievement, index) => {
              const cover = coverImageUrl(achievement.image);

              return (
                <motion.article
                  key={achievement._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
                  viewport={{ once: true, margin: "-32px" }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-700/60 dark:bg-zinc-900/50 dark:hover:border-zinc-600 dark:hover:shadow-zinc-950/40"
                >
                  {cover ? (
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <Image
                        src={cover}
                        alt={achievement.title}
                        fill
                        className="object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/25 via-transparent to-transparent opacity-60" />
                    </div>
                  ) : (
                    <div className="relative flex min-h-[11rem] shrink-0 flex-col justify-end overflow-hidden bg-gradient-to-br from-amber-500/12 via-zinc-100 to-zinc-200/90 p-6 dark:from-amber-400/8 dark:via-zinc-800 dark:to-zinc-900 md:min-h-[12rem] md:p-8">
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-300/10"
                        aria-hidden
                      />
                      <h3 className="relative text-left text-xl font-semibold leading-snug tracking-tight text-zinc-900 line-clamp-3 dark:text-zinc-50 md:text-2xl">
                        {achievement.title}
                      </h3>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    {cover ? (
                      <h3 className="mb-2 text-lg font-semibold tracking-tight text-zinc-900 line-clamp-2 dark:text-zinc-50 md:text-xl">
                        {achievement.title}
                      </h3>
                    ) : null}
                    <p
                      className="mb-6 flex-1 text-sm leading-relaxed text-zinc-600 line-clamp-4 dark:text-zinc-400 md:text-[15px]"
                      title={achievement.description}
                    >
                      {achievement.description}
                    </p>
                    {achievement.linkToAsset ? (
                      <Link
                        href={achievement.linkToAsset}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                      >
                        <span>View details</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute -left-20 top-[20%] z-0 h-[400px] w-[400px] rounded-full bg-[#F7AB0A]/15 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-[10%] z-0 h-[300px] w-[300px] rounded-full bg-[#F7AB0A]/15 blur-[100px]" />
      </div>
    </motion.div>
  );
};

export default Achievements;
