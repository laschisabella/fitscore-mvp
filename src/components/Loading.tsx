import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tl from-cyan-600 via-cyan-500 to-blue-600 p-[5%] overflow-hidden">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full"
        >
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-[50%] mx-auto"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
