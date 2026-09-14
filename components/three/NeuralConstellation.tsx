"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface NeuralConstellationProps {
  className?: string;
}

export function NeuralConstellation({ className = "" }: NeuralConstellationProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check prefers-reduced-motion
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 280;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Create glowing circle texture programmatically for nodes
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.25, "rgba(25, 216, 210, 0.95)");
      gradient.addColorStop(0.55, "rgba(168, 85, 247, 0.5)");
      gradient.addColorStop(0.85, "rgba(25, 216, 210, 0.12)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const glowTexture = createGlowTexture();

    // Group to hold all constellation elements
    const constellationGroup = new THREE.Group();
    const isDesktop = window.innerWidth >= 1024;
    const isTablet = window.innerWidth >= 768;
    const initialOffsetX = isDesktop ? 48 : isTablet ? 24 : 0;
    const initialOffsetY = 6;

    // Slightly reduced radius for refined aesthetic proportions
    const sphereRadius = isDesktop ? 78 : isTablet ? 65 : 52;
    const nodeCount = isDesktop ? 130 : 90;

    const nodes: {
      basePos: THREE.Vector3;
      currPos: THREE.Vector3;
      phase: number;
      speed: number;
    }[] = [];

    // Colors
    const colorCyan = new THREE.Color("#19d8d2");
    const colorPurple = new THREE.Color("#c084fc");
    const colorViolet = new THREE.Color("#7c3aed");
    const colorMint = new THREE.Color("#5dcaa5");

    // Distribute nodes in a 3D spherical shell / neural cluster
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);

    for (let i = 0; i < nodeCount; i++) {
      // Fibonacci sphere distribution with organic jitter
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      // Varying radius for dimensional depth
      const r = sphereRadius * (0.72 + Math.random() * 0.38);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) * 0.92;

      const pos = new THREE.Vector3(x, y, z);
      nodes.push({
        basePos: pos.clone(),
        currPos: pos.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.5, // gentle undulating speed
      });

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation: mix between vibrant cyan and purple/violet
      const colorRatio = Math.random();
      const nodeColor = new THREE.Color();
      if (colorRatio < 0.55) {
        nodeColor.copy(colorCyan).lerp(colorMint, Math.random() * 0.35);
      } else if (colorRatio < 0.9) {
        nodeColor.copy(colorPurple).lerp(colorViolet, Math.random() * 0.45);
      } else {
        nodeColor.setRGB(1, 1, 1);
      }

      colors[i * 3] = nodeColor.r;
      colors[i * 3 + 1] = nodeColor.g;
      colors[i * 3 + 2] = nodeColor.b;

      sizes[i] = 3.5 + Math.random() * 3.5;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Refined point size
    const pointsMaterial = new THREE.PointsMaterial({
      size: isDesktop ? 5.5 : 4.5,
      vertexColors: true,
      map: glowTexture || undefined,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    constellationGroup.add(pointsMesh);

    // Pre-allocate lines for network connections
    const maxConnections = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    constellationGroup.add(lineMesh);

    // Ambient floating star dust / cosmos particles around the sphere
    const dustCount = isDesktop ? 220 : 140;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 420;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 320;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 260;

      const c = Math.random() > 0.45 ? colorCyan : colorPurple;
      dustColors[i * 3] = c.r * 0.65;
      dustColors[i * 3 + 1] = c.g * 0.65;
      dustColors[i * 3 + 2] = c.b * 0.65;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3)
    );
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 2.0,
      vertexColors: true,
      map: glowTexture || undefined,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.38,
      depthWrite: false,
    });

    const dustMesh = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustMesh);

    // Initial positioning
    constellationGroup.position.set(initialOffsetX, initialOffsetY, 0);
    scene.add(constellationGroup);

    // Smooth, gentle mouse interpolation
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      speed: 0.035, // reduced speed for calm, silky smooth feel
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates: -1 to 1
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener("pointermove", handlePointerMove);
    mount.addEventListener("pointerleave", handlePointerLeave);

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // Responsive positioning of constellation with slightly reduced scale
      const isD = w >= 1024;
      const isT = w >= 768;
      const ox = isD ? 48 : isT ? 24 : 0;
      const oy = isD ? 6 : 0;
      const scale = isD ? 0.86 : isT ? 0.74 : 0.6;
      constellationGroup.position.set(ox, oy, 0);
      constellationGroup.scale.set(scale, scale, scale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const connectionDistance = isDesktop ? 38 : 32;
    let autoRotY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (easing)
      mouse.x += (mouse.targetX - mouse.x) * mouse.speed;
      mouse.y += (mouse.targetY - mouse.y) * mouse.speed;

      // 1. Gentle autonomous rotation ("keep moving always")
      if (!reduceMotion) {
        autoRotY += 0.0012; // calm, elegant rotation speed
        dustMesh.rotation.y += 0.0004;
        dustMesh.rotation.x = Math.sin(elapsedTime * 0.15) * 0.02;
      }

      // 2. Smooth Cursor Parallax Tilt (calibrated so it doesn't spin uncontrollably)
      constellationGroup.rotation.y = autoRotY + mouse.x * 0.22;
      constellationGroup.rotation.x =
        Math.sin(elapsedTime * 0.25) * 0.05 - mouse.y * 0.16;
      constellationGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.03;

      // Soft subtle position shift with cursor
      const baseOX =
        window.innerWidth >= 1024 ? 48 : window.innerWidth >= 768 ? 24 : 0;
      const baseOY = window.innerWidth >= 1024 ? 6 : 0;
      constellationGroup.position.x = baseOX + mouse.x * 12;
      constellationGroup.position.y = baseOY + mouse.y * 9;

      // 3. Update vertices with organic wave / breathing motion
      const currentPositions = pointsGeometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        const wave = reduceMotion
          ? 0
          : Math.sin(elapsedTime * node.speed + node.phase) * 1.8;

        const dir = node.basePos.clone().normalize();
        node.currPos.copy(node.basePos).addScaledVector(dir, wave);

        currentPositions[i * 3] = node.currPos.x;
        currentPositions[i * 3 + 1] = node.currPos.y;
        currentPositions[i * 3 + 2] = node.currPos.z;
      }
      pointsGeometry.attributes.position.needsUpdate = true;

      // 4. Update dynamic connection lines
      let lineIndex = 0;
      let colorIndex = 0;

      for (let i = 0; i < nodeCount; i++) {
        const p1 = nodes[i].currPos;
        for (let j = i + 1; j < nodeCount; j++) {
          const p2 = nodes[j].currPos;
          const dist = p1.distanceTo(p2);

          if (dist < connectionDistance) {
            linePositions[lineIndex++] = p1.x;
            linePositions[lineIndex++] = p1.y;
            linePositions[lineIndex++] = p1.z;

            linePositions[lineIndex++] = p2.x;
            linePositions[lineIndex++] = p2.y;
            linePositions[lineIndex++] = p2.z;

            // Fade line brightness with distance
            const alpha = Math.max(0, 1 - dist / connectionDistance);
            // Mix between cyan and violet based on node colors
            const r = (colors[i * 3] + colors[j * 3]) * 0.5 * alpha;
            const g = (colors[i * 3 + 1] + colors[j * 3 + 1]) * 0.5 * alpha;
            const b = (colors[i * 3 + 2] + colors[j * 3 + 2]) * 0.5 * alpha;

            lineColors[colorIndex++] = r;
            lineColors[colorIndex++] = g;
            lineColors[colorIndex++] = b;

            lineColors[colorIndex++] = r;
            lineColors[colorIndex++] = g;
            lineColors[colorIndex++] = b;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);

      // Clean up Three.js resources
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      if (glowTexture) glowTexture.dispose();
      renderer.dispose();

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
