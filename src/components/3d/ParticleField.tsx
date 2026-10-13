import * as THREE from 'three';

export const createParticleField = (scene: THREE.Scene, isMobile: boolean): THREE.Points => {
  const particleCount = isMobile ? 100 : 220;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePos[i * 3] = (Math.random() - 0.5) * 70;
    particlePos[i * 3 + 1] = (Math.random() - 0.5) * 35;
    particlePos[i * 3 + 2] = (Math.random() - 0.5) * 45;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x38BDF8,
    size: 0.06,
    transparent: true,
    opacity: 0.45,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);
  return particles;
};
