import express from "express";
import { banksRouter } from "./routes/banksWebHooks";
import { config } from "dotenv";
const app = express();

config();
app.use(express.json());

const PORT = process.env.PORT;

app.use("/hdfcWebhook", banksRouter);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
