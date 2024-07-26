import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import { format } from "./utils/morgan";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import productsRoutes from "./routes/productRoutes";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

connectDB();

/*const corsOptions = {
  origin: "http://localhost:5173", // Permitir apenas esta origem
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  credentials: true, // Permitir credenciais (como cookies)
};*/

app.use(cors());
//app.use(bodyParser.json());
app.use(helmet());
app.use(morgan(format));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

app.use((req, res) => {
  res.status(404).send("Rota não encontrada");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
});

app.listen(process.env.PORT, () => {
  console.log("API RODANDO OK");
});
