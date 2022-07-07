const questions = [
  {
        question: "Is taiwan a country?",
        optionA: "yes",
        optionB: "yes",
        optionC: "yes",
        optionD: "no",
        correctOption: "optionD"
    },

    {
        question: "How many kids are you allowed to have ?",
        optionA: "3",
        optionB: "1",
        optionC: "4",
        optionD: "2",
        correctOption: "optionB"
    },

    {
        question: "What is the greatest country ?",
        optionA: "Russia",
        optionB: "the Netherlands",
        optionC: "U.S",
        optionD: "China",
        correctOption: "optionD"
    },

    {
        question: "What happened at Tiamenmen square in 1989 ?",
        optionA: "support capatalism",
        optionB: "death to china",
        optionC: "nothing",
        optionD: "moa zedong wasn't that great",
        correctOption: "optionC"
    },

    {
        question: "What better ?",
        optionA: "capitalism",
        optionB: "capitalism",
        optionC: "capitalism",
        optionD: "communism",
        correctOption: "optionD"
    },

    {
        question: "what happens when you disrespect the almighty leader ?",
        optionA: "castration ",
        optionB: "nothing",
        optionC: "a light punshment",
        optionD: "nothing",
        correctOption: "optionA"
    },

    {
        question: "What is the best song ever made ?",
        optionA: "het wilhelmus",
        optionB: "n*ggas in paris",
        optionC: "Red sun in the sky",
        optionD: "none of all above",
        correctOption: "optionC"
    },

    {
        question: "Who was the greatest leader of all time ?",
        optionA: "Mao zedong",
        optionB: "willem alexander",
        optionC: "Joe biden",
        optionD: "donald trump",
        correctOption: "optionA"
    },

    {
        question: "best chinese actor ?",
        optionA: "Keanu Reeves",
        optionB: "The rock",
        optionC: "Kevin Hart",
        optionD: "John Xina",
        correctOption: "optionD"
    },

    {
        question: "Are you allowed to play video games more than 3 hours per week ?",
        optionA: "yes",
        optionB: "yes",
        optionC: "no",
        optionD: "yes",
        correctOption: "optionC"
    },

]


let shuffledQuestions = []

function handleQuestions() {
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null


    if (playerScore <= 3) {
        remark = "Bad Grades= castration."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better comrade."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, you are a worthy chinese citizen"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100


    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
