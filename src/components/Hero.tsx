"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

type Cell = {
  id: number;
  gridX: number;
  gridY: number;
  depth: number;
  x: number;
  y: number;
  size: number;
  baseSize: number;
  alpha: number;
  glow: number;
  phase: number;
  columnPhase: number;
  driftX: number;
  driftY: number;
  activationBias: number;
};

const GRID_COLS = 11;
const GRID_ROWS = 11;
const CELL_GAP = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createCells(width: number, height: number) {
  const centerX = width * 0.63;
  const centerY = height * 0.5;
  const isCompact = width < 1024;
  const baseCell = clamp(Math.min(width, height) * (isCompact ? 0.028 : 0.024), 14, 24);
  const step = baseCell + CELL_GAP;
  const radiusX = step * 4.4;
  const radiusY = step * 4.8;
  const cells: Cell[] = [];

  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLS; col += 1) {
      const normX = (col - (GRID_COLS - 1) / 2) / ((GRID_COLS - 1) / 2);
      const normY = (row - (GRID_ROWS - 1) / 2) / ((GRID_ROWS - 1) / 2);
      const ellipse = normX * normX + normY * normY * 0.78;

      if (ellipse > 1.18) {
        continue;
      }

      const edgeFalloff = clamp(1 - ellipse, 0, 1);
      const depth = 0.2 + edgeFalloff * 0.8;
      const jitterX = (Math.random() - 0.5) * step * 0.28;
      const jitterY = (Math.random() - 0.5) * step * 0.28;
      const x = centerX + normX * radiusX + jitterX;
      const y = centerY + normY * radiusY + jitterY;
      const size = baseCell * (0.78 + depth * 0.48);

      cells.push({
        id: row * GRID_COLS + col,
        gridX: col,
        gridY: row,
        depth,
        x,
        y,
        size,
        baseSize: size,
        alpha: 0.22 + depth * 0.5,
        glow: 0.18 + depth * 0.35,
        phase: Math.random() * Math.PI * 2,
        columnPhase: col * 0.34 + row * 0.18,
        driftX: (Math.random() - 0.5) * step * 0.36,
        driftY: (Math.random() - 0.5) * step * 0.36,
        activationBias: Math.random(),
      });
    }
  }

  return {
    cells,
    centerX,
    centerY,
    baseCell,
    width: radiusX * 2.35,
    height: radiusY * 2.35,
  };
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

