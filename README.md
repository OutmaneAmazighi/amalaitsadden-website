# Association Amal Ait Sadden pour le Développement Durable

A responsive multilingual website for the NGO "Association Amal Ait Sadden pour le Développement Durable" based in Morocco. This website showcases the organization's activities, team members, and mission with a culturally appropriate Amazigh-inspired design.

## Features

- **Multilingual Support**: Content available in Arabic, French, German, and English
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Cultural Design Elements**: Incorporates Amazigh patterns and symbols
- **Interactive Components**: Image gallery with lightbox functionality
- **Activity Timeline**: Displays the organization's events and activities in chronological order

## Deployment Options

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Create a GitHub Repository**:
   - Create a new repository on GitHub
   - Push this codebase to your repository

2. **Run the Build Script**:
   ```bash
   ./build-github-pages.sh
   ```
   This script will:
   - Create necessary files for GitHub Pages SPA routing
   - Build the website optimized for GitHub Pages
   - Provide instructions for the final steps

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Enable GitHub Pages
   - Set the source branch to `gh-pages` (or your chosen branch)
   - Your site will be published at `https://[username].github.io/[repository-name]/`

### Option 2: Automatic Deployment with GitHub Actions

This repository includes a GitHub Actions workflow file (`.github/workflows/deploy.yml`) that will automatically:
1. Build the website
2. Deploy to GitHub Pages

To use it:
1. Push your code to GitHub
2. Go to the repository settings
3. Enable GitHub Pages and set the source to "GitHub Actions"

## Development

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5000`

## Project Structure

- `client/src`: Frontend React code
  - `components/`: React components
  - `lib/`: Utilities and data
  - `hooks/`: Custom React hooks
- `attached_assets/`: Images and other assets
- `static-assets/`: Static files
- `build-github-pages.sh`: Script for GitHub Pages deployment

## Credits

This website was developed for the Association Amal Ait Sadden pour le Développement Durable, an NGO working to promote sustainable development and preserve cultural heritage in the Ait Sadden region of Morocco.