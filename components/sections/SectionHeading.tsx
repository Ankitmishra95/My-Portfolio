import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${align === "center" ? styles.center : ""}`}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
