const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');

// Helper to recursively copy directories
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Clean and create dist folder
if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// Copy static frontend files to dist directory for Vercel deployment
try {
    fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(DIST_DIR, 'index.html'));
    fs.copyFileSync(path.join(__dirname, 'styles.css'), path.join(DIST_DIR, 'styles.css'));
    fs.copyFileSync(path.join(__dirname, 'script.js'), path.join(DIST_DIR, 'script.js'));
    
    if (fs.existsSync(path.join(__dirname, 'assets'))) {
        copyDir(path.join(__dirname, 'assets'), path.join(DIST_DIR, 'assets'));
    }
    
    console.log('Build completed successfully. Production files are in /dist');
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
