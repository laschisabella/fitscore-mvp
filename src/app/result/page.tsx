"use client";

import Loading from "@/components/Loading";
import { answerKey } from "@/lib/answerKey";
import { useFormStore } from "@/lib/formStore";
import { useEffect, useState } from "react";
import congratulationsAnimation from "@/assets/congratulation.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import HomeButton from "@/components/HomeButton";

export default function Result() {
  const {
    candidateName,
    candidateEmail,
    answers,
    setClassificationScore,
    classificationScore,
  } = useFormStore();

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let score = 0;

    Object.entries(answerKey).forEach(([questionId, correctAnswer]) => {
      const userAnswer = answers[questionId];
      if (userAnswer === correctAnswer) score++;
    });

    setClassificationScore(score);

    if (
      !candidateName ||
      !candidateEmail ||
      Object.keys(answers).length === 0
    ) {
      setErrorMessage(
        "Os dados estão incompletos. Por favor, refaça o formulário."
      );
      return;
    }

    const saveData = async () => {
      setIsSaving(true);
      setErrorMessage(null);

      try {
        const res = await fetch("/api/saveCandidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            candidateName,
            candidateEmail,
            answers,
            classificationScore: score,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMessage(data.error || "Erro ao salvar os dados.");
        } else {
          setSuccessMessage("Seus dados foram salvos com sucesso 🚀");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Erro inesperado ao salvar os dados.");
      } finally {
        setIsSaving(false);
      }
    };

    saveData();
  }, [answers, candidateName, candidateEmail, setClassificationScore]);

  const score = classificationScore ?? 0;

  const classifications = [
    {
      min: 8,
      label: "Fit Altíssimo",
      colorbg: "bg-green-500/70",
      color: "text-green-700",
      title: "Deu fit máximo!",
      subtitle: (name: string) =>
        `Estamos muito empolgados pra te conhecer, ${name}!`,
      description: (email: string) =>
        `Enviaremos os próximos passos pro seu e-mail (${email}).`,
    },
    {
      min: 6,
      label: "Fit Aprovado",
      colorbg: "bg-blue-500/70",
      color: "text-blue-700",
      title: "Bom resultado!",
      subtitle: (name: string) => `Você tem bastante alinhamento, ${name}.`,
      description: (email: string) =>
        `Logo mais você receberá novidades no e-mail (${email}).`,
    },
    {
      min: 4,
      label: "Fit Questionável",
      colorbg: "bg-yellow-500/70",
      color: "text-yellow-700",
      title: "Ainda temos dúvidas...",
      subtitle: (name: string) =>
        `${name}, sua avaliação ficou na linha tênue.`,
      description: () =>
        "Podemos pedir informações adicionais para entender melhor. Aguarde nosso contato.",
    },
    {
      min: 0,
      label: "Fora do Perfil ❌",
      colorbg: "bg-red-500/70",
      color: "text-red-700",
      title: "Infelizmente não rolou dessa vez",
      subtitle: () => "Mas não desanime!",
      description: () =>
        "Continue se desenvolvendo e tente novamente em outra oportunidade.",
    },
  ];

  const classification =
    classifications.find((c) => score >= c.min) ??
    classifications[classifications.length - 1];

  if (isSaving) return <Loading />;

  if (errorMessage)
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tl from-cyan-600 via-cyan-500 to-blue-600 p-[5%] overflow-hidden relative">
        <div className="w-full text-center p-20 max-w-max z-10">
          <p className="text-red-400 text-3xl font-bold">{errorMessage}</p>
          <p className="mt-5 text-white/70">
            Por favor, verifique e tente novamente.
          </p>
          <div className="max-w-max mx-auto mt-5">
            <HomeButton />
          </div>
        </div>
      </div>
    );

  if (!successMessage) return null;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tl from-cyan-600 via-cyan-500 to-blue-600 p-[5%] overflow-hidden relative">
      {score >= 6 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-[50%] absolute top-0 left-1/2 -translate-x-1/2"
        >
          <Lottie animationData={congratulationsAnimation} loop={false} />
        </motion.div>
      )}

      <div className="w-full text-center p-20 max-w-max z-10">
        <div className="flex gap-5 justify-center items-center">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`text-2xl rounded-2xl py-5 px-10 font-black ${classification.color} ${classification.colorbg}`}
          >
            {classification.label}
          </motion.div>

          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={`text-xl font-semibold ${classification.color}`}
          >
            Sua pontuação: {score}/10
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="p-10 text-white/70"
        >
          <h1 className="text-6xl mb-5">{classification.title}</h1>
          <h2 className="text-3xl max-w-lg mx-auto">
            {classification.subtitle(candidateName)}{" "}
            {classification.description(candidateEmail)}
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
