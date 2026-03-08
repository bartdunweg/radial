"use client";

import { useEffect, useRef } from "react";

type V3 = [number, number, number];

function rotateX(v: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

function rotateY(v: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

function rotateZ(v: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
}

interface OrbitDef {
  radius: number;
  tiltX: number;
  tiltY: number;
  tiltZ: number;
  speed: number;
  color: [number, number, number];
  dragScale: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  scale: number;
}

// ── WebGL glow renderer ──────────────────────────────────────────────
const GLOW_VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const MAX_GLOWS = 8;
const GLOW_FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform vec3 u_centers[${MAX_GLOWS}];
uniform vec4 u_colors[${MAX_GLOWS}];
uniform float u_exps[${MAX_GLOWS}];
uniform int u_count;
uniform float u_time;
uniform vec2 u_core;
uniform float u_coreR;

float smoothFalloff(float t) {
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  vec2 px = gl_FragCoord.xy;
  px.y = u_resolution.y - px.y;
  vec3 col = vec3(0.0);

  for (int i = 0; i < ${MAX_GLOWS}; i++) {
    if (i >= u_count) break;
    float dist = distance(px, u_centers[i].xy);
    float t = clamp(dist / u_centers[i].z, 0.0, 1.0);
    float falloff = 1.0 - smoothFalloff(t);
    float alpha = u_colors[i].a * pow(falloff, u_exps[i]);
    col += u_colors[i].rgb * alpha;
  }

  float breath = 0.85 + 0.15 * sin(u_time * 0.8);
  float coreDist = distance(px, u_core);

  float t1 = clamp(coreDist / (u_coreR * 3.5), 0.0, 1.0);
  col += vec3(0.45, 0.55, 1.0) * pow(1.0 - smoothFalloff(t1), 2.5) * 0.1 * breath;

  float t2 = clamp(coreDist / (u_coreR * 1.8), 0.0, 1.0);
  col += vec3(0.65, 0.75, 1.0) * pow(1.0 - smoothFalloff(t2), 2.0) * 0.25 * breath;

  float t3 = clamp(coreDist / (u_coreR * 0.8), 0.0, 1.0);
  col += vec3(0.85, 0.9, 1.0) * pow(1.0 - smoothFalloff(t3), 1.5) * 0.5 * breath;

  float t4 = clamp(coreDist / (u_coreR * 0.25), 0.0, 1.0);
  col += vec3(1.0) * pow(1.0 - t4, 3.0) * 0.8 * breath;

  float a = max(max(col.r, col.g), col.b);
  gl_FragColor = vec4(col, a);
}
`;

function initGlowGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false })!;
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, GLOW_VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, GLOW_FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "u_resolution")!;
  const uCount = gl.getUniformLocation(prog, "u_count")!;
  const uCenters: WebGLUniformLocation[] = [];
  const uColors: WebGLUniformLocation[] = [];
  const uExps: WebGLUniformLocation[] = [];
  for (let i = 0; i < MAX_GLOWS; i++) {
    uCenters.push(gl.getUniformLocation(prog, `u_centers[${i}]`)!);
    uColors.push(gl.getUniformLocation(prog, `u_colors[${i}]`)!);
    uExps.push(gl.getUniformLocation(prog, `u_exps[${i}]`)!);
  }
  const uTime = gl.getUniformLocation(prog, "u_time")!;
  const uCore = gl.getUniformLocation(prog, "u_core")!;
  const uCoreR = gl.getUniformLocation(prog, "u_coreR")!;

  return { gl, prog, uRes, uCount, uCenters, uColors, uExps, uTime, uCore, uCoreR };
}

// ── Main component ───────────────────────────────────────────────────

export function AtomCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let w = 0, h = 0, cx = 0, cy = 0, radius = 1;

    const isDark = () => document.documentElement.classList.contains("dark");

    const glowCanvas = document.createElement("canvas");
    let glowGL: ReturnType<typeof initGlowGL> = null;

    let dragRotY = 0;
    let dragRotX = -0.4;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let scrollRotY = 0;
    let scrollRotX = 0;
    const mouseRotY = 0;
    const mouseRotX = 0;

    // Orbits — mix of large and small, evenly spaced like an atom
    // Colors adapt: dark navy on light mode, bright blue on dark mode
    const CORE_LIGHT: [number, number, number] = [140, 180, 255];
    const CORE_DARK: [number, number, number] = [20, 50, 120];

    // Classic atom: 3 orbits with normals evenly distributed in 3D
    // Each ring plane is ~120° apart so they always look connected from any angle
    const orbits: OrbitDef[] = [
      { radius: 1.0, tiltX: 0,            tiltY: 0,           tiltZ: 0,            speed: 0, color: CORE_LIGHT, dragScale: 1.0 },
      { radius: 1.0, tiltX: Math.PI / 3,  tiltY: 0,           tiltZ: 2 * Math.PI / 3, speed: 0, color: CORE_LIGHT, dragScale: 1.0 },
      { radius: 1.0, tiltX: -Math.PI / 3, tiltY: 0,           tiltZ: -2 * Math.PI / 3, speed: 0, color: CORE_LIGHT, dragScale: 1.0 },
    ];

    const PERSPECTIVE = 800;
    const SPHERE_R_RATIO = 0.35;
    const SEG_COUNT = 360;

    const project = (p: V3): ProjectedPoint => {
      const d = PERSPECTIVE / (PERSPECTIVE + p[2]);
      return { x: cx + p[0] * d, y: cy + p[1] * d, z: p[2], scale: d };
    };

    const rgb = (c: [number, number, number]) => `${c[0]},${c[1]},${c[2]}`;

    const smoothstep = (t: number) => t * t * (3 - 2 * t);
    const smoothGrad = (
      gx: number, gy: number, r: number,
      color: string, peak: number, exp = 2, steps = 32,
    ) => {
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
      for (let i = 0; i <= steps; i++) {
        const linear = i / steps;
        const t = linear * linear;
        const falloff = 1 - smoothstep(t);
        const alpha = peak * Math.pow(falloff, exp);
        g.addColorStop(Math.min(t, 1), `rgba(${color},${alpha})`);
      }
      return g;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      cx = w / 2; cy = h / 2;
      radius = Math.min(w, h) * 0.36;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      glowCanvas.width = w * dpr;
      glowCanvas.height = h * dpr;
      glowGL = initGlowGL(glowCanvas);
    };

    resize();
    window.addEventListener("resize", resize);

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastPointerX = e.clientX; lastPointerY = e.clientY;
      velocityX = 0; velocityY = 0;
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      dragRotY += dx * 0.01; dragRotX += dy * 0.01;
      velocityX = dx * 0.01; velocityY = dy * 0.01;
      lastPointerX = e.clientX; lastPointerY = e.clientY;
    };
    const onPointerUp = () => { isDragging = false; };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const onScroll = () => {
      scrollRotY = window.scrollY * 0.003;
      scrollRotX = window.scrollY * 0.0015;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mouse-follow removed per user request

    const transformPoint = (angle: number, r: number, orbit: OrbitDef, gRotY: number, gRotX: number): V3 => {
      let p: V3 = [Math.cos(angle) * r, Math.sin(angle) * r, 0];
      p = rotateX(p, orbit.tiltX);
      p = rotateY(p, orbit.tiltY);
      p = rotateZ(p, orbit.tiltZ);
      p = rotateY(p, gRotY);
      p = rotateX(p, gRotX);
      return p;
    };

    // Draw orbit path with neon glow layers
    const drawNeonPath = (
      points: ProjectedPoint[],
      color: string,
    ) => {
      if (points.length < 2) return;
      const path = () => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      };

      // Soft glow
      path(); ctx.strokeStyle = `rgba(${color},0.015)`; ctx.lineWidth = 20; ctx.stroke();
      // Medium glow
      path(); ctx.strokeStyle = `rgba(${color},0.04)`; ctx.lineWidth = 8; ctx.stroke();
      // Core
      path(); ctx.strokeStyle = `rgba(${color},0.1)`; ctx.lineWidth = 3; ctx.stroke();
      // Center line
      path(); ctx.strokeStyle = `rgba(${color},0.18)`; ctx.lineWidth = 1.2; ctx.stroke();
    };

    function splitContiguous(
      allPoints: ProjectedPoint[],
      all3d: V3[],
      zThreshold: number,
      inFront: boolean,
    ): ProjectedPoint[][] {
      const segments: ProjectedPoint[][] = [];
      let current: ProjectedPoint[] = [];
      for (let i = 0; i < allPoints.length; i++) {
        const passes = inFront ? all3d[i][2] > zThreshold : all3d[i][2] <= zThreshold;
        if (passes) {
          current.push(allPoints[i]);
        } else {
          if (current.length > 1) segments.push(current);
          current = [];
        }
      }
      if (current.length > 1) segments.push(current);
      return segments;
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      time += 0.005;

      const dark = isDark();
      // Always use bright core — hero bg is dark on both modes
      const coreColor = CORE_LIGHT;
      const coreRgb = rgb(coreColor);

      if (!isDragging) {
        dragRotY += velocityX;
        dragRotX += velocityY;
        velocityX *= 0.95;
        velocityY *= 0.95;
      }

      const gRotY = time * 0.35 + dragRotY + scrollRotY + mouseRotY;
      const gRotX = Math.sin(time * 0.15) * 0.15 + dragRotX + scrollRotX + mouseRotX;
      const sphereR = radius * SPHERE_R_RATIO;

      // === WebGL glow pass ===
      if (glowGL) {
        const { gl, uRes, uCount, uCenters, uColors, uExps, uTime, uCore, uCoreR } = glowGL;
        const dpr = window.devicePixelRatio || 1;

        gl.viewport(0, 0, glowCanvas.width, glowCanvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const coreOffX = Math.sin(gRotY) * radius * 0.12;
        const coreOffY = -Math.sin(gRotX) * radius * 0.12;
        const bx = cx + coreOffX, by = cy + coreOffY;

        const glows: [number, number, number, number, number, number, number, number][] = [
          [bx, by, radius * 2, 0.4, 0.55, 1, 0.15, 1.8],
          [bx, by, radius * 1.2, 0.5, 0.65, 1, 0.35, 2],
          [bx, by, sphereR * 2.5, 0.7, 0.8, 1, 0.6, 2],
        ];

        gl.uniform2f(uRes, w * dpr, h * dpr);
        gl.uniform1i(uCount, glows.length);
        gl.uniform1f(uTime, time);
        gl.uniform2f(uCore, bx * dpr, by * dpr);
        gl.uniform1f(uCoreR, sphereR * dpr);

        for (let i = 0; i < glows.length; i++) {
          const [gx, gy, gr, r, g, b, a, exp] = glows[i];
          gl.uniform3f(uCenters[i], gx * dpr, gy * dpr, gr * dpr);
          gl.uniform4f(uColors[i], r, g, b, a);
          gl.uniform1f(uExps[i], exp);
        }

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.disable(gl.BLEND);

        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(glowCanvas, 0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }

      // === Compute orbit paths ===
      const orbitData: {
        points: ProjectedPoint[];
        points3d: V3[];
        color: [number, number, number];
        orbit: OrbitDef;
        rotY: number;
        rotX: number;
      }[] = [];

      for (const orbit of orbits) {
        const r = orbit.radius * radius;
        const points: ProjectedPoint[] = [];
        const points3d: V3[] = [];
        const oRotY = gRotY;
        const oRotX = gRotX;

        for (let i = 0; i <= SEG_COUNT; i++) {
          const angle = (i / SEG_COUNT) * Math.PI * 2;
          const p3d = transformPoint(angle, r, orbit, oRotY, oRotX);
          points3d.push(p3d);
          points.push(project(p3d));
        }

        orbitData.push({ points, points3d, color: orbit.color, orbit, rotY: oRotY, rotX: oRotX });
      }

      // === Draw orbit rings behind sphere ===
      for (const od of orbitData) {
        const segments = splitContiguous(od.points, od.points3d, -sphereR * 0.15, false);
        for (const seg of segments) drawNeonPath(seg, coreRgb);
      }

      // === Core sphere — glass orb with starburst ===
      const pulse = 1 + Math.sin(time * 2) * 0.03;
      const breath = 0.85 + 0.15 * Math.sin(time * 0.8);
      const hlOffX = Math.sin(gRotY) * sphereR * 0.45;
      const hlOffY = -Math.sin(gRotX) * sphereR * 0.45;

      // Clip to sphere
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.clip();

      // Glass body
      ctx.globalCompositeOperation = "source-over";
      const bodyGrad = ctx.createRadialGradient(
        cx + hlOffX * 0.6, cy + hlOffY * 0.6, sphereR * 0.05,
        cx, cy, sphereR
      );
      bodyGrad.addColorStop(0, "rgba(255,255,255,0.9)");
      bodyGrad.addColorStop(0.2, "rgba(230,240,255,0.7)");
      bodyGrad.addColorStop(0.4, "rgba(200,220,255,0.5)");
      bodyGrad.addColorStop(0.6, "rgba(160,190,240,0.35)");
      bodyGrad.addColorStop(0.85, "rgba(120,160,230,0.3)");
      bodyGrad.addColorStop(1, "rgba(80,120,200,0.4)");
      ctx.beginPath(); ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad; ctx.fill();

      // Internal radial starburst rays
      ctx.globalCompositeOperation = "lighter";
      const rayCount = 36;
      for (let i = 0; i < rayCount; i++) {
        const baseAngle = (i / rayCount) * Math.PI * 2;
        const angle = baseAngle + Math.sin(time * 0.2 + i * 0.9) * 0.06;
        const isLong = i % 3 === 0;
        const rayLen = sphereR * (isLong ? 0.95 : 0.65) * (0.7 + 0.3 * Math.pow(Math.sin(time * 0.4 + i * 1.5), 2)) * pulse;
        const rayAlpha = (isLong ? 0.25 : 0.12) * breath;
        const rayWidth = isLong ? 2.5 : 1.2;

        const grad = ctx.createLinearGradient(
          cx, cy,
          cx + Math.cos(angle) * rayLen, cy + Math.sin(angle) * rayLen
        );
        grad.addColorStop(0, `rgba(255,255,255,${rayAlpha * 2})`);
        grad.addColorStop(0.15, `rgba(230,240,255,${rayAlpha * 1.5})`);
        grad.addColorStop(0.4, `rgba(180,210,255,${rayAlpha * 0.8})`);
        grad.addColorStop(1, "rgba(140,180,255,0)");

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * rayLen, cy + Math.sin(angle) * rayLen);
        ctx.strokeStyle = grad;
        ctx.lineWidth = rayWidth;
        ctx.stroke();
      }

      // Bright center hotspot
      const hotR = sphereR * 0.6 * pulse;
      const hotGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, hotR);
      hotGrad.addColorStop(0, `rgba(255,255,255,${1.0 * breath})`);
      hotGrad.addColorStop(0.1, `rgba(255,255,255,${0.9 * breath})`);
      hotGrad.addColorStop(0.25, `rgba(240,248,255,${0.7 * breath})`);
      hotGrad.addColorStop(0.5, `rgba(210,230,255,${0.4 * breath})`);
      hotGrad.addColorStop(0.75, `rgba(170,200,255,${0.15 * breath})`);
      hotGrad.addColorStop(1, "rgba(140,180,255,0)");
      ctx.beginPath(); ctx.arc(cx, cy, hotR, 0, Math.PI * 2);
      ctx.fillStyle = hotGrad; ctx.fill();

      ctx.restore(); // end clip

      // Rim — fresnel edge
      ctx.globalCompositeOperation = "lighter";
      const rimGrad = ctx.createRadialGradient(cx, cy, sphereR * 0.7, cx, cy, sphereR * 1.02);
      rimGrad.addColorStop(0, "rgba(150,190,255,0)");
      rimGrad.addColorStop(0.6, "rgba(160,200,255,0.05)");
      rimGrad.addColorStop(0.85, "rgba(180,215,255,0.2)");
      rimGrad.addColorStop(0.95, "rgba(210,230,255,0.35)");
      rimGrad.addColorStop(1, "rgba(180,210,255,0.1)");
      ctx.beginPath(); ctx.arc(cx, cy, sphereR * 1.02, 0, Math.PI * 2);
      ctx.fillStyle = rimGrad; ctx.fill();

      // Rim stroke
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath(); ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(180,215,255,0.3)";
      ctx.lineWidth = 1.5; ctx.stroke();

      // Specular highlight
      ctx.globalCompositeOperation = "lighter";
      const specX = cx + hlOffX * 0.8 - sphereR * 0.12;
      const specY = cy + hlOffY * 0.8 - sphereR * 0.18;
      const specGrad = ctx.createRadialGradient(specX, specY, 0, specX, specY, sphereR * 0.35);
      specGrad.addColorStop(0, "rgba(240,248,255,0.4)");
      specGrad.addColorStop(0.2, "rgba(210,230,255,0.2)");
      specGrad.addColorStop(0.5, "rgba(170,200,255,0.06)");
      specGrad.addColorStop(1, "rgba(140,180,255,0)");
      ctx.beginPath(); ctx.arc(specX, specY, sphereR * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = specGrad; ctx.fill();

      ctx.globalCompositeOperation = "source-over";

      // === Draw orbit rings in front of sphere ===
      for (const od of orbitData) {
        const segments = splitContiguous(od.points, od.points3d, -sphereR * 0.15, true);
        for (const seg of segments) drawNeonPath(seg, coreRgb);
      }

      // === Glare — cross-shaped light streaks from core ===
      ctx.globalCompositeOperation = "lighter";
      const glareLen = radius * 1.2;
      const glareBreath = 0.7 + 0.3 * Math.sin(time * 0.6);
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI + time * 0.02;
        const grad = ctx.createLinearGradient(
          cx - Math.cos(angle) * glareLen, cy - Math.sin(angle) * glareLen,
          cx + Math.cos(angle) * glareLen, cy + Math.sin(angle) * glareLen
        );
        grad.addColorStop(0, "rgba(140,180,255,0)");
        grad.addColorStop(0.35, "rgba(180,210,255,0.02)");
        grad.addColorStop(0.48, `rgba(220,235,255,${0.08 * glareBreath})`);
        grad.addColorStop(0.5, `rgba(255,255,255,${0.15 * glareBreath})`);
        grad.addColorStop(0.52, `rgba(220,235,255,${0.08 * glareBreath})`);
        grad.addColorStop(0.65, "rgba(180,210,255,0.02)");
        grad.addColorStop(1, "rgba(140,180,255,0)");
        ctx.beginPath();
        ctx.moveTo(cx - Math.cos(angle) * glareLen + Math.sin(angle) * 1.5,
                   cy - Math.sin(angle) * glareLen - Math.cos(angle) * 1.5);
        ctx.lineTo(cx + Math.cos(angle) * glareLen + Math.sin(angle) * 1.5,
                   cy + Math.sin(angle) * glareLen - Math.cos(angle) * 1.5);
        ctx.lineTo(cx + Math.cos(angle) * glareLen - Math.sin(angle) * 1.5,
                   cy + Math.sin(angle) * glareLen + Math.cos(angle) * 1.5);
        ctx.lineTo(cx - Math.cos(angle) * glareLen - Math.sin(angle) * 1.5,
                   cy - Math.sin(angle) * glareLen + Math.cos(angle) * 1.5);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // === Sparkles ===
      const sparkleRings = [
        { count: 10, distMin: 0.6,  distMax: 0.9,  sizeMin: 4, sizeMax: 8, alpha: 0.55 },
        { count: 14, distMin: 0.9,  distMax: 1.3,  sizeMin: 2.5, sizeMax: 5, alpha: 0.5 },
        { count: 18, distMin: 1.3,  distMax: 1.8,  sizeMin: 1.5, sizeMax: 3.5, alpha: 0.45 },
        { count: 22, distMin: 1.8,  distMax: 2.4,  sizeMin: 0.8, sizeMax: 2, alpha: 0.35 },
        { count: 26, distMin: 2.4,  distMax: 3.2,  sizeMin: 0.3, sizeMax: 1, alpha: 0.25 },
      ];

      let sparkIdx = 0;
      for (const ring of sparkleRings) {
        for (let i = 0; i < ring.count; i++) {
          const seed = sparkIdx * 137.508 + 42.7;
          sparkIdx++;

          const baseAngle = (i / ring.count) * Math.PI * 2;
          const angleOffset = Math.sin(seed * 0.3) * 0.3;
          const sparkAngle = baseAngle + angleOffset + time * (0.015 + (i % 3) * 0.004);

          const distT = 0.5 + 0.5 * Math.sin(seed * 0.17);
          const baseDist = sphereR * (ring.distMin + (ring.distMax - ring.distMin) * distT);
          const driftR = sphereR * 0.15;
          const dist = baseDist + Math.sin(time * 0.3 + seed * 0.2) * driftR;

          const sx = cx + Math.cos(sparkAngle) * dist;
          const sy = cy + Math.sin(sparkAngle) * dist;

          const twinkleBase = 0.3 + 0.7 * Math.pow(Math.max(0, Math.sin(time * 1.5 + seed)), 3);
          const sparkR = ring.sizeMin + (ring.sizeMax - ring.sizeMin) * (0.4 + 0.6 * Math.sin(seed * 0.23));
          const sparkAlpha = ring.alpha * twinkleBase;

          if (sparkAlpha > 0.02) {
            if (sparkR > 1.5) {
              const sGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sparkR * 3.5);
              sGrad.addColorStop(0, `rgba(200,225,255,${sparkAlpha * 0.6})`);
              sGrad.addColorStop(0.25, `rgba(170,200,255,${sparkAlpha * 0.25})`);
              sGrad.addColorStop(0.6, `rgba(140,180,255,${sparkAlpha * 0.08})`);
              sGrad.addColorStop(1, "rgba(140,180,255,0)");
              ctx.beginPath(); ctx.arc(sx, sy, sparkR * 3.5, 0, Math.PI * 2);
              ctx.fillStyle = sGrad; ctx.fill();
            }

            if (sparkR > 1) {
              const cGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sparkR);
              cGrad.addColorStop(0, `rgba(255,255,255,${sparkAlpha * 0.9})`);
              cGrad.addColorStop(0.3, `rgba(230,240,255,${sparkAlpha * 0.5})`);
              cGrad.addColorStop(0.7, `rgba(180,210,255,${sparkAlpha * 0.15})`);
              cGrad.addColorStop(1, "rgba(140,180,255,0)");
              ctx.beginPath(); ctx.arc(sx, sy, sparkR, 0, Math.PI * 2);
              ctx.fillStyle = cGrad; ctx.fill();
            } else {
              ctx.beginPath(); ctx.arc(sx, sy, sparkR, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(220,235,255,${sparkAlpha})`;
              ctx.fill();
            }
          }
        }
      }

      ctx.globalCompositeOperation = "source-over";

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);

      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none lg:justify-start">
      <div className="lg:relative lg:mx-auto lg:w-full lg:max-w-[1280px] lg:px-8">
        <canvas
          ref={canvasRef}
          className="aspect-square w-[min(90vw,500px)] opacity-50 dark:opacity-35 cursor-grab active:cursor-grabbing pointer-events-auto lg:absolute lg:-right-24 lg:top-1/2 lg:-translate-y-1/2 lg:w-[700px] lg:opacity-100 dark:lg:opacity-100"
        />
      </div>
    </div>
  );
}
