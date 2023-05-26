let questions = [
  {
    question: "Welche Farben hat die bayerische Flagge?",
    "answer 1": "blau-weiß",
    "answer 2": "rot-grün",
    "answer 3": "blau-gelb",
    "answer 4": "schwarz-gelb",
    "right answer": 1,
  },

  {
    question: "Wie viele Bundesländer gibt es in Deutschland?",
    "answer 1": "15",
    "answer 2": "16",
    "answer 3": "17",
    "answer 4": "18",
    "right answer": 2,
  },

  {
    question: "Was ist die Hauptstadt der USA?",
    "answer 1": "New-York",
    "answer 2": "Detroit",
    "answer 3": "Washington D.C.",
    "answer 4": "Miami",
    "right answer": 3,
  },

  {
    question: "Wie viele Länder zählen zur EU?",
    "answer 1": "24",
    "answer 2": "25",
    "answer 3": "26",
    "answer 4": "27",
    "right answer": 4,
  },

  {
    question: "Welches Land hat die meisten Einwohner weltweit",
    "answer 1": "Brasilien",
    "answer 2": "USA",
    "answer 3": "Indien",
    "answer 4": "China",
    "right answer": 4,
  },

  {
    question: "Welches Land ist das größte der Welt?",
    "answer 1": "Russland",
    "answer 2": "Kanada",
    "answer 3": "USA",
    "answer 4": "China",
    "right answer": 1,
  },

  {
    question: "In welchem Land werden die meisten Dialekte gesprochen?",
    "answer 1": "Panama",
    "answer 2": "Sudan",
    "answer 3": "Papua-Neuguinea",
    "answer 4": "Usbekistan",
    "right answer": 3,
  },

  {
    question: "Welches ist das kleinste Land der Welt?",
    "answer 1": "Vatikan",
    "answer 2": "Belgien",
    "answer 3": "Liechtenstein",
    "answer 4": "San Marino",
    "right answer": 1,
  },
];

let rightAnswers = 0;
let currentQuestion = 0;
let audio_success = new Audio(`audio/success.mp3`); // Geräusche in einer Variablen speichern
let audio_fail = new Audio(`audio/fail.mp3`);

function init() {
  document.getElementById(`all-questions`).innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressbar();
    updateToNextQuestion();
  }
}

function gameIsOver(){
 return currentQuestion >= questions.length
}

function updateProgressbar() {
  let percent = ((currentQuestion + 1) / questions.length) * 100; // rechnet den Fortschritt aus
  percent = Math.round(percent); // rundet das Ergebnis ab und zeigt es ohne Nachkommastellen

  document.getElementById(`percent-status`).innerHTML = `${percent} %`; // zeigt den Fortschritt in Prozent an
  document.getElementById(`percent-status`).style.width = `${percent}%`;
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];

  document.getElementById(`questiontext`).innerHTML = question[`question`];
  document.getElementById(`answer_1`).innerHTML = question[`answer 1`];
  document.getElementById(`answer_2`).innerHTML = question[`answer 2`];
  document.getElementById(`answer_3`).innerHTML = question[`answer 3`];
  document.getElementById(`answer_4`).innerHTML = question[`answer 4`];
}

function answer(selection) {
  let question = questions[currentQuestion]; // question ist die aktuelle Frage, also 0
  let selectedAnswerNumber = selection.slice(-1); // es wird nur der letzte Wert des Strings angezeigt = answer_3 --> 3 wird angezeigt
  let rightAnswer = `answer_${question[`right answer`]}`; // die richtige Antwot wird mit der varialen in rightAnswer gespeichert

  if (rightAnswerSelected(question, selectedAnswerNumber)) { // richtige Frage wurde geklickt
    document.getElementById(selection).parentNode.classList.add(`bg-success`); // fügt dem übergeordneten(parentNode) Element eine CSS Klasse hinzu wenn darauf geklickt wird
    audio_success.play(); // spielt das Geräusch ab wenn man auf die richtige Antwort klickt
    rightAnswers++; // zählt die richtigen Antworten
  } else {
    document.getElementById(selection).parentNode.classList.add(`bg-danger`);
    document.getElementById(rightAnswer).parentNode.classList.add(`bg-success`); // bei falscher Antwort wird die richtige gleich grün angezeigt
    audio_fail.play(); // spielt das Geräusch ab wenn man auf die falsche Antwort klickt
  }
    document.getElementById(`next-button`).disabled = false; // der button wird wieder aktiviert nachdem man auf eine Antwort geklickt hat
}

function rightAnswerSelected( question, selectedAnswerNumber){
   return selectedAnswerNumber == question[`right answer`];
}


function nextQuestion() {
  currentQuestion++; // erhöht z.B. von Null auf eins
  showQuestion();
  document.getElementById(`next-button`).disabled = true;
  resetAnswerButtons();
  document.getElementById(`current-question`).innerHTML = currentQuestion + 1;
}

function resetAnswerButtons() {
  document.getElementById(`answer_1`).parentNode.classList.remove(`bg-success`);
  document.getElementById(`answer_2`).parentNode.classList.remove(`bg-success`);
  document.getElementById(`answer_3`).parentNode.classList.remove(`bg-success`);
  document.getElementById(`answer_4`).parentNode.classList.remove(`bg-success`);
  document.getElementById(`answer_1`).parentNode.classList.remove(`bg-danger`);
  document.getElementById(`answer_2`).parentNode.classList.remove(`bg-danger`);
  document.getElementById(`answer_3`).parentNode.classList.remove(`bg-danger`);
  document.getElementById(`answer_4`).parentNode.classList.remove(`bg-danger`);
}

function restartQuiz() {
  document.getElementById(`header-img`).src = "img/questionmark.jpg"; // ändert das Bild wieder zurück
  rightAnswers = 0; // Setze die Anzahl der richtigen Antworten auf 0 zurück
  currentQuestion = 0; // Setze die aktuelle Frage auf die erste Frage zurück
  document.getElementById(`endscreen`).style = `display: none`; // der endscreen wird entfernt
  document.getElementById(`question-body`).style = ``; // die erste Frage wird wieder angezeigt
  document.getElementById(`current-question`).innerHTML = 1; // die Nummer der ersten Frage wird wieder auf 1 gesetzt
  init();
}

function showEndScreen() {
  document.getElementById(`endscreen`).style = ``;
  document.getElementById(`question-body`).style = `display: none`;

  document.getElementById(`amount-of-questions`).innerHTML = questions.length;
  document.getElementById(`amount-of-right-questions`).innerHTML = rightAnswers;

  document.getElementById(`header-img`).src = "img/endscreen.png";
}
