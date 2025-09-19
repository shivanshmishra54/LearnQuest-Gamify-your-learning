"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import type { Language } from "@/lib/i18n"

const languages = [
  { value: "english" as Language, label: "English", native: "English" },
  { value: "hindi" as Language, label: "Hindi", native: "हिंदी" },
  { value: "marathi" as Language, label: "Marathi", native: "मराठी" },
]

interface LanguageSwitcherProps {
  variant?: "select" | "button"
  size?: "sm" | "default" | "lg"
}

export function LanguageSwitcher({ variant = "select", size = "default" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  if (variant === "button") {
    return (
      <div className="flex items-center gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.value}
            variant={language === lang.value ? "default" : "outline"}
            size={size}
            onClick={() => setLanguage(lang.value)}
            className="min-w-[80px]"
          >
            {lang.native}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className="w-48">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <SelectValue placeholder="Select language" />
        </div>
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
  )
}
