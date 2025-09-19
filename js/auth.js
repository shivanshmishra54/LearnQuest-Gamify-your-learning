// Authentication System for LearnQuest Platform

class AuthSystem {
  constructor() {
    this.currentUser = null
    this.users = JSON.parse(localStorage.getItem("learnquest_users")) || []
    this.init()
  }

  init() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("learnquest_current_user")
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser)
      this.showDashboard()
    }

    // Setup form event listeners
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Login form
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => this.handleLogin(e))
    }

    // Register form
    const registerForm = document.getElementById("registerForm")
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => this.handleRegister(e))
    }

    // Role selection change
    const roleSelect = document.getElementById("registerRole")
    if (roleSelect) {
      roleSelect.addEventListener("change", (e) => this.handleRoleChange(e))
    }
  }

  handleLogin(e) {
    e.preventDefault()

    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    // Find user
    const user = this.users.find((u) => u.email === email && u.password === password)

    if (user) {
      this.currentUser = user
      localStorage.setItem("learnquest_current_user", JSON.stringify(user))
      this.showSuccessMessage("Login successful!")
      this.closeModal("loginModal")
      this.showDashboard()
    } else {
      this.showErrorMessage("Invalid email or password")
    }
  }

  handleRegister(e) {
    e.preventDefault()

    const name = document.getElementById("registerName").value
    const email = document.getElementById("registerEmail").value
    const password = document.getElementById("registerPassword").value
    const role = document.getElementById("registerRole").value
    const studentClass = document.getElementById("registerClass").value

    // Validate required fields
    if (!name || !email || !password || !role) {
      this.showErrorMessage("Please fill in all required fields")
      return
    }

    if (role === "student" && !studentClass) {
      this.showErrorMessage("Please select your class")
      return
    }

    // Check if user already exists
    if (this.users.find((u) => u.email === email)) {
      this.showErrorMessage("User with this email already exists")
      return
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role,
      class: role === "student" ? studentClass : null,
      createdAt: new Date().toISOString(),
      // Student-specific data
      xp: 0,
      level: 1,
      badges: [],
      streak: 0,
      subjects: {
        math: { progress: 0, score: 0 },
        science: { progress: 0, score: 0 },
        physics: { progress: 0, score: 0 },
      },
    }

    this.users.push(newUser)
    localStorage.setItem("learnquest_users", JSON.stringify(this.users))

    this.currentUser = newUser
    localStorage.setItem("learnquest_current_user", JSON.stringify(newUser))

    this.showSuccessMessage("Account created successfully!")
    this.closeModal("registerModal")
    this.showDashboard()
  }

  handleRoleChange(e) {
    const role = e.target.value
    const studentFields = document.getElementById("studentFields")

    if (role === "student") {
      studentFields.style.display = "block"
    } else {
      studentFields.style.display = "none"
    }
  }

  showDashboard() {
    // Hide landing page
    document.getElementById("landingPage").classList.remove("active")

    // Show appropriate dashboard
    if (this.currentUser.role === "student") {
      document.getElementById("studentDashboard").classList.add("active")
      this.loadStudentDashboard()
    } else if (this.currentUser.role === "teacher") {
      document.getElementById("teacherDashboard").classList.add("active")
      this.loadTeacherDashboard()
    }
  }

  loadStudentDashboard() {
    const user = this.currentUser

    // Update user info
    document.getElementById("studentName").textContent = user.name
    document.getElementById("studentLevel").textContent = user.level
    document.getElementById("studentXP").textContent = user.xp

    // Update stats
    document.getElementById("classRank").textContent = this.getClassRank(user)
    document.getElementById("streak").textContent = user.streak
    document.getElementById("badges").textContent = user.badges.length
    document.getElementById("accuracy").textContent = this.calculateAccuracy(user) + "%"
  }

  loadTeacherDashboard() {
    const user = this.currentUser

    // Update teacher info
    document.getElementById("teacherName").textContent = user.name

    // Load students data
    this.loadStudentsData()
  }

  loadStudentsData() {
    const students = this.users.filter((u) => u.role === "student")
    const activeStudents = students.filter((s) => this.isActiveThisWeek(s))

    // Update teacher stats
    document.getElementById("totalStudents").textContent = students.length
    document.getElementById("activeStudents").textContent = activeStudents.length
    document.getElementById("avgScore").textContent = this.calculateAverageScore(students) + "%"

    // Populate students list
    const studentsList = document.getElementById("studentsList")
    studentsList.innerHTML = ""

    students.forEach((student) => {
      const studentCard = this.createStudentCard(student)
      studentsList.appendChild(studentCard)
    })
  }

  createStudentCard(student) {
    const card = document.createElement("div")
    card.className = "student-card"

    const status = this.getStudentStatus(student)
    const statusClass = status.toLowerCase()

    card.innerHTML = `
            <img src="images/friendly-cartoon-mascot-owl-with-graduation-cap.jpg" alt="${student.name}" class="student-avatar">
            <div class="student-info">
                <h4>${student.name}</h4>
                <p>Class ${student.class} • ${student.xp} XP</p>
            </div>
            <div class="student-status ${statusClass}">${status}</div>
        `

    return card
  }

  getStudentStatus(student) {
    const accuracy = this.calculateAccuracy(student)
    if (accuracy >= 80) return "Excellent"
    if (accuracy >= 60) return "Active"
    return "Struggling"
  }

  getClassRank(user) {
    const classmates = this.users
      .filter((u) => u.role === "student" && u.class === user.class)
      .sort((a, b) => b.xp - a.xp)

    return classmates.findIndex((u) => u.id === user.id) + 1
  }

  calculateAccuracy(user) {
    const subjects = Object.values(user.subjects)
    const totalScore = subjects.reduce((sum, subject) => sum + subject.score, 0)
    const avgScore = subjects.length > 0 ? totalScore / subjects.length : 0
    return Math.round(avgScore)
  }

  calculateAverageScore(students) {
    if (students.length === 0) return 0
    const totalAccuracy = students.reduce((sum, student) => sum + this.calculateAccuracy(student), 0)
    return Math.round(totalAccuracy / students.length)
  }

  isActiveThisWeek(student) {
    // Simple check - in real app would check actual activity
    return student.streak > 0 || student.xp > 0
  }

  logout() {
    this.currentUser = null
    localStorage.removeItem("learnquest_current_user")

    // Hide all dashboards
    document.getElementById("studentDashboard").classList.remove("active")
    document.getElementById("teacherDashboard").classList.remove("active")
    document.getElementById("quizInterface").classList.remove("active")
    document.getElementById("leaderboard").classList.remove("active")

    // Show landing page
    document.getElementById("landingPage").classList.add("active")

    this.showSuccessMessage("Logged out successfully")
  }

  showSuccessMessage(message) {
    this.showMessage(message, "success")
  }

  showErrorMessage(message) {
    this.showMessage(message, "error")
  }

  showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement("div")
    messageEl.className = `message ${type}`
    messageEl.textContent = message
    messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            background: ${type === "success" ? "#10b981" : "#ef4444"};
        `

    document.body.appendChild(messageEl)

    // Remove after 3 seconds
    setTimeout(() => {
      messageEl.remove()
    }, 3000)
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.remove("active")
    }
  }

  // Public methods for global access
  getCurrentUser() {
    return this.currentUser
  }

  updateUserData(userData) {
    if (this.currentUser) {
      Object.assign(this.currentUser, userData)
      localStorage.setItem("learnquest_current_user", JSON.stringify(this.currentUser))

      // Update in users array
      const userIndex = this.users.findIndex((u) => u.id === this.currentUser.id)
      if (userIndex !== -1) {
        this.users[userIndex] = this.currentUser
        localStorage.setItem("learnquest_users", JSON.stringify(this.users))
      }
    }
  }

  getAllUsers() {
    return this.users
  }
}

// Initialize auth system
const authSystem = new AuthSystem()

// Global functions for HTML onclick handlers
function showLogin() {
  document.getElementById("loginModal").classList.add("active")
}

function showRegister(role = "") {
  const modal = document.getElementById("registerModal")
  modal.classList.add("active")

  if (role) {
    document.getElementById("registerRole").value = role
    const event = new Event("change")
    document.getElementById("registerRole").dispatchEvent(event)
  }
}

function switchToLogin() {
  document.getElementById("registerModal").classList.remove("active")
  document.getElementById("loginModal").classList.add("active")
}

function switchToRegister() {
  document.getElementById("loginModal").classList.remove("active")
  document.getElementById("registerModal").classList.add("active")
}

function closeModal(modalId) {
  authSystem.closeModal(modalId)
}

function logout() {
  authSystem.logout()
}

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active")
  }
})
