import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity";
import { Experience } from "../typings";

const ExperienceCard = ({
    experience,
    onViewDetails,
}: {
    experience: Experience;
    onViewDetails: (exp: Experience) => void;
}) => {
    return (
        <article className="flex w-full flex-shrink-0 snap-center flex-col items-center justify-start overflow-hidden rounded-3xl bg-zinc-100/90 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:border dark:border-zinc-800 dark:bg-zinc-900/50 md:w-[600px] xl:w-[900px]">
            <div className="flex w-full flex-col items-center">
                <motion.div
                    initial={{
                        y: 50,
                        opacity: 0,
                    }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex w-full flex-col items-center px-4"
                >
                    <div className="relative mb-4 flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-md dark:bg-zinc-800">
                        <Link
                            href={experience?.companyUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${experience?.company} website`}
                            className="relative mx-auto block h-20 w-20 md:h-24 md:w-24"
                        >
                            <Image
                                src={urlFor(experience?.companyImage).url()}
                                alt={experience?.company || "Company Image"}
                                fill
                                className="object-contain p-2"
                                sizes="(max-width: 768px) 80px, 96px"
                                loading="lazy"
                            />
                        </Link>
                    </div>

                    <h3 className="text-center text-2xl font-light tracking-wide text-zinc-800 dark:text-zinc-100 md:text-3xl">
                        {experience?.jobTitle}
                    </h3>
                    <Link
                        href={experience?.companyUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <p className="mt-1 text-center text-xl font-semibold text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200 md:text-2xl">
                            {experience?.company}
                        </p>
                    </Link>

                    <div className="my-4 flex flex-wrap justify-center gap-3">
                        {experience?.technologies?.map((technology) => {
                            return (
                                <div
                                    key={technology._id}
                                    className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                                    title={technology?.title}
                                    aria-label={technology?.title}
                                >
                                    <Image
                                        src={urlFor(technology?.image)?.url()}
                                        alt={technology?.title || "Technology"}
                                        fill
                                        className="object-contain p-1"
                                        sizes="40px"
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <p className="mb-6 text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                        {format(new Date(experience?.dateStarted), "MMM yyyy")} -{" "}
                        {experience?.isCurrentlyWorkingHere
                            ? "Present"
                            : format(new Date(experience?.dateEnded), "MMM yyyy")}
                    </p>
                    {(experience?.summary?.trim() || experience?.points?.[0]) && (
                        <p className="mt-4 mb-8 hidden max-w-2xl text-center text-base leading-relaxed text-zinc-600 line-clamp-3 dark:text-zinc-400 md:block md:text-lg">
                            {experience.summary?.trim() || experience.points?.[0]}
                        </p>
                    )}

                    <button
                        onClick={() => onViewDetails(experience)}
                        className="group relative mt-4 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 hover:bg-zinc-800 hover:shadow-lg dark:bg-zinc-100 dark:text-zinc-900 dark:focus:ring-zinc-100 dark:focus:ring-offset-zinc-900 dark:hover:bg-zinc-200 md:mt-0"
                    >
                        <span>View Details</span>
                        <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </article>
    );
};

export default ExperienceCard;
