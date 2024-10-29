import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const username = searchParams.get("username");
  const email = searchParams.get("email");

  try {
    const whereClause: Prisma.UserWhereInput = {};
    if (id) {
      whereClause.id = { contains: id };
    }
    if (username) {
      whereClause.username = { contains: username };
    }
    if (email) {
      whereClause.email = { contains: email };
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        dateOfBirth: true,
        mobileNumber: true,
        updatedAt: true,
        createdAt: true,
        isActive: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    username,
    password,
    birthDate,
  } = await req.json();
  if (!firstName || !lastName || !email || !username || !password) {
    return NextResponse.json(
      { error: "Required fields missing!" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
        username: username,
        password: hashedPassword,
        dateOfBirth: birthDate,
        isActive: true,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
