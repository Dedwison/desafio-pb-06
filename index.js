const fs = require("fs");
const express = require("express");
const PORT = process.env.PORT || 8080;

const app = express();

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      const productos = JSON.parse(contenido);
      return productos;
    } catch (err) {
      console.log(`Seprodujo un error: ${err.message}`);
    }
  }

  async getById(id) {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      const productos = JSON.parse(contenido);
      const productoBuscado = productos.find((prod) => prod.id == id);
      return productoBuscado;
    } catch (err) {
      console.log(`Seprodujo un error: ${err.message}`);
    }
  }
}

const contenedor1 = new Contenedor("productos.txt");

app.get("/", (req, res) => {
  res.send(`<h1 style="color: blue;">¡Funciona!</h1>`);
});

app.get("/productos", (req, res) => {
  contenedor1.getAll().then((resultado) => {
    console.log("Metodo getAll");
    console.log(resultado);
    res.send(resultado);
  });
});

app.get("/productosRandom", (req, res) => {
  contenedor1.getAll().then((resultado) => {
    let numRamdom = Math.floor(Math.random() * resultado.length);
    contenedor1.getById(numRamdom + 1).then((resultado) => {
      res.send(resultado);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});
