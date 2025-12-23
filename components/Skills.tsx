import { motion } from "framer-motion";
import { Skill as SkillType } from "../typings";
import Skill from "./Skill";

const Skills = ({ skills }: { skills: SkillType[] }) => {
  return (
    <motion.div
      initial={{
        y: -100,
        opacity: 0,
      }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="section"
    >
      <div className="sectionContainer">
        <h2 className="sectionHeading">Skills</h2>

        <div className="sectionBody">
          <div className="grid grid-cols-4 gap-5 p-5 md:grid-cols-5 lg:grid-cols-6">
            {skills?.map((skill) => (
              <Skill key={skill._id} directionLeft={true} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
