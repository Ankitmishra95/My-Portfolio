import SectionHeading from "./SectionHeading";
import styles from "./Projects.module.css";

const PROJECTS = [
  {
    year: "2026",
    title: "Multilingual Audio Intelligence Platform",
    tag: "Summarization & RAG-based Q&A",
    stack: ["Python", "Whisper", "LangChain", "Mistral", "HuggingFace", "ChromaDB"],
    points: [
      "Built an end-to-end AI pipeline converting audio/video into structured, searchable insights using local Whisper transcription, translation, and summarization.",
      "Developed a LangChain LCEL pipeline with the Mistral API and a ChromaDB-based RAG Q&A system for context-grounded retrieval, with a Streamlit UI.",
    ],
  },
  {
    year: "2025",
    title: "AI Interview Assistant Platform",
    tag: "Team Project — Role: Backend",
    stack: ["React", "TypeScript", "Django", "OpenAI API"],
    points: [
      "Built an AI-powered mock interview system for company-specific interview practice; owned backend development.",
      "Integrated OpenAI APIs to generate adaptive interview questions and implemented authentication, session handling, and evaluation logic in Django.",
    ],
  },
];

export default function Projects() {
  return (
    <section id="work" className={styles.projects}>
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Selected Work"
          title="Two systems, one instinct — make unstructured signal legible."
        />

        <div className={styles.list}>
          {PROJECTS.map((project, i) => (
            <article className={styles.project} key={project.title}>
              <span className={styles.index}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className={styles.body}>
                <div className={styles.projectHead}>
                  <h3>{project.title}</h3>
                  <span className={styles.year}>{project.year}</span>
                </div>
                <span className={styles.tag}>{project.tag}</span>

                <ul className={styles.points}>
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <ul className={styles.stack}>
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
