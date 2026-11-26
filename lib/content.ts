import i18nData from "@/data/i18n.json"

export type Locale = "pt-BR" | "en-US"

export const content = i18nData as Record<Locale, typeof i18nData["pt-BR"]>

export const skillsData = {
  categories: [
    {
      titleKey: "languages" as const,
      skills: ["C#", ".NET", "React.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "Kotlin", "PHP", "Laravel", "Python"]
    },
    {
      titleKey: "database" as const,
      skills: ["MSSQL", "PostgreSQL", "MySQL", "MongoDB"]
    },
    {
      titleKey: "orm" as const,
      skills: ["Entity Framework", "Prisma ORM", "MikroORM"]
    },
    {
      titleKey: "mobile" as const,
      skills: ["Kotlin", "Jetpack Compose", "Room"]
    },
    {
      titleKey: "frontend" as const,
      skills: ["HTML", "CSS", "Tailwind", "BootstrapVue"]
    },
    {
      titleKey: "tools" as const,
      skills: ["Git", "GitLab", "Azure DevOps", "Postman", "AWS SDK", "Figma"]
    }
  ]
}
