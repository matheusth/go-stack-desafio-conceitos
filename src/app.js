const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const id = uuid();

  const repositorie = { id, title, url, techs, likes: 0 };
  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if(repositorieIndex < 0){
    return response.status(400).json({error: 'An error has occurred'});
  }
  const {title,url,techs} = request.body;
  const repositorie = { id, title, url, techs, likes: repositories[repositorieIndex].likes };
  repositories[repositorieIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if(repositorieIndex < 0){
    return response.status(400).json({error: 'An error has occurred'});
  }
  repositories.splice(repositorieIndex,1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if(repositorieIndex < 0){
    return response.status(400).json({error: 'An error has occurred'});
  }
  repositories[repositorieIndex].likes += 1;
  return response.json(repositories[repositorieIndex]);
});

module.exports = app;
