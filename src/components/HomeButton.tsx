import { Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeButton() {
  return (
    <motion.div
      className=""
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link
        href="/"
        className="flex items-center justify-center gap-2 bg-white/10
            border-2 border-white/20
            text-white text-lg font-semibold
            rounded-2xl py-4 px-5
            shadow-lg
            transition duration-200
            hover:shadow-xl hover:brightness-110
            active:scale-95 active:brightness-90 cursor-pointer"
      >
        <Home size={20} />
        Home
      </Link>
    </motion.div>
  );
}
