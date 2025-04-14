let questions = [];
let currentQuestionIndex = 0;

async function loadQuestions() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "<p>Loading questions...</p>";

  try {
    const res = await fetch("mcqs_200.json");
    questions = await res.json();
    currentQuestionIndex = 0;
    displayQuestion(questions[currentQuestionIndex]);
  } catch (e) {
    quizDiv.innerHTML = "<p>Failed to load questions.</p>";
    console.error(e);
  }
}

function displayQuestion(q) {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = `<h2>${q.prompt}</h2>`;

  q.options.forEach((choice, i) => {
    const div = document.createElement("div");
    div.textContent = choice;
    div.className = "choice";
    div.onclick = () => handleAnswer(i, q.answer);
    quizDiv.appendChild(div);
  });
}

function handleAnswer(selectedIndex, correctIndex) {
  const allChoices = document.querySelectorAll(".choice");
  allChoices.forEach((el, i) => {
    el.classList.remove("correct", "incorrect");
    if (i === correctIndex) el.classList.add("correct");
    else if (i === selectedIndex) el.classList.add("incorrect");
    el.style.pointerEvents = "none";
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      currentQuestionIndex = 0; // loop
    }
    displayQuestion(questions[currentQuestionIndex]);
  }, 2000);
}
