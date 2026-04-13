import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { urlFor } from "../sanity";
import { Project as ProjectType } from "../typings";
import ProjectModal from "./ProjectModal";

const Project = ({ project }: { project: ProjectType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasSanityAsset = Boolean(project?.image?.asset);
  let imageUrl = hasSanityAsset ? urlFor(project.image).url() : null;

  // Ignore 1x1 placeholder images
  if (imageUrl && imageUrl.includes("-1x1.")) {
    imageUrl = null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/50 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl dark:border-zinc-700/50 dark:bg-zinc-800/50"
      >
        {/* Image Section */}
        {imageUrl ? (
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative aspect-video w-full cursor-pointer overflow-hidden bg-zinc-100 dark:bg-zinc-900"
          >
            <Image
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              src={imageUrl}
              alt={project?.title || "Project Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
          </div>
        ) : (
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 p-6 text-center dark:from-zinc-800 dark:to-zinc-900"
          >
            <h4 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 line-clamp-2">
              {project?.title}
            </h4>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5 dark:group-hover:bg-white/5" />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-6">
          {imageUrl && (
            <h4 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1" title={project?.title}>
              {project?.title}
            </h4>
          )}
          
          <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-600 line-clamp-3 dark:text-zinc-400" title={project?.summary}>
            {project?.summary}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Details
            </button>
            {project?.linkToGithub && (
              <Link
                href={project?.linkToGithub}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center rounded-lg bg-zinc-200 p-2.5 text-zinc-900 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
                title="View Source Code on GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
            {project?.linkToBuild && (
              <Link
                href={project?.linkToBuild}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center rounded-lg bg-zinc-200 p-2.5 text-zinc-900 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
                title="View Live Preview"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Project;
