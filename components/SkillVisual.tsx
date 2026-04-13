import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { urlFor } from "../sanity";
import { Skill as SkillType } from "../typings";
import { getSimpleIconSlug, simpleIconCdnUrl } from "../utils/skillSimpleIconSlug";

export function initialsFromTitle(title: string): string {
  const t = title.trim();
  if (!t) return "?";
  const parts = t.split(/[\s/]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  }
  return t.slice(0, 3).toUpperCase();
}

function categoryAccentClass(category?: string): string {
  switch (category) {
    case "Frontend":
      return "bg-gradient-to-br from-sky-500/15 to-blue-600/10 ring-sky-500/25 dark:from-sky-400/10 dark:to-blue-500/10 dark:ring-sky-400/30";
    case "Backend":
      return "bg-gradient-to-br from-emerald-500/15 to-teal-600/10 ring-emerald-500/25 dark:from-emerald-400/10 dark:to-teal-500/10 dark:ring-emerald-400/30";
    case "Web3":
      return "bg-gradient-to-br from-violet-500/15 to-fuchsia-600/10 ring-violet-500/25 dark:from-violet-400/10 dark:to-fuchsia-500/10 dark:ring-violet-400/30";
    case "Database":
      return "bg-gradient-to-br from-amber-500/15 to-orange-600/10 ring-amber-500/25 dark:from-amber-400/10 dark:to-orange-500/10 dark:ring-amber-400/30";
    case "Tools":
      return "bg-gradient-to-br from-zinc-400/20 to-zinc-500/10 ring-zinc-400/30 dark:from-zinc-500/20 dark:to-zinc-600/10 dark:ring-zinc-500/35";
    default:
      return "bg-gradient-to-br from-zinc-300/30 to-zinc-400/15 ring-zinc-400/25 dark:from-zinc-600/30 dark:to-zinc-700/15 dark:ring-zinc-500/30";
  }
}

export function SkillInitials({ title, category }: { title: string; category?: string }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-2xl ring-2 ring-inset ${categoryAccentClass(
        category,
      )}`}
      aria-hidden
    >
      <span className="select-none text-sm font-bold tracking-tight text-zinc-800 dark:text-zinc-100 md:text-base">
        {initialsFromTitle(title)}
      </span>
    </div>
  );
}

type Props = {
  skill: SkillType;
  /** Tailwind classes for the inner fill container (default matches `Skill` grid cell) */
  imageClassName?: string;
};

/**
 * Icon/initials rendering shared by `Skill` and `ProjectModal` — Simple Icons CDN,
 * then Sanity image, then category-styled initials (ignores 1×1 placeholders).
 */
const SkillVisual = ({ skill, imageClassName = "object-contain p-1.5 dark:brightness-110" }: Props) => {
  const slug = useMemo(() => getSimpleIconSlug(skill.title), [skill.title]);
  const hasSanityAsset = Boolean(skill?.image?.asset);
  let sanityUrl = hasSanityAsset ? urlFor(skill.image).url() : null;

  if (sanityUrl && sanityUrl.includes("-1x1.")) {
    sanityUrl = null;
  }

  const [mode, setMode] = useState<"cdn" | "sanity" | "initials">(() => {
    if (slug) return "cdn";
    if (sanityUrl) return "sanity";
    return "initials";
  });

  useEffect(() => {
    if (slug) setMode("cdn");
    else if (sanityUrl) setMode("sanity");
    else setMode("initials");
  }, [skill._id, slug, sanityUrl]);

  if (mode === "initials") {
    return <SkillInitials title={skill.title} category={skill.category} />;
  }

  if (mode === "cdn" && slug) {
    return (
      <Image
        src={simpleIconCdnUrl(slug)}
        alt={skill?.title || "Skill"}
        fill
        unoptimized
        sizes="64px"
        className={imageClassName}
        onError={() => setMode(sanityUrl ? "sanity" : "initials")}
      />
    );
  }

  if (mode === "sanity" && sanityUrl) {
    return (
      <Image
        src={sanityUrl}
        alt={skill?.title || "Skill"}
        fill
        sizes="64px"
        className="object-contain p-1"
        onLoadingComplete={(img) => {
          if (img.naturalWidth > 0 && img.naturalWidth < 12 && img.naturalHeight > 0 && img.naturalHeight < 12) {
            setMode("initials");
          }
        }}
        onError={() => setMode("initials")}
      />
    );
  }

  return <SkillInitials title={skill.title} category={skill.category} />;
};

export default SkillVisual;
