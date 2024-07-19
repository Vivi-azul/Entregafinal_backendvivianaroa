import express from "express";
import mongoose from "mongoose";
import pacientesRouter from "./routes/pacientes.router.js"

const app = express ();
const PUERTO = 8080;

//Middleware: 

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use("/pacientes", pacientesRouter);

mongoose.connect("mongodb+srv://viviana_6:Dios66**@cluster0.mqsapxf.mongodb.net/")

.then(() => console.log("Conectados a la base de datos") )
.catch((error) => console.log("Existe un error", error) )

