import SectionHeading from "./SectionHeading";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <SectionHeading eyebrow="Profile" title="What I build" />

        <div className={styles.grid}>
          <p className={styles.lead}>
            An AI/ML-focused software engineer who turns unstructured
            data — speech, language, documents — into systems people
            can actually search, query, and trust. Comfortable across
            the full stack: from local Whisper transcription and
            LangChain retrieval chains, to the Django and React layers
            that put them in front of a user.
          </p>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt>Focus</dt>
              <dd>LLM pipelines · RAG systems · Speech-to-insight</dd>
            </div>
            <div className={styles.fact}>
              <dt>Stack</dt>
              <dd>Python, TypeScript, Django, Next.js, LangChain</dd>
            </div>
            <div className={styles.fact}>
              <dt>Based in</dt>
              <dd>Bhopal, India</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
