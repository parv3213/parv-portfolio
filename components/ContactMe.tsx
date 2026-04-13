import { motion } from "framer-motion";
import { useState } from "react";
import { SocialIcon } from "react-social-icons";
import { PageInfo } from "../typings";

const ContactMe = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${pageInfo?.email}?subject=${subject}&body=Hi, my name is ${name}. ${message} (${email})`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="section relative md:!h-auto md:!min-h-0"
    >
      <div className="sectionContainer relative isolate mx-auto max-w-[2000px] justify-center px-4 md:!h-auto md:!min-h-0 md:!overflow-visible md:px-10">
        <h2 className="sectionHeading relative z-10">Contact</h2>

        <div className="relative z-10 mt-8 flex w-full flex-col items-center px-2 pb-12 md:mt-10 md:pb-20">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-3xl bg-zinc-100/90 p-6 shadow-lg backdrop-blur-sm dark:border dark:border-zinc-800 dark:bg-zinc-900/50 md:gap-8 md:p-12">
            <div className="space-y-3 text-center md:space-y-4">
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
                Let&#39;s build something together!
              </h3>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base md:text-[17px]">
                I&apos;m currently seeking new opportunities and would be absolutely delighted to help you achieve your goals. Whether you&apos;re looking for a full-time team member, need part-time or contract expertise, or want a hand growing your startup—I&apos;m ready to dive in. Let&apos;s chat!
              </p>
            </div>

            <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm dark:bg-zinc-800 sm:space-x-3 sm:px-6 sm:py-3">
              <SocialIcon
                network="email"
                fgColor="currentColor"
                bgColor="transparent"
                style={{ height: 28, width: 28 }}
                className="text-[#F7AB0A] dark:text-[#F7AB0A]"
              />
              <p className="min-w-0 break-words text-center text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:text-base md:text-lg">
                {pageInfo?.email}
              </p>
            </div>

            <form
              className="flex w-full flex-col space-y-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm placeholder:text-zinc-400 focus:border-[#F7AB0A] focus:outline-none focus:ring-1 focus:ring-[#F7AB0A] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 md:px-5 md:py-4"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm placeholder:text-zinc-400 focus:border-[#F7AB0A] focus:outline-none focus:ring-1 focus:ring-[#F7AB0A] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 md:px-5 md:py-4"
                />
              </div>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm placeholder:text-zinc-400 focus:border-[#F7AB0A] focus:outline-none focus:ring-1 focus:ring-[#F7AB0A] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 md:px-5 md:py-4"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm placeholder:text-zinc-400 focus:border-[#F7AB0A] focus:outline-none focus:ring-1 focus:ring-[#F7AB0A] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 md:px-5 md:py-4"
                rows={3}
              />
              <button
                type="submit"
                className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F7AB0A] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#F7AB0A] focus:ring-offset-2 hover:bg-[#F7AB0A]/90 hover:shadow-lg sm:mt-2 sm:px-8 sm:py-4 sm:text-base dark:focus:ring-offset-zinc-900"
              >
                <span>Send Message</span>
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMe;
