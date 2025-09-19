// Dashboard functionality for LearnQuest Platform

// Declare authSystem variable
const authSystem = {
  getCurrentUser: () => {
    // Mock implementation for demonstration purposes
    return {
      xp: 0,
      level: 1,
      lastActivity: null,
      subjectInteractions: {},
      badges: [],
      quizzesCompleted: 0,
      totalTimeSpent: 0,
      totalQuestionsAnswered: 0,
      subjects: {
        math: { score: 0, progress: 0 },
        science: { score: 0, progress: 0 },
      },
      physicsConceptsMastered: 0,
      studyDays: 0,
      streak: 0,
      role: "student", // Mock role for demonstration purposes
      class: "A", // Mock class for demonstration purposes
    }
  },
  updateUserData: (user) => {
    // Mock implementation for demonstration purposes
    console.log("User data updated:", user)
  },
  getAllUsers: () => {
    // Mock implementation for demonstration purposes
    return [
      {
        name: "Student 1",
        role: "student",
        class: "A",
        xp: 150,
        level: 1,
        lastActivity: null,
        subjectInteractions: {},
        badges: [],
        quizzesCompleted: 3,
        totalTimeSpent: 0,
        totalQuestionsAnswered: 0,
        subjects: {
          math: { score: 85, progress: 50 },
          science: { score: 70, progress: 30 },
        },
        physicsConceptsMastered: 0,
        studyDays: 0,
        streak: 0,
      },
      {
        name: "Student 2",
        role: "student",
        class: "A",
        xp: 200,
        level: 1,
        lastActivity: null,
        subjectInteractions: {},
        badges: [],
        quizzesCompleted: 5,
        totalTimeSpent: 0,
        totalQuestionsAnswered: 0,
        subjects: {
          math: { score: 95, progress: 70 },
          science: { score: 80, progress: 40 },
        },
        physicsConceptsMastered: 0,
        studyDays: 0,
        streak: 0,
      },
    ]
  },
}

class TeacherAnalytics {
  constructor() {
    this.init()
  }

  init() {
    this.setupTeacherEventListeners()
    this.loadTeacherAnalytics()
  }

  setupTeacherEventListeners() {
    // Filter controls
    const classFilter = document.getElementById("classFilter")
    const subjectFilter = document.getElementById("subjectFilter")
    const timeFilter = document.getElementById("timeFilter")

    if (classFilter) {
      classFilter.addEventListener("change", () => this.updateAnalytics())
    }
    if (subjectFilter) {
      subjectFilter.addEventListener("change", () => this.updateAnalytics())
    }
    if (timeFilter) {
      timeFilter.addEventListener("change", () => this.updateAnalytics())
    }
  }

  loadTeacherAnalytics() {
    const currentUser = authSystem?.getCurrentUser()
    if (!currentUser || currentUser.role !== "teacher") return

    // Get all students data
    const allUsers = authSystem?.getAllUsers() || []
    const students = allUsers.filter((user) => user.role === "student")

    this.updateTeacherStats(students)
    this.updateStudentsList(students)
    this.createPerformanceCharts(students)
    this.updateClassInsights(students)
  }

  updateTeacherStats(students) {
    const totalStudents = students.length
    const activeStudents = students.filter((s) => this.isActiveThisWeek(s)).length
    const avgScore = this.calculateClassAverageScore(students)
    const improvingStudents = students.filter((s) => this.isImproving(s)).length

    // Update DOM elements
    this.updateStatElement("totalStudents", totalStudents)
    this.updateStatElement("activeStudents", activeStudents)
    this.updateStatElement("avgScore", `${avgScore}%`)
    this.updateStatElement("improvingStudents", improvingStudents)

    // Add improvement percentage
    const improvementRate = totalStudents > 0 ? Math.round((improvingStudents / totalStudents) * 100) : 0
    this.updateStatElement("improvementRate", `${improvementRate}%`)
  }

  updateStatElement(id, value) {
    const element = document.getElementById(id)
    if (element) {
      element.textContent = value
    }
  }

