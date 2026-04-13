import { motion, AnimatePresence } from "framer-motion";
import { Project as ProjectType } from "../typings";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import SkillVisual from "./SkillVisual";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  project: ProjectType;
  isOpen: boolean;
  onClose: () => void;
};

const unlockScroll = () => {
  const scrollRoot = document.getElementById("layout-scroll");
  document.body.classList.remove("overflow-hidden");
  scrollRoot?.classList.remove("overflow-hidden");
};

const ProjectModal = ({ project, isOpen, onClose }: Props) => {
  const onCloseRef = useRef(onClose);
  const isOpenRef = useRef(isOpen);
  onCloseRef.current = onClose;
  isOpenRef.current = isOpen;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const scrollRoot = document.getElementById("layout-scroll");
    document.body.classList.add("overflow-hidden");
    scrollRoot?.classList.add("overflow-hidden");

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleExitComplete = () => {
    if (!isOpenRef.current) {
      unlockScroll();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <motion.div
          key={project?._id ?? "project-modal"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
        >
          {/* Backdrop */}
          <div
            role="presentation"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="scrollbarThin relative max-h-[90vh] w-full overflow-y-auto overscroll-contain rounded-2xl bg-white p-4 shadow-2xl dark:bg-zinc-800 sm:max-w-4xl sm:p-6 md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white sm:right-4 sm:top-4"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-center text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
                  {project?.title}
                </h3>
                <div className="h-1 w-20 rounded-full bg-brand" />
              </div>

              {/* Technologies */}
              {project?.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech._id}
                      title={tech.title}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3 py-2 shadow-sm dark:border-zinc-600/80 dark:bg-zinc-800/50"
                    >
                      <div className="relative h-10 w-10 flex-shrink-0">
                        <SkillVisual skill={tech} imageClassName="object-contain p-1 dark:brightness-110" />
                      </div>
                      <span className="max-w-[7rem] text-center text-[10px] font-semibold uppercase leading-tight tracking-wider text-zinc-600 line-clamp-2 dark:text-zinc-300 sm:text-xs">
                        {tech.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture Details */}
              {project?.architectureDetails && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-brand sm:text-2xl">
                    Architecture & Design
                  </h4>
                  <div className="prose prose-sm max-w-none break-words text-zinc-600 dark:prose-invert dark:text-zinc-300 sm:prose-base">
                    <PortableText value={project.architectureDetails} />
                  </div>
                </div>
              )}

              {/* Challenges and Tradeoffs */}
              {project?.challengesAndTradeoffs && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-brand sm:text-2xl">
                    Challenges & Trade-offs
                  </h4>
                  <div className="prose prose-sm max-w-none break-words text-zinc-600 dark:prose-invert dark:text-zinc-300 sm:prose-base">
                    <PortableText value={project.challengesAndTradeoffs} />
                  </div>
                </div>
              )}

              {/* Links */}
              {(project?.linkToBuild || project?.linkToGithub) && (
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  {project?.linkToGithub && (
                    <Link
                      href={project.linkToGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-800 px-8 py-3 font-medium tracking-tighter text-white dark:bg-zinc-700 sm:w-auto"
                    >
                      <span className="absolute h-0 w-0 rounded-full bg-brand transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
                      <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-700 opacity-30"></span>
                      <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        GitHub
                      </span>
                    </Link>
                  )}
                  {project?.linkToBuild && (
                    <Link
                      href={project.linkToBuild}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-800 px-8 py-3 font-medium tracking-tighter text-white dark:bg-zinc-700 sm:w-auto"
                    >
                      <span className="absolute h-0 w-0 rounded-full bg-brand transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
                      <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-700 opacity-30"></span>
                      <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Preview
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
