import prisma from "@repo/db/client";
import express from "express";
import { banksRouter } from "./routes/banksWebHooks";
const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.use("/hdfcWebhook", banksRouter);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
