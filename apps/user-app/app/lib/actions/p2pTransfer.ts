"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function p2pTransfer(number: string, amount: string) {
  try {
    const recipient = await prisma.user.findFirst({
      where: { number },
    });

    const sender = await getServerSession(authOptions);
    const senderId: number = Number(sender.user.id);

    if (!senderId) {
      return {
        message: "Sender not found",
      };
    }

    if (!recipient) {
      return {
        message: "User not found",
      };
    }

    await prisma.$transaction(async (txn) => {
      await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${senderId} FOR UPDATE`;

      const senderBalance = await txn.balance.findFirst({
        where: { userId: senderId },
      });

      if (!senderBalance || senderBalance.amount < Number(amount) * 100) {
        throw new Error("Insufficinet funds");
      }

      await txn.balance.update({
        where: { userId: recipient.id },
        data: { amount: { increment: Number(amount) * 100 } },
      });

      await txn.balance.update({
        where: { userId: senderId },
        data: { amount: { decrement: Number(amount) * 100 } },
      });

      await txn.p2pTransfer.create({
        data: {
          amount: Number(amount) * 100,
          timestamp: new Date(),
          senderId,
          recipientId: recipient.id,
        },
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error in p2p server action");
  }
}
