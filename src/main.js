import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import './style.css';

if (WebGL.isWebGL2Available()) {
  initScene();
} else {
  document.querySelector('#webgl-error').hidden = false;
}

function initScene() {
  // 1. 场景：所有物体、灯光的容器。
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#111827');

  // 2. 透视相机：参数依次为视野角度、宽高比、近裁剪面、远裁剪面。
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(4, 3, 5);

  // 3. 渲染器：把相机看到的场景绘制到 HTML 的 canvas 上。
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#scene'),
    antialias: true,
  });

  // 4. 网格 = 几何体 + 材质。修改尺寸、颜色等参数来观察变化。
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const material = new THREE.MeshStandardMaterial({
    color: '#67e8f9',
    roughness: 0.4,
    metalness: 0.15,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 1.4;
  scene.add(cube);

  // 5. 标准材质需要灯光。半球光提供环境照明，平行光突出物体形状。
  const ambientLight = new THREE.HemisphereLight('#ffffff', '#475569', 2);
  const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
  directionalLight.position.set(3, 5, 4);
  scene.add(ambientLight, directionalLight);

  // 网格辅助线用于观察空间，坐标轴颜色分别为 X 红、Y 绿、Z 蓝。
  const grid = new THREE.GridHelper(12, 12, '#334155', '#1e293b');
  const axes = new THREE.AxesHelper(2.5);
  scene.add(grid, axes);

  // 6. 轨道控制器：鼠标或触摸操作相机；阻尼使移动更平滑。
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.enableDamping = true;
  controls.minDistance = 2;
  controls.maxDistance = 20;
  controls.update();

  // 7. 窗口大小变化时，同时更新相机宽高比与画布尺寸。
  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', resize);
  resize();

  // 8. 动画循环：按实际经过的秒数旋转，避免速度随屏幕刷新率变化。
  let previousTime;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  renderer.setAnimationLoop((time) => {
    const delta = previousTime === undefined
      ? 0
      : Math.min((time - previousTime) / 1000, 0.1);
    previousTime = time;

    if (!reducedMotion.matches) {
      cube.rotation.x += delta * 0.3;
      cube.rotation.y += delta * 0.6;
    }

    controls.update();
    renderer.render(scene, camera);
  });

  // 修改代码时 Vite 会重新加载模块，这里释放旧场景的资源。
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('resize', resize);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      grid.dispose();
      axes.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    });
  }
}
