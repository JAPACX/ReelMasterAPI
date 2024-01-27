// import { Express, Response, NextFunction } from "express";
// import bodyParser from "body-parser";
// import { VideoManagementUseCases } from "../../../application/useCases";
// import { PostgresRepository } from "../../../infrastructure/repositories/postgresRepository";
// import { pool } from "../../../infrastructure/postgres/config";
// import { VideoManagementRequest } from "../../../infrastructure/api/controllers/controllers";
// import swaggerUI from "swagger-ui-express";
// import swaggerJsDoc from "swagger-jsdoc";
// import { options } from "../../../infrastructure/api/swagger/swagger";

// // Dependencies injection
// const pr = new PostgresRepository(pool);
// const useCases = VideoManagementUseCases.create(pr);

// export const setupMiddlewares = (app: Express) => {
//   app.use(bodyParser.json());
//   app.use(
//     bodyParser.urlencoded({
//       extended: true,
//     })
//   );

//   // Inject useCases
//   app.use((req: VideoManagementRequest, res: Response, next: NextFunction) => {
//     req.useCases = useCases;
//     next();
//   });

//   // Swagger setup
//   const specs = swaggerJsDoc(options);
//   app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
// };
