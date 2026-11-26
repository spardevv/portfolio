"use client";

import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { MotionDiv, Counter, fadeInUp, staggerContainer } from "@/components/motion";
import { SectionHeader } from "@/components/home/section-header";
import { SectionBackdrop } from "@/components/section-backdrop";
import { yearsOfExperience, withYears } from "@/lib/career";


export function AboutSection() {
  const { locale } = useLocale();
  const about = content[locale].about;
  const projectCount = content[locale].projects.items.length;
  const jobs = about.sections.trajectory.items;
  const companies = new Set(jobs.map((j) => j.company)).size;

  const stats = [
    { label: about.stats.years, value: yearsOfExperience(), suffix: "+" },
    { label: about.stats.companies, value: companies },
    { label: about.stats.projects, value: projectCount },
    { label: about.stats.languages, value: 2 },
  ];

  const facts = [about.location, about.education, about.languagesInfo];

  return (
    <section id="about" className="relative isolate overflow-hidden border-t border-border bg-card section-screen px-6 py-16 md:px-10">
      <SectionBackdrop src="/images/bg/discobolus.webp" position="50% 25%" />
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader index={3} kicker={about.kicker} title={about.title} />

        <div className="mt-10 grid gap-12 lg:mt-[clamp(20px,4vh,48px)] lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <MotionDiv variants={fadeInUp}>
            <p className="display-tight text-pretty text-[clamp(24px,min(2.6vw,4.4vh),36px)] leading-[1.2] text-foreground">
              {about.subtitle}.
            </p>
            <p className="mt-6 max-w-[40em] text-pretty text-[15px] leading-[1.75] text-muted-foreground">
              {withYears(about.intro)}
            </p>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-border bg-border sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="bg-card p-5">
                  <dt className="label-caps text-accent-soft">{f.label}</dt>
                  <dd className="mt-3 text-[13px] leading-[1.6] text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </MotionDiv>

          <div className="grid grid-cols-2 content-start gap-x-8 gap-y-10">
            {stats.map((stat, i) => (
              <MotionDiv key={stat.label} variants={fadeInUp} className="border-t border-border pt-5">
                <small className="label-caps block text-muted-foreground">
                  #{String(i + 1).padStart(2, "0")} {stat.label}
                </small>
                <span className="mt-4 flex items-start font-display text-[clamp(56px,min(7vw,11vh),104px)] font-extralight leading-none tracking-[-0.03em] text-foreground">
                  <Counter to={stat.value} />
                  {stat.suffix && <span className="text-accent-soft">{stat.suffix}</span>}
                </span>
              </MotionDiv>
            ))}
          </div>
        </div>

      </MotionDiv>
    </section>
  );
}
