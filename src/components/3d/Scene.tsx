import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createGrid } from './Grid';
import { createFloatingObjects } from './FloatingObjects';
import { createDataNodes } from './DataNodes';
import { createParticleField } from './ParticleField';

export const Scene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Accessibility check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090E, 0.032);

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 250);
    camera.position.set(0, 3, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x07090E, 1);
    mount.appendChild(renderer.domElement);

    // Modular 3D elements
    createGrid(scene, isMobile);
    const wireGeos = createFloatingObjects(scene);
    const { nodes, updateConnectionLines } = createDataNodes(scene, isMobile);
    const particles = createParticleField(scene, isMobile);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x07090E, 1);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38BDF8, 1.4, 35);
    cyanLight.position.set(-6, 6, 6);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xA855F7, 1.0, 30);
    purpleLight.position.set(8, -4, 8);
    scene.add(purpleLight);

    // Mouse listener
    const onMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let frameCount = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      frameCount++;
      const t = frameCount * 0.01;

      if (!prefersReducedMotion) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

        camera.position.x = mouseRef.current.x * 2;
        camera.position.y = 3 + mouseRef.current.y * 1.2;
        camera.lookAt(0, 0, 0);

        wireGeos.forEach(({ mesh, basePos, rotSpeed }) => {
          mesh.rotation.x += rotSpeed.x;
          mesh.rotation.y += rotSpeed.y;
          mesh.position.y = basePos.y + Math.sin(t + basePos.x) * 0.25;
        });

        nodes.forEach(({ mesh, velocity }, i) => {
          mesh.position.add(velocity);
          mesh.position.y += Math.sin(t + i) * 0.003;

          if (Math.abs(mesh.position.x) > 22) velocity.x *= -1;
          if (Math.abs(mesh.position.y) > 12) velocity.y *= -1;
          if (Math.abs(mesh.position.z) > 18) velocity.z *= -1;
        });

        particles.rotation.y = t * 0.015;
        particles.rotation.x = Math.sin(t * 0.3) * 0.03;
      }

      if (frameCount % 45 === 0) {
        updateConnectionLines();
      }

      cyanLight.intensity = 1.3 + Math.sin(t * 0.6) * 0.3;
      purpleLight.intensity = 0.9 + Math.cos(t * 0.5) * 0.25;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.95 }}
    />
  );
};
