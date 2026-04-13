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
      className="section h-screen relative"
    >
      <div className="sectionContainer relative isolate mx-auto max-w-[2000px] justify-center px-4 md:px-10">
        <h2 className="sectionHeading relative z-10">Contact</h2>

        <div className="scrollbarThin relative z-10 mt-10 flex w-full max-h-[65vh] flex-col items-center overflow-y-auto px-2 pb-20">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-3xl bg-zinc-100/90 p-8 shadow-lg backdrop-blur-sm dark:border dark:border-zinc-800 dark:bg-zinc-900/50 md:p-12">
            <div className="space-y-4 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
                Let&#39;s build something together!
              </h3>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-[17px]">
                I'm currently seeking new opportunities and would be absolutely delighted to help you achieve your goals. Whether you're looking for a full-time team member, need part-time or contract expertise, or want a hand growing your startup—I'm ready to dive in. Let's chat!
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 rounded-full bg-white px-6 py-3 shadow-sm dark:bg-zinc-800">
              <SocialIcon
                network="email"
                fgColor="currentColor"
                bgColor="transparent"
                style={{ height: 32, width: 32 }}
                className="text-[#F7AB0A] dark:text-[#F7AB0A]"
              />
              <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
                {pageInfo?.email}
              </p>
            </div>

            <form
              className="flex w-full flex-col space-y-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex w-full flex-col gap-4 sm:flex-row">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-800 shadow-sm placeholder:text-zinc-400 focus:border-[#F7AB0A] focus:outline-none focus:ring-1 focus:ring-[#F7AB0A] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-800 shadow-sm placeholder:text-zinc-400 focus:border-[#F7AB0A] focus:outline-none focus:ring-1 focus:ring-[#F7AB0A] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                />
              </div>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-800 shadow-sm placeholder:text-zinc-400 focus:border-[#F7AB0A] focus:outline-none focus:ring-1 focus:ring-[#F7AB0A] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-800 shadow-sm placeholder:text-zinc-400 focus:border-[#F7AB0A] focus:outline-none focus:ring-1 focus:ring-[#F7AB0A] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                rows={4}
              />
              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F7AB0A] px-8 py-4 text-base font-semibold text-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#F7AB0A] focus:ring-offset-2 hover:bg-[#F7AB0A]/90 hover:shadow-lg dark:focus:ring-offset-zinc-900"
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
