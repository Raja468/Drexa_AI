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
    const sphereRadius = isDesktop ? 96 : isTablet ? 80 : 64;

    const nodeCount = isDesktop ? 150 : 100;
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
      const r = sphereRadius * (0.68 + Math.random() * 0.42);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) * 0.92;

      const pos = new THREE.Vector3(x, y, z);
      nodes.push({
        basePos: pos.clone(),
        currPos: pos.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.35 + Math.random() * 0.7,
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

      sizes[i] = 4 + Math.random() * 4;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: isDesktop ? 7 : 5.5,
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
      opacity: 0.7,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    constellationGroup.add(lineMesh);

    // Ambient floating star dust / cosmos particles around the sphere
    const dustCount = isDesktop ? 260 : 160;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 440;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 340;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 280;

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
      size: 2.5,
      vertexColors: true,
      map: glowTexture || undefined,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.4,
      depthWrite: false,
    });

    const dustMesh = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustMesh);

    // Initial positioning
    constellationGroup.position.set(initialOffsetX, initialOffsetY, 0);
    scene.add(constellationGroup);

    // Mouse / Cursor Parallax Tracking
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      speed: 0.05,
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

      // Responsive positioning of constellation
      const isD = w >= 1024;
      const isT = w >= 768;
      const ox = isD ? 52 : isT ? 28 : 0;
      const oy = isD ? 8 : 0;
      const scale = isD ? 1 : isT ? 0.85 : 0.65;
      constellationGroup.position.set(ox, oy, 0);
      constellationGroup.scale.set(scale, scale, scale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const connectionDistance = isDesktop ? 48 : 40;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (easing)
      mouse.x += (mouse.targetX - mouse.x) * mouse.speed;
      mouse.y += (mouse.targetY - mouse.y) * mouse.speed;

      // 1. Continuous Autonomous Rotation + organic sway ("keep moving always")
      if (!reduceMotion) {
        constellationGroup.rotation.y += 0.0024;
        constellationGroup.rotation.x = Math.sin(elapsedTime * 0.35) * 0.08;
        constellationGroup.rotation.z = Math.cos(elapsedTime * 0.25) * 0.04;

        dustMesh.rotation.y += 0.0008;
        dustMesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.03;
      }

      // 2. Interactive Cursor Tilt Parallax ("when i move cursor on this design it moves")
      constellationGroup.rotation.y += mouse.x * 0.42;
      constellationGroup.rotation.x += -mouse.y * 0.32;
      const baseOX = window.innerWidth >= 1024 ? 52 : window.innerWidth >= 768 ? 28 : 0;
      const baseOY = window.innerWidth >= 1024 ? 8 : 0;
      constellationGroup.position.x = baseOX + mouse.x * 20;
      constellationGroup.position.y = baseOY + mouse.y * 16;

      // 3. Update vertices with organic wave / breathing motion
      const currentPositions = pointsGeometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        const wave = reduceMotion
          ? 0
          : Math.sin(elapsedTime * node.speed + node.phase) * 2.6;

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
