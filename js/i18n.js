class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem("language") || "en"
    this.translations = {
      en: {
        // Navigation
        "nav.home": "Home",
        "nav.dashboard": "Dashboard",
        "nav.quiz": "Quiz",
        "nav.leaderboard": "Leaderboard",
        "nav.logout": "Logout",

        // Landing Page
        "hero.title": "Welcome to LearnQuest",
        "hero.subtitle": "Gamified Learning for Rural Students",
        "hero.description":
          "Join thousands of students in an exciting journey of learning STEM subjects through interactive quizzes and games.",
        "hero.student": "I'm a Student",
        "hero.teacher": "I'm a Teacher",

        // Features
        "features.title": "Why Choose LearnQuest?",
        "features.gamified.title": "Gamified Learning",
        "features.gamified.desc": "Earn XP, unlock badges, and compete with classmates",
        "features.multilingual.title": "Multilingual Support",
        "features.multilingual.desc": "Learn in Hindi, English, or Marathi",
        "features.offline.title": "Offline Ready",
        "features.offline.desc": "Continue learning even without internet",
        "features.analytics.title": "Progress Tracking",
        "features.analytics.desc": "Track your learning journey and improvements",

        // Authentication
        "auth.login": "Login",
        "auth.register": "Register",
        "auth.email": "Email",
        "auth.password": "Password",
        "auth.name": "Full Name",
        "auth.role": "I am a",
        "auth.student": "Student",
        "auth.teacher": "Teacher",
        "auth.class": "Class",
        "auth.language": "Preferred Language",
        "auth.submit": "Submit",
        "auth.switch.login": "Already have an account? Login",
        "auth.switch.register": "Don't have an account? Register",

        // Dashboard
        "dashboard.welcome": "Welcome back",
        "dashboard.level": "Level",
        "dashboard.xp": "XP",
        "dashboard.rank": "Class Rank",
        "dashboard.streak": "Day Streak",
        "dashboard.subjects": "Subjects",
        "dashboard.achievements": "Recent Achievements",
        "dashboard.quickQuiz": "Quick Quiz",
        "dashboard.viewAll": "View All",

        // Quiz
        "quiz.question": "Question",
        "quiz.of": "of",
        "quiz.timeLeft": "Time Left",
        "quiz.lifelines": "Lifelines",
        "quiz.fifty": "50:50",
        "quiz.audience": "Audience Poll",
        "quiz.phone": "Phone Friend",
        "quiz.submit": "Submit Answer",
        "quiz.next": "Next Question",
        "quiz.complete": "Quiz Complete!",
        "quiz.score": "Your Score",
        "quiz.xpEarned": "XP Earned",
        "quiz.playAgain": "Play Again",
        "quiz.backToDashboard": "Back to Dashboard",

        // Leaderboard
        "leaderboard.title": "Leaderboard",
        "leaderboard.filter": "Filter by",
        "leaderboard.thisWeek": "This Week",
        "leaderboard.thisMonth": "This Month",
        "leaderboard.allTime": "All Time",
        "leaderboard.rank": "Rank",
        "leaderboard.student": "Student",
        "leaderboard.points": "Points",
        "leaderboard.badges": "Badges",

        // Teacher Dashboard
        "teacher.overview": "Class Overview",
        "teacher.totalStudents": "Total Students",
        "teacher.avgScore": "Average Score",
        "teacher.activeToday": "Active Today",
        "teacher.completionRate": "Completion Rate",
        "teacher.studentProgress": "Student Progress",
        "teacher.viewDetails": "View Details",
        "teacher.performance": "Performance",
        "teacher.excellent": "Excellent",
        "teacher.good": "Good",
        "teacher.needsHelp": "Needs Help",

        // Common
        "common.loading": "Loading...",
        "common.error": "Error occurred",
        "common.success": "Success!",
        "common.cancel": "Cancel",
        "common.save": "Save",
        "common.close": "Close",
        "common.back": "Back",
        "common.next": "Next",
        "common.previous": "Previous",

        // Subjects
        "subjects.math": "Mathematics",
        "subjects.science": "Science",
        "subjects.physics": "Physics",
        "subjects.chemistry": "Chemistry",
        "subjects.biology": "Biology",

        // Achievements
        "achievements.firstQuiz": "First Quiz Completed",
        "achievements.perfectScore": "Perfect Score",
        "achievements.weekStreak": "Week Streak",
        "achievements.fastLearner": "Fast Learner",
        "achievements.dedicated": "Dedicated Student",
      },

      hi: {
        // Navigation
        "nav.home": "होम",
        "nav.dashboard": "डैशबोर्ड",
        "nav.quiz": "क्विज़",
        "nav.leaderboard": "लीडरबोर्ड",
        "nav.logout": "लॉगआउट",

        // Landing Page
        "hero.title": "लर्नक्वेस्ट में आपका स्वागत है",
        "hero.subtitle": "ग्रामीण छात्रों के लिए गेमिफाइड लर्निंग",
        "hero.description": "इंटरैक्टिव क्विज़ और गेम्स के माध्यम से STEM विषयों को सीखने की रोमांचक यात्रा में हजारों छात्रों के साथ जुड़ें।",
        "hero.student": "मैं एक छात्र हूँ",
        "hero.teacher": "मैं एक शिक्षक हूँ",

        // Features
        "features.title": "लर्नक्वेस्ट क्यों चुनें?",
        "features.gamified.title": "गेमिफाइड लर्निंग",
        "features.gamified.desc": "XP अर्जित करें, बैज अनलॉक करें, और सहपाठियों के साथ प्रतिस्पर्धा करें",
        "features.multilingual.title": "बहुभाषी समर्थन",
        "features.multilingual.desc": "हिंदी, अंग्रेजी या मराठी में सीखें",
        "features.offline.title": "ऑफलाइन तैयार",
        "features.offline.desc": "इंटरनेट के बिना भी सीखना जारी रखें",
        "features.analytics.title": "प्रगति ट्रैकिंग",
        "features.analytics.desc": "अपनी सीखने की यात्रा और सुधार को ट्रैक करें",

        // Authentication
        "auth.login": "लॉगिन",
        "auth.register": "रजिस्टर",
        "auth.email": "ईमेल",
        "auth.password": "पासवर्ड",
        "auth.name": "पूरा नाम",
        "auth.role": "मैं हूँ",
        "auth.student": "छात्र",
        "auth.teacher": "शिक्षक",
        "auth.class": "कक्षा",
        "auth.language": "पसंदीदा भाषा",
        "auth.submit": "सबमिट",
        "auth.switch.login": "पहले से खाता है? लॉगिन करें",
        "auth.switch.register": "खाता नहीं है? रजिस्टर करें",

        // Dashboard
        "dashboard.welcome": "वापसी पर स्वागत है",
        "dashboard.level": "स्तर",
        "dashboard.xp": "XP",
        "dashboard.rank": "कक्षा रैंक",
        "dashboard.streak": "दिन स्ट्रीक",
        "dashboard.subjects": "विषय",
        "dashboard.achievements": "हाल की उपलब्धियां",
        "dashboard.quickQuiz": "त्वरित क्विज़",
        "dashboard.viewAll": "सभी देखें",

        // Quiz
        "quiz.question": "प्रश्न",
        "quiz.of": "का",
        "quiz.timeLeft": "समय बचा",
        "quiz.lifelines": "लाइफलाइन",
        "quiz.fifty": "50:50",
        "quiz.audience": "ऑडियंस पोल",
        "quiz.phone": "फोन ए फ्रेंड",
        "quiz.submit": "उत्तर सबमिट करें",
        "quiz.next": "अगला प्रश्न",
        "quiz.complete": "क्विज़ पूरा!",
        "quiz.score": "आपका स्कोर",
        "quiz.xpEarned": "XP अर्जित",
        "quiz.playAgain": "फिर से खेलें",
        "quiz.backToDashboard": "डैशबोर्ड पर वापस",

        // Leaderboard
        "leaderboard.title": "लीडरबोर्ड",
        "leaderboard.filter": "फिल्टर",
        "leaderboard.thisWeek": "इस सप्ताह",
        "leaderboard.thisMonth": "इस महीने",
        "leaderboard.allTime": "सभी समय",
        "leaderboard.rank": "रैंक",
        "leaderboard.student": "छात्र",
        "leaderboard.points": "अंक",
        "leaderboard.badges": "बैज",

        // Teacher Dashboard
        "teacher.overview": "कक्षा अवलोकन",
        "teacher.totalStudents": "कुल छात्र",
        "teacher.avgScore": "औसत स्कोर",
        "teacher.activeToday": "आज सक्रिय",
        "teacher.completionRate": "पूर्णता दर",
        "teacher.studentProgress": "छात्र प्रगति",
        "teacher.viewDetails": "विवरण देखें",
        "teacher.performance": "प्रदर्शन",
        "teacher.excellent": "उत्कृष्ट",
        "teacher.good": "अच्छा",
        "teacher.needsHelp": "मदद चाहिए",

        // Common
        "common.loading": "लोड हो रहा है...",
        "common.error": "त्रुटि हुई",
        "common.success": "सफलता!",
        "common.cancel": "रद्द करें",
        "common.save": "सेव करें",
        "common.close": "बंद करें",
        "common.back": "वापस",
        "common.next": "अगला",
        "common.previous": "पिछला",

        // Subjects
        "subjects.math": "गणित",
        "subjects.science": "विज्ञान",
        "subjects.physics": "भौतिकी",
        "subjects.chemistry": "रसायन",
        "subjects.biology": "जीव विज्ञान",

        // Achievements
        "achievements.firstQuiz": "पहला क्विज़ पूरा",
        "achievements.perfectScore": "परफेक्ट स्कोर",
        "achievements.weekStreak": "सप्ताह स्ट्रीक",
        "achievements.fastLearner": "तेज़ सीखने वाला",
        "achievements.dedicated": "समर्पित छात्र",
      },

      mr: {
        // Navigation
        "nav.home": "होम",
        "nav.dashboard": "डॅशबोर्ड",
        "nav.quiz": "क्विझ",
        "nav.leaderboard": "लीडरबोर्ड",
        "nav.logout": "लॉगआउट",

        // Landing Page
        "hero.title": "लर्नक्वेस्टमध्ये आपले स्वागत आहे",
        "hero.subtitle": "ग्रामीण विद्यार्थ्यांसाठी गेमिफाइड लर्निंग",
        "hero.description":
          "इंटरॅक्टिव्ह क्विझ आणि गेम्सच्या माध्यमातून STEM विषय शिकण्याच्या रोमांचक प्रवासात हजारो विद्यार्थ्यांसोबत सामील व्हा.",
        "hero.student": "मी एक विद्यार्थी आहे",
        "hero.teacher": "मी एक शिक्षक आहे",

        // Features
        "features.title": "लर्नक्वेस्ट का निवडावे?",
        "features.gamified.title": "गेमिफाइड लर्निंग",
        "features.gamified.desc": "XP मिळवा, बॅज अनलॉक करा आणि वर्गमित्रांशी स्पर्धा करा",
        "features.multilingual.title": "बहुभाषिक समर्थन",
        "features.multilingual.desc": "हिंदी, इंग्रजी किंवा मराठीत शिका",
        "features.offline.title": "ऑफलाइन तयार",
        "features.offline.desc": "इंटरनेटशिवाय देखील शिकणे सुरू ठेवा",
        "features.analytics.title": "प्रगती ट्रॅकिंग",
        "features.analytics.desc": "तुमच्या शिकण्याचा प्रवास आणि सुधारणा ट्रॅक करा",

        // Authentication
        "auth.login": "लॉगिन",
        "auth.register": "नोंदणी",
        "auth.email": "ईमेल",
        "auth.password": "पासवर्ड",
        "auth.name": "पूर्ण नाव",
        "auth.role": "मी आहे",
        "auth.student": "विद्यार्थी",
        "auth.teacher": "शिक्षक",
        "auth.class": "वर्ग",
        "auth.language": "पसंतीची भाषा",
        "auth.submit": "सबमिट",
        "auth.switch.login": "आधीच खाते आहे? लॉगिन करा",
        "auth.switch.register": "खाते नाही? नोंदणी करा",

        // Dashboard
        "dashboard.welcome": "परत आल्याबद्दल स्वागत",
        "dashboard.level": "स्तर",
        "dashboard.xp": "XP",
        "dashboard.rank": "वर्ग रँक",
        "dashboard.streak": "दिवस स्ट्रीक",
        "dashboard.subjects": "विषय",
        "dashboard.achievements": "अलीकडील उपलब्धी",
        "dashboard.quickQuiz": "द्रुत क्विझ",
        "dashboard.viewAll": "सर्व पहा",

        // Quiz
        "quiz.question": "प्रश्न",
        "quiz.of": "चा",
        "quiz.timeLeft": "वेळ शिल्लक",
        "quiz.lifelines": "लाइफलाइन",
        "quiz.fifty": "50:50",
        "quiz.audience": "ऑडियन्स पोल",
        "quiz.phone": "फोन अ फ्रेंड",
        "quiz.submit": "उत्तर सबमिट करा",
        "quiz.next": "पुढील प्रश्न",
        "quiz.complete": "क्विझ पूर्ण!",
        "quiz.score": "तुमचा स्कोअर",
        "quiz.xpEarned": "XP मिळवले",
        "quiz.playAgain": "पुन्हा खेळा",
        "quiz.backToDashboard": "डॅशबोर्डवर परत",

        // Leaderboard
        "leaderboard.title": "लीडरबोर्ड",
        "leaderboard.filter": "फिल्टर",
        "leaderboard.thisWeek": "या आठवड्यात",
        "leaderboard.thisMonth": "या महिन्यात",
        "leaderboard.allTime": "सर्व काळ",
        "leaderboard.rank": "रँक",
        "leaderboard.student": "विद्यार्थी",
        "leaderboard.points": "गुण",
        "leaderboard.badges": "बॅज",

        // Teacher Dashboard
        "teacher.overview": "वर्ग विहंगावलोकन",
        "teacher.totalStudents": "एकूण विद्यार्थी",
        "teacher.avgScore": "सरासरी स्कोअर",
        "teacher.activeToday": "आज सक्रिय",
        "teacher.completionRate": "पूर्णता दर",
        "teacher.studentProgress": "विद्यार्थी प्रगती",
        "teacher.viewDetails": "तपशील पहा",
        "teacher.performance": "कामगिरी",
        "teacher.excellent": "उत्कृष्ट",
        "teacher.good": "चांगले",
        "teacher.needsHelp": "मदत हवी",

        // Common
        "common.loading": "लोड होत आहे...",
        "common.error": "त्रुटी झाली",
        "common.success": "यश!",
        "common.cancel": "रद्द करा",
        "common.save": "सेव्ह करा",
        "common.close": "बंद करा",
        "common.back": "मागे",
        "common.next": "पुढे",
        "common.previous": "मागील",

        // Subjects
        "subjects.math": "गणित",
        "subjects.science": "विज्ञान",
        "subjects.physics": "भौतिकशास्त्र",
        "subjects.chemistry": "रसायनशास्त्र",
        "subjects.biology": "जीवशास्त्र",

        // Achievements
        "achievements.firstQuiz": "पहिली क्विझ पूर्ण",
        "achievements.perfectScore": "परफेक्ट स्कोअर",
        "achievements.weekStreak": "आठवडा स्ट्रीक",
        "achievements.fastLearner": "जलद शिकणारा",
        "achievements.dedicated": "समर्पित विद्यार्थी",
      },
    }
  }

  t(key, params = {}) {
    let translation = this.translations[this.currentLanguage][key] || key

    // Replace parameters in translation
    Object.keys(params).forEach((param) => {
      translation = translation.replace(`{{${param}}}`, params[param])
    })

    return translation
  }

  setLanguage(language) {
    if (this.translations[language]) {
      this.currentLanguage = language
      localStorage.setItem("language", language)
      this.updatePageContent()
    }
  }

  getCurrentLanguage() {
    return this.currentLanguage
  }

  updatePageContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n")
      element.textContent = this.t(key)
    })

    // Update placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder")
      element.placeholder = this.t(key)
    })

    // Update titles
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const key = element.getAttribute("data-i18n-title")
      element.title = this.t(key)
    })

    // Update language selector
    const languageSelect = document.getElementById("languageSelect")
    if (languageSelect) {
      languageSelect.value = this.currentLanguage
    }

    // Update direction for RTL languages if needed
    document.documentElement.dir = this.isRTL() ? "rtl" : "ltr"
  }

  isRTL() {
    // Add RTL languages here if needed
    return false
  }

  init() {
    // Create language selector
    this.createLanguageSelector()

    // Update content on page load
    this.updatePageContent()

    // Listen for language changes
    document.addEventListener("change", (e) => {
      if (e.target.id === "languageSelect") {
        this.setLanguage(e.target.value)
      }
    })
  }

  createLanguageSelector() {
    const selector = document.getElementById("languageSelect")
    if (selector) {
      selector.innerHTML = `
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
            `
      selector.value = this.currentLanguage
    }
  }
}

// Initialize i18n
const i18n = new I18n()
document.addEventListener("DOMContentLoaded", () => {
  i18n.init()
})
