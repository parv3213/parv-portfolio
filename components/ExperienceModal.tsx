import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { urlFor } from "../sanity";
import { Experience } from "../typings";

type Props = {
    experience: Experience | null;
    onClose: () => void;
};

const ExperienceModal = ({ experience, onClose }: Props) => {
    // Prevent scrolling on the body when the modal is open
    useEffect(() => {
        if (experience) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [experience]);

    if (!experience) return null;

    return (
        <AnimatePresence>
            {experience && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        {/* Header Area */}
                        <div className="flex flex-col items-start justify-between border-b border-zinc-200 bg-zinc-100/50 p-6 dark:border-zinc-800 dark:bg-zinc-800/50 sm:flex-row sm:items-center">
                            <div className="flex items-center space-x-4">
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-sm dark:bg-zinc-800 sm:h-20 sm:w-20">
                                    <Image
                                        src={urlFor(experience?.companyImage).url()}
                                        alt={experience?.company || "Company Image"}
                                        fill
                                        className="object-contain p-1"
                                        sizes="80px"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                                        {experience?.jobTitle}
                                    </h3>
                                    <div className="mt-1 flex flex-col text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center">
                                        <Link
                                            href={experience?.companyUrl || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                                        >
                                            {experience?.company}
                                        </Link>
                                        <span className="mx-2 hidden sm:inline">•</span>
                                        <span className="text-sm font-medium uppercase tracking-wider">
                                            {format(new Date(experience?.dateStarted), "MMM yyyy")} -{" "}
                                            {experience?.isCurrentlyWorkingHere
                                                ? "Present"
                                                : format(new Date(experience?.dateEnded), "MMM yyyy")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 rounded-full bg-zinc-200/50 p-2 text-zinc-600 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 sm:static"
                                aria-label="Close modal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="scrollbarThin flex-1 overflow-y-auto p-6">
                            {experience.summary?.trim() && (
                                <p className="mb-6 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                                    {experience.summary.trim()}
                                </p>
                            )}
                            <h4 className="mb-4 border-b border-zinc-200 pb-2 text-lg font-semibold text-zinc-800 dark:border-zinc-800 dark:text-zinc-200">
                                Key Responsibilities & Achievements
                            </h4>
                            <ul className="space-y-4">
                                {experience?.points?.map((point, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start space-x-3 text-zinc-700 dark:text-zinc-300"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-600 dark:bg-yellow-500" />
                                        <span className="flex-1 text-[15px] leading-relaxed sm:text-base">{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <h4 className="mb-4 mt-8 border-b border-zinc-200 pb-2 text-lg font-semibold text-zinc-800 dark:border-zinc-800 dark:text-zinc-200">
                                Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {experience?.technologies?.map((technology) => (
                                    <div
                                        key={technology._id}
                                        className="flex items-center space-x-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                                        title={technology?.title}
                                    >
                                        <div className="relative h-6 w-6">
                                            <Image
                                                src={urlFor(technology?.image)?.url()}
                                                alt={technology?.title || "Technology"}
                                                fill
                                                className="object-contain"
                                                sizes="24px"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                            {technology?.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ExperienceModal;
