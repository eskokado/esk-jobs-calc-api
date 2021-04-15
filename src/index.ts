import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { useRoutes } from "./routes";
import { cors } from "./middlewares/cors";
import { contentType } from "./middlewares/content-type";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors);
app.use(contentType);

useRoutes(app);

app.get("/", (req, res, next) => {
  res.json({
    msg: "OK",
  });
  next();
});

app.listen(PORT, () => console.log("Servidor iniciado na porta " + PORT));
