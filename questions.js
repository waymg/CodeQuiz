// Array of questions
var question = [
  "The condition in an if / else statement is enclosed within ____.",
  "Which symbol represent 'or'?",
  "The less than/or equal operator is _____.",
  "An array is enclosed in ______.",
  "What doe DOM stand for?",
];
//Array for the choices with index [0] being the correct answer
var ans1 = ["parentheses", "curley brackets", "square brackets", "quotes"];
var ans2 = ["||", "===", "&&", "OR"];
var ans3 = [">=", "<=", "+=", "=="];
var ans4 = ["square brackets", "parentheses", "curley brackets", "quotes"];
var ans5 = [
  "Display Object Model",
  "Desktop Oriented Model",
  "Document Object Model",
  "Digital Oriented Model",
];
//Array of answers
var answers = [ans1, ans2, ans3, ans4, ans5];

//get variables from html
//elements that persist throughout the quiz
var viewHighscoreEl = document.querySelector("#view-highscore");
var timer = document.querySelector("#timer");

//Start
var startScreen = document.querySelector(".start-screen");
var startEl = document.querySelector("#start-bttn");

//Quiz
var quizScreen = document.querySelector(".quiz-screen");
var questionPrompt = document.querySelector("#question-prompt");
var answerbtnsEl = document.querySelector(".answers");
var lastResultEl = document.querySelector("#last-result");

//Highscore
var enterScreen = document.querySelector(".enter-hs-screen");
var nameEl = document.querySelector("#highscore-name");
var submitHSEl = document.querySelector("#hs-submit");
var cancelHSEl = document.querySelector("#hs-cancel");

//Leaderboard
var leaderBoardScreen = document.querySelector(".leaderboard-screen");
var leaderBoardsEl = document.querySelector(".leader-boards");
var backToStartEl = document.querySelector("#back-to-start");

var interval;
var index = 0;
var score;

//Get the current leaderboard, if no leader board create an empty array
var leaderBoards = JSON.parse(localStorage.getItem("leaderBoards"));
if (leaderBoards === null) {
  leaderBoards = [];
}

//Start quiz when start button is pressed
function startQuiz(event) {
  event.preventDefault();

  //Toggle display
  toggleDisplay(".quiz-screen");

  //Reset values for timer and index
  index = 0;
  score = 0;
  timer.textContent = 60;
  lastResultEl.textContent = "";

  //Display the first question
  displayQuestions();

  //Function for the timer
  interval = setInterval(function () {
    timer.textContent = parseInt(timer.textContent) - 1;

    //Timer runs out or goes below 0, highscore and reset
    if (timer.textContent <= 0) {
      timer.textContent = 0;
      score = 0;
      toggleDisplay(".enter-hs-screen");
      clearInterval(interval);
    }
  }, 1000);
}
//Function just to display the current questions
//End of quiz
function displayQuestions() {
  //To highscore screen
  if (index >= question.length) {
    toggleDisplay(".enter-hs-screen");

    if (timer.textContent <= 0) {
      timer.textContent = 0;
      score = 0;
    } else {
      score = timer.textContent;
    }
    clearInterval(interval);

    return;
  }
  //Display of next questions
  else {
    questionPrompt.textContent = question[index];
    //Random questions from array
    var mixedAnswers = answers[index].slice();
    mixedAnswers = randArray(mixedAnswers);

    for (var i = 0; i < 4; i++) {
      answerbtnsEl.children[i].children[0].textContent = mixedAnswers[i];
    }
  }
  index++;
}

//Function display either correct or incorrect
function grading(event) {
  event.preventDefault();
  var bttnGuess = event.target.textContent;
  //check to see if correct
  var lastResult = isCorrect(bttnGuess);

  //Decrease timer if incorrect
  if (lastResult) {
    lastResultEl.textContent = "Correct";
  } else {
    timer.textContent = timer.textContent - 10;
    lastResultEl.textContent = "Incorrect";
  }
  displayQuestions();
}
//Function to randomize arrays
function randArray(oldArray) {
  var newArray = [];
  for (var i = oldArray.length; i > 0; i--) {
    var randIndex = Math.floor(Math.random() * oldArray.length);
    newArray.push(oldArray[randIndex]);
    oldArray.splice(randIndex, 1);
  }
  return newArray;
}

//Function to return the answer
function isCorrect(choice) {
  //true if matches correct answer
  if (choice === answers[index - 1][0]) {
    return true;
  }
  //false if given an incorrect answer
  else {
    return false;
  }
}

//add scores to highscores
function submitScore(event) {
  event.preventDefault();
  var name = nameEl.value;

  if (score < 10) {
    score = "0" + score;
  }
  var newScore = score + "-" + name;
  //If user deletes highscore during quiz
  if (leaderBoards === null) {
    leaderBoards = [];
  }
  leaderBoards.push(newScore);
  //sort in decreasing order

  leaderBoards.sort();
  leaderBoards.reverse();
  //Add to the localstorage
  localStorage.setItem("leaderBoards", JSON.stringify(leaderBoards));
  organizeLeaderBoards();
  toggleDisplay(".leaderboard-screen");
}

//Function to view highscore
function viewHighScore(event) {
  event.preventDefault();
  organizeLeaderBoards();
  toggleDisplay(".leaderboard-screen");
}

//Function to add the scores
function organizeLeaderBoards() {
  //Clear interval
  clearInterval(interval);
  //Reset highscores
  leaderBoardsEl.innerHTML = "";

  leaderBoards = JSON.parse(localStorage.getItem("leaderBoards"));

  //Add new elements to the html
  if (leaderBoards === null) {
    leaderBoards = [];
    return;
  } else {
    for (var i = 0; i < leaderBoards.length; i++) {
      var newLi = document.createElement("li");
      newLi.textContent = leaderBoards[i];
      leaderBoardsEl.appendChild(newLi);
    }
  }
}
function refresh(event) {
  event.preventDefault();
  timer.textContent = 60;
  toggleDisplay(".start-screen");
}
//Function to toggle the current display
function toggleDisplay(display) {
  if (display === ".start-screen") {
    startScreen.setAttribute("style", "display:block;");
    quizScreen.setAttribute("style", "display:none;");
    enterScreen.setAttribute("style", "display:none;");
    leaderBoardScreen.setAttribute("style", "display:none;");
  }
  if (display === ".quiz-screen") {
    startScreen.setAttribute("style", "display:none;");
    quizScreen.setAttribute("style", "display:block;");
    enterScreen.setAttribute("style", "display:none;");
    leaderBoardScreen.setAttribute("style", "display:none;");
  }
  if (display === ".enter-hs-screen") {
    startScreen.setAttribute("style", "display:none;");
    quizScreen.setAttribute("style", "display:none;");
    enterScreen.setAttribute("style", "display:block;");
    leaderBoardScreen.setAttribute("style", "display:none;");
  }
  if (display === ".leaderboard-screen") {
    startScreen.setAttribute("style", "display:none;");
    quizScreen.setAttribute("style", "display:none;");
    enterScreen.setAttribute("style", "display:none;");
    leaderBoardScreen.setAttribute("style", "display:block;");
  }
}

//Listeners buttons
startEl.addEventListener("click", startQuiz);
viewHighscoreEl.addEventListener("click", viewHighScore);

answerbtnsEl.addEventListener("click", grading);

submitHSEl.addEventListener("click", submitScore);
cancelHSEl.addEventListener("click", refresh);

backToStartEl.addEventListener("click", refresh);