let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

const topicEl = document.getElementById("topic");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const explanationEl = document.getElementById("explanation");
const nextBtn = document.getElementById("nextBtn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

fetch("data/questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  });

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  explanationEl.classList.add("hidden");
  optionsEl.innerHTML = "";

  const q = questions[currentQuestion];
  topicEl.textContent = `Topic: ${q.topic}`;
  questionEl.textContent = q.question;

  q.options.forEach((option, index) => {
    const div = document.createElement("div");
    div.textContent = option;
    div.classList.add("option");
    div.onclick = () => selectOption(div, index);
    optionsEl.appendChild(div);
  });
}

function selectOption(element, index) {
  if (answered) return;
  answered = true;

  document.querySelectorAll(".option").forEach(opt =>
    opt.classList.remove("selected")
  );

  element.classList.add("selected");

  const correctIndex = questions[currentQuestion].answerIndex;

  if (index === correctIndex) {
    score++;
    element.style.background = "#22c55e";
  } else {
    element.style.background = "#ef4444";
    optionsEl.children[correctIndex].style.background = "#22c55e";
  }

  explanationEl.textContent =
    "Explanation: " + questions[currentQuestion].explanation;
  explanationEl.classList.remove("hidden");

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}
