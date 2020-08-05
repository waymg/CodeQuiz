/// Important!! This file intended to give starting point/ideas only. Feel free to delete,change or ignore the code.

// TODO: variables to keep track of quiz state, variables to reference DOM elements
// var  timerEl
// var  feedbackEl

function startQuiz() {
  // start timer ticks every 1 second
  timerId = setInterval(clockTick, 1000);

  // show starting time

  // function that get a question for you
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // TODO: update title with current question
  // clear out any old question choices
  // display on the page Create/append funciton could be helpful
}

// function that keep track of time
function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    //End the quiz
    endQuiz();
  }
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 5;

    if (time < 0) {
      time = 0;
    }

    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  // display new time on page
  timerEl.textContent = time;

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

function endQuiz() {
  // stop timer
  clearInterval(timerId);
  // TODO:
  // show end screen
  // show final score
  // hide questions section
}