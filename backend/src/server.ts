import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

import prisma from "./config/database";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { initializeSocket } from "./socket";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const tenantCount = await prisma.tenant.count();

  res.json({
    success: true,
    message: "Amdox ERP API Running",
    tenants: tenantCount,
  });
});

//Swagger Documentation
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

//API Routes
app.use("/api", routes);

//Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(
    `Swagger Docs: http://localhost:${PORT}/api-docs`
  );
});
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });