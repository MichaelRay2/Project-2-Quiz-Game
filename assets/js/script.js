const questions = [
    {
        question: "Which is the capital city of Spain?", 
        answers: [
            { text: "Barcelona", correct: false},
            { text: "Madrid", correct: true},
            { text: "Lisbon", correct: false},
            { text: "Sevilla", correct: false},
            { text: "Ibiza", correct: false},
            { text: "Valencia", correct: false},
        ]
    },
    {
        question: "Which is the capital city of Australia?", 
        answers: [
            { text: "Sydney", correct: false},
            { text: "Melbourne", correct: false},
            { text: "Brisbane", correct: false},
            { text: "Wellington", correct: false},
            { text: "Gold Coast", correct: false},
            { text: "Canberra", correct: true},
        ]
    },
    {
        question: "Which is the capital city of Nigeria?", 
        answers: [
            { text: "Abuja", correct: true},
            { text: "Accra", correct: false},
            { text: "Durban", correct: false},
            { text: "Lagos", correct: false},
            { text: "Tripoli", correct: false},
            { text: "Kinshasa", correct: false},
        ]
    },
    {
        question: "Which player was the youngest player to have scored a premier league goal?", 
        answers: [
            { text: "Wayne Rooney", correct: false},
            { text: "Frank Lampard", correct: false},
            { text: "Raheem Sterling", correct: false},
            { text: "James Milner", correct: false},
            { text: "James Vaughan", correct: true},
            { text: "Cesc Fabregas", correct: false},
        ]
    },
    {
        question: "As of the beginning of 2024, who is Newcastle United's highest transfer sale?", 
        answers: [
            { text: "Ayoze Perez", correct: false},
            { text: "Andy Carroll", correct: true},
            { text: "Mousa Sissoko", correct: false},
            { text: "Yohan Cabaye", correct: false},
            { text: "Jonathan Woodgate", correct: false},
            { text: "Georginio Wijnaldum", correct: false},
        ]
    },
    {
        question: "Which of these players has scored the fastest hatrick in premier league history?", 
        answers: [
            { text: "Dwight Yorke", correct: false},
            { text: "Sadio Mane", correct: true},
            { text: "Kevin De Bruyne", correct: false},
            { text: "Jermaine Pennant", correct: false},
            { text: "Yannick Bolasie", correct: false},
            { text: "Michael Owen", correct: false},
        ]
    },
    {
        question: "As of the beginning of 2024, who is Tottenham Hotspur's most expensive signing?", 
        answers: [
            { text: "Christian Romero", correct: false},
            { text: "Brennan Johnson", correct: false},
            { text: "James Maddison", correct: false},
            { text: "Davinson Sanchez", correct: false},
            { text: "Richarlison", correct: false},
            { text: "Tanguy Ndombele", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ") " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

