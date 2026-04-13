import { Skill as SkillType } from "../typings";
import SkillVisual from "./SkillVisual";

type Props = {
  skill: SkillType;
  directionLeft?: boolean;
};

const Skill = ({ skill }: Props) => {
  return (
    <div className="group relative flex h-28 w-28 sm:h-32 sm:w-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-transparent bg-zinc-100/80 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-200/80 hover:shadow-lg dark:border-zinc-700/30 dark:bg-zinc-700/60 dark:shadow-lg dark:hover:bg-zinc-600/60">
      <div className="relative flex h-10 w-10 items-center justify-center md:h-12 md:w-12">
        <SkillVisual skill={skill} />
      </div>
      <p className="w-full break-words text-center text-[10px] font-semibold uppercase leading-tight tracking-wider text-zinc-700 line-clamp-2 dark:text-zinc-300 md:text-xs">
        {skill?.title}
      </p>
    </div>
  );
};

export default Skill;
