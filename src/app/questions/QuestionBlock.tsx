import { useState } from "react";
import { useRouter } from "next/navigation";
import HomeButton from "@/components/HomeButton";
import { Button } from "@/components/ui/button";
import { useCarousel } from "@/components/ui/carousel";
import { useFormStore } from "@/lib/formStore";
import { motion, AnimatePresence } from "framer-motion";

function QuestionBox({
  question,
  options,
}: {
  question: string;
  options: string[];
}) {
  const { answers, setAnswer } = useFormStore();
  const selectedAnswer = answers[question] as string | undefined;

  return (
    <motion.div
      className="flex flex-col rounded-2xl p-6 gap-4 text-white"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold">{question}</h2>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setAnswer(question, option)}
            className={`p-3 rounded-xl border transition cursor-pointer ${
              selectedAnswer === option
                ? "bg-gradient-to-r from-indigo-700 to-blue-600 text-white shadow-lg"
                : "bg-white/10 hover:bg-white/20 border-white/20"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function QuestionBlock({
  question,
  options,
  theme,
}: {
  question: string;
  theme: string;
  options: string[];
}) {
  const { scrollNext, canScrollNext, canScrollPrev, scrollPrev } =
    useCarousel();
  const { answers } = useFormStore();
  const router = useRouter();

  const answered = Boolean(answers[question]);
  const [exiting, setExiting] = useState(false);

  const handleCalculate = () => {
    setExiting(true);
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => router.push("/result")}>
      {!exiting && (
        <motion.div
          className="flex w-full h-full justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col gap-10 items-center justify-center">
            <motion.h1
              className="text-white/30 text-9xl font-light -ml-[40%]"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {theme}
            </motion.h1>

            <QuestionBox question={question} options={options} />

            <motion.div
              className="flex gap-5 w-full -mr-[50%]"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HomeButton />

              {canScrollPrev && (
                <Button
                  onClick={scrollPrev}
                  className="
                    bg-transparent border-2 border-indigo-600/50
                    text-indigo-600/70 text-lg font-semibold
                    rounded-2xl p-8
                    shadow-lg
                    transition duration-200
                    hover:shadow-xl hover:brightness-110
                    active:scale-95 active:brightness-90 cursor-pointer
                  "
                >
                  Anterior
                </Button>
              )}

              {canScrollNext && (
                <Button
                  onClick={() => {
                    if (answered) scrollNext();
                  }}
                  disabled={!answered}
                  className={`
                    text-lg font-semibold rounded-2xl p-8 shadow-lg transition duration-200
                    ${
                      answered
                        ? "bg-gradient-to-r from-indigo-700 to-blue-600 text-white hover:shadow-xl hover:brightness-110 active:scale-95 active:brightness-90 cursor-pointer"
                        : "bg-gray-400/50 text-gray-200 cursor-not-allowed"
                    }
                  `}
                >
                  ✨ Próximo
                </Button>
              )}

              {!canScrollNext && answered && (
                <Button
                  onClick={handleCalculate}
                  disabled={!answered}
                  className={`
                    text-lg font-semibold rounded-2xl p-8 shadow-lg transition duration-200
                    ${
                      answered
                        ? "bg-gradient-to-r from-purple-400/70 to-blue-600 text-white hover:shadow-xl hover:brightness-110 active:scale-95 active:brightness-90 cursor-pointer"
                        : "bg-gray-400/50 text-gray-200 cursor-not-allowed"
                    }
                  `}
                >
                  ✨ Calcular meus resultados!
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
