import * as THREE from 'three';

export interface DataNodeItem {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  basePos: THREE.Vector3;
}

export const createDataNodes = (scene: THREE.Scene, isMobile: boolean) => {
  const nodeCount = isMobile ? 25 : 45;
  const nodes: DataNodeItem[] = [];

  const nodeMatCyan = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.8 });
  const nodeMatPurple = new THREE.MeshBasicMaterial({ color: 0xA855F7, transparent: true, opacity: 0.7 });
  const nodeGeo = new THREE.SphereGeometry(0.07, 8, 8);

  for (let i = 0; i < nodeCount; i++) {
    const mesh = new THREE.Mesh(nodeGeo, i % 3 === 0 ? nodeMatPurple : nodeMatCyan);
    const basePos = new THREE.Vector3(
      (Math.random() - 0.5) * 44,
      (Math.random() - 0.5) * 24,
      (Math.random() - 0.5) * 35
    );
    mesh.position.copy(basePos);
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.006,
      (Math.random() - 0.5) * 0.006,
      (Math.random() - 0.5) * 0.004
    );
    nodes.push({ mesh, velocity, basePos });
    scene.add(mesh);
  }

  const connectionLinesGroup = new THREE.Group();
  scene.add(connectionLinesGroup);

  const updateConnectionLines = () => {
    while (connectionLinesGroup.children.length > 0) {
      const child = connectionLinesGroup.children[0];
      connectionLinesGroup.remove(child);
      if (child instanceof THREE.Line) child.geometry.dispose();
    }

    const maxDist = 7;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
        if (dist < maxDist) {
          const lineMat = new THREE.LineBasicMaterial({
            color: 0x38BDF8,
            transparent: true,
            opacity: 0.08 * (1 - dist / maxDist),
          });
          const geo = new THREE.BufferGeometry().setFromPoints([
            nodes[i].mesh.position,
            nodes[j].mesh.position,
          ]);
          connectionLinesGroup.add(new THREE.Line(geo, lineMat));
        }
      }
    }
  };

  return { nodes, updateConnectionLines };
};
