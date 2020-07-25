import express from "express";
import path from "path";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

// Acessar arquivos estáticos
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

const port = 3333;
app.listen(port, () => console.log("Backend running on port " + port));
