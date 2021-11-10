const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
let quizArr = [];

fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple")
.then(response => response.json())
.then(loadedQuestions => {
    let apiResponse = [...loadedQuestions.results];
    console.log(apiResponse);
    apiResponse.forEach(question => {
        quizArr.push(getQuestion(question));
    })
    startGame();
})
.catch(err => {console.log(err)});

// constants:
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// Globals:
let selected = false;
let questionCounter = 0;
let score = 0;

const getQuestion = (apiQuestion)  => {
    let ret = {
        question: "",
        choiceList: [],
        correctAnswer: 0
    };
    ret.question = apiQuestion.question;
    ret.choiceList = [...apiQuestion.incorrect_answers];
    ret.choiceList.push(apiQuestion.correct_answer);
    ret.choiceList.sort(() => Math.random() - 0.5);
    ret.correctAnswer = ret.choiceList.indexOf(apiQuestion.correct_answer) + 1;
    return ret;
}

const startGame = () => {
    question.innerHTML = quizArr[questionCounter].question;
    for (let i = 0; i < 4; i++) choices[i].innerHTML = quizArr[questionCounter].choiceList[i];
    questionCounter++;
    choices.forEach((choice) => {
        choice.addEventListener('click', (option) => {  
            if (selected) return;
            selected = true;
            let optionNumber = option.target.dataset['number'];
            optionNumber = parseInt(optionNumber);
            let classToApply = "incorrect";
            if (optionNumber === quizArr[questionCounter-1].correctAnswer) {
                classToApply = "correct";
                score += CORRECT_BONUS;
            }
            option.target.parentElement.classList.add(classToApply);
            const scoreText = document.getElementById("score");
            scoreText.innerHTML = score;
            setTimeout(() => {
                option.target.parentElement.classList.remove(classToApply);
                askQuestion();
            }, 750);
        });
    });
}

const askQuestion = () => {
    if (questionCounter == MAX_QUESTIONS) {
        gameEnd();
        return;
    }
    question.innerHTML = quizArr[questionCounter].question;
    for (let i = 0; i < 4; i++) choices[i].innerHTML = quizArr[questionCounter].choiceList[i];
    selected = false;
    questionCounter++;
    const progressBar = document.getElementById("progressBarFull");
    progressBar.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
    const numQuestions = document.getElementById("question-counter");
    numQuestions.innerHTML = `${questionCounter}/${MAX_QUESTIONS}`;
}

const gameEnd = () => {
    localStorage.setItem('userScore', score)
    return window.location.assign('end.html');
}

