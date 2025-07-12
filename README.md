# 🌐 Personal Homepage

[🔗 Visit Live Site](https://lcwoo.github.io/homepage/)

<div align="center">

![Preview](./public/images/preview.png)

</div>

## ✨ Features

- **Interactive 3D Scene** – Animated sponge model with Three.js  
- **Dark/Light Mode** – Automatic theme switching with smooth transitions  
- **Fully Responsive** – Works on all screen sizes  
- **Smooth Animations** – Page transitions using Framer Motion  
- **Auto-Rotation** – Interactive camera controls with orbit functionality  
- **Dynamic Lighting** – Customizable spot lights for enhanced visuals  

---

## 📖 Table of Contents

- [🌐 Personal Homepage](#-personal-homepage)
  - [✨ Features](#-features)
  - [📖 Table of Contents](#-table-of-contents)
  - [🧰 Tech Stack](#-tech-stack)
  - [🚀 Getting Started](#-getting-started)
  - [📦 Required Dependencies](#-required-dependencies)
  - [Project structure](#project-structure)
  - [🛠 Customization Guide](#-customization-guide)
    - [👤 Personal Info (pages/index.js)](#-personal-info-pagesindexjs)
    - [🎨 Theme Settings (lib/theme.js)](#-theme-settings-libthemejs)
    - [🧩 Replace 3D Model](#-replace-3d-model)
    - [📸 Adjust Camera and Lighting](#-adjust-camera-and-lighting)
  - [🔧 Development](#-development)
  - [📄 License \& Usage](#-license--usage)
  - [🙏 Acknowledgement](#-acknowledgement)

---

## 🧰 Tech Stack

- [Next.js](https://nextjs.org/) – React framework with SSR and static generation  
- [Chakra UI](https://chakra-ui.com/) – Modular and accessible component library  
- [Three.js](https://threejs.org/) – 3D rendering library for JavaScript  
- [Framer Motion](https://www.framer.com/motion/) – Animation library for React  

---

## 🚀 Getting Started

- ###  Installation
```bash
# 1. Clone the repository
git clone https://github.com/lcwoo/homepage.git
cd homepage

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

> *Open http://localhost:3000 to view your homepage!*

## 📦 Required Dependencies

```bash
# Core dependencies
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion next react react-dom

# Development dependencies  
npm i -D eslint eslint-next prettier

```

---

## Project structure

```bash
📂 homepage/
├── pages/               # Next.js pages (routes)
│   ├── index.js         # 🏠 Homepage with 3D scene and profile
│   ├── publications.js  # 📚 Publications
│   ├── _app.js          # App-level config
│   └── _document.js     # HTML structure
│
├── components/          # UI components
│   ├── layouts/
│   ├── bio.js
│   ├── paragraph.js
│   ├── section.js
│   ├── grid-item.js
│   └── scene-loader.js
│
├── lib/                 # Utilities and configs
│   ├── theme.js         # Chakra theme overrides
│   ├── model.js         # GLB loader
│   └── constants.js
│
└── public/              # Static assets
    ├── images/          # Preview/profile images
    └── sponge-webp.glb  # 🧽 3D model

```

---

## 🛠 Customization Guide

### 👤 Personal Info (pages/index.js)

```javascript
// Profile Section
<Heading as="h2" variant="page-title">
  Your Name
</Heading>
<p>Your Title/Position</p>

// About Section
<Paragraph>
  Your bio and description here...
</Paragraph>

// Social Links
<Link href="https://github.com/yourusername">
  <Button leftIcon={<IoLogoGithub />}>
    GitHub
  </Button>
</Link>
```

### 🎨 Theme Settings (lib/theme.js)

```javascript
const colors = {
  grassTeal: '#88ccca',    // Custom brand color
  // Add your custom colors
}

const config = {
  initialColorMode: 'dark',  // 'light' or 'dark'
  useSystemColorMode: true   // Auto-detect system preference
}
```

### 🧩 Replace 3D Model

1. Add your GLB/GLTF file to public/ directory
2. Update the model path in pages/index.js:

```javascript
useEffect(() => {
  setScenePath(`${router.basePath}/your-model.glb`)
}, [router.basePath])
```

### 📸 Adjust Camera and Lighting
Customize the 3D scene settings:

```javascript
// Camera positioning
const initialCameraPosition = new THREE.Vector3(
  20 * Math.sin(0.2 * Math.PI),
  10,
  20 * Math.cos(0.2 * Math.PI)
)

// Lighting setup
const spotLight1 = new THREE.SpotLight(0xffaa33, 700)  // Color & intensity
spotLight1.position.set(8, 20, 8)                     // Position
```

---
## 🔧 Development

- #### ➕ Adding New Sections

Create new sections using the Section component:
```javascript
import Section from '../components/section'

<Section delay={0.3}>
  <Heading as="h3" variant="section-title">
    New Section
  </Heading>
  <Paragraph>
    Your content here...
  </Paragraph>
</Section>
```

---

## 📄 License & Usage

<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"/>
</div>

You can create your own homepage for free by forking this project under the following conditions:

- Do **not** use the original 3D voxel dog model from [craftz.dog](https://www.craftz.dog/). It is licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) and cannot be reused or modified.
- You must provide attribution by adding a link to [Takuya Matsuyama's homepage](https://www.craftz.dog/).

>  🧽 Note: The 3D SpongeBob model in this project is an original creation by lcwoo and can be used freely without restrictions.

Check out [LICENSE](./LICENSE) for more details.

---

## 🙏 Acknowledgement

This website is based on [Takuya's website](https://www.craftz.dog/). Special thanks to the open-source community and amazing tools like Chakra UI, Framer Motion, and Three.js.
<div align="center">
  
Made with ❤️ by lcwoo

If you found this helpful, please ⭐ the repository!

</div>