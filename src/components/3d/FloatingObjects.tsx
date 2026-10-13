import * as THREE from 'three';

export interface FloatingWireframe {
  mesh: THREE.LineSegments;
  basePos: THREE.Vector3;
  rotSpeed: { x: number; y: number };
}

export const createFloatingObjects = (scene: THREE.Scene): FloatingWireframe[] => {
  const wireGeos: FloatingWireframe[] = [];
  const shapeDefs = [
    { geo: new THREE.IcosahedronGeometry(0.9, 0), color: 0x38BDF8, pos: [-10, 3, -6] },
    { geo: new THREE.OctahedronGeometry(0.8, 0), color: 0xA855F7, pos: [11, -1, -8] },
    { geo: new THREE.TetrahedronGeometry(1.0, 0), color: 0x6366F1, pos: [-5, -2, -10] },
    { geo: new THREE.IcosahedronGeometry(0.6, 0), color: 0x34D399, pos: [7, 5, -5] },
    { geo: new THREE.BoxGeometry(0.8, 0.8, 0.8), color: 0x38BDF8, pos: [-12, 1, -4] },
    { geo: new THREE.OctahedronGeometry(0.5, 0), color: 0xFBBF24, pos: [9, -4, -4] },
  ];

  shapeDefs.forEach(({ geo, color, pos }) => {
    const edges = new THREE.EdgesGeometry(geo);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
    const line = new THREE.LineSegments(edges, mat);
    const basePos = new THREE.Vector3(pos[0], pos[1], pos[2]);
    line.position.copy(basePos);
    wireGeos.push({
      mesh: line,
      basePos,
      rotSpeed: { x: (Math.random() - 0.5) * 0.008, y: (Math.random() - 0.5) * 0.008 },
    });
    scene.add(line);
  });

  return wireGeos;
};
