import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity";
import { Project as ProjectType } from "../typings";

const Project = ({ project }: { project: ProjectType }) => {
  return (
    <div className="flex h-full w-full flex-shrink-0 snap-center flex-col items-center justify-center p-8 md:p-20">
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="flex w-full max-w-6xl flex-col items-center justify-center"
      >
        <div className="group relative aspect-video w-full max-w-2xl cursor-pointer overflow-hidden rounded-2xl border border-gray-200/50 bg-white/50 shadow-2xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
          <Image
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            src={urlFor(project?.image).url()}
            alt={project?.title || "Project Image"}
            fill
            placeholder="empty"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/0" />
        </div>

        <div className="mt-10 max-w-4xl space-y-6 px-0 md:px-10">
          <div className="flex flex-col items-center space-y-2">
            <h4 className="text-center text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
              {project?.title}
            </h4>
            <div className="h-1 w-20 rounded-full bg-[#F7AB0A]" />
          </div>

          <div className="scrollbarThin max-h-[12rem] w-full overflow-y-auto px-2 text-sm">
            <p className="text-center text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-left">
              {project?.summary}
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href={project?.linkToBuild}
              target="_blank"
              rel="noopener noreferrer"
              className="group group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 px-8 py-3 font-medium tracking-tighter text-white dark:bg-gray-700"
            >
              <span className="absolute h-0 w-0 rounded-full bg-[#F7AB0A] transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
              <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-700 opacity-30"></span>
              <span className="relative transition-colors duration-300 group-hover:text-black">
                View Project
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Project;
