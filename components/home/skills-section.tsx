"use client"

import { useLocale } from "@/lib/locale-context"
import { content, skillsData } from "@/lib/content"
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from "@/components/motion"

export function SkillsSection() {
  const { locale } = useLocale()
  const t = content[locale]

  return (
    <MotionSection
      id="skills"
      className="py-24 px-4 bg-card/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="container mx-auto max-w-6xl">
        <MotionDiv variants={fadeInUp} className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.skills.title}
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full" />
          <p className="text-muted-foreground mt-6 text-center max-w-2xl">
            {t.skills.description}
          </p>
        </MotionDiv>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.categories.map((category, index) => (
            <MotionDiv
              key={category.titleKey}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t.skills.categories[category.titleKey]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <MotionDiv
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  )
}
