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

echo "Creating special GitHub Pages build configuration..."

# Build the project using Vite with GitHub Pages config
echo "Building the website..."
npm run build -- --config vite.config.gh.js

# Copy 404.html to the build directory
cp static-assets/404.html build/404.html

# Create a script to handle GitHub Pages routing in index.html
echo "Updating index.html for GitHub Pages routing..."
sed -i.bak 's/<head>/<head>\n  <script>\n    \/\/ Handle GitHub Pages routing\n    (function() {\n      const query = window.location.search.substring(1);\n      const pairs = query.split(\'&\').map(pair => pair.split(\'=\'));\n      const params = pairs.reduce((acc, pair) => {\n        acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || \'\');\n        return acc;\n      }, {});\n      \n      if (params.p) {\n        history.replaceState(null, null, params.p + (query.replace(\'p=\' + params.p, \'\') ? \'?\' + query.replace(\'p=\' + params.p + \'&\', \'\').replace(\'p=\' + params.p, \'\') : \'\'));\n      }\n    })();\n  <\/script>/' build/index.html

echo "GitHub Pages build complete!"
echo "To deploy:"
echo "1. Upload the 'build' directory to your GitHub repository"
echo "2. Configure GitHub Pages to serve from the root directory of your branch"
echo "3. Your site will be available at https://[username].github.io/[repository-name]/"