//----Module loading----//
const express = require("express");
require("dotenv").config(); //Permet d'activer les variables d'environnement du fichier .env
//const formidable = require("express-formidable");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
//----Server initialisation----//
const app = express();
//app.use(formidable());
app.use(cors());
app.use(morgan("dev"));

//----API Key---//
const marvel_key = process.env.MARVEL_API_KEY;

//----Route CHARACTERS----//
app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${marvel_key}`
    );
    console.log(response.results);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//----Route COMICS----//
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${marvel_key}`
    );
    console.log(response.results);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.get("/", (req, res) => {
  console.log("route welcome");
  res.status(200).json("Welcome");
});

//----Security route----//
app.all("*", (req, res) => {
  try {
    res.status(400).json({ message: "Serveur Marvel: Requête invalide 🫣" });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});
//----Running server----//
app.listen(process.env.PORT, () => {
  console.log(`Server has started 🚀  on port ${process.env.PORT} `);
});
