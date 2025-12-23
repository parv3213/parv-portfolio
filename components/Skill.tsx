import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "../sanity";
import { Skill as SkillType } from "../typings";

type Props = {
  skill: SkillType;
  directionLeft?: boolean;
};

const Skill = ({ skill, directionLeft }: Props) => {
  return (
    <div className="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-transparent bg-zinc-100/80 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-200/80 hover:shadow-lg dark:border-zinc-700/30 dark:bg-zinc-700/60 dark:shadow-lg dark:hover:bg-zinc-600/60">
      <motion.div
        initial={{
          x: directionLeft ? -50 : 50,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative h-12 w-12 md:h-16 md:w-16"
      >
        <Image
          src={urlFor(skill?.image).url()}
          alt={skill?.title || "Skill"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </motion.div>
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 md:text-sm">
        {skill?.title}
      </p>
    </div>
  );
};

export default Skill;
