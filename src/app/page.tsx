import { StackMarquee } from "@/components/stack-marquee";
import AboutSection from "@/components/section/about-section";
import ApproachSection from "@/components/section/approach-section";
import ContactSection from "@/components/section/contact-section";
import ExperienceSection from "@/components/section/experience-section";
import HeroSection from "@/components/section/hero-section";
import ProjectsSection from "@/components/section/projects-section";
import SkillsSection from "@/components/section/skills-section";
import TestimonialsSection from "@/components/section/testimonials-section";
import { DATA } from "@/data/resume";
import { SITE_URL } from "@/lib/site-url";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.fullName,
  jobTitle: DATA.title,
  url: SITE_URL,
  email: `mailto:${DATA.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Chiquinquirá", addressCountry: "CO" },
  alumniOf: DATA.education.map((education) => education.school),
  sameAs: DATA.social.map((social) => social.url),
};

export default function Page() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <HeroSection />
      <AboutSection />
      <StackMarquee />
      <ProjectsSection />
      <ExperienceSection />
      <ApproachSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
