import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity";
import { Project as ProjectType } from "../typings";

const Project = ({ project }: { project: ProjectType }) => {
  return (
    <div className="flex h-full w-full flex-shrink-0 snap-center flex-col items-center justify-center space-y-5 p-10 text-center">
      <Image
        className="z-20 mb-5 h-[50%] rounded-lg"
        src={urlFor(project?.image).url()}
        alt={project?.title || "Project Image"}
        height={1200}
        width={800}
        placeholder="empty"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <Link
        href={project?.linkToBuild}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="text-2xl underline md:text-4xl">{project?.title}</h3>
      </Link>

      <motion.p
        initial={{
          y: 50,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="scrollbarThin overflow-y-auto text-center md:w-[80%] md:text-left"
      >
        {project?.summary}
      </motion.p>
    </div>
  );
};

export default Project;
