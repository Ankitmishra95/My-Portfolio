import SectionHeading from "./SectionHeading";
import styles from "./Achievements.module.css";

export default function Achievements() {
  return (
    <section id="achievements" className={styles.achievements}>
      <div className={styles.inner}>
        <SectionHeading eyebrow="Track Record" title="Achievements" />

        <div className={styles.callout}>
          <span className={styles.number}>100+</span>
          <div className={styles.calloutText}>
            <h3>Competitive Programming</h3>
            <p>
              Solved 100+ problems on LeetCode, demonstrating strong
              problem-solving skills in data structures and algorithms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
