import express from "express";
import userRoutes from "./routes/usuario.route"
import alimentoRoutes from "./routes/alimento.route"
import pedidoRoutes from "./routes/pedido.route"


const app = express();

app.use(express.json());
app.use(userRoutes)
app.use(alimentoRoutes)
app.use(pedidoRoutes)


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});