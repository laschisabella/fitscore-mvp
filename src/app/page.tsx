"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import woman from "@/assets/woman.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useFormStore } from "@/lib/formStore";
import { useRouter } from "next/navigation";

const MotionImage = motion(Image);

function Form({ onSubmit }: { onSubmit: () => void }) {
  const { candidateName, candidateEmail, setCandidateInfo } = useFormStore();

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-2 shadow-xl"
      >
        <Label htmlFor="name" className="sr-only">
          Digite seu nome completo
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Digite seu nome completo"
          value={candidateName}
          onChange={(e) => setCandidateInfo(e.target.value, candidateEmail)}
          className="
            bg-white/30
            rounded-2xl
            p-7
            !text-xl
            text-blue-900
            placeholder:text-xl
            border-white
            placeholder:text-cyan-200
            focus-visible:ring-indigo-700
            focus-visible:border-transparent
            selection:bg-indigo-700 selection:text-indigo-100
            transition
          "
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-2"
      >
        <Label htmlFor="email" className="sr-only">
          Digite seu e-mail
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          value={candidateEmail}
          onChange={(e) => setCandidateInfo(candidateName, e.target.value)}
          className="
            bg-white/30
            rounded-2xl
            p-7
            !text-xl
            text-blue-900
            placeholder:text-xl
            placeholder:text-cyan-200
            focus-visible:ring-indigo-700
            focus-visible:border-transparent
            border-white
            selection:bg-indigo-700 selection:text-indigo-100
            transition
          "
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button
          type="submit"
          className="
            bg-gradient-to-r from-indigo-700 to-blue-600
            text-white text-lg font-semibold
            rounded-2xl p-8
            shadow-lg
            transition duration-200
            hover:shadow-xl hover:brightness-110
            active:scale-95 active:brightness-90 cursor-pointer
          "
        >
          ✨ Vamos começar
        </Button>
      </motion.div>
    </motion.form>
  );
}

export default function Home() {
  const router = useRouter();
  const { setCandidateInfo, candidateName, candidateEmail } = useFormStore();
  const [animatingExit, setAnimatingExit] = useState(false);

  const handleStart = () => {
    setAnimatingExit(true);
    setTimeout(() => {
      setCandidateInfo(candidateName, candidateEmail);
      router.push("/questions");
    }, 500);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-tl from-cyan-600 via-cyan-500 to-blue-600 -z-10" />

      <AnimatePresence mode="wait">
        {!animatingExit && (
          <motion.div
            key="main-screen"
            className="w-screen h-screen relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="fixed top-1/3 left-1/4 transform -translate-x-1/4 -translate-y-1/4 space-y-6 max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-white space-y-4 max-w-lg mx-auto"
              >
                <motion.h1
                  className="text-5xl font-black text-indigo-900 text-shadow-md text-shadow-blue-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  Seu próximo desafio começa aqui!
                </motion.h1>

                <motion.p
                  className="text-2xl font-[var(--font-raleway)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Responda nosso questionário rápido e descubra{" "}
                  <span className="text-indigo-200 font-semibold">
                    se você se encaixa no perfil que buscamos
                  </span>
                  .
                </motion.p>

                <motion.p
                  className="text-xl font-[var(--font-raleway)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Cada resposta te aproxima da próxima fase, onde seu{" "}
                  <span className="text-purple-200 font-semibold">
                    potencial será reconhecido
                  </span>{" "}
                  e você terá a chance de avançar para uma de nossas vagas.
                </motion.p>
              </motion.div>

              <Form onSubmit={handleStart} />
            </div>

            <MotionImage
              src={woman}
              alt="woman with laptop"
              width={1500}
              height={1200}
              priority
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 0.85, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              className="fixed object-cover object-center w-1/2 right-10 -bottom-30"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
