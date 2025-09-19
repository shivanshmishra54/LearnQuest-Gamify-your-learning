export type Language = "english" | "hindi" | "marathi"

export interface Translations {
  // Common
  welcome: string
  login: string
  register: string
  logout: string
  back: string
  next: string
  submit: string
  cancel: string
  loading: string

  // Landing Page
  landingTitle: string
  landingSubtitle: string
  missionTitle: string
  missionDescription: string
  startLearning: string

  // Authentication
  email: string
  password: string
  fullName: string
  selectRole: string
  student: string
  teacher: string
  preferredLanguage: string
  selectClass: string
  createAccount: string

  // Dashboard
  welcomeBack: string
  currentScore: string
  classRank: string
  avgScore: string
  quizzesDone: string
  dayStreak: string
  yourSubjects: string
  recentAchievements: string
  yourBadges: string
  quickActions: string

  // Quiz
  question: string
  timeLeft: string
  progress: string
  lifelines: string
  hint: string
  skip: string
  quizCompleted: string
  correctAnswers: string
  accuracy: string
  xpEarned: string

  // Leaderboard
  leaderboard: string
  topPerformers: string
  fullRankings: string
  myAchievements: string
  totalEarned: string
  available: string
  completion: string

  // Subjects
  mathematics: string
  science: string
  physics: string
  chemistry: string
}

