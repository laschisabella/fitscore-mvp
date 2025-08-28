"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import HomeButton from "@/components/HomeButton";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    setLoading(false);

    if (error) {
      toast.error(`Erro: ${error.message}`);
    } else {
      toast.success("Verifique seu email para entrar!");
    }
  };

  const slideUp = {
    hidden: { opacity: 1, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom },
    }),
  };

  return (
    <>
      <Toaster position="bottom-center" closeButton />
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-gradient-to-tr from-cyan-600 via-cyan-500 to-blue-600">
        <Card className="w-full max-w-md border-2 border-white/50 p-10">
          <CardHeader>
            <CardTitle>
              <motion.p
                className="text-2xl font-[var(--font-raleway)] text-white/80"
                initial="hidden"
                animate="visible"
                custom={0.1}
                variants={slideUp}
              >
                Faça login com um e-mail válido para{" "}
                <span className="text-white/60 font-semibold">
                  acessar a lista de candidados!
                </span>
              </motion.p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={slideUp}
            >
              <Label htmlFor="email" className="sr-only">
                Digite seu e-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              initial="hidden"
              animate="visible"
              custom={0.3}
              variants={slideUp}
            >
              <Button
                onClick={handleLogin}
                className="
                  bg-gradient-to-r from-indigo-700 to-blue-600
                  text-white text-lg font-semibold
                  rounded-2xl p-8
                  shadow-lg
                  transition duration-200
                  hover:shadow-xl hover:brightness-110
                  active:scale-95 active:brightness-90 cursor-pointer
                "
                disabled={loading}
              >
                {loading ? "Enviando..." : "Entrar"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.4}
          variants={slideUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HomeButton />
        </motion.div>
      </div>
    </>
  );
}
