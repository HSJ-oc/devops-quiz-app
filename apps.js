let questions = [];
let currentQuestion = null;
let score = 0;
let totalQuestions = 0;


const topicSelect = document.getElementById("topicSelect");
const submitBtn = document.getElementById("submitBtn");
const feedbackDiv = document.getElementById("feedback");

// FETCH ONCE
fetch("data/questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadTopics();
    displayQuestion();
  })
  .catch(error => console.error("Error loading questions:", error));

function loadTopics() {
  const topics = [...new Set(questions.map(q => q.topic))];

  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}

function displayQuestion() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";
    feedbackDiv.textContent = "";
  
    if (questions.length === 0) return;
  
    const selectedTopic = topicSelect.value;
    const filtered = selectedTopic
      ? questions.filter(q => q.topic === selectedTopic)
      : questions;
  
    if (filtered.length === 0) {
      quizDiv.textContent = "No questions available for this topic.";
      return;
    }
  
    // Pick a random question from filtered questions
    currentQuestion = filtered[Math.floor(Math.random() * filtered.length)];
  
    const questionEl = document.createElement("h3");
    questionEl.textContent = currentQuestion.question;
    quizDiv.appendChild(questionEl);
  
    currentQuestion.options.forEach((opt, idx) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="answer" value="${idx}" />
        ${opt}
      `;
      quizDiv.appendChild(label);
      quizDiv.appendChild(document.createElement("br"));
    });
  }
  
const scoreDiv = document.getElementById("score");

function updateScore() {
  scoreDiv.textContent = `Score: ${score} / ${totalQuestions}`;
}

// EVENTS
topicSelect.addEventListener("change", displayQuestion);

submitBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="answer"]:checked');
  
    if (!selected) {
      feedbackDiv.textContent = "Please select an answer.";
      return;
    }
  
    const answer = Number(selected.value);
    totalQuestions++; // increment total answered
  
    if (answer === currentQuestion.answerIndex) {
        score++;
        feedbackDiv.textContent = "✅ Correct! " + currentQuestion.explanation;
      } else {
        feedbackDiv.textContent = "❌ Incorrect. " + currentQuestion.explanation;
      }
      
      updateScore();
      setTimeout(() => displayQuestion(), 1500);
  });
  
