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
  console.log("start post");
  if (!firstName || !lastName || !email || !username || !password) {
    return NextResponse.json(
      { error: "Required fields missing!" },
      { status: 400 }
    );
  }

  try {
    
  console.log("start try");
    const existingUser = await prisma.user.findFirst({ where: { email } });
    
  console.log("after findFirst");
    if (existingUser) {
      
  console.log("found existing user");
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    console.log("pre password hash");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("pass word hash post");
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
        username: username,
        password: hashedPassword,
        dateOfBirth: birthDate,
      },
    });

    console.log("saved");
    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (e){
    console.log(e);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
