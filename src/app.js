import express from "express";
import mongoose from "mongoose";
import productosRouter from "./routes/products.js";

const app = express ();
const PUERTO = 8080;

//Middleware: 

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));


mongoose
  .connect("mongodb+srv://viviana_6:Dios66**@cluster0.mqsapxf.mongodb.net/Tienda_ViLu", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la base de datos de MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

  app.use("/productos", productosRouter);

// Iniciar servidor:
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});

