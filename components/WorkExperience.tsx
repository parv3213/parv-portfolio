import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./ExperienceModal";

const WorkExperience = ({ experiences }: { experiences: Experience[] }) => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.clientWidth ?? 400;
    el.scrollBy({ left: direction === "right" ? cardWidth + 20 : -(cardWidth + 20), behavior: "smooth" });
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="section"
      >
        <div className="sectionContainer">
          <h2 className="sectionHeading">Experience</h2>

          <div className="sectionBody relative w-full">
            {/* Left fade + arrow */}
            <div
              className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-zinc-50 to-transparent transition-opacity duration-300 dark:from-zinc-800 ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
            />
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-md transition-all hover:scale-105 hover:shadow-lg dark:bg-zinc-700/90"
                aria-label="Scroll left"
              >
                <svg className="h-5 w-5 text-zinc-700 dark:text-zinc-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Scrollable cards */}
            <div
              ref={scrollRef}
              className="flex w-full snap-x snap-mandatory space-x-5 overflow-x-auto p-10"
            >
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience._id}
                  experience={experience}
                  onViewDetails={setSelectedExperience}
                />
              ))}
            </div>

            {/* Right fade + arrow */}
            <div
              className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-zinc-50 to-transparent transition-opacity duration-300 dark:from-zinc-800 ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
            />
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-md transition-all hover:scale-105 hover:shadow-lg dark:bg-zinc-700/90"
                aria-label="Scroll right"
              >
                <svg className="h-5 w-5 text-zinc-700 dark:text-zinc-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </>
  );
};

export default WorkExperience;