export default function Hero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const structureRef = useRef<ReturnType<typeof createCells> | null>(null);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

  const titleWords = useMemo(
    () => "Automatisez votre activité sans complexité.".split(" "),
    [],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateViewport = () => {
      if (!containerRef.current) {
        return;
      }

      const bounds = containerRef.current.getBoundingClientRect();
      setViewport({
        width: Math.max(360, Math.round(bounds.width)),
        height: Math.max(760, Math.round(bounds.height)),
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    structureRef.current = createCells(viewport.width, viewport.height);
  }, [viewport]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-word", { yPercent: 110, opacity: 0 });
      gsap.set(".hero-copy", { y: 28, opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.to(".hero-word", {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        stagger: 0.075,
      });
      intro.to(
        ".hero-copy",
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.11,
        },
        "-=0.58",
      );

      if (containerRef.current && contentRef.current && objectRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
          .to(
            contentRef.current,
            {
              yPercent: 14,
              opacity: 0.18,
              filter: "blur(8px)",
              ease: "none",
            },
            0,
          )
          .to(
            objectRef.current,
            {
              yPercent: 10,
              scale: 1.04,
              opacity: 0.82,
              ease: "none",
            },
            0,
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(viewport.width * ratio);
    canvas.height = Math.round(viewport.height * ratio);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const render = (time: number) => {
      const structure = structureRef.current;
      if (!structure) {
        frameRef.current = window.requestAnimationFrame(render);
        return;
      }

      const seconds = time * 0.001;
      const majorWave = seconds * 0.42;
      const minorWave = seconds * 0.88;
      const breathe = 0.5 + Math.sin(seconds * 0.68) * 0.5;
      const reorganization = 0.5 + Math.sin(seconds * 0.14) * 0.5;

      context.clearRect(0, 0, viewport.width, viewport.height);

      const vignette = context.createRadialGradient(
        structure.centerX,
        structure.centerY,
        structure.baseCell * 2,
        structure.centerX,
        structure.centerY,
        Math.max(structure.width, structure.height) * 0.92,
      );
      vignette.addColorStop(0, "rgba(15, 23, 42, 0.22)");
      vignette.addColorStop(0.45, "rgba(6, 12, 24, 0.12)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, viewport.width, viewport.height);

      const shadow = context.createRadialGradient(
        structure.centerX + structure.baseCell * 0.6,
        structure.centerY + structure.baseCell * 1.8,
        structure.baseCell,
        structure.centerX + structure.baseCell * 0.6,
        structure.centerY + structure.baseCell * 1.8,
        structure.width * 0.42,
      );
      shadow.addColorStop(0, "rgba(0, 0, 0, 0.46)");
      shadow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = shadow;
      context.fillRect(0, 0, viewport.width, viewport.height);

      structure.cells.forEach((cell) => {
        const columnWave = Math.sin(majorWave + cell.columnPhase);
        const rowWave = Math.cos(minorWave + cell.phase);
        const activation =
          0.32 +
          cell.depth * 0.48 +
          Math.max(0, columnWave) * 0.18 +
          Math.max(0, Math.sin(seconds * 1.24 + cell.phase * 1.5)) * 0.12;
        const alignment = Math.sin(seconds * 0.26 + cell.gridX * 0.48 - cell.gridY * 0.34);
        const shiftStrength = 0.35 + reorganization * 0.65;
        const x =
          cell.x +
          cell.driftX * alignment * shiftStrength +
          Math.sin(seconds * 0.52 + cell.phase) * 2.2;
        const y =
          cell.y +
          cell.driftY * rowWave * shiftStrength +
          Math.cos(seconds * 0.48 + cell.phase) * 1.8;
        const scale = 0.92 + breathe * 0.03 + Math.max(0, columnWave) * 0.08;
        const size = cell.baseSize * scale;
        const lift = Math.max(0, columnWave) * cell.depth * 12;
        const activeBand = Math.sin(seconds * 0.74 + (cell.gridX + cell.gridY) * 0.32);
        const edgeAlpha = clamp(0.12 + activation * 0.34, 0.14, 0.44);
        const fillAlpha = clamp(0.18 + activation * 0.28, 0.16, 0.42);
        const glowAlpha = clamp(
          (Math.max(0, activeBand) * 0.12 + Math.max(0, columnWave) * 0.18) *
            (0.55 + cell.activationBias * 0.45),
          0,
          0.18,
        );

        const glow = context.createRadialGradient(
          x + size * 0.5,
          y + size * 0.5 - lift * 0.2,
          0,
          x + size * 0.5,
          y + size * 0.5 - lift * 0.2,
          size * 1.8,
        );
        glow.addColorStop(0, `rgba(96, 165, 250, ${glowAlpha})`);
        glow.addColorStop(1, "rgba(96, 165, 250, 0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(x + size * 0.5, y + size * 0.5, size * 1.8, 0, Math.PI * 2);
        context.fill();

        roundedRect(context, x, y - lift, size, size, size * 0.14);
        context.fillStyle = `rgba(4, 8, 18, ${fillAlpha})`;
        context.fill();
        context.strokeStyle = `rgba(148, 163, 184, ${edgeAlpha})`;
        context.lineWidth = 0.7 + cell.depth * 0.65;
        context.stroke();

        const topLight = context.createLinearGradient(x, y - lift, x + size, y - lift + size);
        topLight.addColorStop(0, `rgba(255, 255, 255, ${0.045 + activation * 0.07})`);
        topLight.addColorStop(1, "rgba(255, 255, 255, 0)");
        roundedRect(context, x + 0.6, y - lift + 0.6, size - 1.2, size - 1.2, size * 0.12);
        context.strokeStyle = topLight;
        context.lineWidth = 0.5;
        context.stroke();

        if (activeBand > 0.68) {
          context.fillStyle = `rgba(147, 197, 253, ${0.14 + activeBand * 0.08})`;
          roundedRect(
            context,
            x + size * 0.18,
            y - lift + size * 0.18,
            size * 0.24,
            size * 0.24,
            size * 0.05,
          );
          context.fill();
        }
      });

      const core = context.createRadialGradient(
        structure.centerX,
        structure.centerY,
        structure.baseCell * 0.4,
        structure.centerX,
        structure.centerY,
        structure.baseCell * 7.2,
      );
      core.addColorStop(0, `rgba(96, 165, 250, ${0.08 + breathe * 0.05})`);
      core.addColorStop(0.55, "rgba(29, 78, 216, 0.05)");
      core.addColorStop(1, "rgba(29, 78, 216, 0)");
      context.fillStyle = core;
      context.beginPath();
      context.arc(structure.centerX, structure.centerY, structure.baseCell * 7.2, 0, Math.PI * 2);
      context.fill();

      frameRef.current = window.requestAnimationFrame(render);
    };

    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [viewport]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-24 text-white sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.03),transparent_22%),linear-gradient(180deg,#020407_0%,#03060d_50%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:160px_160px] opacity-20" />

      <div
        ref={objectRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_50%,rgba(15,23,42,0.42),transparent_38%)]" />
        <canvas ref={canvasRef} className="h-full w-full opacity-95" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.48)_35%,rgba(0,0,0,0.24)_58%,rgba(0,0,0,0.6)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-black/45 to-black" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center"
      >
        <div className="max-w-3xl">
          <div className="hero-copy mb-8 inline-flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.42em] text-white/54">
            <span className="h-px w-14 bg-gradient-to-r from-transparent via-blue-300/80 to-white/70" />
            Système vivant et orchestration
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[6.4rem]">
            {titleWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em]"
              >
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-copy mt-8 max-w-2xl text-base leading-8 text-white/72 sm:text-lg md:text-[1.14rem]">
            Nous concevons des systèmes qui travaillent pour vous : acquisition,
            organisation, traitement. Vous gagnez du temps, nous faisons le reste.
          </p>

          <div className="hero-copy mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Link
              href="/offre-devis"
              className="group inline-flex items-center gap-3 rounded-full border border-blue-300/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_50px_rgba(2,6,23,0.55)] transition-all duration-500 hover:border-blue-300/40 hover:bg-blue-400/[0.08] hover:shadow-[0_0_32px_rgba(59,130,246,0.16),0_18px_60px_rgba(2,6,23,0.62)]"
            >
              Book demo
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/cas-d-usage/acquisition"
              className="group inline-flex items-center gap-3 text-sm font-medium text-white/68 transition-colors duration-300 hover:text-white"
            >
              <span className="h-px w-10 bg-gradient-to-r from-blue-300/70 to-transparent transition-all duration-500 group-hover:w-14" />
              Voir les possibilités
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
