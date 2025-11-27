# Mostafa Ali CV

A professional, printable CV/Resume template built with [Nuxt 3](https://nuxt.com/) and [Tailwind CSS](https://tailwindcss.com/). This project is designed to render a high-quality A4 resume that looks great on screen and prints perfectly.

## Features

- **Nuxt 3** for a modern, performant Vue.js experience.
- **Tailwind CSS** for utility-first styling.
- **Print-ready**: optimized CSS for A4 paper format.
- **Responsive**: looks good on mobile and desktop.

## Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS version recommended)

## Setup Guide

Follow these steps to get the project running on your local machine.

### 1. Clone the repository

```bash
git clone <repository-url>
cd Mostafa-Ali-Cv
```

### 2. Install Dependencies

```bash
# npm
npm install


```

### 3. Start the Development Server

Start the server to view the CV in your browser at `http://localhost:3000`.

```bash
# npm
npm run dev

```

## Building for Production

To build the application for deployment:

```bash
npm run build
```

For static site generation (SSG), which is ideal for hosting a CV on GitHub Pages or Netlify:

```bash
npm run generate
```

## How to Print

1. Open the running application in your browser (e.g., Chrome).
2. Press `Ctrl + P` (Windows/Linux) or `Cmd + P(Mac) to open the print dialog.
3. Ensure the **Destination** is set to "Save as PDF" or your printer.
4. In **More settings**, ensure **Background graphics** is checked to preserve styling.
5. Set **Margins** to "None" or "Default" depending on your printer's capability (the design handles its own padding).