let questions = [];

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    console.log("Questions loaded", questions);
  })
  .catch(error => console.error("Error loading questions:", error));
