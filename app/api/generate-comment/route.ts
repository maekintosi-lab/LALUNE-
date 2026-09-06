import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

export async function POST(req: NextRequest) {
  const { postId, title, content } = await req.json();

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `당신은 "라린느 고객센터"의 상담 담당자입니다. 아래 문의에 대해 2~3문장으로 친절하고 간결하게 답변하세요. 확실하지 않은 정보는 지어내지 말고 일반적인 안내 위주로 답하세요.\n\n제목: ${title}\n내용: ${content}`,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!geminiRes.ok) {
    console.error("gemini request failed", geminiRes.status, await geminiRes.text());
    return NextResponse.json({ error: "gemini request failed" }, { status: 502 });
  }

  const geminiData = await geminiRes.json();
  const answer: string | undefined =
    geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!answer) {
    return NextResponse.json({ error: "empty gemini response" }, { status: 502 });
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({ post_id: postId, content: answer })
    .select("id, content, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment: data });
}
