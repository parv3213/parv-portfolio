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
    <div className="group relative flex cursor-pointer rounded-full border border-zinc-400 hover:scale-105">
      <motion.div
        initial={{
          x: directionLeft ? -50 : 50,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative h-20 w-20 xl:h-24 xl:w-24"
      >
        <Image
          src={urlFor(skill?.image).url()}
          alt={skill?.title || "Skill"}
          fill
          sizes="10vw"
          className="rounded-full bg-zinc-50 object-contain p-2"
        />
      </motion.div>

      <p className="absolute -top-14 -z-20 flex w-full items-center justify-center text-lg opacity-0 group-hover:opacity-100">
        <span className="rounded-lg bg-zinc-200 p-3 dark:bg-zinc-900">
          {skill?.title}
        </span>
      </p>
    </div>
  );
};

export default Skill;
