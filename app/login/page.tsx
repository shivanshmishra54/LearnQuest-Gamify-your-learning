"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, User, GraduationCap, Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "teacher">("student")
  const [language, setLanguage] = useState("english")
  const [studentClass, setStudentClass] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const languages = [
    { value: "english", label: "English", native: "English" },
    { value: "hindi", label: "Hindi", native: "हिंदी" },
    { value: "marathi", label: "Marathi", native: "मराठी" },
  ]

  const classes = [
    { value: "6", label: "Class 6" },
    { value: "7", label: "Class 7" },
    { value: "8", label: "Class 8" },
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user data in localStorage for demo
    const userData = {
      email,
      name,
      role,
      language,
      class: role === "student" ? studentClass : null,
    }
    localStorage.setItem("user", JSON.stringify(userData))

    // Redirect based on role
    if (role === "student") {
      router.push("/student/dashboard")
    } else {
      router.push("/teacher/dashboard")
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user data in localStorage for demo
    const userData = {
      email,
      name,
      role,
      language,
      class: role === "student" ? studentClass : null,
    }
    localStorage.setItem("user", JSON.stringify(userData))

    // Redirect based on role
    if (role === "student") {
      router.push("/student/dashboard")
    } else {
      router.push("/teacher/dashboard")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">LearnQuest</h1>
          </Link>
          <p className="text-muted-foreground">Welcome to your learning adventure!</p>
        </div>

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Join LearnQuest</CardTitle>
            <CardDescription>Choose your role and start learning</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Role Selection */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">I am a:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={role === "student" ? "default" : "outline"}
                    className={`h-20 flex-col gap-2 ${
                      role === "student"
                        ? "bg-primary hover:bg-primary/90"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                    onClick={() => setRole("student")}
                  >
                    <User className="w-6 h-6" />
                    <span>Student</span>
                  </Button>
                  <Button
                    type="button"
                    variant={role === "teacher" ? "default" : "outline"}
                    className={`h-20 flex-col gap-2 ${
                      role === "teacher"
                        ? "bg-primary hover:bg-primary/90"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                    onClick={() => setRole("teacher")}
                  >
                    <GraduationCap className="w-6 h-6" />
                    <span>Teacher</span>
                  </Button>
                </div>
              </div>

              {/* Language Selection */}
              <div className="mb-6">
                <Label htmlFor="language" className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Preferred Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <span className="flex items-center gap-2">
                          {lang.label} ({lang.native})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Class Selection for Students */}
              {role === "student" && (
                <div className="mb-6">
                  <Label htmlFor="class" className="text-sm font-medium mb-2 block">
                    Select Your Class
                  </Label>
                  <Select value={studentClass} onValueChange={setStudentClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.value} value={cls.value}>
                          {cls.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading || (role === "student" && !studentClass)}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    disabled={isLoading || (role === "student" && !studentClass)}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
