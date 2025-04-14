let questions = [];
let current = 0;
let health = 100;
let timer = 60;
let interval;
const dialogueLines = [
  "Carter Cope could do better than that!",
  "When I was in Africa...",
  "Oiling up is not an answer!",
  "Foolish student…",
  "It seems we are 5 minutes over the timer!"
];

async function loadQuestions() {
  const res = await fetch("mcqs_200.json");
  questions = await res.json();
  shuffle(questions);
  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.prompt;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "choice";
    div.textContent = opt;
    div.onclick = () => handleAnswer(i === q.answer);
    optionsDiv.appendChild(div);
  });
}

function handleAnswer(correct) {
  if (correct) {
    health -= 10;
    document.getElementById("boss-health").style.width = `${health}%`;
    document.getElementById("boss-dialogue").textContent = "Argh! Well done!";
    if (health <= 0) {
      winGame();
      return;
    }
  } else {
    document.getElementById("boss-dialogue").textContent = randomLine();
  }

  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    current = 0;
    shuffle(questions);
    showQuestion();
  }
}

function startTimer() {
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = `Time Left: ${timer}`;
    if (timer <= 0) {
      clearInterval(interval);
      loseGame();
    }
  }, 1000);
}

function loseGame() {
  document.getElementById("question-box").classList.add("hidden");
  document.querySelector(".boss-area").classList.add("hidden");
  document.getElementById("game-over").style.display = "block";
  document.getElementById("health-left").textContent = health;
}

function winGame() {
  alert("🎉 You defeated the boss! The AP exam fears you.");
  location.reload();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

window.onload = loadQuestions;

function randomLine() {
  return dialogueLines[Math.floor(Math.random() * dialogueLines.length)];
}
