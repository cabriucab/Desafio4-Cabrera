const contenedor = require("./contenedor.js");
const express = require("express");
const app = new express();
const PORT = 8080;
const productos = new contenedor("./productos.txt");


app.get("/",(req,res)=>res.send("Bienvenidos..."));

app.route("/productos").get((req, res) => {
productos.getAll()
.then((datos) => res.send(datos))
.catch((error) => console.error(error.message));
});


app.route("/productosrandom").get((req, res) => {
productos.getAll()
.then(async (datos) =>{
const numeroAzar = Math.floor(Math.random() * datos.length)+1;
res.send(await productos.getById(numeroAzar));
})
.catch((error) => console.error(error.message));
});

app.listen(PORT, () => {
console.log(`App en puerto: ${PORT}`);
});