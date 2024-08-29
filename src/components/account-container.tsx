import React from "react";

import { motion } from "framer-motion";

interface Props {
  children?: React.ReactNode;
}
const AccountContainer = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="flex flex-1 w-full h-screen">
        {/* form */}
        <div className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg dark:bg-neutral-900 bg-neutral-100 border-default">
          <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px]">
            {children}
          </div>
        </div>

        {/* text */}
        <div className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex bg-white dark:bg-black space-y-3">
          <blockquote className="z-10 max-w-lg text-3xl">
            Easy and secure access to your content.
          </blockquote>
          <blockquote className="z-10 max-w-lg text-2xl dark:text-neutral-500">
            Store, share, and collaborate on files and folders from your mobile
            device, tablet, or computer
          </blockquote>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountContainer;
