import { NextRequest, NextResponse } from "next/server";
import { askAboutBusiness } from "@/lib/anthropic";

// In production, replace this with a real summary pulled from Prisma for
// the signed-in user's business (recent transactions, monthly totals, etc).
const SAMPLE_CONTEXT = `
August: revenue $4,280, expenses $2,330, profit $1,950.
July: revenue $3,820, expenses $2,220, profit $1,600.
Top expense category this month: inventory restocking ($1,100).
Revenue by person this month: Anta $1,850, Djibril $1,240, DDD $1,190.
`;

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "A question is required." }, { status: 400 });
  }

  try {
    const answer = await askAboutBusiness(question, SAMPLE_CONTEXT);
    return NextResponse.json({ answer });
  } catch (err) {
    return NextResponse.json({ error: "AI request failed." }, { status: 500 });
  }
}
