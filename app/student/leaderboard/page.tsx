"use client"

import { useState } from "react"
import { AuthGuard, useAuth } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Star,
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Zap,
  ArrowLeft,
  Calendar,
  LogOut,
} from "lucide-react"
import Link from "next/link"

interface LeaderboardEntry {
  rank: number
  name: string
  class: string
  xp: number
  level: number
  averageScore: number
  quizzesCompleted: number
  streak: number
  badges: number
  isCurrentUser?: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export default function LeaderboardPage() {
  const { user, logout } = useAuth()
  const [timeFilter, setTimeFilter] = useState("all-time")
  const [classFilter, setClassFilter] = useState("all")

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      name: "Vikram Singh",
      class: "11",
      xp: 3100,
      level: 10,
      averageScore: 88,
      quizzesCompleted: 35,
      streak: 12,
      badges: 8,
    },
    {
      rank: 2,
      name: "Priya Sharma",
      class: "10",
      xp: 2850,
      level: 9,
      averageScore: 92,
      quizzesCompleted: 28,
      streak: 8,
      badges: 7,
    },
    {
      rank: 3,
      name: "Arjun Patel",
      class: "12",
      xp: 2650,
      level: 8,
      averageScore: 85,
      quizzesCompleted: 31,
      streak: 6,
      badges: 6,
    },
    {
      rank: 4,
      name: "Sneha Reddy",
      class: "11",
      xp: 2500,
      level: 8,
      averageScore: 89,
      quizzesCompleted: 26,
      streak: 9,
      badges: 5,
    },
    {
      rank: 5,
      name: "Rohit Kumar",
      class: "10",
      xp: 2450,
      level: 8,
      averageScore: 78,
      quizzesCompleted: 24,
      streak: 5,
      badges: 4,
      isCurrentUser: true,
    },
    {
      rank: 6,
      name: "Kavya Nair",
      class: "9",
      xp: 2200,
      level: 7,
      averageScore: 82,
      quizzesCompleted: 23,
      streak: 4,
      badges: 5,
    },
    {
      rank: 7,
      name: "Aditya Gupta",
      class: "12",
      xp: 2100,
      level: 7,
      averageScore: 80,
      quizzesCompleted: 22,
      streak: 7,
      badges: 4,
    },
    {
      rank: 8,
      name: "Riya Jain",
      class: "10",
      xp: 1950,
      level: 6,
      averageScore: 86,
      quizzesCompleted: 20,
      streak: 3,
      badges: 3,
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first quiz",
      icon: "🎯",
      unlockedAt: "2 weeks ago",
      rarity: "common",
    },
    {
      id: "2",
      title: "Math Master",
      description: "Score 90% or higher in 5 math quizzes",
      icon: "📊",
      unlockedAt: "1 week ago",
      rarity: "rare",
    },
    {
      id: "3",
      title: "Speed Demon",
      description: "Complete a quiz in under 2 minutes",
      icon: "⚡",
      unlockedAt: "3 days ago",
      rarity: "epic",
    },
    {
      id: "4",
      title: "Streak Master",
      description: "Maintain a 5-day learning streak",
      icon: "🔥",
      unlockedAt: "Today",
      rarity: "rare",
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">
            #{rank}
          </span>
        )
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <AuthGuard requiredRole="student">
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
        {/* Header */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-10">
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
                  <h1 className="text-xl font-bold text-primary">Leaderboard</h1>
                  <p className="text-sm text-muted-foreground">See how you rank among your peers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full">
                  <Trophy className="w-4 h-4 text-secondary" />
                  <span className="font-bold text-secondary">Rank #5</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="leaderboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="achievements">My Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="leaderboard" className="space-y-6">
              {/* Filters */}
              <div className="flex gap-4">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="6">Class 6</SelectItem>
                    <SelectItem value="7">Class 7</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                    <SelectItem value="11">Class 11</SelectItem>
                    <SelectItem value="12">Class 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Top 3 Podium */}
              <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-primary flex items-center justify-center gap-2">
                    <Trophy className="w-6 h-6" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {leaderboardData.slice(0, 3).map((entry, index) => (
                      <Card
                        key={entry.rank}
                        className={`text-center border-2 ${
                          index === 0
                            ? "border-yellow-200 bg-yellow-50"
                            : index === 1
                              ? "border-gray-200 bg-gray-50"
                              : "border-amber-200 bg-amber-50"
                        }`}
                      >
                        <CardContent className="pt-6">
                          <div className="flex justify-center mb-4">{getRankIcon(entry.rank)}</div>
                          <h3 className="font-bold text-lg">{entry.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">Class {entry.class}</p>
                          <div className="space-y-1">
                            <div className="flex items-center justify-center gap-1">
                              <Zap className="w-4 h-4 text-secondary" />
                              <span className="font-bold text-secondary">{entry.xp} XP</span>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <Star className="w-4 h-4 text-primary" />
                              <span className="text-sm">Level {entry.level}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Full Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Full Rankings
                  </CardTitle>
                  <CardDescription>Complete leaderboard with detailed stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboardData.map((entry) => (
                      <div
                        key={entry.rank}
                        className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                          entry.isCurrentUser
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10">{getRankIcon(entry.rank)}</div>
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-bold text-primary">{entry.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className={`font-semibold ${entry.isCurrentUser ? "text-primary" : ""}`}>
                              {entry.name} {entry.isCurrentUser && "(You)"}
                            </h3>
                            <p className="text-sm text-muted-foreground">Class {entry.class}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="font-bold text-secondary">{entry.xp}</div>
                            <div className="text-xs text-muted-foreground">XP</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold">{entry.level}</div>
                            <div className="text-xs text-muted-foreground">Level</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold">{entry.averageScore}%</div>
                            <div className="text-xs text-muted-foreground">Avg</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold">{entry.quizzesCompleted}</div>
                            <div className="text-xs text-muted-foreground">Quizzes</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-orange-600">{entry.streak}</div>
                            <div className="text-xs text-muted-foreground">Streak</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-purple-600">{entry.badges}</div>
                            <div className="text-xs text-muted-foreground">Badges</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              {/* Achievement Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="text-center border-chart-1/20">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-chart-1">{achievements.length}</div>
                    <div className="text-sm text-muted-foreground">Total Earned</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-chart-2/20">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-chart-2">12</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-chart-3/20">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-chart-3">75%</div>
                    <div className="text-sm text-muted-foreground">Completion</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-chart-4/20">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-chart-4">1</div>
                    <div className="text-sm text-muted-foreground">Epic Badges</div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievement Grid */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Your Achievements
                  </CardTitle>
                  <CardDescription>Badges and milestones you've unlocked</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            Unlocked {achievement.unlockedAt}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progress Tracking
                  </CardTitle>
                  <CardDescription>Your learning journey over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Weekly Quiz Goal</p>
                          <p className="text-sm text-muted-foreground">Complete 5 quizzes this week</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">3/5</div>
                        <div className="text-xs text-muted-foreground">60% complete</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-secondary" />
                        <div>
                          <p className="font-medium">Accuracy Challenge</p>
                          <p className="text-sm text-muted-foreground">Maintain 80%+ average score</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-secondary">78%</div>
                        <div className="text-xs text-muted-foreground">Almost there!</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Learning Streak</p>
                          <p className="text-sm text-green-600">Study for 5 consecutive days</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">5/5</div>
                        <div className="text-xs text-green-600">Completed!</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AuthGuard>
  )
}
