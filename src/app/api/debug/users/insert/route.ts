import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash("12345", 10);
    const usersData = [
      {
        firstName: "Patrick",
        lastName: "Kerr",
        email: "patrick.kerr@example.com",
        mobileNumber: "1234567890",
        username: "PatrickKerr",
        password: hashedPassword,
        dateOfBirth: new Date("1992-02-04"),
        isActive: true,
      },
      {
        firstName: "Jonathan",
        lastName: "Frazier",
        email: "jonathan.frazier@example.com",
        mobileNumber: "1234567890",
        username: "JonathanFrazier",
        password: hashedPassword,
        dateOfBirth: new Date("1996-06-01"),
        isActive: false,
      },
      {
        firstName: "Liliana",
        lastName: "Yang",
        email: "liliana.yang@example.com",
        mobileNumber: "1234567890",
        username: "LilianaYang",
        password: hashedPassword,
        dateOfBirth: new Date("1993-07-12"),
        isActive: true,
      },
      {
        firstName: "Kermit",
        lastName: "Singleton",
        email: "kermit.singleton@example.com",
        mobileNumber: "1234567890",
        username: "KermitSingleton",
        password: hashedPassword,
        dateOfBirth: new Date("1999-06-10"),
        isActive: true,
      },
      {
        firstName: "Kathrine",
        lastName: "Gutierrez",
        email: "kathrine.gutierrez@example.com",
        mobileNumber: "1234567890",
        username: "KathrineGutierrez",
        password: hashedPassword,
        dateOfBirth: new Date("1990-06-03"),
        isActive: false,
      },
      {
        firstName: "Chang",
        lastName: "Decker",
        email: "chang.decker@example.com",
        mobileNumber: "1234567890",
        username: "ChangDecker",
        password: hashedPassword,
        dateOfBirth: new Date("1993-03-03"),
        isActive: true,
      },
      {
        firstName: "Harlan",
        lastName: "Eaton",
        email: "harlan.eaton@example.com",
        mobileNumber: "1234567890",
        username: "HarlanEaton",
        password: hashedPassword,
        dateOfBirth: new Date("1997-07-07"),
        isActive: true,
      },
      {
        firstName: "Tanner",
        lastName: "Ali",
        email: "tanner.ali@example.com",
        mobileNumber: "1234567890",
        username: "TannerAli",
        password: hashedPassword,
        dateOfBirth: new Date("1990-01-03"),
        isActive: true,
      },
      {
        firstName: "Mervin",
        lastName: "Jones",
        email: "mervin.jones@example.com",
        mobileNumber: "1234567890",
        username: "MervinJones",
        password: hashedPassword,
        dateOfBirth: new Date("1989-09-06"),
        isActive: true,
      },
      {
        firstName: "Katheryn",
        lastName: "Osborne",
        email: "katheryn.osborne@example.com",
        mobileNumber: "1234567890",
        username: "KatherynOsborne",
        password: hashedPassword,
        dateOfBirth: new Date("1988-08-04"),
        isActive: false,
      },
      {
        firstName: "Derick",
        lastName: "Montoya",
        email: "derick.montoya@example.com",
        mobileNumber: "1234567890",
        username: "DerickMontoya",
        password: hashedPassword,
        dateOfBirth: new Date("1974-12-06"),
        isActive: true,
      },
    ];

    for (const user of usersData) {
      await prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobileNumber: user.mobileNumber,
          username: user.username,
          password: user.password,
          dateOfBirth: user.dateOfBirth,
          isActive: user.isActive
        },
      });
    }

    return NextResponse.json({ message: "Users inserted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inserting user", details: error },
      { status: 500 }
    );
  }
}
