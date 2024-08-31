import React from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}
const Mation = ({ children }: Props) => {
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
      {children}
    </motion.div>
  );
};

export default Mation;
