import SectionHeading from "./SectionHeading";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <section id="education" className={styles.education}>
      <div className={styles.inner}>
        <SectionHeading eyebrow="Education" title="Academic background" />

        <div className={styles.card}>
          <div className={styles.cardMain}>
            <h3>
              Lakshmi Narain College of Technology and Science
              <span className={styles.location}>Bhopal, India</span>
            </h3>
            <p className={styles.degree}>
              Bachelor of Technology — Computer Science and Engineering
              (AI/ML)
            </p>
            <span className={styles.timeline}>Expected May 2027</span>
          </div>

          <div className={styles.cardStat}>
            <span className={styles.statValue}>7.7</span>
            <span className={styles.statLabel}>CGPA / 10</span>
          </div>
        </div>
      </div>
    </section>
  );
}
