import React from "react";
import { motion } from "framer-motion";
const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = {
    opacity: 1,
  },
  transition = {duration: 1.5},
}) => {
  return (
    <motion.div initial={initial} animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
