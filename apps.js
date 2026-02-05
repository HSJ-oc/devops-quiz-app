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
let currentQuestion = null;

function displayQuestion() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  const selectedTopic = topicSelect.value;
  const filtered = selectedTopic
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  if (filtered.length === 0) return;

  currentQuestion = filtered[Math.floor(Math.random() * filtered.length)];

  const questionEl = document.createElement("h3");
  questionEl.textContent = currentQuestion.question;
  quizDiv.appendChild(questionEl);

  currentQuestion.options.forEach((opt, index) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" value="${index}" />
      ${opt}
    `;
    quizDiv.appendChild(label);
    quizDiv.appendChild(document.createElement("br"));
  });
}
const submitBtn = document.getElementById("submitBtn");
const feedbackDiv = document.getElementById("feedback");

submitBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');

  if (!selected) {
    feedbackDiv.textContent = "Please select an answer.";
    return;
  }

  const answer = parseInt(selected.value);

  if (answer === currentQuestion.answerIndex) {
    feedbackDiv.textContent = "✅ Correct! " + currentQuestion.explanation;
  } else {
    feedbackDiv.textContent =
      "❌ Incorrect. " + currentQuestion.explanation;
  }
});
