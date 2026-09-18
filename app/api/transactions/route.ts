import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
    take: 50
  });
  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const transaction = await prisma.transaction.create({
    data: {
      date: new Date(body.date),
      product: body.product,
      cost: body.cost ?? 0,
      profit: body.profit ?? 0,
      expenses: body.expenses ?? 0,
      category: body.category,
      businessId: body.businessId,
      userId: body.userId
    }
  });
  return NextResponse.json(transaction, { status: 201 });
}
