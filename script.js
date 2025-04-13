const quizDiv = document.getElementById("quiz");

async function loadQuestions() {
  const pdfUrl = "apworld.pdf";

  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  let rawText = '';
  for (let i = 0; i < Math.min(5, pdf.numPages); i++) {
    const page = await pdf.getPage(i + 1);
    const content = await page.getTextContent();
    rawText += content.items.map(item => item.str).join(' ') + '\n';
  }

  const questions = generateMockQuestions(rawText);
  displayQuestion(questions[0]);
}

function generateMockQuestions(text) {
  // This will be replaced with proper parsing once you upload your PDF
  return [
    {
      prompt: "Which of the following best describes the Neolithic Revolution?",
      choices: [
        "Development of hunting tools",
        "Transition from nomadic life to agriculture",
        "Discovery of fire",
        "Start of trade routes"
      ],
      answer: 1
    },
    {
      prompt: "The Silk Roads facilitated trade primarily between which regions?",
      choices: [
        "East Asia and Western Europe",
        "North Africa and South America",
        "Australia and North America",
        "Eastern Europe and Oceania"
      ],
      answer: 0
    }
  ];
}

function displayQuestion(q) {
  quizDiv.innerHTML = `<h2>${q.prompt}</h2>`;
  q.choices.forEach((choice, i) => {
    const div = document.createElement("div");
    div.textContent = choice;
    div.className = "choice";
    div.onclick = () => {
      const all = document.querySelectorAll(".choice");
      all.forEach((el, idx) => {
        el.classList.remove("correct", "incorrect");
        if (idx === q.answer) el.classList.add("correct");
        else if (idx === i) el.classList.add("incorrect");
      });
    };
    quizDiv.appendChild(div);
  });
}
