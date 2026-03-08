"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import * as THREE from "three";

export function PreFooterCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Environment for reflections/refractions on the glass sphere
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    // Gradient environment: dark blue bottom, slightly lighter top
    const envLight1 = new THREE.DirectionalLight(0x2244aa, 0.3);
    envLight1.position.set(0, 1, 0);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0x1a2266, 0.2);
    envLight2.position.set(0, -1, 0);
    envScene.add(envLight2);
    const envLight3 = new THREE.PointLight(0x4466ff, 1, 10);
    envLight3.position.set(0, 0, 2);
    envScene.add(envLight3);
    const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
    pmremGenerator.dispose();

    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // Nucleus — glass sphere (transparent, refractive)
    const nucleusGeometry = new THREE.SphereGeometry(0.35, 64, 64);
    const nucleusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8899cc,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.92,
      thickness: 0.8,
      ior: 1.45,
      envMap,
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.95,
      attenuationColor: new THREE.Color(0x3355aa),
      attenuationDistance: 0.5,
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    atomGroup.add(nucleus);

    // Inner glow sphere (smaller, inside the glass, emissive)
    const innerGlowGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const innerGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x6688ee,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
    atomGroup.add(innerGlow);

    // Orbit rings — 3 elliptical rings at different tilts (like the reference)
    const orbitConfigs = [
      { rotX: 0.3, rotY: 0, rotZ: -0.4 },
      { rotX: -0.5, rotY: 0.8, rotZ: 0.3 },
      { rotX: 0.8, rotY: -0.4, rotZ: 0.6 },
    ];
    const orbitRadius = 1.8;
    const disposables: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];

    const orbitMeshes: THREE.Group[] = [];
    const electronMeshes: THREE.Mesh[] = [];

    orbitConfigs.forEach((cfg) => {
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.set(cfg.rotX, cfg.rotY, cfg.rotZ);

      // Orbit ring — thin torus
      const ringGeometry = new THREE.TorusGeometry(orbitRadius, 0.012, 16, 128);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x3355aa,
        transparent: true,
        opacity: 0.35,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      orbitGroup.add(ring);
      disposables.push(ringGeometry);
      disposableMaterials.push(ringMaterial);

      // Electron — small sphere on the ring
      const electronGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const electronMaterial = new THREE.MeshStandardMaterial({
        color: 0x4466cc,
        emissive: 0x3355bb,
        emissiveIntensity: 0.8,
        metalness: 0.3,
        roughness: 0.2,
      });
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      orbitGroup.add(electron);
      electronMeshes.push(electron);
      disposables.push(electronGeometry);
      disposableMaterials.push(electronMaterial);

      atomGroup.add(orbitGroup);
      orbitMeshes.push(orbitGroup);
    });

    // Inner point light
    const innerLight = new THREE.PointLight(0x3355cc, 1.5, 5);
    innerLight.position.set(0, 0, 0);
    atomGroup.add(innerLight);

    // Ambient
    const ambientLight = new THREE.AmbientLight(0x0c1020, 0.5);
    scene.add(ambientLight);

    // Rim light
    const rimLight = new THREE.PointLight(0x1a3388, 0.6, 10);
    rimLight.position.set(0, 2, -3);
    scene.add(rimLight);

    // Subtle radial particles
    const particleCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);

    function resetParticle(i: number) {
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * Math.PI * 0.6;
      const r = 0.3 + Math.random() * 0.3;
      positions[i * 3] = Math.cos(angle) * Math.cos(elevation) * r;
      positions[i * 3 + 1] = Math.sin(elevation) * r;
      positions[i * 3 + 2] = Math.sin(angle) * Math.cos(elevation) * r;

      const speed = 0.002 + Math.random() * 0.006;
      velocities[i * 3] = Math.cos(angle) * Math.cos(elevation) * speed;
      velocities[i * 3 + 1] = Math.sin(elevation) * speed;
      velocities[i * 3 + 2] = Math.sin(angle) * Math.cos(elevation) * speed;

      lifetimes[i] = Math.random();
    }

    for (let i = 0; i < particleCount; i++) {
      resetParticle(i);
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x3355aa,
      size: 0.01,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    // Subtle center glow
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 256;
    glowCanvas.height = 256;
    const gCtx = glowCanvas.getContext("2d")!;
    const gradient = gCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(40, 60, 160, 0.1)");
    gradient.addColorStop(0.4, "rgba(30, 50, 140, 0.04)");
    gradient.addColorStop(0.7, "rgba(15, 30, 100, 0.01)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    gCtx.fillStyle = gradient;
    gCtx.fillRect(0, 0, 256, 256);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(3, 3, 1);
    atomGroup.add(glowSprite);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };

    function onMouseMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMouseMove);

    let animId: number;
    const clock = new THREE.Clock();

    // Electron orbit speeds (different per orbit)
    const electronSpeeds = [0.4, 0.55, 0.35];

    function animate() {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.03;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.03;

      // Slow overall rotation + parallax
      atomGroup.rotation.y = elapsed * 0.06 + smoothMouse.x * 0.15;
      atomGroup.rotation.x = smoothMouse.y * 0.1;

      // Animate electrons along their orbits
      electronMeshes.forEach((electron, idx) => {
        const angle = elapsed * electronSpeeds[idx] + (idx * Math.PI * 2) / 3;
        electron.position.x = Math.cos(angle) * orbitRadius;
        electron.position.y = 0;
        electron.position.z = Math.sin(angle) * orbitRadius;
      });

      // Gentle breathing
      const breath = 0.85 + 0.15 * Math.sin(elapsed * 0.5);
      innerLight.intensity = 1.5 * breath;
      innerGlowMaterial.opacity = 0.3 + 0.15 * Math.sin(elapsed * 0.5);
      innerGlow.scale.setScalar(0.9 + 0.1 * Math.sin(elapsed * 0.5));
      glowSprite.scale.setScalar(2.8 + 0.2 * Math.sin(elapsed * 0.5));
      glowMaterial.opacity = 0.25 + 0.1 * breath;

      // Update particles
      const posAttr = particlesGeometry.getAttribute("position");
      for (let i = 0; i < particleCount; i++) {
        lifetimes[i] += 0.002;
        if (lifetimes[i] > 1) {
          resetParticle(i);
          lifetimes[i] = 0;
        }
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
      }
      (posAttr as THREE.BufferAttribute).needsUpdate = true;
      particleMaterial.opacity = 0.15 + 0.1 * breath;

      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      nucleusGeometry.dispose();
      nucleusMaterial.dispose();
      innerGlowGeometry.dispose();
      innerGlowMaterial.dispose();
      envMap.dispose();
      disposables.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      particlesGeometry.dispose();
      particleMaterial.dispose();
      glowMaterial.dispose();
      glowTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative flex min-h-[80vh] flex-col" style={{ background: "#040615" }}>
      {/* Top content */}
      <div className="relative z-10 px-8 pt-24 pb-12 text-center">
        <h2 className="mx-auto max-w-[680px] text-3xl font-light leading-tight tracking-tight text-white/90 md:text-5xl">
          Let&apos;s build something that radiates.
        </h2>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-white text-[#040615] hover:bg-white/90"
            )}
          >
            {t("cta")}
          </Link>
          <Link
            href="/work"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/15 text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            {t("viewAllWork")}
          </Link>
        </div>
      </div>

      {/* Three.js canvas */}
      <div ref={containerRef} className="relative flex-1 min-h-[400px]" />

      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
    </section>
  );
}
