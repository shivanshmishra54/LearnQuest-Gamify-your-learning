"use client"

import { useState } from "react"
import { AuthGuard, useAuth } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Zap, BookOpen, Target, Award, TrendingUp, Play, Clock, Users, LogOut } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

interface StudentStats {
  xp: number
  level: number
  rank: number
  totalStudents: number
  quizzesCompleted: number
  averageScore: number
  streak: number
  badges: string[]
}

export default function StudentDashboard() {
  const { user, logout } = useAuth()
  const { language } = useLanguage()
  const t = useTranslation(language)
  const [stats, setStats] = useState<StudentStats>({
    xp: 2450,
    level: 8,
    rank: 12,
    totalStudents: 156,
    quizzesCompleted: 24,
    averageScore: 78,
    streak: 5,
    badges: ["First Quiz", "Math Master", "Science Explorer", "Speed Demon"],
  })

  const subjects = [
    {
      name: t.mathematics,
      icon: "📊",
      progress: 75,
      nextQuiz: "Algebra Basics",
      xpReward: 150,
      color: "bg-chart-1",
    },
    {
      name: t.science,
      icon: "🔬",
      progress: 60,
      nextQuiz: "Chemical Reactions",
      xpReward: 200,
      color: "bg-chart-2",
    },
    {
      name: t.physics,
      icon: "⚡",
      progress: 45,
      nextQuiz: "Motion & Forces",
      xpReward: 180,
      color: "bg-chart-3",
    },
    {
      name: t.chemistry,
      icon: "🧪",
      progress: 30,
      nextQuiz: "Periodic Table",
      xpReward: 220,
      color: "bg-chart-4",
    },
  ]

  const recentAchievements = [
    { title: "Speed Demon", description: "Completed quiz in under 2 minutes", icon: "⚡", time: "2 hours ago" },
    { title: "Perfect Score", description: "Got 100% in Math Quiz #5", icon: "🎯", time: "1 day ago" },
    { title: "Study Streak", description: "5 days in a row!", icon: "🔥", time: "Today" },
  ]

  const xpToNextLevel = 500
  const currentLevelXp = stats.xp % 500
  const levelProgress = (currentLevelXp / xpToNextLevel) * 100

  return (
    <AuthGuard requiredRole="student">
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
        {/* Header */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-primary">LearnQuest</h1>
                  <p className="text-sm text-muted-foreground">
                    {t.welcomeBack}, {user?.name}!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher variant="button" size="sm" />
                <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4 text-secondary" />
                  <span className="font-bold text-secondary">{stats.xp} XP</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t.logout}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Level Progress */}
          <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    Level {stats.level}
                  </CardTitle>
                  <CardDescription>Keep learning to reach Level {stats.level + 1}!</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary">
                    {currentLevelXp}/{xpToNextLevel}
                  </div>
                  <div className="text-sm text-muted-foreground">XP to next level</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={levelProgress} className="h-3" />
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center border-chart-1/20 hover:border-chart-1/40 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-chart-1/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-chart-1" />
                </div>
                <div className="text-2xl font-bold text-chart-1">#{stats.rank}</div>
                <div className="text-sm text-muted-foreground">{t.classRank}</div>
              </CardContent>
            </Card>

            <Card className="text-center border-chart-2/20 hover:border-chart-2/40 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-chart-2" />
                </div>
                <div className="text-2xl font-bold text-chart-2">{stats.averageScore}%</div>
                <div className="text-sm text-muted-foreground">{t.avgScore}</div>
              </CardContent>
            </Card>

            <Card className="text-center border-chart-3/20 hover:border-chart-3/40 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-chart-3" />
                </div>
                <div className="text-2xl font-bold text-chart-3">{stats.quizzesCompleted}</div>
                <div className="text-sm text-muted-foreground">{t.quizzesDone}</div>
              </CardContent>
            </Card>

            <Card className="text-center border-chart-4/20 hover:border-chart-4/40 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-chart-4" />
                </div>
                <div className="text-2xl font-bold text-chart-4">{stats.streak}</div>
                <div className="text-sm text-muted-foreground">{t.dayStreak}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Subjects */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                {t.yourSubjects}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {subjects.map((subject, index) => (
                  <Card key={index} className="border-2 border-primary/10 hover:border-primary/30 transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{subject.icon}</div>
                          <div>
                            <CardTitle className="text-lg">{subject.name}</CardTitle>
                            <CardDescription>
                              {t.progress}: {subject.progress}%
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                          +{subject.xpReward} XP
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={subject.progress} className="mb-4" />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {t.next}: {subject.nextQuiz}
                          </p>
                        </div>
                        <Link href={`/student/quiz/${subject.name.toLowerCase()}`}>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Play className="w-4 h-4 mr-1" />
                            Start Quiz
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Award className="w-5 h-5" />
                    {t.recentAchievements}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {achievement.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Trophy className="w-5 h-5" />
                    {t.yourBadges} ({stats.badges.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {stats.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="justify-center py-2 bg-secondary/10 text-secondary border-secondary/20"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">{t.quickActions}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/student/leaderboard">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      View {t.leaderboard}
                    </Button>
                  </Link>
                  <Link href="/student/quiz/random">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Zap className="w-4 h-4 mr-2" />
                      Random Quiz
                    </Button>
                  </Link>
                  <Link href="/student/profile">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Star className="w-4 h-4 mr-2" />
                      My Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
