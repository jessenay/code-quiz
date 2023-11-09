var startbutton = document.querySelector(".startbutton");
var questioncontent = document.querySelector(".questioncontent");
var questiontitle = document.querySelector(".questiontitle");
var choices = document.querySelector(".choices");
var timer = document.querySelector(".timer");
var resultContainer = document.querySelector(".result-container");
var resultText = document.querySelector(".result-text");
    
var currentquestion = 0;
var questions = [
    {
        questiontitle: "question 1",
        choices: ["choice1a", "choice2a", "choice3a", "choice4a"],
        answer: "choice3a"
    },

    {
        questiontitle: "question 2",
        choices: ["choice1b", "choice2b", "choice3b", "choice4b"],
        answer: "choice3b"
    },

    {
        questiontitle: "question 3",
        choices: ["choice1c", "choice2c", "choice3c", "choice4c"],
        answer: "choice3c"
    },

    {
        questiontitle: "question 4",
        choices: ["choice1d", "choice2d", "choice3d", "choice4d"],
        answer: "choice3d"
    },

    {
        questiontitle: "question 5",
        choices: ["choice1e", "choice2e", "choice3e", "choice4e"],
        answer: "choice3e"
    },
];

let countdown;
let timeLeft = 60; // Set the initial time for the entire quiz in seconds
let quizStarted = false;

function startquizandtimer() {
    if (!quizStarted) {
        quizStarted = true;
        startCountdown(); // Start the countdown when the quiz starts
        showquestion();
    }
}

function startCountdown() {
    clearInterval(countdown);
    displayTimeLeft(timeLeft);
    countdown = setInterval(function () {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(countdown);
            endQuiz();
            return;
        }
        displayTimeLeft(timeLeft);
    }, 1000);
}

function endQuiz() {
    choices.textContent = "";
    clearInterval(countdown);
    displayResult(timeLeft);
}

function displayResult(score) {
    resultText.textContent = `Quiz Over! Your Score: ${score}`;
}

function displayTimeLeft(seconds) {
    // Update the timer display
    timer.textContent = seconds;
}

function showquestion() {
    console.log("here");
    if (currentquestion < questions.length && timeLeft > 0) {
        questiontitle.textContent = questions[currentquestion].questiontitle;
        choices.textContent = "";
        for (let index = 0; index < questions[currentquestion].choices.length; index++) {
            var choicebutton = document.createElement("button");
            choicebutton.textContent = questions[currentquestion].choices[index];
            choicebutton.setAttribute("data-value", questions[currentquestion].choices[index]);
            choicebutton.addEventListener("click", checkanswer);
            choices.appendChild(choicebutton);
        }

        // Start the countdown when showing the question
        startCountdown();
    } else {
       displayResult(timeLeft);
}
}


function checkanswer() {
    console.log(this.dataset.value);
    if (this.dataset.value === questions[currentquestion].answer) {
        currentquestion++;
        
        if (currentquestion < questions.length) {
            showquestion();
        } else {
            endQuiz();
        }
    } else {
        timeLeft -= 3;
        displayTimeLeft(timeLeft);
    }
}

startbutton.addEventListener("click", startquizandtimer);
