# Three.js 练习项目

使用 **Vite + 原生 JavaScript + Three.js** 学习浏览器 3D 开发。打开项目即可看到一个带灯光、坐标轴和网格辅助线的旋转立方体，并通过鼠标或触摸操作相机。

## 环境与启动

使用 Node.js 22.12 或更高版本，推荐 Node.js 24（项目包含 `.nvmrc`）。浏览器需要支持 WebGL 2 并开启硬件加速。

```bash
# 如果使用 nvm，可先运行 nvm use
npm install
npm run dev
```

打开终端显示的本地地址，默认是 `http://localhost:5173`。

克隆后如果需要严格按照锁文件安装依赖，可以使用 `npm ci` 替代 `npm install`。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动开发服务器，修改代码后实时刷新 |
| `npm run build` | 构建到 `dist/` |
| `npm run preview` | 本地预览构建结果，先运行 build |

## 项目结构

```text
threejs-learning/
├── public/
│   └── favicon.svg    # 原样复制的静态资源，可在这里放图片和模型
├── src/
│   ├── main.js        # Three.js 场景与中文步骤注释，从这里开始练习
│   └── style.css      # 画布与说明文字样式
├── index.html         # HTML 入口
├── package.json      # 依赖与开发命令
└── package-lock.json # 固定依赖版本
```

`node_modules/` 和 `dist/` 已加入 `.gitignore`，不提交到仓库。

## 第一个场景

`src/main.js` 按顺序演示以下内容：

1. `Scene`：容纳所有物体和灯光。
2. `PerspectiveCamera`：决定观察位置和透视效果。
3. `WebGLRenderer`：将场景绘制到画布。
4. `BoxGeometry` + `MeshStandardMaterial` + `Mesh`：创建立方体。
5. `HemisphereLight` + `DirectionalLight`：为物体提供照明。
6. `OrbitControls`：操作相机视角。
7. 窗口缩放：更新相机投影与渲染尺寸。
8. `setAnimationLoop`：持续更新旋转并渲染场景。

左键拖拽旋转视角，滚轮缩放，右键拖拽平移；触屏可单指旋转、双指缩放和平移。系统开启“减少动态效果”时，立方体不会自动旋转，相机仍可操作。

## 建议练习顺序

1. 修改立方体的颜色、尺寸、位置与旋转速度。
2. 把 `BoxGeometry` 换成 `SphereGeometry` 或 `TorusGeometry`。
3. 修改相机位置和视野角度，观察透视变化。
4. 调整灯光位置、强度，以及材质的粗糙度和金属感。
5. 添加第二个物体，练习 `Group` 和父子关系。
6. 再逐步练习纹理、阴影、模型加载与鼠标拾取。

后续练习可以拆成 `src/lessons/` 中的独立模块，再从 `main.js` 导入；初始版本先把基础代码集中在一个文件中，便于阅读。

## 参考资料

- [Three.js 官方手册](https://threejs.org/manual/)
- [Three.js API 文档](https://threejs.org/docs/)
- [Three.js 官方示例](https://threejs.org/examples/)
- [Vite 入门文档](https://vite.dev/guide/)
