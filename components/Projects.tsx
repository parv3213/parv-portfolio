import { motion } from "framer-motion";
import { Project as ProjectType } from "../typings";
import Project from "./Project";

const Projects = ({ projects }: { projects: ProjectType[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="section relative"
    >
      <div className="sectionContainer relative isolate mx-auto max-w-[2000px] px-4 md:px-10 justify-center">
        <h2 className="sectionHeading relative z-10">Projects</h2>

        <div className="relative z-10 mt-8 flex w-full flex-col items-center px-2 pb-12 md:mt-10 md:pb-20">
          <div className="grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects?.map((project) => (
              <Project key={project?._id} project={project} />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute top-[30%] left-0 z-0 h-[500px] w-full -skew-y-12 bg-gradient-to-b from-brand/20 to-transparent" />
      </div>
    </motion.div>
  );
};

export default Projects;
