"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import QuestionBlock from "./QuestionBlock";

export default function QuestionLayout() {
  const questions = [
    {
      theme: "CULTURA",
      question: "Como você entende a missão principal da nossa empresa?",
      options: ["Gerar impacto social", "Maximizar lucro", "Inovar no setor"],
    },
    {
      theme: "CULTURA",
      question: "Qual valor mais representa sua forma de trabalhar?",
      options: ["Transparência", "Colaboração", "Foco em resultados"],
    },
    {
      theme: "CULTURA",
      question: "Como você agiria diante de um dilema ético no trabalho?",
      options: [
        "Seguiria o código de conduta",
        "Consultaria liderança",
        "Decidiria sozinho",
      ],
    },
    {
      theme: "CULTURA",
      question: "O que você espera da cultura organizacional?",
      options: ["Ambiente inclusivo", "Alta competitividade", "Autonomia"],
    },
    {
      theme: "PERFORMANCE",
      question: "Como você prioriza tarefas em um prazo apertado?",
      options: [
        "Priorizo impacto",
        "Priorizo urgência",
        "Executo na ordem recebida",
      ],
    },
    {
      theme: "PERFORMANCE",
      question: "Qual métrica melhor mede sua performance?",
      options: [
        "Velocidade de entrega",
        "Qualidade do resultado",
        "Satisfação do cliente",
      ],
    },
    {
      theme: "PERFORMANCE",
      question: "Como lida com feedback sobre entregas?",
      options: [
        "Reflito e ajusto",
        "Defendo minha abordagem",
        "Aceito e sigo em frente",
      ],
    },
    {
      theme: "ENERGIA",
      question: "Qual seu ritmo de trabalho ideal?",
      options: [
        "Intenso e focado",
        "Equilibrado e constante",
        "Flexível conforme demanda",
      ],
    },
    {
      theme: "ENERGIA",
      question: "Como você mantém energia durante períodos longos de trabalho?",
      options: ["Pausas estratégicas", "Atividades físicas", "Cafeína"],
    },
    {
      theme: "ENERGIA",
      question: "Quando surgem demandas urgentes, como reage?",
      options: [
        "Assumo imediatamente",
        "Avalio prioridades",
        "Delego quando possível",
      ],
    },
  ];

  return (
    <div className="w-screen h-screen flex bg-gradient-to-tl from-cyan-600 via-cyan-500 to-blue-600 p-[5%]">
      <Carousel className="p-10 w-full" opts={{ watchDrag: false }}>
        <CarouselContent>
          {questions.map((q, index) => (
            <CarouselItem key={index}>
              <QuestionBlock
                question={q.question}
                options={q.options}
                theme={q.theme}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
