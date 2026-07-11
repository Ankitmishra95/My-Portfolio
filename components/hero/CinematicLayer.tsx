"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CinematicLayer
 * A transparent, GPU-light bokeh/particle field rendered with plain Three.js.
 * Warm ember + cool signal-blue points drift on slow sine-wave paths and
 * loosely cluster like points in an embedding space — a quiet nod to the
 * vector-search work in the reel behind it. Camera drifts with the pointer
 * for a subtle parallax read. No UI, no interaction target: pointer-events
 * stay off so the video controls beneath remain fully usable.
 */
export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 18;

    // --- soft radial-gradient sprite, generated at runtime (no image asset) ---
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const ctx = spriteCanvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    // --- particle field ---
    const COUNT = 220;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    const drift = new Float32Array(COUNT * 2); // per-particle x/z drift amplitude

    const ember = new THREE.Color("#ff8a3d");
    const blueGlow = new THREE.Color("#4fb3ff");
    const white = new THREE.Color("#fff4e8");

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 34;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 16;

      // weighted mix: mostly warm tones, occasional cool glow for depth
      const roll = Math.random();
      const c =
        roll < 0.55
          ? ember.clone().lerp(white, Math.random() * 0.6)
          : roll < 0.85
          ? white.clone()
          : blueGlow.clone().lerp(white, 0.4);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i] = Math.random() * 1.6 + 0.4;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.06 + Math.random() * 0.1;
      drift[i * 2] = 0.4 + Math.random() * 1.1;
      drift[i * 2 + 1] = 0.3 + Math.random() * 0.9;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.42,
      map: spriteTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const basePositions = positions.slice();

    // --- pointer parallax ---
    const pointer = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.x = nx;
      pointer.y = ny;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // --- resize handling ---
    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", handleResize);

    // --- animation loop ---
    let rafId = 0;
    let visible = true;
    const handleVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!visible) return;

      const t = clock.getElapsedTime();
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const phase = phases[i];
        const speed = speeds[i];
        posAttr.array[i3] =
          basePositions[i3] + Math.sin(t * speed + phase) * drift[i * 2];
        posAttr.array[i3 + 1] =
          basePositions[i3 + 1] +
          Math.cos(t * speed * 0.8 + phase) * drift[i * 2 + 1];
        posAttr.array[i3 + 2] =
          basePositions[i3 + 2] + Math.sin(t * speed * 0.5 + phase) * 0.6;
      }
      posAttr.needsUpdate = true;

      points.rotation.y = Math.sin(t * 0.02) * 0.05;

      // smooth camera parallax toward pointer target
      targetCamera.x += (pointer.x * 1.2 - targetCamera.x) * 0.03;
      targetCamera.y += (-pointer.y * 0.8 - targetCamera.y) * 0.03;
      camera.position.x = targetCamera.x;
      camera.position.y = targetCamera.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
