"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { MapPin, Briefcase, CheckCircle, GraduationCap, Award, Heart } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MotionDiv, fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/components/motion"

export default function SobrePage() {
  const { locale } = useLocale()
  const t = content[locale].about

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          {/* Hero Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <MotionDiv variants={slideInLeft} transition={{ duration: 0.6 }}>
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-primary/20 flex-shrink-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/582652974_17848789467613918_1007503240521686312_n.jpg-GoUR3dtxp1oKkAJKOX3740pFPqbMDm.png"
                    alt="Gabriel Fernandes Ramos"
                    fill
                    className="object-cover"
                  />
                </div>
              </MotionDiv>
              <div className="flex-1">
                <MotionDiv variants={fadeInUp}>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
                    {t.title}
                  </h1>
                </MotionDiv>
                <MotionDiv variants={fadeInUp}>
                  <p className="text-lg text-primary font-medium mb-4">{t.subtitle}</p>
                </MotionDiv>
                <MotionDiv variants={fadeInUp}>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t.intro}
                  </p>
                </MotionDiv>
                <MotionDiv variants={fadeInUp} className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{t.location.value}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>{t.experience.value}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{t.status.value}</span>
                  </div>
                </MotionDiv>
              </div>
            </div>
          </motion.section>

          {/* Trajectory Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <MotionDiv variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Briefcase className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{t.sections.trajectory.title}</h2>
            </MotionDiv>
            <div className="space-y-6">
              {t.sections.trajectory.items.map((item, index) => (
                <MotionDiv
                  key={index}
                  variants={slideInRight}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative pl-6 border-l-2 border-border hover:border-primary transition-colors"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                  <motion.div
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="bg-card rounded-lg p-5 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <span className="text-xs text-muted-foreground font-mono">{item.period}</span>
                    </div>
                    <p className="text-sm text-primary mb-2">{item.company}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                </MotionDiv>
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <MotionDiv variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{t.sections.education.title}</h2>
            </MotionDiv>
            <div className="space-y-4">
              {t.sections.education.items.map((item, index) => (
                <MotionDiv
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  className="bg-card rounded-lg p-5 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <span className="text-xs text-muted-foreground font-mono">{item.period}</span>
                  </div>
                  <p className="text-sm text-primary mb-2">{item.institution}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </MotionDiv>
              ))}
            </div>
          </motion.section>

          {/* Certificates Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <MotionDiv variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{t.sections.certificates.title}</h2>
            </MotionDiv>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.sections.certificates.items.map((item, index) => (
                <MotionDiv
                  key={index}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-card rounded-lg p-4 border border-border flex items-center justify-between hover:border-primary/30 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.issuer}</p>
                  </div>
                  <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">{item.year}</span>
                </MotionDiv>
              ))}
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <MotionDiv variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{t.sections.values.title}</h2>
            </MotionDiv>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.sections.values.items.map((item, index) => (
                <MotionDiv
                  key={index}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-card rounded-lg p-5 border border-border hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </MotionDiv>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  )
}
