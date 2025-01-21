import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  await prisma.user.create({
    data: {
      name: "Rahul Singh",
      email: "rs@gmail.com",
      password: "asjdflkjsd",
      number: "23432",
    },
  });

  return NextResponse.json({
    success: "true",
    message: "Data saved successfully",
  });
};