  updateStudentsList(students) {
    const studentsList = document.getElementById("studentsList")
    if (!studentsList) return

    studentsList.innerHTML = ""

    // Sort students by performance
    const sortedStudents = students.sort((a, b) => {
      const scoreA = this.calculateStudentScore(a)
      const scoreB = this.calculateStudentScore(b)
      return scoreB - scoreA
    })

    sortedStudents.forEach((student, index) => {
      const studentCard = this.createDetailedStudentCard(student, index + 1)
      studentsList.appendChild(studentCard)
    })
  }

  createDetailedStudentCard(student, rank) {
    const card = document.createElement("div")
    card.className = "student-card detailed"

    const status = this.getStudentStatus(student)
    const statusClass = status.toLowerCase()
    const score = this.calculateStudentScore(student)
    const trend = this.getPerformanceTrend(student)

    card.innerHTML = `
      <div class="student-rank">#${rank}</div>
      <img src="images/friendly-cartoon-mascot-owl-with-graduation-cap.jpg" alt="${student.name}" class="student-avatar">
      <div class="student-info">
        <h4>${student.name}</h4>
        <p>Class ${student.class} • ${student.xp || 0} XP</p>
        <div class="student-subjects">
          <span class="subject-score math">Math: ${student.subjects?.math?.score || 0}%</span>
          <span class="subject-score science">Science: ${student.subjects?.science?.score || 0}%</span>
          <span class="subject-score physics">Physics: ${student.subjects?.physics?.score || 0}%</span>
        </div>
      </div>
      <div class="student-metrics">
        <div class="metric">
          <span class="metric-label">Overall</span>
          <span class="metric-value">${score}%</span>
        </div>
        <div class="metric">
          <span class="metric-label">Streak</span>
          <span class="metric-value">${student.streak || 0} days</span>
        </div>
        <div class="metric">
          <span class="metric-label">Quizzes</span>
          <span class="metric-value">${student.quizzesCompleted || 0}</span>
        </div>
      </div>
      <div class="student-status-container">
        <div class="student-status ${statusClass}">${status}</div>
        <div class="performance-trend ${trend.direction}">
          <i class="fas fa-arrow-${trend.direction === "up" ? "up" : trend.direction === "down" ? "down" : "right"}"></i>
          <span>${trend.label}</span>
        </div>
      </div>
    `

    // Add click handler for detailed view
    card.addEventListener("click", () => this.showStudentDetails(student))

    return card
  }

  showStudentDetails(student) {
    const modal = this.createStudentDetailsModal(student)
    document.body.appendChild(modal)
    modal.classList.add("active")
  }

