import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Skill as SkillType } from "../typings";
import Skill from "./Skill";

const Skills = ({ skills }: { skills: SkillType[] }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Extract unique categories from skills and add "All" at the beginning
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      skills
        ?.map((skill) => skill.category)
        .filter((category): category is string => Boolean(category))
    );
    // If no categories are defined in Sanity yet, we don't want an empty tab list
    // It will just be "All" which is fine as a fallback
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [skills]);

  useEffect(() => {
    if (activeCategory !== "All" && !categories.includes(activeCategory)) {
      setActiveCategory("All");
    }
  }, [categories, activeCategory]);

  // Filter skills based on active category
  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skills;
    return skills?.filter((skill) => skill.category === activeCategory) || [];
  }, [skills, activeCategory]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="section min-h-screen relative"
    >
      <div className="sectionContainer max-w-[2000px] xl:px-10 justify-center">
        <h2 className="sectionHeading mt-16 md:mt-24">Skills</h2>

        <div className="flex flex-col items-center justify-center w-full mt-10 space-y-8">
          {/* Category Tabs */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-4 z-20">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 
                    ${
                      activeCategory === category
                        ? "bg-zinc-800 text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
                        : "bg-zinc-200/50 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-700"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Skills Grid with AnimatePresence */}
          <div className="w-full min-h-[400px]">
            <motion.div 
              layout
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-5 p-5 place-items-center"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills?.map((skill) => (
                  <motion.div
                    key={skill._id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Skill directionLeft={true} skill={skill} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
