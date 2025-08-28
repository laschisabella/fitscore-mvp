import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { candidateName, candidateEmail, answers, classificationScore } =
      body;

    if (
      !candidateName ||
      !candidateEmail ||
      !answers ||
      Object.keys(answers).length === 0
    ) {
      return NextResponse.json(
        {
          error: "Os dados estão incompletos. Por favor, refaça o formulário.",
        },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("candidates").insert([
      {
        candidate_name: candidateName,
        candidate_email: candidateEmail,
        answers,
        classification_score: classificationScore,
      },
    ]);

    if (error) {
      if (
        error.code === "23505" &&
        error.details?.includes("candidate_email")
      ) {
        return NextResponse.json(
          { error: "Já existe um candidato com esse e-mail." },
          { status: 400 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Erro inesperado:", err);
    return NextResponse.json(
      { error: "Erro inesperado no servidor." },
      { status: 500 }
    );
  }
}
