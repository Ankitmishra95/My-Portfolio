import styles from "./Contact.module.css";

const LINKS = [
  { label: "Email", value: "ak3953845@gmail.com", href: "mailto:ak3953845@gmail.com" },
  { label: "Phone", value: "+91 95086 30121", href: "tel:+919508630121" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ankitmishra9",
    href: "https://linkedin.com/in/ankitmishra9",
  },
  {
    label: "GitHub",
    value: "github.com/Ankitmishra95",
    href: "https://github.com/Ankitmishra95",
  },
];

export default function Contact() {
  return (
    <footer id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Get in touch</span>
        <h2 className={styles.title}>
          Let&apos;s build something that
          <br />
          turns noise into signal.
        </h2>

        <div className={styles.linkGrid}>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.link}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span className={styles.linkLabel}>{link.label}</span>
              <span className={styles.linkValue}>{link.value}</span>
            </a>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>Bhopal, India</span>
          <span>© {new Date().getFullYear()} Ankit Kumar</span>
        </div>
      </div>
    </footer>
  );
}
