import express, { Express } from "express";
import dotenv from "dotenv";
import { createDatabase } from "./infrastructure/postgres/init";
import { VideoManagementUseCases } from "./application/useCases";
import { PostgresRepository } from "./infrastructure/repositories/postgresRepository";
import { pool } from "./infrastructure/postgres/config";
import { router } from "./infrastructure/api/routes/routes";

import { VideoManagementRequest } from "./infrastructure/api/controllers/controllers";
import { setupMiddlewares } from "./infrastructure/api/middlewares/middlewares";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

// Dependencies injection with connection pool
const pr = new PostgresRepository(pool);
const useCases = VideoManagementUseCases.create(pr);

// Inject useCases
app.use((req: VideoManagementRequest, res, next) => {
  req.useCases = useCases;
  next();
});

// Middlewares
setupMiddlewares(app);
// Routes
app.use("", router);

app.listen(port, async () => {
  await createDatabase(pool);
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
