const express = require("express");
const ProjetController = require("./controller/projetController");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

const projetController = new ProjetController();

app.get("/projet", projetController.getProjects);
app.get("/projet/:slug", projetController.getOneProject);
app.get("/projet/id/:id", projetController.getOneProjectById);
app.get("/projet/titleslug", projetController.getProjectsTitleSlug);

app.post("/projet", projetController.postProject);
app.put("/projet/:id", projetController.updateProject);
app.delete("/projet/:id", projetController.deleteProject);

module.exports = app;
