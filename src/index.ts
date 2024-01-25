// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createDatabase } from "./infrastructure/postgres/init";
import { pool } from "./infrastructure/postgres/config";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server new");
});

app.listen(port, async () => {
  await createDatabase(pool);
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}}`);
});
