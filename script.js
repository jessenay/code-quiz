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
        questiontitle: "Inside which HTML element do we put the JavaScript?",
        choices: ["<scripting>", "<js>", "<script>", "<javascript>"],
        answer: "<script>"
    },

    {
        questiontitle: "How do you create a function in JavaScript?",
        choices: ["function:myFunction()", "function = myFunction()", "function ~ myFunction()", "function myFunction()"],
        answer: "function myFunction()"
    },

    {
        questiontitle: "How can you add a single line comment in Javascript?",
        choices: ["//This is a comment", "`This is a comment`", "<!--This is a comment-->", "/*This is a comment*/"],
        answer: "//This is a comment"
    },

    {
        questiontitle: "Which operator is used to assign a value to a variable?",
        choices: ["-", "*", "=", "x"],
        answer: "="
    },

    {
        questiontitle: "How do you declare a JavaScript variable?",
        choices: ["var carName;", "variable carName;", "v carName;", "vrbl carName;"],
        answer: "var carName;"
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
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".input-section").style.display = "block";
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
        document.querySelector(".quiz-container").style.display = "none";
        document.querySelector(".input-section").style.display = "block";
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
        this.classList.add('wrong-answer');
        timeLeft -= 3;
        displayTimeLeft(timeLeft);
    }
}

document.getElementById("saveScore").addEventListener("click", function () {
    const initials = document.getElementById("initials").value;
    if (initials.trim() !== "") {
        // Assuming you have an array to store high scores
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push({ initials, score: timeLeft });
        localStorage.setItem("highScores", JSON.stringify(highScores));

        // You can redirect the user to a high scores page or update the UI accordingly
        console.log("Score saved!");
    } else {
        alert("Please enter your initials!");
    }
});


startbutton.addEventListener("click", startquizandtimer);
