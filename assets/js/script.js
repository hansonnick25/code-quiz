// Setting DOM Elements & Global Variables
const timerEl = document.getElementById('timer')
const questionsEl = document.getElementById('questions')
const optionsEl = document.getElementById('options')
const highscoreEl = document.getElementById('highscores')
const tableBodyEl = document.getElementById('table-body')
const quizEndEl = document.getElementById('quiz-end')
const scoreFinalEl = document.getElementById('score-final')
const correctAnswersFinalEl = document.getElementById('correct-final')
const questionEl = document.getElementById('question-words')
const startScreenEl = document.getElementById('start-screen')
const startBtn = document.getElementById('start')
const submitBtn = document.getElementById('submit')
const restartBtn = document.getElementById('restart')
const clearBtn = document.getElementById('clear')
const submittedName = document.getElementById('name')

let currQuestionIndex = 0
let timeLeft = 60
let timerInterval
let correctAnswers = 0
let highscores = JSON.parse(window.localStorage.getItem('highscores')) || []

// Creating Object of Questions & Answers
const questions = [
  {
    question: 'The external JavaScript file must contain the <script> tag.',
    options: ['True', 'False'],
    answer: 'False',
  },

  {
    question: 'How do you write "Hello World" in an alert box?',
    options: [
      'alert("Hello World");',
      'alertBox("Hello World");',
      'msg("Hello World");',
      'msgBox("Hello World");',
    ],
    answer: 'alert("Hello World");',
  },

  {
    question: 'How do you create a function named "myFunction" in JavaScript?',
    options: [
      'function = myFunction()',
      'function.myFunction()',
      'function myFunction()',
    ],
    answer: 'function myFunction()',
  },

  {
    question: 'How do you call a function named "myFunction"?',
    options: [
      'call myFunction()',
      'myFunction()',
      'call function myFunction()',
    ],
    answer: 'myFunction()',
  },

  {
    question: 'What is the correct way to write a JavaScript array?',
    options: [
      'let colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
      'let colors = "red", "green", "blue"',
      'let colors = ["red", "green", "blue"]',
      'let colors = (1:"red", 2:"green", 3:"blue")',
    ],
    answer: 'let colors = ["red", "green", "blue"]',
  },
]

// startQuiz function which starts the timer, hides the start div, and sets bootstrap classes for the questions div
let startQuiz = function () {
  timerInterval = setInterval(countdownTimer, 1000)
  timerEl.textContent = `Time: ${timeLeft}`
  startScreenEl.setAttribute('class', 'd-none')
  questionsEl.setAttribute('class', 'row text-center mx-auto')
  nextQuestion()
}

// nextQuestion function which fills current question and answer, pulled from the object
let nextQuestion = function () {
  let currQuestion = questions[currQuestionIndex]
  questionEl.textContent = currQuestion.question
  optionsEl.innerHTML = ''
  currQuestion.options.forEach(function (option) {
    let optionBtn = document.createElement('button')
    optionBtn.textContent = option
    optionBtn.setAttribute('class', 'btn btn-md bg-dark text-white m-2')
    optionBtn.setAttribute('value', option)
    optionsEl.appendChild(optionBtn)
    optionBtn.onclick = clickOption
  })
}

// clickOption function checks if your
let clickOption = function () {
  if (this.value != questions[currQuestionIndex].answer) {
    timeLeft -= 10
    if (timeLeft < 0) timeLeft = 0
    timerEl.textContent = `Time: ${timeLeft}`
  } else {
    correctAnswers++
  }

  currQuestionIndex++
  if (currQuestionIndex < questions.length) nextQuestion()
  else endQuiz()
}

let endQuiz = function () {
  clearInterval(timerInterval)
  quizEndEl.setAttribute(
    'class',
    'row text-center mx-auto justify-content-center'
  )
  scoreFinalEl.textContent = timeLeft
  correctAnswersFinalEl.textContent = correctAnswers
  questionsEl.setAttribute('class', 'd-none')
  timerEl.textContent = '🎉 GAME COMPLETE 🎉'
}

let submitHighscore = function () {
  let newName = submittedName.value.trim()
  if (newName == '') alert('Please enter a name!')
  else {
    highscoreEl.setAttribute('class', 'row text-center')
    let newScore = {
      score: timeLeft,
      name: newName,
      correct: correctAnswers,
    }
    highscores.push(newScore)
    window.localStorage.setItem('highscores', JSON.stringify(highscores))
    sortHighscores()
  }
}

let sortHighscores = function () {
  highscores.sort((x, y) => {
    return y.score - x.score
  })
  displayHighscores()
}

let displayHighscores = function () {
  tableBodyEl.innerHTML = ''
  for (let i = 0; i < highscores.length; i++) {
    tableBodyEl.innerHTML +=
      '<tr><th scope="row">' +
      (i + 1) +
      '</th><td>' +
      highscores[i].name +
      '</td><td>' +
      highscores[i].score +
      '</td><td>' +
      highscores[i].correct +
      '</td></tr>'
  }
}

let restartQuiz = function () {
  currQuestionIndex = 0
  timeLeft = 60

  startScreenEl.setAttribute('class', 'col-6 mx-auto p-2')
  quizEndEl.setAttribute('class', 'd-none')
  highscoreEl.setAttribute('class', 'd-none')
  timerEl.textContent = 'Time: 0'
}

let countdownTimer = function () {
  timeLeft--
  timerEl.textContent = `Time: ${timeLeft}`
  if (timeLeft <= 0) {
    endQuiz()
  }
}

startBtn.onclick = startQuiz
submitBtn.onclick = submitHighscore
restartBtn.onclick = restartQuiz
