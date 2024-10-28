import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const whereClause: Prisma.UserWhereInput = {};
    whereClause.lastName = "Test";
    const user = await prisma.user.deleteMany({
      where: whereClause,
    });
    return NextResponse.json(
      { message: "User removed", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error removing user", details: error },
      { status: 500 }
    );
  }
}
