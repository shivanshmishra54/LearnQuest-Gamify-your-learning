// Main application initialization and global functions

const initializeLanguageSystem = null // Declare initializeLanguageSystem variable
const authSystem = null // Declare authSystem variable
const loadLeaderboardData = null // Declare loadLeaderboardData variable
const initializeQuiz = null // Declare initializeQuiz variable

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] LearnQuest platform initialized")

  // Initialize language system
  if (typeof initializeLanguageSystem === "function") {
    initializeLanguageSystem()
  }

  // Add CSS animation styles
  addAnimationStyles()
})

function addAnimationStyles() {
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .message {
            animation: slideIn 0.3s ease;
        }
    `
  document.head.appendChild(style)
}

// Global navigation functions
function showStudentDashboard() {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })

  // Show student dashboard
  document.getElementById("studentDashboard").classList.add("active")

  // Refresh dashboard data
  if (authSystem && authSystem.getCurrentUser()) {
    authSystem.loadStudentDashboard()
  }
}

function showTeacherDashboard() {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })

  // Show teacher dashboard
  document.getElementById("teacherDashboard").classList.add("active")

  // Refresh dashboard data
  if (authSystem && authSystem.getCurrentUser()) {
    authSystem.loadTeacherDashboard()
  }
}

function showLeaderboard() {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })

  // Show leaderboard
  document.getElementById("leaderboard").classList.add("active")

  // Load leaderboard data
  if (typeof loadLeaderboardData === "function") {
    loadLeaderboardData()
  }
}

function startQuiz(subject) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })

  // Show quiz interface
  document.getElementById("quizInterface").classList.add("active")

  // Initialize quiz
  if (typeof initializeQuiz === "function") {
    initializeQuiz(subject)
  }
}

// Utility functions
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Sample data generation for demo
function generateSampleData() {
  const sampleUsers = [
    {
      id: "1",
      name: "Arjun Sharma",
      email: "arjun@example.com",
      password: "password123",
      role: "student",
      class: "10",
      xp: 950,
      level: 5,
      badges: ["Math Master", "Science Explorer", "Quick Learner"],
      streak: 7,
      subjects: {
        math: { progress: 85, score: 92 },
        science: { progress: 70, score: 88 },
        physics: { progress: 60, score: 85 },
      },
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya@example.com",
      password: "password123",
      role: "student",
      class: "10",
      xp: 850,
      level: 4,
      badges: ["Science Star", "Consistent Learner"],
      streak: 5,
      subjects: {
        math: { progress: 75, score: 85 },
        science: { progress: 90, score: 95 },
        physics: { progress: 55, score: 80 },
      },
    },
    {
      id: "3",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      password: "password123",
      role: "student",
      class: "10",
      xp: 780,
      level: 4,
      badges: ["Physics Pro"],
      streak: 3,
      subjects: {
        math: { progress: 65, score: 78 },
        science: { progress: 60, score: 82 },
        physics: { progress: 80, score: 90 },
      },
    },
    {
      id: "4",
      name: "Dr. Sunita Verma",
      email: "sunita@example.com",
      password: "password123",
      role: "teacher",
      class: null,
    },
  ]

  // Only add sample data if no users exist
  const existingUsers = JSON.parse(localStorage.getItem("learnquest_users")) || []
  if (existingUsers.length === 0) {
    localStorage.setItem("learnquest_users", JSON.stringify(sampleUsers))
    console.log("[v0] Sample data generated")
  }
}

// Generate sample data on first load
generateSampleData()
