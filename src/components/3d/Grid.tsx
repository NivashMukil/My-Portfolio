import * as THREE from 'three';

export const createGrid = (scene: THREE.Scene, isMobile: boolean): THREE.Group => {
  const gridGroup = new THREE.Group();
  const gridMat = new THREE.LineBasicMaterial({
    color: 0x38BDF8,
    transparent: true,
    opacity: 0.08,
  });

  const gridSize = 80;
  const gridDivisions = isMobile ? 16 : 24;
  const step = gridSize / gridDivisions;
  const gridY = -4;

  for (let i = 0; i <= gridDivisions; i++) {
    const pos = -gridSize / 2 + i * step;
    const ptsX = [new THREE.Vector3(pos, gridY, -gridSize / 2), new THREE.Vector3(pos, gridY, gridSize / 2)];
    const ptsZ = [new THREE.Vector3(-gridSize / 2, gridY, pos), new THREE.Vector3(gridSize / 2, gridY, pos)];
    gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsX), gridMat));
    gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsZ), gridMat));
  }
  scene.add(gridGroup);
  return gridGroup;
};
