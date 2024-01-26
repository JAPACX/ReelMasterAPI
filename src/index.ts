import express, { Express, Request } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createDatabase } from "./infrastructure/postgres/init";
import { VideoManagementUseCases } from "./application/useCases";
import { PostgresRepository } from "./infrastructure/repositories/postgresRepository";
import { pool } from "./infrastructure/postgres/config";
import { router } from "./infrastructure/api/routes/routes";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

// dependencies injection
const pr = new PostgresRepository(pool);
const useCases = VideoManagementUseCases.create(pr);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Middleware for useCases
app.use((req: Request, res, next) => {
  req["useCases"] = useCases;
  next();
});

// Routes
app.use("", router);

app.listen(port, async () => {
  await createDatabase(pool);
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}}`);
});
