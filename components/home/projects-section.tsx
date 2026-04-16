"use client"

import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionSection, MotionDiv, MotionArticle, fadeInUp, staggerContainer } from "@/components/motion"

export function ProjectsSection() {
  const { locale } = useLocale()
  const t = content[locale]

  return (
    <MotionSection
      id="projects"
      className="py-24 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="container mx-auto max-w-6xl">
        <MotionDiv variants={fadeInUp} className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.projects.title}
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full" />
          <p className="text-muted-foreground mt-6 text-center max-w-2xl">
            {t.projects.description}
          </p>
        </MotionDiv>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((project, index) => (
            <MotionArticle
              key={index}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="GitHub repository"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-xs font-mono rounded bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </MotionArticle>
          ))}
        </div>

        <MotionDiv variants={fadeInUp} className="flex justify-center mt-12">
          <Button variant="outline" size="lg" asChild className="hover:border-primary hover:text-primary">
            <a href="https://github.com/gabrielframos" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              {t.projects.viewAll}
            </a>
          </Button>
        </MotionDiv>
      </div>
    </MotionSection>
  )
}
