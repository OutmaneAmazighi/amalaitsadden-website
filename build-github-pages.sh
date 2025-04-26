#!/bin/bash

echo "Building for GitHub Pages deployment..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Create a directory for the build output
mkdir -p gh-pages-build

# Create a 404.html file that redirects to index.html with URL parameters
mkdir -p static-assets
cat > static-assets/404.html << 'EOL'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Association Amal Ait Sadden</title>
  <script>
    // Capture the path and query params from the current URL
    const path = window.location.pathname.slice(1);
    const query = window.location.search.slice(1);
    
    // Redirect to the index.html with these params
    window.location.href = 
      window.location.origin + 
      window.location.pathname.split('/').slice(0, -1).join('/') + 
      '/' +
      '?' + 
      (path ? 'p=' + path + '&' : '') + 
      query;
  </script>
</head>
<body>
  <p>Redirecting to homepage...</p>
</body>
</html>
EOL

echo "Creating GitHub Pages Vite configuration..."

# Update the tailwind.config.ts file with a simpler configuration that doesn't use CSS variables
cat > tailwind.config.ts << 'EOL'
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./client/index.html", 
    "./client/src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ["Poppins", "Cairo", "ui-sans-serif", "system-ui", "sans-serif"],
      serif: ["Amiri", "ui-serif", "Georgia", "serif"],
    },
    colors: {
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712"
      },
      border: "#e5e7eb",
      input: "#e5e7eb",
      ring: "#1f2937",
      background: "#fcfaf7",
      foreground: "#333333",
      primary: {
        DEFAULT: "#4CAF50",
        foreground: "#ffffff",
      },
      secondary: {
        DEFAULT: "#f3f4f6",
        foreground: "#1f2937",
      },
      destructive: {
        DEFAULT: "#D32F2F",
        foreground: "#ffffff",
      },
      muted: {
        DEFAULT: "#f3f4f6",
        foreground: "#6b7280",
      },
      accent: {
        DEFAULT: "#D32F2F",
        foreground: "#ffffff",
      },
      popover: {
        DEFAULT: "#ffffff",
        foreground: "#1f2937",
      },
      card: {
        DEFAULT: "#ffffff",
        foreground: "#1f2937",
      },
      "primary-green": "#4CAF50",
      "primary-dark-green": "#388E3C",
      "primary-red": "#D32F2F",
      "primary-dark-red": "#B71C1C",
      "primary-yellow": "#FFC107",
      "primary-dark-yellow": "#FFB300",
    },
    extend: {
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.8s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
EOL

# Create a simplified Vite config in the client directory
cat > client/vite.config.js << 'EOL'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwind()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
      '@shared': path.resolve(__dirname, "../shared"),
      '@assets': path.resolve(__dirname, "../attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../gh-pages-build"),
    emptyOutDir: true,
  },
  base: './',
});
EOL

# Copy the tailwind config to client for the build process
cp tailwind.config.ts client/

# Update postcss.config.js to ensure it works with the build
cat > client/postcss.config.js << 'EOL'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

# Build the project using Vite with GitHub Pages config
echo "Building the React app..."
cd client
npx vite build --config vite.config.js
cd ..

# Verify the build output
if [ ! -f "gh-pages-build/index.html" ]; then
  echo "ERROR: Build failed! Could not find index.html in the output directory."
  exit 1
fi

# Copy 404.html to the build directory
cp static-assets/404.html gh-pages-build/404.html

# Create a script to handle GitHub Pages routing in index.html
echo "Updating index.html for GitHub Pages routing..."
sed -i.bak 's/<head>/<head>\n  <script>\n    \/\/ Handle GitHub Pages routing\n    (function() {\n      const query = window.location.search.substring(1);\n      const pairs = query.split(\'&\').map(pair => pair.split(\'=\'));\n      const params = pairs.reduce((acc, pair) => {\n        if (pair[0]) acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || \'\');\n        return acc;\n      }, {});\n      \n      if (params.p) {\n        history.replaceState(null, null, params.p + (query.replace(\'p=\' + params.p, \'\') ? \'?\' + query.replace(\'p=\' + params.p + \'&\', \'\').replace(\'p=\' + params.p, \'\') : \'\'));\n      }\n    })();\n  <\/script>/' gh-pages-build/index.html

# Copy assets to the build directory
if [ -d "attached_assets" ]; then
  echo "Copying assets to the build directory..."
  mkdir -p gh-pages-build/assets/attached_assets
  cp -r attached_assets/* gh-pages-build/assets/attached_assets/ || echo "Warning: Could not copy attached_assets"
fi

# Copy all static assets from client/public directory
echo "Copying all static assets from client/public directory..."
if [ -d "client/public" ]; then
  cp -r client/public/* gh-pages-build/ || echo "Warning: Could not copy client/public"
fi

# Create any additional needed directories for event images
echo "Creating any missing image directory structure for events..."
mkdir -p gh-pages-build/images/events
echo "Event images directory structure is ready."

echo "GitHub Pages build complete!"
echo "Build output is in the 'gh-pages-build' directory."
echo ""
echo "To deploy manually:"
echo "1. Upload the 'gh-pages-build' directory contents to your GitHub repository gh-pages branch"
echo ""
echo "To deploy automatically with GitHub Actions:"
echo "1. Push your code to GitHub"
echo "2. GitHub Actions will handle the deployment process"
echo "3. Enable GitHub Pages in your repository settings and point it to the gh-pages branch"
echo ""
echo "Your site will be available at https://[username].github.io/[repository-name]/"