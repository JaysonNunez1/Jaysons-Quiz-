var displayedQuestionEl = document.querySelector(".displayed-question");
var answerChoices = document.querySelector(".answer-choices");
var startButtonEl = document.querySelector(".start-button");
var timeEl = document.querySelector(".time");
var answerMatch = document.querySelector(".answer-match");
var submitScoreEl = document.querySelector(".submit-score");
var submitScoreForm = document.querySelector(".high-score-submit");
var highScoreButton = document.querySelector(".high-scores");
var highScoreList = document.querySelector(".high-score-list");
var secondsLeft = 45;
var score = 0;
var scores; 
//questions being used
var questionsArray = [
  "Which one of these is a data type?",
  "Which one of these is a programing language?",
  "Which one of these is used to store multiple values into one variable?",
];
//answers to the questions
var answersArray = [
  ["Booleon", "String", "Number","All of the above"],
  ["Html", "Javascript", "Css","All of the above"],
  ["Function", "Array", "querySelector","All of the above"],
];
//group of correct answers
var correctArray = ["All of the above", "All of the above", "Array"];
var question = {
  questions: Object.values(questionsArray),
  answerChoices: Object.values(answersArray),
  answerCorrect: Object.values(correctArray),
};
var correctAnswer;
var usedIndexes = []; 

submitScoreForm.style.display = "none";
//this function starts the quiz
function startQuiz() {
 
  var randIndex = Math.floor(Math.random() * question.questions.length);
  renderQuestion(question, randIndex);
}
//This function starts the timer
function startTimer() {

  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time remaining: " + secondsLeft;
    if (secondsLeft === 0) {
    
      clearInterval(timerInterval);
     
      endQuiz();
    }
  }, 1000);
}
function renderQuestion(questionObject, index) {
  var renderedQuestion = questionObject.questions[index];
  var renderedAnswers = questionObject.answerChoices[index];
  correctAnswer = questionObject.answerCorrect[index];

  displayedQuestionEl.textContent = renderedQuestion;

  if (renderedAnswers) {
    for (let i = 0; i < renderedAnswers.length; i++) {
      const ans = document.createElement("button");
      ans.textContent = renderedAnswers[i];
      answerChoices.appendChild(ans);
    }
    questionObject.questions.splice(index, 1);
    questionObject.answerChoices.splice(index, 1);
    questionObject.answerCorrect.splice(index, 1);
  }
}
// function to end the quiz
function endQuiz() {
  timeEl.style.display = "none";
  displayedQuestionEl.textContent = "Your final score: " + score;
  startButtonEl.disabled = false;
  startButtonEl.textContent = "Play Again";
  submitScoreForm.style.display = "block";


  question.questions = questionsArray;
  question.answerChoices = answersArray;
  question.answerCorrect = correctArray;
}
//This reloads the page to reset the game
startButtonEl.addEventListener("click", function (event) {
  if (startButtonEl.textContent === "Play Again") {
    location.reload();
  }

  startButtonEl.disabled = true;
  timeEl.textContent = "Time remaining: " + secondsLeft;
  secondsLeft = 45;

  startTimer();
  startQuiz();
});
answerChoices.addEventListener("click", function (event) {
  if (event.target.textContent === correctAnswer) {
    answerMatch.textContent = "Correct!";
    score++;
  } else {
    answerMatch.textContent = "Wrong!";
    secondsLeft -= 5;
  }

  while (answerChoices.firstChild) {
    answerChoices.removeChild(answerChoices.firstChild);
  }
  if (question.questions[0]) {
    startQuiz();
  } else {
    endQuiz();
  }
});
submitScoreEl.addEventListener("click", function (event) {
  event.preventDefault();
  submitScoreEl.disabled = true;
  localStorage.setItem(
    document.querySelector(".initials").value,
    JSON.stringify(score)
  );
});
highScoreButton.addEventListener("click", function (event) {
  event.preventDefault();
  while (highScoreList.firstChild) {
    highScoreList.removeChild(highScoreList.firstChild);
  }
  var highScore;
  scores = { ...localStorage };
  console.log(scores);
  console.log(Object.entries(scores));
  console.log(Object.entries(scores)[0][0]);
//allows you to see your high score from local storage
  for (let i = 0; i < Object.entries(scores).length; i++) {
    console.log("test");
    highScore = document.createElement("li");
    highScore.textContent =
      Object.entries(scores)[i][0] + ": " + Object.entries(scores)[i][1];
    highScoreList.appendChild(highScore);
  }
});