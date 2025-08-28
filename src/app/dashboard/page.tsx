"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/components/Loading";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

type Classification =
  | "Fit Altíssimo"
  | "Fit Aprovado"
  | "Fit Questionável"
  | "Fora do Perfil";

interface User {
  id: string;
  email: string;
}

interface Candidate {
  id: string;
  candidate_name: string;
  candidate_email: string;
  classification_score: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [classificationFilter, setClassificationFilter] = useState<
    Classification | "Todos"
  >("Todos");
  const itemsPerPage = 10;
  const router = useRouter();

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser((session?.user as User) ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser((session?.user as User) ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  // Fetch candidates
  useEffect(() => {
    if (!user) return;

    const fetchCandidates = async () => {
      const { data, error } = await supabase.from("candidates").select("*");

      if (error) {
        console.error("Erro ao buscar candidatos:", error.message);
      } else {
        setCandidates((data as Candidate[]) ?? []);
      }
    };

    fetchCandidates();
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return null;

  const getClassification = (score: number): Classification => {
    if (score >= 8) return "Fit Altíssimo";
    if (score >= 6) return "Fit Aprovado";
    if (score >= 4) return "Fit Questionável";
    return "Fora do Perfil";
  };

  const getBadgeColor = (classification: Classification) => {
    switch (classification) {
      case "Fit Altíssimo":
        return "bg-green-500 text-green-900 font-black";
      case "Fit Aprovado":
        return "bg-blue-500 text-blue-900 font-black";
      case "Fit Questionável":
        return "bg-yellow-400 text-yellow-800 font-black";
      case "Fora do Perfil":
        return "bg-red-400 text-red-900 font-black";
    }
  };

  // Filter
  const filteredCandidates = candidates.filter((c) => {
    const candidateClassification = getClassification(c.classification_score);
    const matchesClassification =
      classificationFilter === "Todos" ||
      candidateClassification === classificationFilter;
    const matchesSearch =
      c.candidate_name.toLowerCase().includes(search.toLowerCase()) ||
      c.candidate_email.toLowerCase().includes(search.toLowerCase());
    return matchesClassification && matchesSearch;
  });

  const paginatedCandidates = filteredCandidates.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-tr from-cyan-600 via-cyan-500 to-blue-600 p-10 text-indigo-900 font-black">
      <h1 className="text-3xl font-bold text-white p-10">
        Dashboard - Lista de Candidatos
      </h1>
      <div className="flex justify-between w-full max-w-6xl pl-4 font-black text-white/70">
        <p>Logado como: {user.email}</p>
        <div>
          <Button
            variant="link"
            className="font-black text-white/70 cursor-pointer hover:text-white"
            onClick={async () => {
              router.push("/");
            }}
          >
            Home
          </Button>{" "}
          |
          <Button
            variant="link"
            className="font-black text-white/70 cursor-pointer hover:text-white"
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
          >
            Sair
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-6xl shadow-lg border-2 border-white/30">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Input
            placeholder="Pesquisar por nome ou email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="max-w-xs border-white/30
             placeholder:text-cyan-200/80 placeholder:font-black placeholder:
             focus-visible:ring-white/50
            focus-visible:border-transparent"
          />

          <Select
            value={classificationFilter}
            onValueChange={(value) => {
              setClassificationFilter(value as Classification | "Todos");
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px] border-white/30 text-cyan-200">
              <SelectValue placeholder="Classificação" />
            </SelectTrigger>
            <SelectContent className="border border-white/30 bg-indigo-900/20 backdrop-blur-2xl text-white">
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Fit Altíssimo">Fit Altíssimo</SelectItem>
              <SelectItem value="Fit Aprovado">Fit Aprovado</SelectItem>
              <SelectItem value="Fit Questionável">Fit Questionável</SelectItem>
              <SelectItem value="Fora do Perfil">Fora do Perfil</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="overflow-auto">
          <Table className="min-w-full border-white">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Pontuação</TableHead>
                <TableHead>Classificação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {paginatedCandidates.map((candidate) => {
                  const classification = getClassification(
                    candidate.classification_score
                  );
                  return (
                    <motion.tr
                      key={candidate.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TableCell>{candidate.candidate_name}</TableCell>
                      <TableCell>{candidate.candidate_email}</TableCell>
                      <TableCell>
                        <Badge className={getBadgeColor(classification)}>
                          {candidate.classification_score * 10}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getBadgeColor(classification)}>
                          {classification}
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
              {paginatedCandidates.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-indigo-950"
                  >
                    Nenhum candidato encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </Button>
            <span className="text-sm text-indigo-950">
              Página {page} de{" "}
              {Math.ceil(filteredCandidates.length / itemsPerPage)}
            </span>
            <Button
              variant="outline"
              disabled={
                page >= Math.ceil(filteredCandidates.length / itemsPerPage)
              }
              onClick={() => setPage(page + 1)}
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
