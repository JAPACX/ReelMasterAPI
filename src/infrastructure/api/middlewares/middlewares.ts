import { Express } from "express";
import bodyParser from "body-parser";
import multer from "multer";

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "../../../infrastructure/api/swagger/swagger";

export const setupMiddlewares = (app: Express) => {
  // body parser
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // Multer setup
  const storage = multer.memoryStorage(); // Store the file in memory
  const upload = multer({ storage: storage });

  // Swagger setup
  const specs = swaggerJsDoc(options);
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

  // Multer middleware
  app.use(upload.single("file"));
};
