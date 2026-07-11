"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CinematicLayer from "./CinematicLayer";
import styles from "./VideoIntro.module.css";

interface VideoIntroProps {
  eyebrow: string;
  firstName: string;
  lastName: string;
  subtitle: string;
  videoSrc: string;
}

export default function VideoIntro({
  eyebrow,
  firstName,
  lastName,
  subtitle,
  videoSrc,
}: VideoIntroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fgVideoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const nameFirstRef = useRef<HTMLSpanElement | null>(null);
  const nameLastRef = useRef<HTMLSpanElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLButtonElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Entrance choreography — runs once on mount.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.set(sectionRef.current, { autoAlpha: 0 })
        .to(sectionRef.current, { autoAlpha: 1, duration: 1.1 })
        .from(
          eyebrowRef.current,
          { y: 16, autoAlpha: 0, duration: 0.7 },
          "-=0.6"
        )
        .from(
          nameFirstRef.current,
          { y: 60, autoAlpha: 0, duration: 1, ease: "expo.out" },
          "-=0.35"
        )
        .from(
          nameLastRef.current,
          { y: 60, autoAlpha: 0, duration: 1, ease: "expo.out" },
          "-=0.8"
        )
        .from(
          subtitleRef.current,
          { y: 24, autoAlpha: 0, duration: 0.8 },
          "-=0.55"
        )
        .from(
          controlsRef.current,
          { y: 16, autoAlpha: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          scrollRef.current,
          { autoAlpha: 0, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-hide the "tap for sound" hint after a few seconds.
  useEffect(() => {
    if (!showHint) return;
    const timer = window.setTimeout(() => {
      gsap.to(hintRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        onComplete: () => setShowHint(false),
      });
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [showHint]);

  const togglePlay = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    if (isPlaying) {
      fg.pause();
      bg.pause();
    } else {
      fg.play();
      bg.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
    if (showHint) {
      gsap.to(hintRef.current, {
        autoAlpha: 0,
        duration: 0.4,
        onComplete: () => setShowHint(false),
      });
    }
  };

  const scrollToNext = () => {
    const next = document.getElementById("work");
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.sticky}>
        {/* Ambient blurred duplicate — sets the atmosphere */}
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />

        {/* Foreground video — the actual subject */}
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />

        {/* Cinematic Three.js bokeh layer */}
        <div className={styles.particleLayer}>
          <CinematicLayer />
        </div>

        {/* Gradient overlays for legibility + mood */}
        <div className={styles.overlayBottom} />
        <div className={styles.overlaySide} />
        <div className={styles.overlayVignette} />

        {/* Content */}
        <div className={styles.content}>
          <span ref={eyebrowRef} className={styles.eyebrow}>
            {eyebrow}
          </span>

          <h1 className={styles.name}>
            <span ref={nameFirstRef} className={styles.nameLine}>
              {firstName}
            </span>
            <span ref={nameLastRef} className={styles.nameLine}>
              {lastName}
            </span>
          </h1>

          <p ref={subtitleRef} className={styles.subtitle}>
            {subtitle}
          </p>
        </div>

        {/* Controls */}
        <div ref={controlsRef} className={styles.controls}>
          <button
            type="button"
            className={styles.glassButton}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className={styles.glassButton}
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <MutedIcon /> : <UnmutedIcon />}
          </button>
        </div>

        {/* Tap for sound hint */}
        {showHint && (
          <div ref={hintRef} className={styles.soundHint}>
            <span className={styles.soundHintDot} />
            Tap for sound
          </div>
        )}

        {/* Scroll indicator styled as a waveform pulse */}
        <button
          ref={scrollRef}
          type="button"
          className={styles.scrollIndicator}
          onClick={scrollToNext}
          aria-label="Scroll to next section"
        >
          <span className={styles.waveform}>
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className={styles.scrollLabel}>Scroll</span>
        </button>
      </div>
    </section>
  );
}

/* --- inline icons, kept dependency-free --- */

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 2.5v11l10-5.5-10-5.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="2.5" width="3" height="11" fill="currentColor" />
      <rect x="9.5" y="2.5" width="3" height="11" fill="currentColor" />
    </svg>
  );
}

function UnmutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 6h2.5L8 3v10L4.5 10H2V6z"
        fill="currentColor"
      />
      <path
        d="M10.5 5.5a3.2 3.2 0 010 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12.3 3.8a5.8 5.8 0 010 8.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 6h2.5L8 3v10L4.5 10H2V6z"
        fill="currentColor"
      />
      <path
        d="M10.5 6l3 3M13.5 6l-3 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
