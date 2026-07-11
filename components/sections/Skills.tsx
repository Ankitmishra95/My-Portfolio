import SectionHeading from "./SectionHeading";
import styles from "./Skills.module.css";

const SKILL_GROUPS = [
  {
    label: "Languages",
    items: ["Python", "C++", "Java"],
  },
  {
    label: "Web",
    items: ["React", "TypeScript", "Django", "Next.js", "HTML", "CSS", "JavaScript"],
  },
  {
    label: "AI / ML & NLP",
    items: [
      "OpenAI API",
      "LangChain (LCEL)",
      "OpenAI Whisper",
      "HuggingFace Embeddings",
      "Mistral API",
    ],
  },
  {
    label: "Databases & Vector Stores",
    items: ["MySQL", "PostgreSQL", "ChromaDB"],
  },
  {
    label: "Cloud & Tools",
    items: ["AWS", "Oracle Cloud Infrastructure", "Git", "GitHub", "Streamlit"],
  },
  {
    label: "CS Fundamentals",
    items: ["Data Structures & Algorithms", "Operating Systems", "Distributed Systems"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.inner}>
        <SectionHeading eyebrow="Toolkit" title="Skills & technologies" />

        <div className={styles.groupGrid}>
          {SKILL_GROUPS.map((group) => (
            <div className={styles.group} key={group.label}>
              <h3 className={styles.groupLabel}>{group.label}</h3>
              <ul className={styles.tagList}>
                {group.items.map((item) => (
                  <li className={styles.tag} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