export const translations: Record<Language, Translations> = {
  english: {
    // Common
    welcome: "Welcome",
    login: "Login",
    register: "Register",
    logout: "Logout",
    back: "Back",
    next: "Next",
    submit: "Submit",
    cancel: "Cancel",
    loading: "Loading...",

    // Landing Page
    landingTitle: "STEM Learning Made Fun for Rural Students",
    landingSubtitle:
      "Join thousands of students in an exciting gamified learning journey. Play KBC-style quizzes, earn badges, and compete with classmates while mastering STEM subjects.",
    missionTitle: "Our Mission",
    missionDescription:
      "Empowering rural students with engaging STEM education through gamified learning experiences. We believe every student deserves access to quality education, regardless of their location or resources.",
    startLearning: "Start Learning Now",

    // Authentication
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    selectRole: "I am a:",
    student: "Student",
    teacher: "Teacher",
    preferredLanguage: "Preferred Language",
    selectClass: "Select Your Class",
    createAccount: "Create Account",

    // Dashboard
    welcomeBack: "Welcome back",
    currentScore: "Current Score",
    classRank: "Class Rank",
    avgScore: "Avg Score",
    quizzesDone: "Quizzes Done",
    dayStreak: "Day Streak",
    yourSubjects: "Your Subjects",
    recentAchievements: "Recent Achievements",
    yourBadges: "Your Badges",
    quickActions: "Quick Actions",

    // Quiz
    question: "Question",
    timeLeft: "Time Left",
    progress: "Progress",
    lifelines: "Lifelines",
    hint: "Hint",
    skip: "Skip",
    quizCompleted: "Quiz Completed!",
    correctAnswers: "Correct Answers",
    accuracy: "Accuracy",
    xpEarned: "XP Earned",

    // Leaderboard
    leaderboard: "Leaderboard",
    topPerformers: "Top Performers",
    fullRankings: "Full Rankings",
    myAchievements: "My Achievements",
    totalEarned: "Total Earned",
    available: "Available",
    completion: "Completion",

    // Subjects
    mathematics: "Mathematics",
    science: "Science",
    physics: "Physics",
    chemistry: "Chemistry",
  },

  hindi: {
    // Common
    welcome: "स्वागत है",
    login: "लॉगिन",
    register: "रजिस्टर",
    logout: "लॉगआउट",
    back: "वापस",
    next: "अगला",
    submit: "जमा करें",
    cancel: "रद्द करें",
    loading: "लोड हो रहा है...",

    // Landing Page
    landingTitle: "ग्रामीण छात्रों के लिए STEM शिक्षा को मजेदार बनाया गया",
    landingSubtitle:
      "हजारों छात्रों के साथ एक रोमांचक गेमिफाइड लर्निंग यात्रा में शामिल हों। KBC-स्टाइल क्विज़ खेलें, बैज अर्जित करें, और STEM विषयों में महारत हासिल करते हुए सहपाठियों के साथ प्रतिस्पर्धा करें।",
    missionTitle: "हमारा मिशन",
    missionDescription:
      "गेमिफाइड लर्निंग अनुभवों के माध्यम से ग्रामीण छात्रों को आकर्षक STEM शिक्षा के साथ सशक्त बनाना। हमारा मानना है कि हर छात्र को गुणवत्तापूर्ण शिक्षा का अधिकार है, चाहे उनका स्थान या संसाधन कुछ भी हो।",
    startLearning: "अभी सीखना शुरू करें",

    // Authentication
    email: "ईमेल",
    password: "पासवर्ड",
    fullName: "पूरा नाम",
    selectRole: "मैं हूँ:",
    student: "छात्र",
    teacher: "शिक्षक",
    preferredLanguage: "पसंदीदा भाषा",
    selectClass: "अपनी कक्षा चुनें",
    createAccount: "खाता बनाएं",

    // Dashboard
    welcomeBack: "वापस स्वागत है",
    currentScore: "वर्तमान स्कोर",
    classRank: "कक्षा रैंक",
    avgScore: "औसत स्कोर",
    quizzesDone: "पूरे किए गए क्विज़",
    dayStreak: "दिन की लकीर",
    yourSubjects: "आपके विषय",
    recentAchievements: "हाल की उपलब्धियां",
    yourBadges: "आपके बैज",
    quickActions: "त्वरित कार्य",

    // Quiz
    question: "प्रश्न",
    timeLeft: "समय बचा",
    progress: "प्रगति",
    lifelines: "लाइफलाइन",
    hint: "संकेत",
    skip: "छोड़ें",
    quizCompleted: "क्विज़ पूरा हुआ!",
    correctAnswers: "सही उत्तर",
    accuracy: "सटीकता",
    xpEarned: "XP अर्जित",

    // Leaderboard
    leaderboard: "लीडरबोर्ड",
    topPerformers: "शीर्ष प्रदर्शनकर्ता",
    fullRankings: "पूरी रैंकिंग",
    myAchievements: "मेरी उपलब्धियां",
    totalEarned: "कुल अर्जित",
    available: "उपलब्ध",
    completion: "पूर्णता",

    // Subjects
    mathematics: "गणित",
    science: "विज्ञान",
    physics: "भौतिकी",
    chemistry: "रसायन विज्ञान",
  },

  marathi: {
    // Common
    welcome: "स्वागत आहे",
    login: "लॉगिन",
    register: "नोंदणी",
    logout: "लॉगआउट",
    back: "परत",
    next: "पुढे",
    submit: "सबमिट करा",
    cancel: "रद्द करा",
    loading: "लोड होत आहे...",

    // Landing Page
    landingTitle: "ग्रामीण विद्यार्थ्यांसाठी STEM शिक्षण मजेदार बनवले",
    landingSubtitle:
      "हजारो विद्यार्थ्यांसोबत एका रोमांचक गेमिफाइड लर्निंग प्रवासात सामील व्हा। KBC-स्टाइल क्विझ खेळा, बॅज मिळवा आणि STEM विषयांमध्ये प्रभुत्व मिळवताना वर्गमित्रांशी स्पर्धा करा।",
    missionTitle: "आमचे ध्येय",
    missionDescription:
      "गेमिफाइड लर्निंग अनुभवांद्वारे ग्रामीण विद्यार्थ्यांना आकर्षक STEM शिक्षणासह सक्षम करणे. आमचा विश्वास आहे की प्रत्येक विद्यार्थ्याला दर्जेदार शिक्षणाचा अधिकार आहे, त्यांचे स्थान किंवा संसाधने काहीही असो.",
    startLearning: "आता शिकायला सुरुवात करा",

    // Authentication
    email: "ईमेल",
    password: "पासवर्ड",
    fullName: "पूर्ण नाव",
    selectRole: "मी आहे:",
    student: "विद्यार्थी",
    teacher: "शिक्षक",
    preferredLanguage: "पसंतीची भाषा",
    selectClass: "तुमचा वर्ग निवडा",
    createAccount: "खाते तयार करा",

    // Dashboard
    welcomeBack: "परत स्वागत आहे",
    currentScore: "सध्याचा स्कोअर",
    classRank: "वर्ग रँक",
    avgScore: "सरासरी स्कोअर",
    quizzesDone: "पूर्ण केलेले क्विझ",
    dayStreak: "दिवसांची पट्टी",
    yourSubjects: "तुमचे विषय",
    recentAchievements: "अलीकडील यश",
    yourBadges: "तुमचे बॅज",
    quickActions: "त्वरित कृती",

    // Quiz
    question: "प्रश्न",
    timeLeft: "वेळ शिल्लक",
    progress: "प्रगती",
    lifelines: "लाइफलाइन",
    hint: "इशारा",
    skip: "वगळा",
    quizCompleted: "क्विझ पूर्ण झाला!",
    correctAnswers: "बरोबर उत्तरे",
    accuracy: "अचूकता",
    xpEarned: "XP मिळवले",

    // Leaderboard
    leaderboard: "लीडरबोर्ड",
    topPerformers: "अग्रणी कामगिरी करणारे",
    fullRankings: "संपूर्ण रँकिंग",
    myAchievements: "माझी यशे",
    totalEarned: "एकूण मिळवले",
    available: "उपलब्ध",
    completion: "पूर्णता",

    // Subjects
    mathematics: "गणित",
    science: "विज्ञान",
    physics: "भौतिकशास्त्र",
    chemistry: "रसायनशास्त्र",
  },
}

export function useTranslation(language: Language = "english") {
  return translations[language]
}
