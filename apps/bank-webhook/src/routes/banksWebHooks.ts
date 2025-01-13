import prisma from "@repo/db/client";
import express from "express";
export const banksRouter = express.Router();

banksRouter.post("/", async (req, res) => {
  // Zod validations here.
  // Check is this request actually came from HDFC bank, use a webhook secret here.

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  // Update balance in db, add txn.
  try {
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