  createStudentDetailsModal(student) {
    const modal = document.createElement("div")
    modal.className = "modal student-details-modal"

    const subjects = student.subjects || {}
    const badges = student.badges || []

    modal.innerHTML = `
      <div class="modal-content large">
        <div class="modal-header">
          <h2>${student.name} - Detailed Analytics</h2>
          <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
        </div>
        <div class="student-details-content">
          <div class="student-overview">
            <img src="images/friendly-cartoon-mascot-owl-with-graduation-cap.jpg" alt="${student.name}" class="student-avatar large">
            <div class="student-summary">
              <h3>${student.name}</h3>
              <p>Class ${student.class}</p>
              <div class="summary-stats">
                <div class="summary-stat">
                  <span class="stat-value">${student.xp || 0}</span>
                  <span class="stat-label">Total XP</span>
                </div>
                <div class="summary-stat">
                  <span class="stat-value">Level ${student.level || 1}</span>
                  <span class="stat-label">Current Level</span>
                </div>
                <div class="summary-stat">
                  <span class="stat-value">${student.streak || 0}</span>
                  <span class="stat-label">Day Streak</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="subjects-performance">
            <h4>Subject Performance</h4>
            <div class="subjects-grid">
              <div class="subject-detail math">
                <div class="subject-header">
                  <i class="fas fa-calculator"></i>
                  <span>Mathematics</span>
                </div>
                <div class="subject-metrics">
                  <div class="metric">Score: ${subjects.math?.score || 0}%</div>
                  <div class="metric">Progress: ${subjects.math?.progress || 0}%</div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: ${subjects.math?.progress || 0}%"></div>
                  </div>
                </div>
              </div>
              <div class="subject-detail science">
                <div class="subject-header">
                  <i class="fas fa-flask"></i>
                  <span>Science</span>
                </div>
                <div class="subject-metrics">
                  <div class="metric">Score: ${subjects.science?.score || 0}%</div>
                  <div class="metric">Progress: ${subjects.science?.progress || 0}%</div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: ${subjects.science?.progress || 0}%"></div>
                  </div>
                </div>
              </div>
              <div class="subject-detail physics">
                <div class="subject-header">
                  <i class="fas fa-atom"></i>
                  <span>Physics</span>
                </div>
                <div class="subject-metrics">
                  <div class="metric">Score: ${subjects.physics?.score || 0}%</div>
                  <div class="metric">Progress: ${subjects.physics?.progress || 0}%</div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: ${subjects.physics?.progress || 0}%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="achievements-section">
            <h4>Achievements (${badges.length})</h4>
            <div class="badges-grid">
              ${
                badges.length > 0
                  ? badges
                      .map(
                        (badge) => `
                <div class="badge-item">
                  <i class="fas fa-medal"></i>
                  <span>${badge}</span>
                </div>
              `,
                      )
                      .join("")
                  : '<p class="no-badges">No achievements yet</p>'
              }
            </div>
          </div>

          <div class="recommendations">
            <h4>Recommendations</h4>
            <div class="recommendations-list">
              ${this.generateRecommendations(student)
                .map(
                  (rec) => `
                <div class="recommendation ${rec.type}">
                  <i class="fas fa-${rec.icon}"></i>
                  <span>${rec.text}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    `

    return modal
  }

  generateRecommendations(student) {
    const recommendations = []
    const subjects = student.subjects || {}

    // Check for low performance
    Object.entries(subjects).forEach(([subject, data]) => {
      if (data.score < 60) {
        recommendations.push({
          type: "warning",
          icon: "exclamation-triangle",
          text: `Focus on ${subject} - current score is ${data.score}%`,
        })
      }
    })

    // Check for streak
    if ((student.streak || 0) < 3) {
      recommendations.push({
        type: "info",
        icon: "fire",
        text: "Encourage daily practice to build learning streak",
      })
    }

    // Check for quiz completion
    if ((student.quizzesCompleted || 0) < 5) {
      recommendations.push({
        type: "info",
        icon: "play-circle",
        text: "Assign more quizzes to improve engagement",
      })
    }

    // Positive reinforcement
    if (this.getStudentStatus(student) === "Excellent") {
      recommendations.push({
        type: "success",
        icon: "star",
        text: "Excellent performance! Consider advanced challenges",
      })
    }

    return recommendations.length > 0
      ? recommendations
      : [
          {
            type: "info",
            icon: "info-circle",
            text: "Student is making steady progress",
          },
        ]
  }

  createPerformanceCharts(students) {
    this.createClassOverviewChart(students)
    this.createSubjectComparisonChart(students)
    this.createProgressTrendChart(students)
  }

  createClassOverviewChart(students) {
    const chartContainer = document.getElementById("classOverviewChart")
    if (!chartContainer) return

    const excellent = students.filter((s) => this.getStudentStatus(s) === "Excellent").length
    const active = students.filter((s) => this.getStudentStatus(s) === "Active").length
    const struggling = students.filter((s) => this.getStudentStatus(s) === "Struggling").length

    chartContainer.innerHTML = `
      <div class="chart-header">
        <h4>Class Performance Distribution</h4>
      </div>
      <div class="performance-chart">
        <div class="chart-bar excellent" style="height: ${(excellent / students.length) * 100}%">
          <span class="bar-label">${excellent}</span>
          <span class="bar-category">Excellent</span>
        </div>
        <div class="chart-bar active" style="height: ${(active / students.length) * 100}%">
          <span class="bar-label">${active}</span>
          <span class="bar-category">Active</span>
        </div>
        <div class="chart-bar struggling" style="height: ${(struggling / students.length) * 100}%">
          <span class="bar-label">${struggling}</span>
          <span class="bar-category">Struggling</span>
        </div>
      </div>
    `
  }

  createSubjectComparisonChart(students) {
    const chartContainer = document.getElementById("subjectComparisonChart")
    if (!chartContainer) return

    const mathAvg = this.calculateSubjectAverage(students, "math")
    const scienceAvg = this.calculateSubjectAverage(students, "science")
    const physicsAvg = this.calculateSubjectAverage(students, "physics")

    chartContainer.innerHTML = `
      <div class="chart-header">
        <h4>Subject Performance Comparison</h4>
      </div>
      <div class="subject-chart">
        <div class="subject-bar math">
          <div class="subject-fill" style="width: ${mathAvg}%"></div>
          <span class="subject-label">Math: ${mathAvg}%</span>
        </div>
        <div class="subject-bar science">
          <div class="subject-fill" style="width: ${scienceAvg}%"></div>
          <span class="subject-label">Science: ${scienceAvg}%</span>
        </div>
        <div class="subject-bar physics">
          <div class="subject-fill" style="width: ${physicsAvg}%"></div>
          <span class="subject-label">Physics: ${physicsAvg}%</span>
        </div>
      </div>
    `
  }

  calculateSubjectAverage(students, subject) {
    const scores = students.map((s) => s.subjects?.[subject]?.score || 0).filter((score) => score > 0)

    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  }

  updateClassInsights(students) {
    const insights = this.generateClassInsights(students)
    const insightsContainer = document.getElementById("classInsights")

    if (insightsContainer) {
      insightsContainer.innerHTML = `
        <h4>Class Insights</h4>
        <div class="insights-list">
          ${insights
            .map(
              (insight) => `
            <div class="insight-item ${insight.type}">
              <i class="fas fa-${insight.icon}"></i>
              <span>${insight.text}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      `
    }
  }

  generateClassInsights(students) {
    const insights = []
    const totalStudents = students.length

    if (totalStudents === 0) {
      return [{ type: "info", icon: "info-circle", text: "No students enrolled yet" }]
    }

    // Engagement insight
    const activeStudents = students.filter((s) => this.isActiveThisWeek(s)).length
    const engagementRate = Math.round((activeStudents / totalStudents) * 100)

    if (engagementRate > 80) {
      insights.push({
        type: "success",
        icon: "thumbs-up",
        text: `Excellent engagement: ${engagementRate}% of students active this week`,
      })
    } else if (engagementRate < 50) {
      insights.push({
        type: "warning",
        icon: "exclamation-triangle",
        text: `Low engagement: Only ${engagementRate}% of students active this week`,
      })
    }

    // Performance insight
    const avgScore = this.calculateClassAverageScore(students)
    if (avgScore > 85) {
      insights.push({
        type: "success",
        icon: "star",
        text: `Outstanding class performance with ${avgScore}% average score`,
      })
    } else if (avgScore < 60) {
      insights.push({ type: "warning", icon: "chart-line", text: `Class average of ${avgScore}% needs improvement` })
    }

    // Subject-specific insights
    const mathAvg = this.calculateSubjectAverage(students, "math")
    const scienceAvg = this.calculateSubjectAverage(students, "science")
    const physicsAvg = this.calculateSubjectAverage(students, "physics")

    const highestSubject =
      mathAvg >= scienceAvg && mathAvg >= physicsAvg ? "Math" : scienceAvg >= physicsAvg ? "Science" : "Physics"
    const lowestSubject =
      mathAvg <= scienceAvg && mathAvg <= physicsAvg ? "Math" : scienceAvg <= physicsAvg ? "Science" : "Physics"

    insights.push({
      type: "info",
      icon: "chart-bar",
      text: `${highestSubject} is the strongest subject, ${lowestSubject} needs attention`,
    })

    return insights
  }

  // Helper methods
  isActiveThisWeek(student) {
    const lastActivity = student.lastActivity ? new Date(student.lastActivity) : null
    if (!lastActivity) return false

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return lastActivity > weekAgo
  }

  calculateStudentScore(student) {
    const subjects = student.subjects || {}
    const scores = Object.values(subjects)
      .map((s) => s.score || 0)
      .filter((s) => s > 0)
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  }

  calculateClassAverageScore(students) {
    const scores = students.map((s) => this.calculateStudentScore(s)).filter((s) => s > 0)
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  }

  getStudentStatus(student) {
    const score = this.calculateStudentScore(student)
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Active"
    return "Struggling"
  }

  getPerformanceTrend(student) {
    // Simple trend calculation - in real app would track historical data
    const score = this.calculateStudentScore(student)
    const streak = student.streak || 0

    if (score > 85 && streak > 5) {
      return { direction: "up", label: "Improving" }
    } else if (score < 60 || streak === 0) {
      return { direction: "down", label: "Declining" }
    }
    return { direction: "right", label: "Stable" }
  }

  isImproving(student) {
    return this.getPerformanceTrend(student).direction === "up"
  }

  updateAnalytics() {
    // Reload analytics with current filters
    this.loadTeacherAnalytics()
  }
}

class DashboardManager {
  constructor() {
    this.achievements = [
      {
        id: "first_quiz",
        name: "First Steps",
        description: "Complete your first quiz",
        icon: "fas fa-baby",
        rarity: "common",
      },
      {
        id: "math_master",
        name: "Math Master",
        description: "Score 90+ in 5 math quizzes",
        icon: "fas fa-calculator",
        rarity: "rare",
      },
      {
        id: "science_explorer",
        name: "Science Explorer",
        description: "Complete 10 science quizzes",
        icon: "fas fa-flask",
        rarity: "uncommon",
      },
      {
        id: "quick_learner",
        name: "Quick Learner",
        description: "Answer 10 questions in under 10 seconds",
        icon: "fas fa-bolt",
        rarity: "uncommon",
      },
      {
        id: "streak_master",
        name: "Streak Master",
        description: "Maintain a 7-day learning streak",
        icon: "fas fa-fire",
        rarity: "rare",
      },
      {
        id: "perfect_score",
        name: "Perfect Score",
        description: "Get 100% on any quiz",
        icon: "fas fa-star",
        rarity: "epic",
      },
      {
        id: "physics_pro",
        name: "Physics Pro",
        description: "Master 5 physics concepts",
        icon: "fas fa-atom",
        rarity: "rare",
      },
      {
        id: "consistent_learner",
        name: "Consistent Learner",
        description: "Study for 30 days",
        icon: "fas fa-medal",
        rarity: "legendary",
      },
    ]

    // Initialize teacher analytics
    this.teacherAnalytics = new TeacherAnalytics()

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.startPeriodicUpdates()
  }

