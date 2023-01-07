import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SocialIcon } from 'react-social-icons'

const ContactMe = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO hardcoding
    window.location.href = `mailto:parv3213@gmail.com?subject=${subject}&body=Hi, my name is ${name}. ${message} (${email})`
  }

  return (
    <div className="h-screen">
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="relative mx-auto flex h-screen min-h-screen max-w-[2000px] flex-col items-center justify-center text-center md:text-left xl:flex-row
xl:space-y-0 xl:px-10">
        <h3 className="absolute top-24 text-lg uppercase tracking-[15px] text-zinc-500 sm:text-2xl sm:tracking-[20px]">
          Contact
        </h3>

        <div className="flex flex-col space-y-5 px-10">
          <h3 className="text-2xl font-semibold md:text-4xl">
            Would be glad to help. <span className="underline decoration-yellow-700">Let's talk</span>
          </h3>

          <div className="flex items-center justify-center space-x-2">
            <SocialIcon network="email" fgColor="#eab308" bgColor="transparent" />
            <p>parv3213@gmail.com</p>
          </div>

          <form className="flex flex-col space-y-2" onSubmit={(e) => handleSubmit(e)}>
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
              className="w-full rounded-sm bg-yellow-500 p-3 text-xl font-bold text-zinc-800 hover:bg-yellow-600">
              Submit
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactMe
