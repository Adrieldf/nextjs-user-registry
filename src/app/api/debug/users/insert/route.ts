import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const saltRounds = 69;
    const hashedPassword = await bcrypt.hash("12345", saltRounds);
    const usersData = [
      {
        firstName: "John",
        lastName: "Test",
        email: "john.doe@example.com",
        mobileNumber: "1234567890",
        username: "johndoe",
        password: hashedPassword,
        dateOfBirth: new Date("1990-01-01"),
      },
      {
        firstName: "John",
        lastName: "Test",
        email: "john.does@example.com",
        mobileNumber: "1234567890",
        username: "johndoes",
        password: hashedPassword,
        dateOfBirth: new Date("1990-01-02"),
      },
      {
        firstName: "John",
        lastName: "Test",
        email: "john.tres@example.com",
        mobileNumber: "1234567890",
        username: "johntres",
        password: hashedPassword,
        dateOfBirth: new Date("1990-01-03"),
      },
    ];
    for (const user of usersData) {
      await prisma.user.create({ data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        username: user.username,
        password: user.password,
        dateOfBirth: user.dateOfBirth
      } });
    }

    return NextResponse.json({ message: "Users inserted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inserting user", details: error },
      { status: 500 }
    );
  }
}
