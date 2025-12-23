import { motion } from "framer-motion";
import { useRef } from "react";
import { Project as ProjectType } from "../typings";
import Project from "./Project";

const Projects = ({ projects }: { projects: ProjectType[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="section relative"
    >
      <div className="sectionContainer relative">
        <h2 className="sectionHeading z-30">Projects</h2>

        <div className="sectionBody relative z-20">
          {/* Previous button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-[#F7AB0A] p-3 text-white shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#F7AB0A] focus:ring-offset-2 hover:scale-110 hover:bg-[#F7AB0A]/90 md:left-4"
            aria-label="Previous project"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-[#F7AB0A] p-3 text-white shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#F7AB0A] focus:ring-offset-2 hover:scale-110 hover:bg-[#F7AB0A]/90 md:right-4"
            aria-label="Next project"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="scrollbarThin flex max-h-full w-full snap-x snap-mandatory overflow-x-scroll overflow-y-hidden"
          >
            {projects?.map((project) => (
              <Project key={project?._id} project={project} />
            ))}
          </div>
        </div>

        <div className="absolute top-[30%] left-0 h-[500px] w-full -skew-y-12 bg-[#F7AB0A]/10" />
      </div>
    </motion.div>
  );
};

export default Projects;
