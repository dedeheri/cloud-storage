import { db } from "@/lib/db.prisma";

import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // define a schema for input validation
    const { name, email, password } = body;

    const userIsAlReadyExists = await db.user.findUnique({ where: { email } });

    // check if email already exists
    if (userIsAlReadyExists) {
      return NextResponse.json(
        { user: null, message: "User with this email already exist" },
        { status: 409 }
      );
    }

    // hashed password
    const hashedPassword = await hash(password, 10);

    // create account
    const newAccount = await db.account.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    // create user
    const newUser = await db.user.create({
      data: {
        name: name,
        email: email,
        accountId: newAccount.id,
      },
    });

    return NextResponse.json(
      {
        user: newUser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        errorMessage: error,
      },
      { status: 500 }
    );
  }
}
