import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createDatabase } from "./infrastructure/postgres/init";
import { VideoManagementUseCases } from "./application/useCases";
import { PostgresRepository } from "./infrastructure/repositories/postgresRepository";
import { pool } from "./infrastructure/postgres/config";
import { router } from "./infrastructure/api/routes/routes";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./infrastructure/api/swagger/swagger";
import { VideoManagementRequest } from "./infrastructure/api/controllers/controllers";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

// Dependencies injection
const pr = new PostgresRepository(pool);
const useCases = VideoManagementUseCases.create(pr);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Inject useCases
app.use((req: VideoManagementRequest, res, next) => {
  req.useCases = useCases;
  next();
});

// Routes
app.use("", router);

// Swagger setup
const specs = swaggerJsDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, async () => {
  await createDatabase(pool);
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
