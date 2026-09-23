import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SocialSidebar } from "@/components/social-sidebar";
import { LanguageTab } from "@/components/language-tab";
import { BackToTop } from "@/components/back-to-top";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { MarqueeBand } from "@/components/home/marquee-band";

export default function Home() {
  return (
    <>
      <Header />
      <SocialSidebar />
      <LanguageTab />
      <BackToTop />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </main>
      <MarqueeBand />
      <Footer />
    </>
  );
}
