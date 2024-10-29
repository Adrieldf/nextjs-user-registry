import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: { isActive: true },
    });

    return NextResponse.json({ totalUsers, activeUsers }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve user counts" },
      { status: 500 }
    );
  }
}
