import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
// import { createDatabase } from "./infrastructure/postgres/init";
import { DataSourceRepository } from "./infrastructure/repositories/postgresRepository";
import { pool } from "./infrastructure/postgres/config";
const example = new DataSourceRepository(pool);
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server new");
});
app.listen(port, async () => {
  // await createDatabase(pool);
  example.registerUser("name", "last_name", "username", "password", "email");
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}}`);
});
