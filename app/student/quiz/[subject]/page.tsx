"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, Lightbulb, SkipForward, Trophy, Star, Zap, ArrowLeft, Clock, Target } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  difficulty: "easy" | "medium" | "hard"
  xpReward: number
  hint: string
}

interface Lifeline {
  type: "50-50" | "hint" | "skip"
  icon: React.ReactNode
  name: string
  used: boolean
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const subject = params.subject as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const [lifelines, setLifelines] = useState<Lifeline[]>([
    { type: "50-50", icon: <Heart className="w-4 h-4" />, name: "50:50", used: false },
    { type: "hint", icon: <Lightbulb className="w-4 h-4" />, name: "Hint", used: false },
    { type: "skip", icon: <SkipForward className="w-4 h-4" />, name: "Skip", used: false },
  ])

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the value of π (pi) approximately?",
      options: ["3.14159", "2.71828", "1.41421", "1.73205"],
      correctAnswer: 0,
      difficulty: "easy",
      xpReward: 100,
      hint: "This is the ratio of a circle's circumference to its diameter.",
    },
    {
      id: 2,
      question: "Which element has the chemical symbol 'Au'?",
      options: ["Silver", "Gold", "Aluminum", "Argon"],
      correctAnswer: 1,
      difficulty: "medium",
      xpReward: 150,
      hint: "This precious metal has been valued throughout history.",
    },
    {
      id: 3,
      question: "What is the speed of light in vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      correctAnswer: 0,
      difficulty: "hard",
      xpReward: 200,
      hint: "Einstein's theory of relativity is based on this constant.",
    },
    {
      id: 4,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Jupiter", "Mars", "Saturn"],
      correctAnswer: 2,
      difficulty: "easy",
      xpReward: 100,
      hint: "This planet is named after the Roman god of war.",
    },
    {
      id: 5,
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
      correctAnswer: 1,
      difficulty: "medium",
      xpReward: 150,
      hint: "This organelle produces ATP energy for cellular processes.",
    },
  ]

  const currentQ = questions[currentQuestion]
  const [visibleOptions, setVisibleOptions] = useState(currentQ?.options || [])

  useEffect(() => {
    if (currentQ) {
      setVisibleOptions(currentQ.options)
    }
  }, [currentQ])

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp()
    }
  }, [timeLeft, isAnswered, quizCompleted])

  const handleTimeUp = () => {
    setIsAnswered(true)
    setShowResult(true)
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return
    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    setShowResult(true)

    const isCorrect = answerIndex === currentQ.correctAnswer
    if (isCorrect) {
      setScore(score + 1)
      setXpEarned(xpEarned + currentQ.xpReward)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }

    setTimeout(() => {
      nextQuestion()
    }, 3000)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      setQuizCompleted(true)
    }
  }

  const activateLifeline = (type: string) => {
    const lifeline = lifelines.find((l) => l.type === type)
    if (!lifeline || lifeline.used) return

    setLifelines(lifelines.map((l) => (l.type === type ? { ...l, used: true } : l)))

    switch (type) {
      case "50-50":
        const correctIndex = currentQ.correctAnswer
        const incorrectIndices = currentQ.options.map((_, index) => index).filter((index) => index !== correctIndex)
        const toRemove = incorrectIndices.slice(0, 2)
        setVisibleOptions(currentQ.options.map((option, index) => (toRemove.includes(index) ? "" : option)))
        break
      case "skip":
        nextQuestion()
        break
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? "border-primary bg-primary/10"
        : "border-border hover:border-primary/50 hover:bg-primary/5"
    }

    if (index === currentQ.correctAnswer) {
      return "border-green-500 bg-green-100 text-green-800"
    }
    if (selectedAnswer === index && index !== currentQ.correctAnswer) {
      return "border-red-500 bg-red-100 text-red-800"
    }
    return "border-border bg-muted/50"
  }

  const handleHintClick = () => {
    activateLifeline("hint")
  }

  if (quizCompleted) {
    return (
      <AuthGuard requiredRole="student">
        <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-3xl text-primary">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-chart-1/10 rounded-lg">
                  <div className="text-2xl font-bold text-chart-1">{score}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="p-4 bg-chart-2/10 rounded-lg">
                  <div className="text-2xl font-bold text-chart-2">{Math.round((score / questions.length) * 100)}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">+{xpEarned}</div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Link href="/student/dashboard">
                  <Button className="bg-primary hover:bg-primary/90">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="student">
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="text-6xl animate-bounce">🎉</div>
            <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
          </div>
        )}

        {/* Header */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/student/dashboard">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-primary capitalize">{subject} Quiz</h1>
                  <p className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-red-100 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-red-600">{timeLeft}s</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4 text-secondary" />
                  <span className="font-bold text-secondary">{xpEarned} XP</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Quiz Area */}
            <div className="lg:col-span-3">
              <Card className="border-2 border-primary/20 mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(currentQ.difficulty)}>
                      {currentQ.difficulty.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-secondary" />
                      <span className="font-bold text-secondary">+{currentQ.xpReward} XP</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h2 className="text-2xl font-bold text-balance mb-8">{currentQ.question}</h2>

                  <div className="grid gap-4">
                    {visibleOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`h-16 text-left justify-start text-wrap p-4 ${getOptionStyle(index)} ${
                          !option ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                        onClick={() => option && handleAnswerSelect(index)}
                        disabled={isAnswered || !option}
                      >
                        <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 text-primary font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option || "Option removed"}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lifelines Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Lifelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lifelines.map((lifeline, index) => (
                    <div key={index}>
                      {lifeline.type === "hint" ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start ${lifeline.used ? "opacity-50 cursor-not-allowed" : ""}`}
                              onClick={handleHintClick}
                              disabled={lifeline.used}
                            >
                              {lifeline.icon}
                              <span className="ml-2">{lifeline.name}</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Hint</DialogTitle>
                              <DialogDescription>{currentQ.hint}</DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button
                          variant="outline"
                          className={`w-full justify-start ${lifeline.used ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() => activateLifeline(lifeline.type)}
                          disabled={lifeline.used}
                        >
                          {lifeline.icon}
                          <span className="ml-2">{lifeline.name}</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Score Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Current Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{score}</div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
