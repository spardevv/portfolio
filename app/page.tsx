import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LocaleTyping } from "@/components/locale-typing";
import { BackToTop } from "@/components/back-to-top";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { SkillsSection } from "@/components/home/skills-section";
import { ExperienceSection } from "@/components/home/experience-section";

export default function Home() {
  return (
    <>
      <Header />
      <BackToTop />
      <LocaleTyping />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ExperienceSection />
      </main>
      <Footer />
    </>
  );
}
