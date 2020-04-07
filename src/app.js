const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {  
  // Return ALL the repositories from the list
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // Store the input sent from the user into variables.
  const { title, url, techs } = request.body;
  // Create a unique ID using the uuid function.
  const id = uuid();

  // Organize the array for the repository.
  const repository = { 
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: 0
  }

  // Push the arry into the repositories list.
  repositories.push(repository)
  
  // Return the repository created to the user as JSON.
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // Stores the params (in this case the ID) passed through the URL into a variable.
  const { id } = request.params;
  // Stores the input date sent by the user into distinct varibles.
  const { title, url, techs } = request.body;
  const likes = 0;

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
    techs,
    likes
  };

  // Places the new repository in the identified place the old one is located. This 
  // substitutes the old repository information.
  repositories[repositoryIndex] = repository;

  // Returns a JSON with the data of the new repository to the user.
  return response.json(repository);
  
});

app.delete("/repositories/:id", (req, res) => {
  // Stores the params (in this case the ID) passed through the URL into a variable.
  const { id } = req.params;

  // Creates a variable that represents the position of the array in which the desired
  // repository will be changed. It uses the function findIndex to compare the id.
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Tests whether the ID was located. If it wasn't, returns an error message and status.
  if(repositoryIndex < 0) {
    return res.status(400).json({ error: "Repository Not Found"});
  } 
  
  // Remove the repository's array from the object, using the index position.
  repositories.splice(repositoryIndex, 1);

  // Returns a success status to the user. No JSON message.
  return res.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  // Creates a variable that represents the position of the array in which the desired
  // repository will be changed. It uses the function findIndex to compare the id.
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Tests whether the ID was located. If it wasn't, returns an error message and status.
  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository Not Found"});
  }

  // Store the number of likes before the update in a variable.
  let initialLikes = repositories[repositoryIndex].likes;
  console.log(initialLikes);

  // Update the number of likes by incrementing 1
  let likes = initialLikes + 1;
  console.log(likes);

  // Update the number of likes inside the proper repository ONLY.
  repositories[repositoryIndex].likes = likes
  console.log(repositories[repositoryIndex]);

  // Returns a JSON with the number of current likes to the user.
  return response.json({ "likes": likes });

});

module.exports = app;
