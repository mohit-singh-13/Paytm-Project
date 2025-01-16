import prisma from "@repo/db/client";
import express from "express";
export const banksRouter = express.Router();

banksRouter.post("/", async (req, res) => {
  // Zod validations here.
  // Check is this request actually came from HDFC bank, use a webhook secret here.
  const token = req.body.token;

  // Update balance in db, add txn.
  try {
    const result = await prisma.onRampTransaction.findFirst({
      where: {
        token,
      },
    });

    const userId = result?.userId;
    const amount = result?.amount;

    const paymentInformation = {
      token,
      userId,
      amount,
    };

    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),

      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    // HDFC bank will get this response. BE CAREFUL with Status Codes here.
    res.status(200).json({
      success: true,
      message: "Captured",
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(411).json({
      success: false,
      message: "Error while processing webhook",
    });
    return;
  }
});
