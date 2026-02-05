let questions = [];

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    console.log("Questions loaded", questions);
  })
  .catch(error => console.error("Error loading questions:", error));
const topicSelect = document.getElementById("topicSelect");

function loadTopics() {
  const topics = [...new Set(questions.map(q => q.topic))];

  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}

topicSelect.addEventListener("change", () => {
  displayQuestion();
});

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadTopics();
    displayQuestion();
  });
