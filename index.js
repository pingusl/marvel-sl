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
    // console.log("route characters");
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?limit=${req.query.limit}&skip=${req.query.skip}&name=${req.query.name}&apiKey=${marvel_key}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//----Route CHARACTER----//
app.get("/character/:characterId", async (req, res) => {
  const id_character = req.params.characterId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id_character}?apiKey=${marvel_key}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//----COMICS routes----//
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?limit=${req.query.limit}&skip=${req.query.skip}&title=${req.query.title}&apiKey=${marvel_key}`
    );
    // console.log(response.results);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  const id_character = req.params.characterId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id_character}?apiKey=${marvel_key}`
    );
    // console.log(response.results);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//----Welcome route----//
app.get("/", (req, res) => {
  console.log("route welcome");
  res.status(200).json("Welcome");
});

//----Security route----//
app.all("*", (req, res) => {
  try {
    res.status(400).json({ message: "Serveur Marvel: Requ??te invalide ????" });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});
//----Running server----//
app.listen(process.env.PORT, () => {
  console.log(`Server has started ????  on port ${process.env.PORT} `);
});
