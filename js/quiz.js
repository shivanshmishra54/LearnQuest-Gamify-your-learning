// KBC-Style Quiz System for LearnQuest Platform

class KBCQuiz {
  constructor() {
    this.currentQuestion = 0
    this.score = 0
    this.timeLeft = 30
    this.timer = null
    this.questions = []
    this.selectedAnswer = null
    this.isAnswering = false
    this.subject = ""
    this.startTime = null
    this.questionsAnswered = 0

    // Lifelines
    this.lifelines = {
      fiftyFifty: true,
      audiencePoll: true,
      phoneAFriend: true,
    }

    // Prize levels (XP rewards)
    this.prizeLevels = [
      { level: 1, xp: 10, label: "Beginner" },
      { level: 2, xp: 20, label: "Novice" },
      { level: 3, xp: 30, label: "Learner" },
      { level: 4, xp: 50, label: "Student" },
      { level: 5, xp: 75, label: "Scholar" },
      { level: 6, xp: 100, label: "Expert" },
      { level: 7, xp: 150, label: "Master" },
      { level: 8, xp: 200, label: "Genius" },
      { level: 9, xp: 300, label: "Prodigy" },
      { level: 10, xp: 500, label: "Legend" },
    ]

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.createQuizInterface()
  }

  setupEventListeners() {
    // Option selection
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("option-btn") && !this.isAnswering) {
        this.selectOption(e.target)
      }
    })

    // Lifeline buttons
    document.addEventListener("click", (e) => {
      if (e.target.closest(".lifeline-btn")) {
        const lifeline = e.target.closest(".lifeline-btn").dataset.lifeline
        this.useLifeline(lifeline)
      }
    })

    // Final answer button
    document.addEventListener("click", (e) => {
      if (e.target.id === "finalAnswerBtn") {
        this.submitAnswer()
      }
    })

    // Quit game button
    document.addEventListener("click", (e) => {
      if (e.target.id === "quitGameBtn") {
        this.quitGame()
      }
    })
  }

  createQuizInterface() {
    // This method assumes the HTML structure exists
    // We'll enhance the existing quiz interface
    this.updatePrizeLadder()
  }

  startQuiz(subject) {
    this.subject = subject
    this.currentQuestion = 0
    this.score = 0
    this.timeLeft = 30
    this.selectedAnswer = null
    this.isAnswering = false
    this.startTime = Date.now()
    this.questionsAnswered = 0

    // Reset lifelines
    this.lifelines = {
      fiftyFifty: true,
      audiencePoll: true,
      phoneAFriend: true,
    }

    // Load questions for the subject
    this.loadQuestions(subject)

    // Show quiz interface
    this.showQuizInterface()

    // Start first question
    this.loadQuestion()
  }

  loadQuestions(subject) {
    // Sample questions database - in real app would come from API
    const questionBank = {
      math: [
        {
          question: "What is 15 × 8?",
          options: ["110", "120", "130", "140"],
          correct: 1,
          difficulty: 1,
        },
        {
          question: "What is the square root of 144?",
          options: ["10", "11", "12", "13"],
          correct: 2,
          difficulty: 2,
        },
        {
          question: "If x + 5 = 12, what is x?",
          options: ["5", "6", "7", "8"],
          correct: 2,
          difficulty: 2,
        },
        {
          question: "What is 25% of 80?",
          options: ["15", "20", "25", "30"],
          correct: 1,
          difficulty: 3,
        },
        {
          question: "What is the value of π (pi) to 2 decimal places?",
          options: ["3.12", "3.14", "3.16", "3.18"],
          correct: 1,
          difficulty: 3,
        },
        {
          question: "What is the derivative of x²?",
          options: ["x", "2x", "x²", "2x²"],
          correct: 1,
          difficulty: 4,
        },
        {
          question: "What is log₁₀(1000)?",
          options: ["2", "3", "4", "5"],
          correct: 1,
          difficulty: 5,
        },
        {
          question: "What is the integral of 2x?",
          options: ["x²", "x² + C", "2x²", "x² + 2C"],
          correct: 1,
          difficulty: 6,
        },
        {
          question: "What is the sum of angles in a triangle?",
          options: ["90°", "180°", "270°", "360°"],
          correct: 1,
          difficulty: 1,
        },
        {
          question: "What is the Fibonacci sequence's 7th number?",
          options: ["8", "13", "21", "34"],
          correct: 1,
          difficulty: 7,
        },
      ],
      science: [
        {
          question: "What is the chemical symbol for water?",
          options: ["H₂O", "CO₂", "NaCl", "O₂"],
          correct: 0,
          difficulty: 1,
        },
        {
          question: "How many bones are in the human body?",
          options: ["196", "206", "216", "226"],
          correct: 1,
          difficulty: 2,
        },
        {
          question: "What is the speed of light?",
          options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
          correct: 0,
          difficulty: 3,
        },
        {
          question: "What is the atomic number of Carbon?",
          options: ["4", "6", "8", "12"],
          correct: 1,
          difficulty: 2,
        },
        {
          question: "Which planet is closest to the Sun?",
          options: ["Venus", "Earth", "Mercury", "Mars"],
          correct: 2,
          difficulty: 1,
        },
        {
          question: "What is the pH of pure water?",
          options: ["6", "7", "8", "9"],
          correct: 1,
          difficulty: 3,
        },
        {
          question: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
          correct: 2,
          difficulty: 2,
        },
        {
          question: "What is Avogadro's number?",
          options: ["6.022 × 10²³", "6.022 × 10²²", "6.022 × 10²⁴", "6.022 × 10²¹"],
          correct: 0,
          difficulty: 4,
        },
        {
          question: "What is the most abundant gas in Earth's atmosphere?",
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
          correct: 2,
          difficulty: 2,
        },
        {
          question: "What is the half-life of Carbon-14?",
          options: ["5,730 years", "5,370 years", "7,530 years", "3,750 years"],
          correct: 0,
          difficulty: 5,
        },
      ],
      physics: [
        {
          question: "What is Newton's first law of motion?",
          options: [
            "F = ma",
            "Every action has an equal and opposite reaction",
            "An object at rest stays at rest",
            "E = mc²",
          ],
          correct: 2,
          difficulty: 1,
        },
        {
          question: "What is the unit of force?",
          options: ["Joule", "Newton", "Watt", "Pascal"],
          correct: 1,
          difficulty: 1,
        },
        {
          question: "What is the acceleration due to gravity on Earth?",
          options: ["9.8 m/s²", "10 m/s²", "9.6 m/s²", "8.9 m/s²"],
          correct: 0,
          difficulty: 2,
        },
        {
          question: "What is Einstein's mass-energy equivalence formula?",
          options: ["E = mc", "E = mc²", "E = m²c", "E = 2mc"],
          correct: 1,
          difficulty: 2,
        },
        {
          question: "What is the speed of sound in air at room temperature?",
          options: ["343 m/s", "300 m/s", "400 m/s", "500 m/s"],
          correct: 0,
          difficulty: 3,
        },
        {
          question: "What is Planck's constant?",
          options: ["6.626 × 10⁻³⁴ J·s", "6.626 × 10⁻³³ J·s", "6.626 × 10⁻³⁵ J·s", "6.626 × 10⁻³² J·s"],
          correct: 0,
          difficulty: 4,
        },
        {
          question: "What is the uncertainty principle?",
          options: ["ΔxΔp ≥ ℏ/2", "ΔxΔp ≥ ℏ", "ΔxΔp = ℏ/2", "ΔxΔp ≤ ℏ/2"],
          correct: 0,
          difficulty: 5,
        },
        {
          question: "What is the Schwarzschild radius formula?",
          options: ["rs = 2GM/c²", "rs = GM/c²", "rs = 2GM/c", "rs = GM/2c²"],
          correct: 0,
          difficulty: 6,
        },
        {
          question: "What is the fine structure constant?",
          options: ["1/137", "1/127", "1/147", "1/157"],
          correct: 0,
          difficulty: 7,
        },
        {
          question: "What is the Chandrasekhar limit?",
          options: ["1.4 solar masses", "2.4 solar masses", "3.4 solar masses", "0.4 solar masses"],
          correct: 0,
          difficulty: 8,
        },
      ],
    }

    // Get questions for the subject and shuffle them
    this.questions = this.shuffleArray([...(questionBank[subject] || questionBank.math)])

    // Sort by difficulty for progressive challenge
    this.questions.sort((a, b) => a.difficulty - b.difficulty)

    // Take only 10 questions
    this.questions = this.questions.slice(0, 10)
  }

  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  showQuizInterface() {
    // Hide all other pages
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active")
    })

    // Show quiz interface
    document.getElementById("quizInterface").classList.add("active")

    // Update quiz header
    const subjectTitle = document.getElementById("quizSubject")
    if (subjectTitle) {
      subjectTitle.textContent = this.subject.charAt(0).toUpperCase() + this.subject.slice(1) + " Quiz"
    }

    // Reset quiz display
    this.updateQuizDisplay()
  }

  loadQuestion() {
    if (this.currentQuestion >= this.questions.length) {
      this.completeQuiz()
      return
    }

    const question = this.questions[this.currentQuestion]

    // Update question display
    const questionElement = document.getElementById("currentQuestion")
    const questionText = document.getElementById("questionText")
    const optionsContainer = document.getElementById("optionsContainer")

    if (questionElement) {
      questionElement.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`
    }

    if (questionText) {
      questionText.textContent = question.question
    }

    // Create option buttons
    if (optionsContainer) {
      optionsContainer.innerHTML = ""

      question.options.forEach((option, index) => {
        const button = document.createElement("button")
        button.className = "option-btn"
        button.dataset.index = index
        button.innerHTML = `
          <span class="option-letter">${String.fromCharCode(65 + index)}</span>
          <span class="option-text">${option}</span>
        `
        optionsContainer.appendChild(button)
      })
    }

    // Reset selection
    this.selectedAnswer = null
    this.updateFinalAnswerButton()

    // Update prize ladder
    this.updatePrizeLadder()

    // Start timer
    this.startTimer()

    // Add question animation
    this.animateQuestionEntry()
  }

  animateQuestionEntry() {
    const questionCard = document.querySelector(".question-card")
    if (questionCard) {
      questionCard.style.opacity = "0"
      questionCard.style.transform = "translateY(20px)"

      setTimeout(() => {
        questionCard.style.transition = "all 0.5s ease"
        questionCard.style.opacity = "1"
        questionCard.style.transform = "translateY(0)"
      }, 100)
    }
  }

  selectOption(button) {
    if (this.isAnswering) return

    // Remove previous selection
    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.classList.remove("selected")
    })

    // Select new option
    button.classList.add("selected")
    this.selectedAnswer = Number.parseInt(button.dataset.index)

    // Update final answer button
    this.updateFinalAnswerButton()

    // Play selection sound effect (visual feedback)
    this.playSelectionEffect(button)
  }

  playSelectionEffect(button) {
    button.style.transform = "scale(1.05)"
    setTimeout(() => {
      button.style.transform = "scale(1)"
    }, 200)
  }

  updateFinalAnswerButton() {
    const finalAnswerBtn = document.getElementById("finalAnswerBtn")
    if (finalAnswerBtn) {
      finalAnswerBtn.disabled = this.selectedAnswer === null
      finalAnswerBtn.style.opacity = this.selectedAnswer !== null ? "1" : "0.5"
    }
  }

  submitAnswer() {
    if (this.selectedAnswer === null || this.isAnswering) return

    this.isAnswering = true
    this.stopTimer()

    const question = this.questions[this.currentQuestion]
    const isCorrect = this.selectedAnswer === question.correct

    // Show answer feedback
    this.showAnswerFeedback(isCorrect)

    if (isCorrect) {
      this.score += this.prizeLevels[this.currentQuestion]?.xp || 10
      this.questionsAnswered++

      // Move to next question after delay
      setTimeout(() => {
        this.currentQuestion++
        this.isAnswering = false
        this.loadQuestion()
      }, 3000)
    } else {
      // Game over
      setTimeout(() => {
        this.gameOver()
      }, 3000)
    }
  }

  showAnswerFeedback(isCorrect) {
    const question = this.questions[this.currentQuestion]
    const options = document.querySelectorAll(".option-btn")

    // Highlight correct answer
    options[question.correct].classList.add("correct")

    // Highlight wrong answer if selected
    if (!isCorrect && this.selectedAnswer !== null) {
      options[this.selectedAnswer].classList.add("incorrect")
    }

    // Show feedback message
    this.showFeedbackMessage(isCorrect)

    // Disable all options
    options.forEach((option) => {
      option.style.pointerEvents = "none"
    })
  }

  showFeedbackMessage(isCorrect) {
    const message = document.createElement("div")
    message.className = `feedback-message ${isCorrect ? "correct" : "incorrect"}`
    message.innerHTML = `
      <div class="feedback-content">
        <i class="fas fa-${isCorrect ? "check-circle" : "times-circle"}"></i>
        <h3>${isCorrect ? "Correct!" : "Wrong Answer!"}</h3>
        <p>${
          isCorrect ? `You earned ${this.prizeLevels[this.currentQuestion]?.xp || 10} XP!` : "Better luck next time!"
        }</p>
      </div>
    `

    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${isCorrect ? "linear-gradient(135deg, #10b981, #22c55e)" : "linear-gradient(135deg, #ef4444, #f87171)"};
      color: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      z-index: 10001;
      animation: feedbackBounce 0.6s ease;
      text-align: center;
      min-width: 300px;
    `

    document.body.appendChild(message)

    // Add animation styles
    this.addFeedbackStyles()

    // Remove after delay
    setTimeout(() => {
      message.remove()
    }, 2800)
  }

  addFeedbackStyles() {
    if (document.querySelector("#feedback-styles")) return

    const style = document.createElement("style")
    style.id = "feedback-styles"
    style.textContent = `
      @keyframes feedbackBounce {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
      
      .feedback-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
      
      .feedback-content i {
        font-size: 3rem;
      }
      
      .feedback-content h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
      }
      
      .feedback-content p {
        margin: 0;
        font-size: 1rem;
        opacity: 0.9;
      }
    `
    document.head.appendChild(style)
  }

  startTimer() {
    this.timeLeft = 30
    this.updateTimerDisplay()

    this.timer = setInterval(() => {
      this.timeLeft--
      this.updateTimerDisplay()

      if (this.timeLeft <= 0) {
        this.timeUp()
      }
    }, 1000)
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  updateTimerDisplay() {
    const timerElement = document.getElementById("timeLeft")
    if (timerElement) {
      timerElement.textContent = this.timeLeft

      // Change color based on time left
      if (this.timeLeft <= 10) {
        timerElement.style.color = "#ef4444"
        timerElement.style.animation = "pulse 1s infinite"
      } else {
        timerElement.style.color = "#f59e0b"
        timerElement.style.animation = "none"
      }
    }
  }

  timeUp() {
    this.stopTimer()
    this.gameOver("Time's up!")
  }

  useLifeline(lifeline) {
    if (!this.lifelines[lifeline] || this.isAnswering) return

    this.lifelines[lifeline] = false
    this.updateLifelinesDisplay()

    const question = this.questions[this.currentQuestion]

    switch (lifeline) {
      case "fiftyFifty":
        this.useFiftyFifty(question)
        break
      case "audiencePoll":
        this.useAudiencePoll(question)
        break
      case "phoneAFriend":
        this.usePhoneAFriend(question)
        break
    }
  }

  useFiftyFifty(question) {
    const options = document.querySelectorAll(".option-btn")
    const correctIndex = question.correct
    const wrongIndices = []

    // Find wrong answers
    for (let i = 0; i < options.length; i++) {
      if (i !== correctIndex) {
        wrongIndices.push(i)
      }
    }

    // Remove 2 wrong answers randomly
    const toRemove = this.shuffleArray(wrongIndices).slice(0, 2)

    toRemove.forEach((index) => {
      options[index].style.opacity = "0.3"
      options[index].style.pointerEvents = "none"
      options[index].classList.add("eliminated")
    })

    this.showLifelineMessage("50:50 used! Two wrong answers eliminated.")
  }

  useAudiencePoll(question) {
    const correctIndex = question.correct
    const percentages = [0, 0, 0, 0]

    // Generate realistic audience poll (correct answer gets higher percentage)
    percentages[correctIndex] = 45 + Math.random() * 35 // 45-80%

    let remaining = 100 - percentages[correctIndex]
    for (let i = 0; i < 4; i++) {
      if (i !== correctIndex) {
        if (remaining > 0) {
          const share = Math.random() * remaining
          percentages[i] = Math.round(share)
          remaining -= percentages[i]
        }
      }
    }

    // Ensure total is 100%
    percentages[correctIndex] = Math.round(percentages[correctIndex] + remaining)

    this.showAudiencePollResults(percentages)
  }

  showAudiencePollResults(percentages) {
    const modal = document.createElement("div")
    modal.className = "modal audience-poll-modal"
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Audience Poll Results</h3>
          <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
        </div>
        <div class="poll-results">
          ${percentages
            .map(
              (percent, index) => `
            <div class="poll-option">
              <span class="poll-letter">${String.fromCharCode(65 + index)}</span>
              <div class="poll-bar">
                <div class="poll-fill" style="width: ${percent}%"></div>
              </div>
              <span class="poll-percentage">${percent}%</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `

    document.body.appendChild(modal)
    modal.classList.add("active")

    // Add poll styles
    this.addPollStyles()
  }

  addPollStyles() {
    if (document.querySelector("#poll-styles")) return

    const style = document.createElement("style")
    style.id = "poll-styles"
    style.textContent = `
      .audience-poll-modal .modal-content {
        max-width: 500px;
      }
      
      .poll-results {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .poll-option {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .poll-letter {
        width: 30px;
        height: 30px;
        background: var(--primary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
      }
      
      .poll-bar {
        flex: 1;
        height: 20px;
        background: var(--border);
        border-radius: 10px;
        overflow: hidden;
      }
      
      .poll-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        border-radius: 10px;
        transition: width 1s ease;
        animation: pollFill 1s ease;
      }
      
      @keyframes pollFill {
        from { width: 0%; }
      }
      
      .poll-percentage {
        font-weight: 600;
        color: var(--text-primary);
        min-width: 40px;
        text-align: right;
      }
    `
    document.head.appendChild(style)
  }

  usePhoneAFriend(question) {
    const correctIndex = question.correct
    const confidence = Math.random()

    let message = ""
    if (confidence > 0.7) {
      message = `I'm quite confident the answer is ${String.fromCharCode(65 + correctIndex)}.`
    } else if (confidence > 0.4) {
      message = `I think it might be ${String.fromCharCode(65 + correctIndex)}, but I'm not completely sure.`
    } else {
      // Sometimes give wrong answer to make it realistic
      const wrongIndex = Math.floor(Math.random() * 4)
      message = `I'm not really sure, but maybe ${String.fromCharCode(65 + wrongIndex)}?`
    }

    this.showPhoneAFriendMessage(message)
  }

  showPhoneAFriendMessage(message) {
    const modal = document.createElement("div")
    modal.className = "modal phone-friend-modal"
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3><i class="fas fa-phone"></i> Phone a Friend</h3>
          <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
        </div>
        <div class="friend-message">
          <div class="friend-avatar">
            <i class="fas fa-user-graduate"></i>
          </div>
          <div class="friend-text">
            <p>"${message}"</p>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)
    modal.classList.add("active")

    // Add phone friend styles
    this.addPhoneFriendStyles()
  }

  addPhoneFriendStyles() {
    if (document.querySelector("#phone-friend-styles")) return

    const style = document.createElement("style")
    style.id = "phone-friend-styles"
    style.textContent = `
      .phone-friend-modal .modal-content {
        max-width: 400px;
      }
      
      .friend-message {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--surface);
        border-radius: var(--radius-lg);
      }
      
      .friend-avatar {
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
      
      .friend-text p {
        margin: 0;
        font-style: italic;
        color: var(--text-primary);
        line-height: 1.5;
      }
    `
    document.head.appendChild(style)
  }

  showLifelineMessage(message) {
    const notification = document.createElement("div")
    notification.className = "lifeline-notification"
    notification.innerHTML = `
      <div class="lifeline-content">
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
      </div>
    `

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, var(--accent), #fbbf24);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideIn 0.5s ease;
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  updateLifelinesDisplay() {
    Object.keys(this.lifelines).forEach((lifeline) => {
      const button = document.querySelector(`[data-lifeline="${lifeline}"]`)
      if (button) {
        button.disabled = !this.lifelines[lifeline]
        button.style.opacity = this.lifelines[lifeline] ? "1" : "0.5"
      }
    })
  }

  updatePrizeLadder() {
    const ladder = document.getElementById("prizeLadder")
    if (!ladder) return

    ladder.innerHTML = ""

    // Show prize levels in reverse order (highest first)
    for (let i = this.prizeLevels.length - 1; i >= 0; i--) {
      const level = this.prizeLevels[i]
      const item = document.createElement("div")
      item.className = `prize-item ${i === this.currentQuestion ? "current" : ""} ${i < this.currentQuestion ? "completed" : ""}`

      item.innerHTML = `
        <span class="prize-level">${level.level}</span>
        <span class="prize-amount">${level.xp} XP</span>
        <span class="prize-label">${level.label}</span>
      `

      ladder.appendChild(item)
    }
  }

  quitGame() {
    this.stopTimer()

    // Show quit confirmation
    const modal = document.createElement("div")
    modal.className = "modal quit-modal"
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Quit Game?</h3>
        </div>
        <div class="quit-content">
          <p>Are you sure you want to quit?</p>
          <p>You will keep your current score of <strong>${this.score} XP</strong></p>
          <div class="quit-actions">
            <button class="btn btn-outline" onclick="this.closest('.modal').remove(); quiz.resumeGame()">Continue Playing</button>
            <button class="btn btn-primary" onclick="this.closest('.modal').remove(); quiz.endGame()">Quit & Keep Score</button>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)
    modal.classList.add("active")
  }

  resumeGame() {
    this.startTimer()
  }

  endGame() {
    this.completeQuiz()
  }

  gameOver(reason = "Wrong answer!") {
    this.stopTimer()
    this.showGameOverScreen(reason)
  }

  completeQuiz() {
    this.stopTimer()

    const timeSpent = Math.floor((Date.now() - this.startTime) / 1000)
    const finalScore = Math.round((this.score / this.prizeLevels.reduce((sum, level) => sum + level.xp, 0)) * 100)

    // Update user progress
    if (window.dashboardManager) {
      window.dashboardManager.completeQuiz(this.subject, finalScore, timeSpent, this.questionsAnswered)
    }

    this.showCompletionScreen(finalScore, timeSpent)
  }

  showGameOverScreen(reason) {
    const modal = document.createElement("div")
    modal.className = "modal game-over-modal"
    modal.innerHTML = `
      <div class="modal-content large">
        <div class="game-over-content">
          <div class="game-over-icon">
            <i class="fas fa-times-circle"></i>
          </div>
          <h2>Game Over!</h2>
          <p class="game-over-reason">${reason}</p>
          <div class="final-stats">
            <div class="stat">
              <span class="stat-value">${this.score}</span>
              <span class="stat-label">XP Earned</span>
            </div>
            <div class="stat">
              <span class="stat-value">${this.currentQuestion}</span>
              <span class="stat-label">Questions Answered</span>
            </div>
            <div class="stat">
              <span class="stat-value">${this.subject}</span>
              <span class="stat-label">Subject</span>
            </div>
          </div>
          <div class="game-over-actions">
            <button class="btn btn-primary" onclick="this.closest('.modal').remove(); quiz.restartQuiz()">Try Again</button>
            <button class="btn btn-outline" onclick="this.closest('.modal').remove(); quiz.returnToDashboard()">Back to Dashboard</button>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)
    modal.classList.add("active")

    this.addGameOverStyles()
  }

  showCompletionScreen(finalScore, timeSpent) {
    const modal = document.createElement("div")
    modal.className = "modal completion-modal"
    modal.innerHTML = `
      <div class="modal-content large">
        <div class="completion-content">
          <div class="completion-icon">
            <i class="fas fa-trophy"></i>
          </div>
          <h2>Congratulations!</h2>
          <p class="completion-message">You completed the ${this.subject} quiz!</p>
          <div class="final-stats">
            <div class="stat">
              <span class="stat-value">${this.score}</span>
              <span class="stat-label">Total XP</span>
            </div>
            <div class="stat">
              <span class="stat-value">${finalScore}%</span>
              <span class="stat-label">Final Score</span>
            </div>
            <div class="stat">
              <span class="stat-value">${Math.floor(timeSpent / 60)}:${(timeSpent % 60).toString().padStart(2, "0")}</span>
              <span class="stat-label">Time Taken</span>
            </div>
            <div class="stat">
              <span class="stat-value">${this.questionsAnswered}</span>
              <span class="stat-label">Questions Correct</span>
            </div>
          </div>
          <div class="completion-actions">
            <button class="btn btn-primary" onclick="this.closest('.modal').remove(); quiz.restartQuiz()">Play Again</button>
            <button class="btn btn-outline" onclick="this.closest('.modal').remove(); quiz.returnToDashboard()">Back to Dashboard</button>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)
    modal.classList.add("active")

    this.addCompletionStyles()
    this.playCelebrationEffect()
  }

  addGameOverStyles() {
    if (document.querySelector("#game-over-styles")) return

    const style = document.createElement("style")
    style.id = "game-over-styles"
    style.textContent = `
      .game-over-content {
        text-align: center;
        padding: 2rem;
      }
      
      .game-over-icon {
        width: 80px;
        height: 80px;
        background: #ef4444;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin: 0 auto 1.5rem;
      }
      
      .game-over-content h2 {
        margin: 0 0 1rem 0;
        font-size: 2rem;
        color: var(--text-primary);
      }
      
      .game-over-reason {
        color: var(--text-secondary);
        margin-bottom: 2rem;
        font-size: 1.1rem;
      }
      
      .final-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
        padding: 1.5rem;
        background: var(--surface);
        border-radius: var(--radius-lg);
      }
      
      .stat {
        text-align: center;
      }
      
      .stat-value {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 0.5rem;
      }
      
      .stat-label {
        font-size: 0.875rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .game-over-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }
    `
    document.head.appendChild(style)
  }

  addCompletionStyles() {
    if (document.querySelector("#completion-styles")) return

    const style = document.createElement("style")
    style.id = "completion-styles"
    style.textContent = `
      .completion-content {
        text-align: center;
        padding: 2rem;
      }
      
      .completion-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #1e293b;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin: 0 auto 1.5rem;
        animation: completionGlow 2s ease infinite;
      }
      
      @keyframes completionGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
        50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.6); }
      }
      
      .completion-content h2 {
        margin: 0 0 1rem 0;
        font-size: 2rem;
        color: var(--text-primary);
      }
      
      .completion-message {
        color: var(--text-secondary);
        margin-bottom: 2rem;
        font-size: 1.1rem;
      }
      
      .completion-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }
    `
    document.head.appendChild(style)
  }

  playCelebrationEffect() {
    // Create confetti effect
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        this.createConfettiParticle()
      }, i * 100)
    }
  }

  createConfettiParticle() {
    const particle = document.createElement("div")
    particle.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${["#22c55e", "#84cc16", "#fbbf24", "#ef4444", "#8b5cf6", "#06b6d4"][Math.floor(Math.random() * 6)]};
      top: 10%;
      left: ${Math.random() * 100}%;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10002;
      animation: confettiFall 3s ease-out forwards;
    `

    document.body.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 3000)
  }

  restartQuiz() {
    this.startQuiz(this.subject)
  }

  returnToDashboard() {
    // Hide quiz interface
    document.getElementById("quizInterface").classList.remove("active")

    // Show appropriate dashboard
    const user = window.authSystem?.getCurrentUser()
    if (user?.role === "student") {
      document.getElementById("studentDashboard").classList.add("active")
    } else if (user?.role === "teacher") {
      document.getElementById("teacherDashboard").classList.add("active")
    } else {
      document.getElementById("landingPage").classList.add("active")
    }
  }
}

// Initialize quiz system
const quiz = new KBCQuiz()

// Global function for starting quiz
function initializeQuiz(subject) {
  quiz.startQuiz(subject)
}

// Export for global access
window.quiz = quiz
window.initializeQuiz = initializeQuiz
