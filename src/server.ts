import express from "express";
import userRoutes from "./routes/usuario.routes"
import alimentoRoutes from "./routes/alimento.route"

const app = express();

app.use(express.json());
app.use(userRoutes)
app.use(alimentoRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});