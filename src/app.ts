import cors from "cors";
import express from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes/router";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.send("Online Quran Teaching is on");
});
export default app;
