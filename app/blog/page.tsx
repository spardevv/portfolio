"use client"

import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import blogData from "@/data/blog-posts.json"
import { MotionDiv, MotionArticle, fadeInUp, staggerContainer } from "@/components/motion"
import { motion } from "framer-motion"

export default function BlogPage() {
  const { locale } = useLocale()
  const t = content[locale]
  const posts = blogData.posts.filter(post => post.status === "published")

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center mb-16"
          >
            <MotionDiv variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.blog.title}
              </h1>
            </MotionDiv>
            <MotionDiv variants={fadeInUp}>
              <div className="w-16 h-1 bg-primary rounded-full" />
            </MotionDiv>
            <MotionDiv variants={fadeInUp}>
              <p className="text-muted-foreground mt-6 text-center max-w-2xl">
                {t.blog.description}
              </p>
            </MotionDiv>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, index) => {
              const postContent = post.content[locale]
              
              return (
                <MotionArticle
                  key={post._id}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="relative aspect-video bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString(locale === "pt-BR" ? "pt-BR" : "en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTimeMinutes} min
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {postContent.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {postContent.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs font-mono rounded bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all group/link"
                    >
                      {t.blog.readMore}
                      <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </MotionArticle>
              )
            })}
          </motion.div>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-16"
          >
            <Link 
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t.blog.backHome}
            </Link>
          </MotionDiv>
        </div>
      </main>
      <Footer />
    </>
  )
}
