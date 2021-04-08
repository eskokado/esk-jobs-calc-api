﻿import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { useRoutes } from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
useRoutes(app);

app.get("/", (req, res) => {
  res.json({
    msg: "OK",
  });
});

app.listen(PORT, () => console.log("Servidor iniciado na porta " + PORT));
