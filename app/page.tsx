"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Trophy, Smartphone } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LandingPage() {
  const { language } = useLanguage()
  const t = useTranslation(language)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">LearnQuest</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {t.login} / {t.register}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="mb-6">
            <img
              src="/friendly-cartoon-mascot-owl-with-graduation-cap.jpg"
              alt="LearnQuest Mascot"
              className="w-30 h-30 mx-auto mb-4"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">{t.landingTitle}</h2>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">{t.landingSubtitle}</p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-4"
            >
              {t.startLearning}
            </Button>
          </Link>
        </div>

        {/* Mission Section */}
        <div className="bg-card rounded-2xl p-8 mb-16 border border-border shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-card-foreground mb-4">{t.missionTitle}</h3>
            <p className="text-lg text-muted-foreground text-balance max-w-3xl mx-auto">{t.missionDescription}</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-primary">Gamified Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                KBC-style quiz interface with lifelines, levels, and exciting rewards to keep you engaged.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-secondary">Leaderboards</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Compete with classmates, earn XP points, and climb the rankings while learning together.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-chart-2/20 hover:border-chart-2/40 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-chart-2" />
              </div>
              <CardTitle className="text-chart-2">Mobile Optimized</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Works perfectly on low-cost mobile devices with offline support for uninterrupted learning.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-chart-4/20 hover:border-chart-4/40 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-chart-4" />
              </div>
              <CardTitle className="text-chart-4">Multilingual</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Available in Hindi, English, and Marathi to ensure comfortable learning for all students.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-2xl p-12 border border-primary/20">
          <h3 className="text-3xl font-bold text-primary mb-4">Ready to Start Your Learning Adventure?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning and having fun with LearnQuest. Choose your role and begin your
            educational journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login?role=student">
              <Button size="lg" className="bg-primary hover:bg-primary/90 min-w-[200px]">
                I'm a {t.student}
              </Button>
            </Link>
            <Link href="/login?role=teacher">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 min-w-[200px] bg-transparent"
              >
                I'm a {t.teacher}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-border">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2024 LearnQuest. Empowering rural education through gamified learning.</p>
        </div>
      </footer>
    </div>
  )
}
