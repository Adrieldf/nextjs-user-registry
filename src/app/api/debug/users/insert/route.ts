import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log("started");
    const saltRounds = 10;
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
    
    console.log("before for");
    for (const user of usersData) {
    const u =  await prisma.user.create({ data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        username: user.username,
        password: user.password,
        dateOfBirth: user.dateOfBirth
      }});
      console.log("user added", u);
    }

    console.log("after for");
    return NextResponse.json({ message: "Users inserted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inserting user", details: error },
      { status: 500 }
    );
  }
}
