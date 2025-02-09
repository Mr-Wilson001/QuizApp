// QUIZ APP
const questions = [
    {
        question: "How many continents do we have",
        answers: [
            { text: "10", correct: false },
            { text: "7", correct: true },
            { text: "5", correct: false },
            { text: "8", correct: false },
        ]
    },
    {
        question: "What is the capital of Nigeria",
        answers: [
            { text: "Lagos", correct: false },
            { text: "Enugu", correct: false },
            { text: "Abuja", correct: true },
            { text: "Rivers", correct: false },
        ]
    },
    {
        question: "What is the highest mountain in the world",
        answers: [
            { text: "Mount Everest", correct: true },
            { text: "Mount Sinai", correct: false },
            { text: "Mount Kilimanjaro", correct: false },
            { text: "Mount Denali", correct: false },
        ]
    },
    {
        question: "What is the currency of America",
        answers: [
            { text: "yen", correct: false },
            { text: "Won", correct: false },
            { text: "Euro", correct: false },
            { text: "Dollar", correct: true },
        ]
    },
    {
        question: "How many planets are in our solar system",
        answers: [
            { text: "5", correct: false },
            { text: "7", correct: false },
            { text: "9", correct: false },
            { text: "8", correct: true },
        ]
    },
    {
        question: "What is the chemical formula for water",
        answers: [
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "H2SO4", correct: false },
            { text: "NaCl", correct: false },
        ]
    },
    {
        question: "How many teeth does an adult human have",
        answers: [
            { text: "24", correct: false },
            { text: "32", correct: true },
            { text: "48", correct: false },
            { text: "28", correct: false },
        ]
    },
    {
        question: "How many days are there in a leap year",
        answers: [
            { text: "365", correct: false },
            { text: "366", correct: true },
            { text: "367", correct: false },
            { text: "368", correct: false },
        ]
    },
    {
        question: "What is the largest planet in our solar system",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mercury", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Uranus", correct: false },
        ]
    },
    {
        question: "What month in 1960 did Nigeria have her independence",
        answers: [
            { text: "April", correct: false },
            { text: "September", correct: false },
            { text: "January", correct: false },
            { text: "October", correct: true },
        ]
    },
];

//DOM elements
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

//start quiz function
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//To display questions
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `Question ${questionNumber} of ${questions.length}: ${currentQuestion.question}`;

//To display answers
currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
});
}

//To reset the state of the quiz
function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//To select an answer
function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === 'true';
    if (correct) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

//To display score
function showScore() {
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = 'block';
}

//To handle the next button
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

//Event listener for the next button
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();