// Leaderboard and Progress Tracking System for LearnQuest Platform

class LeaderboardManager {
  constructor() {
    this.currentFilter = "overall"
    this.currentTimeframe = "all-time"
    this.currentClass = "all"
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.loadLeaderboardData()
  }

  setupEventListeners() {
    // Filter buttons
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-btn")) {
        this.handleFilterChange(e.target)
      }
    })

    // Timeframe selector
    const timeframeSelect = document.getElementById("timeframeSelect")
    if (timeframeSelect) {
      timeframeSelect.addEventListener("change", (e) => {
        this.currentTimeframe = e.target.value
        this.loadLeaderboardData()
      })
    }

    // Class filter
    const classFilter = document.getElementById("classFilter")
    if (classFilter) {
      classFilter.addEventListener("change", (e) => {
        this.currentClass = e.target.value
        this.loadLeaderboardData()
      })
    }

    // Refresh button
    const refreshBtn = document.getElementById("refreshLeaderboard")
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        this.loadLeaderboardData()
        this.showRefreshAnimation()
      })
    }
  }

  handleFilterChange(button) {
    // Remove active class from all filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active")
    })

    // Add active class to clicked button
    button.classList.add("active")

    // Update current filter
    this.currentFilter = button.dataset.filter

    // Reload leaderboard
    this.loadLeaderboardData()
  }

  loadLeaderboardData() {
    const users = this.getAllUsers()
    const students = users.filter((user) => user.role === "student")

    // Apply class filter
    const filteredStudents =
      this.currentClass === "all" ? students : students.filter((student) => student.class === this.currentClass)

    // Apply timeframe filter
    const timeFilteredStudents = this.applyTimeframeFilter(filteredStudents)

    // Sort based on current filter
    const sortedStudents = this.sortStudents(timeFilteredStudents)

    // Update displays
    this.updatePodium(sortedStudents.slice(0, 3))
    this.updateLeaderboardList(sortedStudents)
    this.updateLeaderboardStats(sortedStudents)
    this.updateProgressCharts(sortedStudents)
  }

  getAllUsers() {
    // Get users from localStorage or use sample data
    const users = JSON.parse(localStorage.getItem("learnquest_users")) || []

    // If no users, generate sample data for demonstration
    if (users.length === 0) {
      return this.generateSampleLeaderboardData()
    }

    return users
  }

  generateSampleLeaderboardData() {
    const sampleUsers = [
      {
        id: "1",
        name: "Arjun Sharma",
        role: "student",
        class: "10A",
        xp: 2450,
        level: 12,
        badges: ["Math Master", "Science Explorer", "Quick Learner", "Streak Master"],
        streak: 15,
        subjects: {
          math: { score: 95, progress: 90, quizzes: 12 },
          science: { score: 88, progress: 85, quizzes: 10 },
          physics: { score: 92, progress: 75, quizzes: 8 },
        },
        quizzesCompleted: 30,
        totalTimeSpent: 7200, // in seconds
        lastActivity: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        weeklyXP: 450,
        monthlyXP: 1200,
      },
      {
        id: "2",
        name: "Priya Patel",
        role: "student",
        class: "10A",
        xp: 2200,
        level: 11,
        badges: ["Science Star", "Consistent Learner", "Perfect Score"],
        streak: 12,
        subjects: {
          math: { score: 85, progress: 80, quizzes: 10 },
          science: { score: 96, progress: 95, quizzes: 15 },
          physics: { score: 89, progress: 70, quizzes: 7 },
        },
        quizzesCompleted: 32,
        totalTimeSpent: 6800,
        lastActivity: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        weeklyXP: 380,
        monthlyXP: 1100,
      },
      {
        id: "3",
        name: "Rahul Kumar",
        role: "student",
        class: "10B",
        xp: 2100,
        level: 10,
        badges: ["Physics Pro", "Math Master"],
        streak: 8,
        subjects: {
          math: { score: 90, progress: 85, quizzes: 11 },
          science: { score: 82, progress: 75, quizzes: 9 },
          physics: { score: 94, progress: 90, quizzes: 12 },
        },
        quizzesCompleted: 32,
        totalTimeSpent: 6200,
        lastActivity: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        weeklyXP: 320,
        monthlyXP: 950,
      },
      {
        id: "4",
        name: "Sneha Gupta",
        role: "student",
        class: "10A",
        xp: 1950,
        level: 9,
        badges: ["Quick Learner", "Science Explorer"],
        streak: 6,
        subjects: {
          math: { score: 88, progress: 70, quizzes: 9 },
          science: { score: 91, progress: 80, quizzes: 11 },
          physics: { score: 85, progress: 65, quizzes: 6 },
        },
        quizzesCompleted: 26,
        totalTimeSpent: 5400,
        lastActivity: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        weeklyXP: 280,
        monthlyXP: 850,
      },
      {
        id: "5",
        name: "Vikram Singh",
        role: "student",
        class: "10B",
        xp: 1800,
        level: 9,
        badges: ["Consistent Learner"],
        streak: 10,
        subjects: {
          math: { score: 92, progress: 75, quizzes: 8 },
          science: { score: 79, progress: 60, quizzes: 7 },
          physics: { score: 87, progress: 70, quizzes: 9 },
        },
        quizzesCompleted: 24,
        totalTimeSpent: 5100,
        lastActivity: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        weeklyXP: 250,
        monthlyXP: 780,
      },
      {
        id: "6",
        name: "Ananya Reddy",
        role: "student",
        class: "10A",
        xp: 1650,
        level: 8,
        badges: ["First Steps", "Science Star"],
        streak: 4,
        subjects: {
          math: { score: 83, progress: 65, quizzes: 7 },
          science: { score: 89, progress: 75, quizzes: 10 },
          physics: { score: 81, progress: 55, quizzes: 5 },
        },
        quizzesCompleted: 22,
        totalTimeSpent: 4600,
        lastActivity: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        weeklyXP: 200,
        monthlyXP: 650,
      },
    ]

    // Save sample data to localStorage
    localStorage.setItem("learnquest_users", JSON.stringify(sampleUsers))
    return sampleUsers
  }

  applyTimeframeFilter(students) {
    const now = new Date()

    switch (this.currentTimeframe) {
      case "today":
        return students.filter((student) => {
          const lastActivity = new Date(student.lastActivity)
          return lastActivity.toDateString() === now.toDateString()
        })

      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return students.filter((student) => {
          const lastActivity = new Date(student.lastActivity)
          return lastActivity >= weekAgo
        })

      case "month":
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        return students.filter((student) => {
          const lastActivity = new Date(student.lastActivity)
          return lastActivity >= monthAgo
        })

      default: // all-time
        return students
    }
  }

  sortStudents(students) {
    switch (this.currentFilter) {
      case "xp":
        return students.sort((a, b) => b.xp - a.xp)

      case "level":
        return students.sort((a, b) => b.level - a.level)

      case "streak":
        return students.sort((a, b) => b.streak - a.streak)

      case "math":
        return students.sort((a, b) => (b.subjects?.math?.score || 0) - (a.subjects?.math?.score || 0))

      case "science":
        return students.sort((a, b) => (b.subjects?.science?.score || 0) - (a.subjects?.science?.score || 0))

      case "physics":
        return students.sort((a, b) => (b.subjects?.physics?.score || 0) - (a.subjects?.physics?.score || 0))

      case "quizzes":
        return students.sort((a, b) => (b.quizzesCompleted || 0) - (a.quizzesCompleted || 0))

      default: // overall
        // Calculate overall score based on multiple factors
        return students.sort((a, b) => {
          const scoreA = this.calculateOverallScore(a)
          const scoreB = this.calculateOverallScore(b)
          return scoreB - scoreA
        })
    }
  }

  calculateOverallScore(student) {
    const xpWeight = 0.4
    const levelWeight = 0.2
    const streakWeight = 0.1
    const subjectWeight = 0.2
    const activityWeight = 0.1

    const xpScore = student.xp || 0
    const levelScore = (student.level || 1) * 100
    const streakScore = (student.streak || 0) * 50

    // Calculate average subject score
    const subjects = student.subjects || {}
    const subjectScores = Object.values(subjects).map((s) => s.score || 0)
    const avgSubjectScore =
      subjectScores.length > 0 ? subjectScores.reduce((sum, score) => sum + score, 0) / subjectScores.length : 0

    // Activity score based on recent activity
    const lastActivity = new Date(student.lastActivity || 0)
    const daysSinceActivity = Math.floor((Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
    const activityScore = Math.max(0, 100 - daysSinceActivity * 10)

    return (
      xpScore * xpWeight +
      levelScore * levelWeight +
      streakScore * streakWeight +
      avgSubjectScore * subjectWeight +
      activityScore * activityWeight
    )
  }

  updatePodium(topThree) {
    const podium = document.getElementById("podium")
    if (!podium) return

    podium.innerHTML = ""

    if (topThree.length === 0) {
      podium.innerHTML = '<p class="no-data">No students found for current filters</p>'
      return
    }

    // Create podium places
    const positions = ["second", "first", "third"]
    const medals = ["🥈", "🥇", "🥉"]

    topThree.forEach((student, index) => {
      if (index < 3) {
        const place = document.createElement("div")
        place.className = `podium-place ${positions[index]}`

        const value = this.getDisplayValue(student)
        const label = this.getDisplayLabel()

        place.innerHTML = `
          <div class="podium-rank">${index + 1}</div>
          <div class="podium-avatar">
            <img src="images/friendly-cartoon-mascot-owl-with-graduation-cap.jpg" alt="${student.name}">
          </div>
          <h4>${student.name}</h4>
          <p class="podium-class">Class ${student.class}</p>
          <div class="podium-score">
            <span class="score-value">${value}</span>
            <span class="score-label">${label}</span>
          </div>
          <div class="podium-badges">
            ${student.badges
              .slice(0, 2)
              .map((badge) => `<span class="mini-badge">${badge}</span>`)
              .join("")}
          </div>
        `

        podium.appendChild(place)
      }
    })
  }

  updateLeaderboardList(students) {
    const leaderboardList = document.getElementById("leaderboardList")
    if (!leaderboardList) return

    leaderboardList.innerHTML = ""

    if (students.length === 0) {
      leaderboardList.innerHTML = '<p class="no-data">No students found for current filters</p>'
      return
    }

    const currentUser = window.authSystem?.getCurrentUser()

    students.forEach((student, index) => {
      const item = document.createElement("div")
      item.className = `leaderboard-item ${currentUser?.id === student.id ? "current-user" : ""}`

      const value = this.getDisplayValue(student)
      const label = this.getDisplayLabel()
      const trend = this.getPerformanceTrend(student)

      item.innerHTML = `
        <div class="rank-number">${index + 1}</div>
        <img src="images/friendly-cartoon-mascot-owl-with-graduation-cap.jpg" alt="${student.name}" class="student-avatar">
        <div class="student-info">
          <h4>${student.name}</h4>
          <p>Class ${student.class} • Level ${student.level}</p>
          <div class="student-badges">
            ${student.badges
              .slice(0, 3)
              .map((badge) => `<span class="mini-badge">${badge}</span>`)
              .join("")}
          </div>
        </div>
        <div class="student-metrics">
          <div class="metric">
            <span class="metric-value">${value}</span>
            <span class="metric-label">${label}</span>
          </div>
          <div class="metric">
            <span class="metric-value">${student.streak}</span>
            <span class="metric-label">Streak</span>
          </div>
          <div class="metric">
            <span class="metric-value">${student.quizzesCompleted || 0}</span>
            <span class="metric-label">Quizzes</span>
          </div>
        </div>
        <div class="performance-trend ${trend.direction}">
          <i class="fas fa-arrow-${trend.direction === "up" ? "up" : trend.direction === "down" ? "down" : "right"}"></i>
          <span>${trend.label}</span>
        </div>
      `

      // Add click handler for detailed view
      item.addEventListener("click", () => this.showStudentDetails(student))

      leaderboardList.appendChild(item)
    })
  }

  getDisplayValue(student) {
    switch (this.currentFilter) {
      case "xp":
        return student.xp || 0
      case "level":
        return student.level || 1
      case "streak":
        return student.streak || 0
      case "math":
        return `${student.subjects?.math?.score || 0}%`
      case "science":
        return `${student.subjects?.science?.score || 0}%`
      case "physics":
        return `${student.subjects?.physics?.score || 0}%`
      case "quizzes":
        return student.quizzesCompleted || 0
      default:
        return Math.round(this.calculateOverallScore(student))
    }
  }

  getDisplayLabel() {
    switch (this.currentFilter) {
      case "xp":
        return "XP"
      case "level":
        return "Level"
      case "streak":
        return "Days"
      case "math":
      case "science":
      case "physics":
        return "Score"
      case "quizzes":
        return "Completed"
      default:
        return "Overall"
    }
  }

  getPerformanceTrend(student) {
    // Simple trend calculation based on recent activity and performance
    const daysSinceActivity = Math.floor(
      (Date.now() - new Date(student.lastActivity).getTime()) / (1000 * 60 * 60 * 24),
    )
    const avgScore = this.calculateAverageSubjectScore(student)
    const streak = student.streak || 0

    if (daysSinceActivity <= 1 && avgScore > 85 && streak > 5) {
      return { direction: "up", label: "Rising" }
    } else if (daysSinceActivity > 3 || avgScore < 60) {
      return { direction: "down", label: "Declining" }
    } else {
      return { direction: "right", label: "Stable" }
    }
  }

  calculateAverageSubjectScore(student) {
    const subjects = student.subjects || {}
    const scores = Object.values(subjects)
      .map((s) => s.score || 0)
      .filter((s) => s > 0)
    return scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0
  }

  updateLeaderboardStats(students) {
    const statsContainer = document.getElementById("leaderboardStats")
    if (!statsContainer) return

    const totalStudents = students.length
    const activeStudents = students.filter((s) => this.isActiveThisWeek(s)).length
    const avgXP = totalStudents > 0 ? Math.round(students.reduce((sum, s) => sum + (s.xp || 0), 0) / totalStudents) : 0
    const topStreak = totalStudents > 0 ? Math.max(...students.map((s) => s.streak || 0)) : 0

    statsContainer.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-info">
            <h3>${totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="stat-info">
            <h3>${activeStudents}</h3>
            <p>Active This Week</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="stat-info">
            <h3>${avgXP}</h3>
            <p>Average XP</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-fire"></i>
          </div>
          <div class="stat-info">
            <h3>${topStreak}</h3>
            <p>Longest Streak</p>
          </div>
        </div>
      </div>
    `
  }

  updateProgressCharts(students) {
    this.createSubjectProgressChart(students)
    this.createActivityChart(students)
    this.createLevelDistributionChart(students)
  }

  createSubjectProgressChart(students) {
    const chartContainer = document.getElementById("subjectProgressChart")
    if (!chartContainer) return

    const subjects = ["math", "science", "physics"]
    const subjectData = subjects.map((subject) => {
      const scores = students.map((s) => s.subjects?.[subject]?.score || 0).filter((score) => score > 0)

      return {
        name: subject.charAt(0).toUpperCase() + subject.slice(1),
        average: scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0,
        students: scores.length,
      }
    })

    chartContainer.innerHTML = `
      <div class="chart-header">
        <h4>Subject Performance Overview</h4>
      </div>
      <div class="subject-progress-chart">
        ${subjectData
          .map(
            (subject) => `
          <div class="subject-progress-item">
            <div class="subject-info">
              <span class="subject-name">${subject.name}</span>
              <span class="subject-students">${subject.students} students</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${subject.average}%"></div>
            </div>
            <span class="progress-value">${subject.average}%</span>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }

  createActivityChart(students) {
    const chartContainer = document.getElementById("activityChart")
    if (!chartContainer) return

    // Group students by activity level
    const activityLevels = {
      "Very Active": students.filter((s) => this.isActiveToday(s)).length,
      Active: students.filter((s) => this.isActiveThisWeek(s) && !this.isActiveToday(s)).length,
      Inactive: students.filter((s) => !this.isActiveThisWeek(s)).length,
    }

    const total = students.length

    chartContainer.innerHTML = `
      <div class="chart-header">
        <h4>Student Activity Levels</h4>
      </div>
      <div class="activity-chart">
        ${Object.entries(activityLevels)
          .map(([level, count]) => {
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0
            return `
            <div class="activity-level">
              <div class="activity-info">
                <span class="activity-name">${level}</span>
                <span class="activity-count">${count} students</span>
              </div>
              <div class="activity-bar">
                <div class="activity-fill ${level.toLowerCase().replace(" ", "-")}" style="width: ${percentage}%"></div>
              </div>
              <span class="activity-percentage">${percentage}%</span>
            </div>
          `
          })
          .join("")}
      </div>
    `
  }

  createLevelDistributionChart(students) {
    const chartContainer = document.getElementById("levelDistributionChart")
    if (!chartContainer) return

    // Group students by level ranges
    const levelRanges = {
      "Beginner (1-3)": students.filter((s) => (s.level || 1) <= 3).length,
      "Intermediate (4-7)": students.filter((s) => (s.level || 1) >= 4 && (s.level || 1) <= 7).length,
      "Advanced (8-10)": students.filter((s) => (s.level || 1) >= 8 && (s.level || 1) <= 10).length,
      "Expert (11+)": students.filter((s) => (s.level || 1) >= 11).length,
    }

    const maxCount = Math.max(...Object.values(levelRanges))

    chartContainer.innerHTML = `
      <div class="chart-header">
        <h4>Level Distribution</h4>
      </div>
      <div class="level-distribution-chart">
        ${Object.entries(levelRanges)
          .map(([range, count]) => {
            const height = maxCount > 0 ? (count / maxCount) * 100 : 0
            return `
            <div class="level-bar">
              <div class="level-fill" style="height: ${height}%"></div>
              <span class="level-count">${count}</span>
              <span class="level-range">${range}</span>
            </div>
          `
          })
          .join("")}
      </div>
    `
  }

  isActiveToday(student) {
    const lastActivity = new Date(student.lastActivity)
    const today = new Date()
    return lastActivity.toDateString() === today.toDateString()
  }

  isActiveThisWeek(student) {
    const lastActivity = new Date(student.lastActivity)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return lastActivity >= weekAgo
  }

  showStudentDetails(student) {
    const modal = document.createElement("div")
    modal.className = "modal student-details-modal"

    const subjects = student.subjects || {}
    const badges = student.badges || []

    modal.innerHTML = `
      <div class="modal-content large">
        <div class="modal-header">
          <h2>${student.name} - Detailed Profile</h2>
          <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
        </div>
        <div class="student-profile-content">
          <div class="profile-header">
            <img src="images/friendly-cartoon-mascot-owl-with-graduation-cap.jpg" alt="${student.name}" class="profile-avatar">
            <div class="profile-info">
              <h3>${student.name}</h3>
              <p>Class ${student.class} • Level ${student.level}</p>
              <div class="profile-stats">
                <div class="profile-stat">
                  <span class="stat-value">${student.xp || 0}</span>
                  <span class="stat-label">Total XP</span>
                </div>
                <div class="profile-stat">
                  <span class="stat-value">${student.streak || 0}</span>
                  <span class="stat-label">Day Streak</span>
                </div>
                <div class="profile-stat">
                  <span class="stat-value">${student.quizzesCompleted || 0}</span>
                  <span class="stat-label">Quizzes</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="profile-sections">
            <div class="profile-section">
              <h4>Subject Performance</h4>
              <div class="subject-performance-grid">
                ${Object.entries(subjects)
                  .map(
                    ([subject, data]) => `
                  <div class="subject-performance-card">
                    <div class="subject-header">
                      <i class="fas fa-${this.getSubjectIcon(subject)}"></i>
                      <span>${subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
                    </div>
                    <div class="subject-metrics">
                      <div class="metric">
                        <span class="metric-label">Score</span>
                        <span class="metric-value">${data.score || 0}%</span>
                      </div>
                      <div class="metric">
                        <span class="metric-label">Progress</span>
                        <span class="metric-value">${data.progress || 0}%</span>
                      </div>
                      <div class="metric">
                        <span class="metric-label">Quizzes</span>
                        <span class="metric-value">${data.quizzes || 0}</span>
                      </div>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${data.progress || 0}%"></div>
                    </div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
            
            <div class="profile-section">
              <h4>Achievements (${badges.length})</h4>
              <div class="achievements-grid">
                ${
                  badges.length > 0
                    ? badges
                        .map(
                          (badge) => `
                  <div class="achievement-badge">
                    <i class="fas fa-medal"></i>
                    <span>${badge}</span>
                  </div>
                `,
                        )
                        .join("")
                    : '<p class="no-achievements">No achievements yet</p>'
                }
              </div>
            </div>
            
            <div class="profile-section">
              <h4>Activity Summary</h4>
              <div class="activity-summary">
                <div class="activity-item">
                  <i class="fas fa-clock"></i>
                  <span>Total Study Time: ${this.formatTime(student.totalTimeSpent || 0)}</span>
                </div>
                <div class="activity-item">
                  <i class="fas fa-calendar"></i>
                  <span>Last Active: ${this.formatLastActivity(student.lastActivity)}</span>
                </div>
                <div class="activity-item">
                  <i class="fas fa-chart-line"></i>
                  <span>Performance Trend: ${this.getPerformanceTrend(student).label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)
    modal.classList.add("active")
  }

  getSubjectIcon(subject) {
    const icons = {
      math: "calculator",
      science: "flask",
      physics: "atom",
    }
    return icons[subject] || "book"
  }

  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  formatLastActivity(lastActivity) {
    if (!lastActivity) return "Never"

    const date = new Date(lastActivity)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  showRefreshAnimation() {
    const refreshBtn = document.getElementById("refreshLeaderboard")
    if (refreshBtn) {
      const icon = refreshBtn.querySelector("i")
      if (icon) {
        icon.style.animation = "spin 1s linear"
        setTimeout(() => {
          icon.style.animation = ""
        }, 1000)
      }
    }
  }
}

// Initialize leaderboard manager
const leaderboardManager = new LeaderboardManager()

// Global function for loading leaderboard data
function loadLeaderboardData() {
  leaderboardManager.loadLeaderboardData()
}

// Export for global access
window.leaderboardManager = leaderboardManager
window.loadLeaderboardData = loadLeaderboardData
