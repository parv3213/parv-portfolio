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
      initial={{
        y: -100,
        opacity: 0,
      }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="section"
    >
      <div className="sectionContainer">
        <h2 className="sectionHeading">Contact</h2>

        <div className="sectionBody">
          <div className="flex flex-col items-center justify-center gap-8 px-6">
            <h3 className="text-2xl font-semibold md:text-4xl">
              Would be glad to help.{" "}
              <span className="underline">Let&#39;s talk</span>
            </h3>

            <div className="flex items-center justify-center space-x-2">
              <SocialIcon
                network="email"
                fgColor="#eab308"
                bgColor="transparent"
              />
              <p>{pageInfo?.email}</p>
            </div>

            <form
              className="flex flex-col space-y-2"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex w-full space-x-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="contractFormInput w-full"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="contractFormInput w-full"
                />
              </div>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Subject"
                className="contractFormInput"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="contractFormInput"
                rows={5}
              />
              <button
                type="submit"
                className="w-full rounded-sm bg-yellow-400 p-3 text-xl font-bold hover:bg-yellow-500 dark:bg-yellow-500 dark:text-zinc-800 dark:hover:bg-yellow-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMe;
