"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function addMoney(amount: string, provider: string) {
  const session = await getServerSession(authOptions);

  const id: number = session.user.id;

  try {
    await prisma.onRampTransaction.create({
      data: {
        startTime: new Date(),
        status: "Processing",
        token: Math.round(Math.random() * 10000).toString(),
        provider,
        amount: Number(amount) * 100,
        userId: Number(id),
      },
    });

    return {
      message: "Success",
    };
  } catch (err) {
    console.log(err);
    return "Error processing the transaction";
  }
}
