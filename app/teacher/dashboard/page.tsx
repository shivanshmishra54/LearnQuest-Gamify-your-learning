"use client"

import { useState } from "react"
import { AuthGuard, useAuth } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Target,
  BarChart3,
  PlusCircle,
  Eye,
  LogOut,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

interface Student {
  id: string
  name: string
  class: string
  xp: number
  level: number
  averageScore: number
  quizzesCompleted: number
  lastActive: string
  status: "active" | "struggling" | "excellent"
}

interface ClassStats {
  totalStudents: number
  activeToday: number
  averageScore: number
  totalQuizzes: number
  improvementAreas: string[]
}

export default function TeacherDashboard() {
  const { user, logout } = useAuth()
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")

  const classStats: ClassStats = {
    totalStudents: 156,
    activeToday: 89,
    averageScore: 76,
    totalQuizzes: 1240,
    improvementAreas: ["Algebra", "Chemical Bonding", "Physics Laws"],
  }

  const students: Student[] = [
    {
      id: "1",
      name: "Priya Sharma",
      class: "10",
      xp: 2450,
      level: 8,
      averageScore: 92,
      quizzesCompleted: 28,
      lastActive: "2 hours ago",
      status: "excellent",
    },
    {
      id: "2",
      name: "Rahul Kumar",
      class: "10",
      xp: 1890,
      level: 6,
      averageScore: 78,
      quizzesCompleted: 22,
      lastActive: "5 hours ago",
      status: "active",
    },
    {
      id: "3",
      name: "Anita Patel",
      class: "9",
      xp: 1200,
      level: 4,
      averageScore: 65,
      quizzesCompleted: 15,
      lastActive: "1 day ago",
      status: "struggling",
    },
    {
      id: "4",
      name: "Vikram Singh",
      class: "11",
      xp: 3100,
      level: 10,
      averageScore: 88,
      quizzesCompleted: 35,
      lastActive: "1 hour ago",
      status: "excellent",
    },
    {
      id: "5",
      name: "Meera Joshi",
      class: "8",
      xp: 1650,
      level: 5,
      averageScore: 71,
      quizzesCompleted: 19,
      lastActive: "3 hours ago",
      status: "active",
    },
  ]

  const subjectPerformance = [
    { subject: "Mathematics", averageScore: 78, totalAttempts: 340, improvement: "+5%" },
    { subject: "Science", averageScore: 82, totalAttempts: 298, improvement: "+8%" },
    { subject: "Physics", averageScore: 71, totalAttempts: 256, improvement: "-2%" },
    { subject: "Chemistry", averageScore: 75, totalAttempts: 189, improvement: "+3%" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "struggling":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4" />
      case "struggling":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  return (
    <AuthGuard requiredRole="teacher">
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
                  <h1 className="text-xl font-bold text-primary">LearnQuest Teacher</h1>
                  <p className="text-sm text-muted-foreground">Welcome back, {user?.name}!</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-chart-1/20 hover:border-chart-1/40 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-chart-1">{classStats.totalStudents}</p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                  <Users className="w-8 h-8 text-chart-1/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-chart-2/20 hover:border-chart-2/40 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-chart-2">{classStats.activeToday}</p>
                    <p className="text-sm text-muted-foreground">Active Today</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-chart-2/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-chart-3/20 hover:border-chart-3/40 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-chart-3">{classStats.averageScore}%</p>
                    <p className="text-sm text-muted-foreground">Class Average</p>
                  </div>
                  <Target className="w-8 h-8 text-chart-3/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-chart-4/20 hover:border-chart-4/40 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-chart-4">{classStats.totalQuizzes}</p>
                    <p className="text-sm text-muted-foreground">Total Quizzes</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-chart-4/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="students" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="students">Student Progress</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="space-y-6">
              {/* Filters */}
              <div className="flex gap-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
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

                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Student List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Student Progress Overview
                  </CardTitle>
                  <CardDescription>Track individual student performance and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-bold text-primary">{student.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Class {student.class} • Level {student.level} • {student.xp} XP
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">{student.averageScore}%</p>
                            <p className="text-sm text-muted-foreground">{student.quizzesCompleted} quizzes</p>
                          </div>

                          <Badge className={`${getStatusColor(student.status)} flex items-center gap-1`}>
                            {getStatusIcon(student.status)}
                            {student.status}
                          </Badge>

                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Last active</p>
                            <p className="text-sm font-medium">{student.lastActive}</p>
                          </div>

                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Subject Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Subject Performance
                    </CardTitle>
                    <CardDescription>Average scores and improvement trends</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {subjectPerformance.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{subject.subject}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{subject.averageScore}%</span>
                            <Badge
                              variant={subject.improvement.startsWith("+") ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {subject.improvement}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={subject.averageScore} className="h-2" />
                        <p className="text-xs text-muted-foreground">{subject.totalAttempts} total attempts</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Improvement Areas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Areas Needing Attention
                    </CardTitle>
                    <CardDescription>Topics where students are struggling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {classStats.improvementAreas.map((area, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <span className="font-medium text-red-800">{area}</span>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-700 bg-transparent">
                            Create Practice Quiz
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" />
                    Create Assignment
                  </CardTitle>
                  <CardDescription>Assign practice quizzes to specific students or classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Button className="w-full bg-primary hover:bg-primary/90 h-20 flex-col gap-2">
                        <BookOpen className="w-6 h-6" />
                        <span>Quick Math Quiz</span>
                        <span className="text-xs opacity-80">10 questions • 15 min</span>
                      </Button>
                      <Button className="w-full bg-chart-2 hover:bg-chart-2/90 h-20 flex-col gap-2 text-white">
                        <Award className="w-6 h-6" />
                        <span>Science Challenge</span>
                        <span className="text-xs opacity-80">15 questions • 20 min</span>
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <Button className="w-full bg-chart-3 hover:bg-chart-3/90 h-20 flex-col gap-2 text-white">
                        <Clock className="w-6 h-6" />
                        <span>Physics Practice</span>
                        <span className="text-xs opacity-80">12 questions • 18 min</span>
                      </Button>
                      <Button className="w-full bg-chart-4 hover:bg-chart-4/90 h-20 flex-col gap-2 text-white">
                        <Target className="w-6 h-6" />
                        <span>Custom Quiz</span>
                        <span className="text-xs opacity-80">Create your own</span>
                      </Button>
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
