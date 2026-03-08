"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const CLEARANCE = 128;
const BASE_VW = 50;

function lerpColor(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, t: number) {
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
}

function lerpVal(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Procedural environment map — gradient dome with bright spots for realistic reflections
function createEnvMap(renderer: THREE.WebGLRenderer) {
  const envScene = new THREE.Scene();

  // Gradient sky dome
  const geo = new THREE.SphereGeometry(500, 64, 64);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      topColor: { value: new THREE.Color(0x88aadd) },
      bottomColor: { value: new THREE.Color(0x111122) },
      midColor: { value: new THREE.Color(0x334477) },
    },
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform vec3 midColor;
      varying vec3 vWorldPos;
      void main() {
        float h = normalize(vWorldPos).y;
        vec3 col = mix(bottomColor, midColor, smoothstep(-1.0, 0.0, h));
        col = mix(col, topColor, smoothstep(0.0, 1.0, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  envScene.add(new THREE.Mesh(geo, mat));

  // Bright spots for specular reflections
  const spotGeo = new THREE.SphereGeometry(12, 16, 16);
  const spots = [
    { pos: [120, 250, 120], color: 0xffffff, size: 15 },
    { pos: [-180, 120, -80], color: 0x6bbcff, size: 10 },
    { pos: [80, -80, 180], color: 0xb86bff, size: 10 },
    { pos: [-60, 200, -150], color: 0xddeeff, size: 8 },
    { pos: [200, 50, -100], color: 0xffeedd, size: 6 },
  ];
  spots.forEach(({ pos, color }) => {
    const m = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(spotGeo, m);
    mesh.position.set(pos[0], pos[1], pos[2]);
    envScene.add(mesh);
  });

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileCubemapShader();
  const envMap = pmrem.fromScene(envScene, 0, 0.1, 1000).texture;
  pmrem.dispose();
  envScene.clear();
  geo.dispose();
  mat.dispose();
  spotGeo.dispose();

  return envMap;
}

export function HeroSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const heroEl = el.parentElement;
    if (!heroEl) return;

    // Non-null aliases for closures
    const container: HTMLDivElement = el;
    const hero: HTMLElement = heroEl;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    const canvas = renderer.domElement;
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 4;

    // --- Environment map ---
    const envMap = createEnvMap(renderer);
    scene.environment = envMap;

    // --- Sphere — colorless, pure light/reflection ---
    const sphereGeo = new THREE.SphereGeometry(0.8, 128, 128);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      metalness: 0.95,
      roughness: 0.0,
      transmission: 0.5,
      thickness: 1.5,
      envMap,
      envMapIntensity: 2.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      color: new THREE.Color("#ffffff"),
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // --- Rings — colorless, pure reflective ---
    const ringDefs = [
      { rotZ: 0, speed: 0.003 },
      { rotZ: Math.PI / 3, speed: -0.002 },
      { rotZ: -Math.PI / 3, speed: 0.0015 },
    ];

    const rings = ringDefs.map((rd) => {
      const torusGeo = new THREE.TorusGeometry(1.2, 0.01, 16, 200);
      const torusMat = new THREE.MeshPhysicalMaterial({
        metalness: 1.0,
        roughness: 0.0,
        color: new THREE.Color("#ffffff"),
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.6,
        envMap,
        envMapIntensity: 1.2,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.rotation.x = (70 * Math.PI) / 180;
      torus.rotation.z = rd.rotZ;
      scene.add(torus);
      return { mesh: torus, mat: torusMat, speed: rd.speed, geo: torusGeo };
    });

    // --- Lighting — all white, no color cast ---
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.15);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight("#ffffff", 3.0, 30);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight("#ffffff", 1.5, 20);
    fillLight.position.set(-3, 0, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight("#ffffff", 1.0, 20);
    rimLight.position.set(1, -2, -3);
    scene.add(rimLight);

    // --- State ---
    let mouseX = 0;
    let mouseY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let scrollProgress = 0;
    let pulseScale = 1;
    let pulseVelocity = 0;
    let isHovered = false;

    // Light mode targets — white light source
    const LIGHT_COLOR = new THREE.Color("#ffffff");
    const LIGHT_EMISSIVE = new THREE.Color("#ffffff");
    const LIGHT_EMISSIVE_INT = 0.2;
    const LIGHT_METALNESS = 0.95;
    const LIGHT_ROUGHNESS = 0.0;

    // Dark mode targets — dark reflective, subtle glow
    const DARK_COLOR = new THREE.Color("#0a0a0a");
    const DARK_EMISSIVE = new THREE.Color("#ffffff");
    const DARK_EMISSIVE_INT = 0.05;
    const DARK_METALNESS = 1.0;
    const DARK_ROUGHNESS = 0.0;

    // Scroll orb positioning
    function getInitialTranslateY() {
      const cta = document.querySelector("[data-hero-cta]");
      if (!cta) return 82;
      const ctaBottom = cta.getBoundingClientRect().bottom;
      const heroHeight = hero.offsetHeight || window.innerHeight;
      const circleSize = container.offsetWidth;
      const targetTop = ctaBottom + window.scrollY + CLEARANCE;
      const tY = ((targetTop - heroHeight + circleSize) / circleSize) * 100;
      return Math.max(50, Math.min(95, tY));
    }

    let startTY = getInitialTranslateY();

    // --- Resize ---
    function resize() {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    }

    resize();

    // --- Events ---
    function onMouseMove(e: MouseEvent) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function onPointerEnter() { isHovered = true; }
    function onPointerLeave() { isHovered = false; }
    function onClick() { pulseVelocity = 0.15; }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }

    // Create overlay div for scroll fade (gradient → solid)
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:0;transition:none;";
    hero.insertBefore(overlay, hero.firstChild);

    function updateScroll() {
      const p = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.6)));
      scrollProgress = p;

      const scale = 1 + p * 6;
      const translateY = startTY * (1 - p);
      container.style.transform = `translateX(-50%) translateY(${translateY}%) scale(${scale})`;

      // Overlay fades from transparent → solid white/black to cover the gradient
      const isDark = document.documentElement.classList.contains("dark");
      const t = p * p; // ease-in curve
      const overlayColor = isDark ? `rgba(20,20,20,${t})` : `rgba(244,244,245,${t})`;
      overlay.style.backgroundColor = overlayColor;

      // Main bg stays solid for content below hero
      const mainEl = hero.closest("main");
      if (isDark) {
        const bg = lerpColor(20, 20, 20, 0, 0, 0, t);
        if (mainEl) (mainEl as HTMLElement).style.backgroundColor = bg;
      } else {
        const bg = lerpColor(232, 240, 254, 255, 255, 255, t);
        if (mainEl) (mainEl as HTMLElement).style.backgroundColor = bg;
      }

      ticking = false;
    }

    function onResize() {
      startTY = getInitialTranslateY();
      resize();
      updateScroll();
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const themeObserver = new MutationObserver(() => updateScroll());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    updateScroll();

    // --- Animation loop ---
    let animId: number;
    // Reusable temp colors to avoid allocations in the loop
    const tmpColor = new THREE.Color();

    function animate() {
      animId = requestAnimationFrame(animate);

      const isDark = document.documentElement.classList.contains("dark");
      const p = scrollProgress;
      const g = 1 - p;

      // Mouse tracking — smooth lerp, max ±12deg
      const maxAngle = (12 * Math.PI) / 180;
      const targetRotY = mouseX * maxAngle;
      const targetRotX = mouseY * maxAngle;
      currentRotX = lerpVal(currentRotX, targetRotX, 0.04);
      currentRotY = lerpVal(currentRotY, targetRotY, 0.04);

      // Pulse animation (on click)
      if (Math.abs(pulseVelocity) > 0.001 || Math.abs(pulseScale - 1) > 0.001) {
        pulseScale += pulseVelocity;
        pulseVelocity *= 0.85;
        if (pulseScale > 1.08) {
          pulseVelocity = -pulseVelocity * 0.5;
        }
        if (pulseScale < 1 && pulseVelocity < 0) {
          pulseVelocity *= -0.3;
        }
      } else {
        pulseScale = lerpVal(pulseScale, 1.0, 0.1);
      }

      // --- Sphere material: lerp toward dark/light targets ---
      const tgtColor = isDark ? DARK_COLOR : LIGHT_COLOR;
      const tgtEmissive = isDark ? DARK_EMISSIVE : LIGHT_EMISSIVE;
      const tgtEmissiveInt = isDark ? DARK_EMISSIVE_INT : LIGHT_EMISSIVE_INT;
      const tgtMetalness = isDark ? DARK_METALNESS : LIGHT_METALNESS;
      const tgtRoughness = isDark ? DARK_ROUGHNESS : LIGHT_ROUGHNESS;

      sphereMat.color.lerp(tgtColor, 0.06);
      sphereMat.emissive.lerp(tgtEmissive, 0.06);
      sphereMat.metalness = lerpVal(sphereMat.metalness, tgtMetalness, 0.04);
      sphereMat.roughness = lerpVal(sphereMat.roughness, tgtRoughness, 0.04);

      // Hover — boost emissive
      const hoverBoost = isHovered ? 0.5 : 0;
      sphereMat.emissiveIntensity = lerpVal(
        sphereMat.emissiveIntensity,
        (tgtEmissiveInt + hoverBoost) * g,
        0.06
      );

      // Scroll: fade to white/black
      if (p > 0.05) {
        tmpColor.set(isDark ? 0x000000 : 0xffffff);
        sphereMat.emissive.lerp(tmpColor, p * 0.08);
        sphereMat.emissiveIntensity = lerpVal(sphereMat.emissiveIntensity, p * 3, 0.04);
        // Increase transmission fade so orb becomes opaque cover
        sphereMat.transmission = lerpVal(sphereMat.transmission!, 0.3 * g, 0.05);
      }

      // Apply transforms
      scene.rotation.x = currentRotX;
      scene.rotation.y = currentRotY;
      sphere.scale.setScalar(pulseScale);

      // Ring animation
      rings.forEach((ring) => {
        ring.mesh.rotation.z += ring.speed;
        ring.mat.opacity = lerpVal(ring.mat.opacity, 0.85 * g, 0.04);
        ring.mat.emissiveIntensity = lerpVal(ring.mat.emissiveIntensity, 0.4 * g, 0.04);
      });

      renderer.setClearColor(0x000000, 0);
      renderer.render(scene, camera);
    }

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      themeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      sphereGeo.dispose();
      sphereMat.dispose();
      rings.forEach((r) => { r.geo.dispose(); r.mat.dispose(); });
      envMap.dispose();
      renderer.dispose();

      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
      overlay.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute bottom-0 left-1/2 z-[1] aspect-square rounded-full will-change-transform"
      style={{
        width: `${BASE_VW}vw`,
        transform: "translateX(-50%) translateY(82%) scale(1)",
      }}
    />
  );
}
