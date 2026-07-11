import SectionHeading from "./SectionHeading";
import styles from "./Certifications.module.css";

const CERTIFICATIONS = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    date: "Oct 30, 2025",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "Jul 01, 2025",
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "May 06, 2026",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className={styles.certs}>
      <div className={styles.inner}>
        <SectionHeading eyebrow="Credentials" title="Certifications" />

        <div className={styles.list}>
          {CERTIFICATIONS.map((cert) => (
            <div className={styles.row} key={cert.title}>
              <div className={styles.rowMain}>
                <h3>{cert.title}</h3>
                <span className={styles.issuer}>{cert.issuer}</span>
              </div>
              <span className={styles.date}>{cert.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