  setupEventListeners() {
    // Subject card clicks
    document.querySelectorAll(".subject-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const subject = e.currentTarget.getAttribute("onclick")?.match(/startQuiz$$'(.+)'$$/)?.[1]
        if (subject && subject !== "undefined") {
          this.handleSubjectClick(subject)
        }
      })
    })

    // Achievement notifications
    this.setupAchievementSystem()
  }

  handleSubjectClick(subject) {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    // Add some XP for engagement
    this.addXP(5, "Subject exploration")

    // Track subject interaction
    this.trackSubjectInteraction(subject)
  }

  trackSubjectInteraction(subject) {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    // Update last interaction time
    const now = new Date().toISOString()
    user.lastActivity = now

    if (!user.subjectInteractions) {
      user.subjectInteractions = {}
    }

    if (!user.subjectInteractions[subject]) {
      user.subjectInteractions[subject] = 0
    }

    user.subjectInteractions[subject]++

    authSystem?.updateUserData(user)
  }

  addXP(amount, reason = "Activity") {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    const oldXP = user.xp
    const oldLevel = user.level

    user.xp += amount

    // Calculate new level (every 200 XP = 1 level)
    const newLevel = Math.floor(user.xp / 200) + 1
    const leveledUp = newLevel > oldLevel

    if (leveledUp) {
      user.level = newLevel
      this.showLevelUpNotification(newLevel)
      this.checkAchievements()
    }

    // Update display
    this.updateXPDisplay()

    // Show XP gain notification
    this.showXPNotification(amount, reason)

    // Save user data
    authSystem?.updateUserData(user)

    return leveledUp
  }

  updateXPDisplay() {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    const xpElement = document.getElementById("studentXP")
    const levelElement = document.getElementById("studentLevel")

    if (xpElement) xpElement.textContent = user.xp
    if (levelElement) levelElement.textContent = user.level

    // Update progress bar if exists
    this.updateLevelProgressBar()
  }

  updateLevelProgressBar() {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    const currentLevelXP = (user.level - 1) * 200
    const nextLevelXP = user.level * 200
    const progressInLevel = user.xp - currentLevelXP
    const progressPercentage = (progressInLevel / 200) * 100

    // Create or update progress bar
    let progressBar = document.querySelector(".level-progress")
    if (!progressBar) {
      const userStats = document.querySelector(".user-stats")
      if (userStats) {
        progressBar = document.createElement("div")
        progressBar.className = "level-progress"
        progressBar.innerHTML = `
                    <div class="level-progress-bar">
                        <div class="level-progress-fill"></div>
                    </div>
                    <span class="level-progress-text">${progressInLevel}/200 XP to next level</span>
                `
        userStats.appendChild(progressBar)

        // Add CSS for progress bar
        this.addProgressBarStyles()
      }
    }

    const progressFill = document.querySelector(".level-progress-fill")
    const progressText = document.querySelector(".level-progress-text")

    if (progressFill) {
      progressFill.style.width = `${progressPercentage}%`
    }

    if (progressText) {
      progressText.textContent = `${progressInLevel}/200 XP to next level`
    }
  }

  addProgressBarStyles() {
    const style = document.createElement("style")
    style.textContent = `
            .level-progress {
                margin-top: 8px;
                width: 100%;
            }
            
            .level-progress-bar {
                width: 100%;
                height: 6px;
                background: var(--border);
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 4px;
            }
            
            .level-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--primary), var(--secondary));
                border-radius: 3px;
                transition: width 0.5s ease;
            }
            
            .level-progress-text {
                font-size: var(--font-size-xs);
                color: var(--text-muted);
            }
        `
    document.head.appendChild(style)
  }

  showXPNotification(amount, reason) {
    const notification = document.createElement("div")
    notification.className = "xp-notification"
    notification.innerHTML = `
            <div class="xp-notification-content">
                <i class="fas fa-plus-circle"></i>
                <span>+${amount} XP</span>
                <small>${reason}</small>
            </div>
        `

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: xpSlideIn 0.5s ease, xpSlideOut 0.5s ease 2.5s;
            pointer-events: none;
        `

    document.body.appendChild(notification)

    // Add animation styles
    this.addXPNotificationStyles()

    // Remove after animation
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  addXPNotificationStyles() {
    if (document.querySelector("#xp-notification-styles")) return

    const style = document.createElement("style")
    style.id = "xp-notification-styles"
    style.textContent = `
            @keyframes xpSlideIn {
                from {
                    opacity: 0;
                    transform: translateX(100%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }
            
            @keyframes xpSlideOut {
                from {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%) scale(0.8);
                }
            }
            
            .xp-notification-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .xp-notification-content i {
                font-size: 16px;
            }
            
            .xp-notification-content span {
                font-weight: 600;
                font-size: 14px;
            }
            
            .xp-notification-content small {
                font-size: 12px;
                opacity: 0.9;
            }
        `
    document.head.appendChild(style)
  }

  showLevelUpNotification(newLevel) {
    const notification = document.createElement("div")
    notification.className = "level-up-notification"
    notification.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="level-up-text">
                    <h3>Level Up!</h3>
                    <p>You reached Level ${newLevel}</p>
                </div>
            </div>
        `

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #1e293b;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            z-index: 10001;
            animation: levelUpBounce 0.8s ease;
            text-align: center;
            min-width: 250px;
        `

    document.body.appendChild(notification)

    // Add animation styles
    this.addLevelUpStyles()

    // Remove after animation
    setTimeout(() => {
      notification.remove()
    }, 3000)

    // Play celebration effect
    this.playCelebrationEffect()
  }

  addLevelUpStyles() {
    if (document.querySelector("#level-up-styles")) return

    const style = document.createElement("style")
    style.id = "level-up-styles"
    style.textContent = `
            @keyframes levelUpBounce {
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
            
            .level-up-content {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .level-up-icon {
                width: 60px;
                height: 60px;
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                animation: levelUpSpin 2s ease infinite;
            }
            
            @keyframes levelUpSpin {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-10deg); }
                75% { transform: rotate(10deg); }
            }
            
            .level-up-text h3 {
                margin: 0 0 4px 0;
                font-size: 20px;
                font-weight: 700;
            }
            
            .level-up-text p {
                margin: 0;
                font-size: 14px;
                opacity: 0.8;
            }
        `
    document.head.appendChild(style)
  }

  playCelebrationEffect() {
    // Create confetti-like effect
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        this.createConfettiParticle()
      }, i * 50)
    }
  }

  createConfettiParticle() {
    const particle = document.createElement("div")
    particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${["#22c55e", "#84cc16", "#fbbf24", "#ef4444", "#8b5cf6"][Math.floor(Math.random() * 5)]};
            top: 20%;
            left: ${Math.random() * 100}%;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10002;
            animation: confettiFall 2s ease-out forwards;
        `

    document.body.appendChild(particle)

    // Add confetti animation
    this.addConfettiStyles()

    setTimeout(() => {
      particle.remove()
    }, 2000)
  }

  addConfettiStyles() {
    if (document.querySelector("#confetti-styles")) return

    const style = document.createElement("style")
    style.id = "confetti-styles"
    style.textContent = `
            @keyframes confettiFall {
                0% {
                    opacity: 1;
                    transform: translateY(0) rotate(0deg);
                }
                100% {
                    opacity: 0;
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `
    document.head.appendChild(style)
  }

  setupAchievementSystem() {
    // Check achievements periodically
    setInterval(() => {
      this.checkAchievements()
    }, 30000) // Check every 30 seconds
  }

  checkAchievements() {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    if (!user.badges) user.badges = []

    this.achievements.forEach((achievement) => {
      if (!user.badges.includes(achievement.name)) {
        if (this.checkAchievementCondition(achievement, user)) {
          this.unlockAchievement(achievement)
        }
      }
    })
  }

  checkAchievementCondition(achievement, user) {
    switch (achievement.id) {
      case "first_quiz":
        return user.quizzesCompleted > 0

      case "math_master":
        return user.subjects?.math?.score >= 90 && user.mathQuizzes >= 5

      case "science_explorer":
        return user.scienceQuizzes >= 10

      case "quick_learner":
        return user.quickAnswers >= 10

      case "streak_master":
        return user.streak >= 7

      case "perfect_score":
        return user.perfectScores > 0

      case "physics_pro":
        return user.physicsConceptsMastered >= 5

      case "consistent_learner":
        return user.studyDays >= 30

      default:
        return false
    }
  }

  unlockAchievement(achievement) {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    user.badges.push(achievement.name)
    authSystem?.updateUserData(user)

    // Show achievement notification
    this.showAchievementNotification(achievement)

    // Award XP based on rarity
    const xpReward = this.getAchievementXP(achievement.rarity)
    this.addXP(xpReward, `Achievement: ${achievement.name}`)

    // Update badges display
    this.updateBadgesDisplay()
  }

  getAchievementXP(rarity) {
    const xpMap = {
      common: 50,
      uncommon: 100,
      rare: 200,
      epic: 300,
      legendary: 500,
    }
    return xpMap[rarity] || 50
  }

  showAchievementNotification(achievement) {
    const notification = document.createElement("div")
    notification.className = "achievement-notification"
    notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon ${achievement.rarity}">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-text">
                    <h4>Achievement Unlocked!</h4>
                    <h3>${achievement.name}</h3>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #1e293b, #334155);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10001;
            animation: achievementSlide 0.6s ease;
            max-width: 400px;
            border: 2px solid ${this.getRarityColor(achievement.rarity)};
        `

    document.body.appendChild(notification)

    // Add achievement styles
    this.addAchievementStyles()

    // Remove after 5 seconds
    setTimeout(() => {
      notification.remove()
    }, 5000)
  }

  getRarityColor(rarity) {
    const colors = {
      common: "#94a3b8",
      uncommon: "#22c55e",
      rare: "#3b82f6",
      epic: "#8b5cf6",
      legendary: "#f59e0b",
    }
    return colors[rarity] || colors.common
  }

  addAchievementStyles() {
    if (document.querySelector("#achievement-styles")) return

    const style = document.createElement("style")
    style.id = "achievement-styles"
    style.textContent = `
            @keyframes achievementSlide {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            .achievement-content {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .achievement-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                animation: achievementGlow 2s ease infinite;
            }
            
            .achievement-icon.common { background: #94a3b8; }
            .achievement-icon.uncommon { background: #22c55e; }
            .achievement-icon.rare { background: #3b82f6; }
            .achievement-icon.epic { background: #8b5cf6; }
            .achievement-icon.legendary { background: #f59e0b; }
            
            @keyframes achievementGlow {
                0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
                50% { box-shadow: 0 0 30px rgba(255,255,255,0.6); }
            }
            
            .achievement-text h4 {
                margin: 0 0 4px 0;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.8;
            }
            
            .achievement-text h3 {
                margin: 0 0 8px 0;
                font-size: 18px;
                font-weight: 700;
            }
            
            .achievement-text p {
                margin: 0;
                font-size: 14px;
                opacity: 0.9;
                line-height: 1.4;
            }
        `
    document.head.appendChild(style)
  }

  updateBadgesDisplay() {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    const badgesElement = document.getElementById("badges")
    if (badgesElement) {
      badgesElement.textContent = user.badges.length
    }
  }

  updateStreakDisplay() {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    // Calculate streak based on last activity
    const streak = this.calculateStreak(user)
    user.streak = streak

    const streakElement = document.getElementById("streak")
    if (streakElement) {
      streakElement.textContent = streak
    }

    authSystem?.updateUserData(user)
  }

  calculateStreak(user) {
    // Simple streak calculation - in real app would be more sophisticated
    const lastActivity = user.lastActivity ? new Date(user.lastActivity) : new Date()
    const now = new Date()
    const daysDiff = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24))

    if (daysDiff <= 1) {
      return user.streak || 1
    } else {
      return 0
    }
  }

  startPeriodicUpdates() {
    // Update displays every 30 seconds
    setInterval(() => {
      this.updateXPDisplay()
      this.updateStreakDisplay()
      this.updateBadgesDisplay()
    }, 30000)
  }

  // Public methods for quiz integration
  completeQuiz(subject, score, timeSpent, questionsAnswered) {
    const user = authSystem?.getCurrentUser()
    if (!user) return

    // Initialize quiz tracking
    if (!user.quizzesCompleted) user.quizzesCompleted = 0
    if (!user.totalTimeSpent) user.totalTimeSpent = 0
    if (!user.totalQuestionsAnswered) user.totalQuestionsAnswered = 0

    // Update counters
    user.quizzesCompleted++
    user.totalTimeSpent += timeSpent
    user.totalQuestionsAnswered += questionsAnswered

    // Update subject-specific counters
    const subjectKey = `${subject}Quizzes`
    if (!user[subjectKey]) user[subjectKey] = 0
    user[subjectKey]++

    // Update subject progress and score
    if (user.subjects && user.subjects[subject]) {
      user.subjects[subject].score = Math.max(user.subjects[subject].score, score)
      user.subjects[subject].progress = Math.min(100, user.subjects[subject].progress + 10)
    }

    // Check for perfect score
    if (score === 100) {
      if (!user.perfectScores) user.perfectScores = 0
      user.perfectScores++
    }

    // Award XP based on performance
    const baseXP = 50
    const bonusXP = Math.floor((score / 100) * 50)
    const totalXP = baseXP + bonusXP

    this.addXP(totalXP, `${subject} quiz completed`)

    // Update streak
    user.lastActivity = new Date().toISOString()
    this.updateStreakDisplay()

    // Check achievements
    this.checkAchievements()

    // Save data
    authSystem?.updateUserData(user)
  }
}

// Initialize dashboard manager
const dashboardManager = new DashboardManager()

// Export for global access
window.dashboardManager = dashboardManager
