import VideoIntro from "@/components/hero/VideoIntro";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <VideoIntro
        eyebrow="AI / ML Software Engineer"
        firstName="Ankit"
        lastName="Kumar"
        subtitle="Building LLM pipelines, RAG systems, and full-stack AI products — turning unstructured audio and language into structured, searchable intelligence."
        videoSrc="/videos/hero.mp4"
      />

      <About />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
    </main>
  );
}
