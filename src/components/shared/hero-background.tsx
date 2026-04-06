"use client";

import { useEffect, useRef } from "react";

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type Particle = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  life: number;
  maxLife: number;
  maxOpacity: number;
};

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const PARTICLE_COUNT = 40;
    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx!.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }

    function spawnParticle(startFromBottom = false): Particle {
      return {
        x: random(0, w),
        y: startFromBottom ? random(h * 0.7, h + 20) : random(0, h),
        size: random(1.2, 3),
        speedY: random(-0.4, -0.1),
        speedX: random(-0.2, 0.2),
        life: startFromBottom ? 0 : random(0, 1),
        maxLife: random(0.6, 1),
        maxOpacity: random(0.2, 0.6),
      };
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        spawnParticle(false)
      );
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.008 + p.x * 0.005) * 0.15;

        // Advance life (0 → 1)
        p.life += 0.002;

        // Opacity: fade in then fade out using a bell curve
        const lifePct = p.life / p.maxLife;
        const opacity =
          lifePct < 0.3
            ? (lifePct / 0.3) * p.maxOpacity
            : lifePct < 0.7
              ? p.maxOpacity
              : ((1 - lifePct) / 0.3) * p.maxOpacity;

        // Respawn when life is over or off screen
        if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > w + 20) {
          particles[i] = spawnParticle(true);
          continue;
        }

        if (opacity <= 0.01) continue;

        // Draw ember glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3
        );
        gradient.addColorStop(0, `rgba(210, 175, 100, ${opacity})`);
        gradient.addColorStop(0.4, `rgba(196, 163, 90, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(196, 163, 90, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 230, 190, ${opacity * 0.8})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Ember particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      {/* Animated mist layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-mist hero-mist-1" />
        <div className="hero-mist hero-mist-2" />
      </div>
    </>
  );
}
