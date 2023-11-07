var startbutton = document.querySelector(".startbutton");
var questioncontent = document.querySelector(".questioncontent");
var questiontitle = document.querySelector(".questiontitle");
var choices = document.querySelector(".choices");

var currentquestion = 0;
var questions = [
    {
        questiontitle: "question 1",
        choices: ["choice1a",
            "choice2a",
            "choice3a",
            "choice4a"],
        answer: "choice3a"
    },

    {
        questiontitle: "question 2",
        choices: ["choice1b",
            "choice2b",
            "choice3b",
            "choice4b"],
        answer: "choice3b"
    },

    {
        questiontitle: "question 3",
        choices: ["choice1c",
            "choice2c",
            "choice3c",
            "choice4c"],
        answer: "choice3c"
    },

    {
        questiontitle: "question 4",
        choices: ["choice1d",
            "choice2d",
            "choice3d",
            "choice4d"],
        answer: "choice3d"
    },

    {
        questiontitle: "question 5",
        choices: ["choice1e",
            "choice2e",
            "choice3e",
            "choice4e"],
        answer: "choice3e"
    },
];

function showquestion() {
    console.log("here")
    questiontitle.textContent = questions[currentquestion].questiontitle
    choices.textContent = ""
    for (let index = 0; index < questions[currentquestion].choices.length; index++) {
        var choicebutton = document.createElement("button")
        choicebutton.textContent = questions[currentquestion].choices[index]
        choicebutton.setAttribute("data-value", questions[currentquestion].choices[index])
        choicebutton.addEventListener("click", checkanswer)
        choices.appendChild(choicebutton)
    }
}

function checkanswer() {
    console.log(this.dataset.value)
    if (this.dataset.value === questions[currentquestion].answer) {
        currentquestion++;
        if (currentquestion < questions.length) {
            showquestion();
        } else {
            questioncontent.style.display = "none";
        }
    }
}



startbutton.addEventListener("click", showquestion)