# Javista Apartments

## Team Members:

```bash
Saigon University ,Faculty of Information Technology ,Major in Software Engineering

ID          | Full Name
3121410491    Bui Ngoc Thuc
3121410379    Nguyen Tien Phat
3121410401    Tran Nhu Phu Quang
3121410066    Bui Hong Bao
3121410070    Hoang Gia Bao
31214100      Mai Trung Chinh



```

## Project Description:

This web application was built for study around the world can study online together. It have many features such as `pomodoro`, `study group`, `goals list`

## Tech Stack Used:

### Frontend

```bash
    * NextJS 14
    * React 18
    * Typescript ^7
    * Redux Toolkit
    * Zod
    * React-hook-form
    * Websocket
    ---------------
    * Shadcn/ui
    * Lucide-icons
    * Radix icons
```

### Backend

```bash
    * Python
    * Django
```

## How to run

### Prerequisites

#### 1. Install Node.js and npm

If you don't have Node.js installed, download and install it from [Node.js official site](https://nodejs.org/). This will also install `npm`.

To check if `npm` is installed, run:

```sh
npm -v
```

#### 2. Install pnpm

If you don't have `pnpm`, install it globally using `npm`:

```sh
npm install -g pnpm
```

Verify the installation:

```sh
pnpm -v
```

### Setup the Project

#### 3. Clone the Repository

```sh
git clone https://github.com/PhatJack/zstudy.git
cd zstudy
```

#### 4. Install Dependencies

```sh
pnpm install
```

#### 5. Start the Development Server

```sh
pnpm dev
```

The app should now be running at `http://localhost:3000/` 🚀

### Make sure to star the repository if you find it helpful!

<a href="https://github.com/PhatJack/zstudy/graphs/contributors"><img src="https://img.shields.io/github/stars/PhatJack/zstudy?color=yellow" alt="Stars Badge"/></a>

## Project Issues & Solutions

This document contains some of the challenging issues encountered during development and their respective solutions.

### 1. WebSocket Double Connection Issue in `StrictMode`

#### **Problem**

When using `StrictMode` in React, the WebSocket connection is established twice because React mounts, unmounts, and remounts components in development mode. This can lead to multiple connections, causing duplicate messages or unnecessary server load.

#### **Solution**

Use a **ref** to store the WebSocket instance and ensure that the connection is only established once. Also, avoid opening a new connection if one already exists.

---

### 2. `setInterval` Slows Down When Website is Inactive

#### **Problem**

When the website is not in focus or inactive (e.g., the user switches to another tab), `setInterval` execution can slow down due to browser throttling. This is especially noticeable in countdown timers.

#### **Solution**

1. Use the `document.visibilityState` API to detect when the page is visible and switch to `setTimeout` for more control over the execution.
2. Use `Service Worker (Worker API)` to run on other thread which will not effect the main thread

---

### 3. `pre-render` modal which need interaction

#### **Problem**
Modals that require user interaction may be pre-rendered unnecessarily, increasing the initial JavaScript bundle size. This can lead to performance issues, such as slower page loads and unnecessary memory usage, especially when multiple modals are included in the project but not immediately needed.

#### **Solution**

1. Using Dynamic Imports (React.lazy() or dynamic imports in Next.js)

   - ✅ Correct: This helps prevent unnecessary pre-rendering of modals by only loading them when needed.

   - ⚠️ Consideration: React.lazy() works well with Suspense, but it only supports default exports. If you're using Next.js, next/dynamic is a better choice.

2. Reducing First Load JavaScript Size

   - ✅ Correct: Deferring the loading of modals helps reduce the initial JavaScript bundle size.

   - ⚠️ Consideration: Ensure that you load the modal asynchronously only when triggered to avoid hydration mismatches or flickering effects.

#### **Result**  

| Route 🚀 | Size 📦 | First Load JS (Before) ❌ | First Load JS (After) ✅ | Reduction 📉 |
|---------|---------|--------------------------|--------------------------|-------------|
| Solo    | **19.6KB**   | **240KB**                 | **120KB**                 | **120KB** 🔥 |


---
