# ❤️ Valentine's Day 3D App

A romantic Valentine's Day experience featuring a 3D interactive heart and a beautiful overlay, built with Astro, React, and Three.js.

![Valentine App Preview](https://via.placeholder.com/800x400?text=Valentine+App+Preview)

## 🌹 Getting Started

To run this application consistently:

1. **Open Terminal**
   Ensure you are inside the project folder:
   ```sh
   cd Valentines
   ```

2. **Install Dependencies** (Only needed once)
   ```sh
   npm install
   ```

3. **Start Development Server**
   ```sh
   npm run dev
   ```
   *   Open [http://localhost:4321](http://localhost:4321) in your browser.
   *   **Note:** If port 4321 is busy, it might automatically switch to 4322, 4323, etc. Check the terminal output!

### ⚠️ Common Issues & Fixes

**"It's not working!" / "Port Used"**
If you restart Antigravity often, old processes might keep running in the background.

*   **Fix 1: Stop Everything**
    Click the terminal and press `Ctrl + C` twice to stop any running server.

*   **Fix 2: Force a New Port**
    If the comprehensive "dev" command fails, force a specific clean port (like 4000):
    ```sh
    npm run dev -- --port 4000
    ```
    Then go to [http://localhost:4000](http://localhost:4000).

## 🚀 How to Host on GitHub Pages

This project is pre-configured to deploy automatically to GitHub Pages using GitHub Actions.

### Step 1: Initialize Git
If you haven't already:
```sh
git init
git add .
git commit -m "Initial commit for Valentine's App"
```

### Step 2: Push to GitHub
1. Create a **new public repository** on GitHub (e.g., `valentines-day-2026`).
2. Run the commands shown by GitHub to push your code:
   ```sh
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Enable GitHub Pages
1. Go to your repository **Settings** > **Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. The deployment workflow will automatically run. Wait for it to finish (check the "Actions" tab).
4. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

## 🛠️ Tech Stack
- **Framework**: [Astro](https://astro.build)
- **UI**: [React](https://react.dev)
- **3D**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
