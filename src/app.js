const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;
  const id = uuid();

  console.log(techs);

  const project = { 
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: likes
  }
  
  return response.json(project)
});

app.put("/repositories/:id", (request, response) => {
  // Stores the params (in this case the ID) passed through the URL into a variable.
  const { id } = request.params;
  // Stores the input date sent by the user into distinct varibles.
  const { title, url, techs } = request.body;

  // Creates a variable that represents the position of the array in which the desired
  // repository will be changed. It uses the function findIndex to compare the id.
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Tests whether the ID was located. If it wasn't, returns an error message and status.
  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository Not Found"});
  }

  // Organizes the array for the new repository.
  const repository = {
    id,
    title,
    url,
    techs
  };

  // Places the new repository in the identified place the old one is located. This 
  // substitutes the old repository information.
  repositories[repositoryIndex] = repository;

  // Returns a JSON with the data of the new repository to the user.
  return response.json(repository);
  
});

app.delete("/repositories/:id", (req, res) => {
  // Stores the params (in this case the ID) passed through the URL into a variable.
  const { id } = request.params;

  // Creates a variable that represents the position of the array in which the desired
  // repository will be changed. It uses the function findIndex to compare the id.
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Tests whether the ID was located. If it wasn't, returns an error message and status.
  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository Not Found"});
  } else {
    // Remove the repository's array from the object, using the index position.
    projects.splice(repositoryIndex, 1);

    // Returns a success status to the user. No JSON message.
    return response.status(204).send();
  }  

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

});

module.exports = app;
