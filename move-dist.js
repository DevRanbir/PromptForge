const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, 'dist/angular');
const browserPath = path.join(distPath, 'browser');

if (fs.existsSync(browserPath)) {
    console.log(`Moving files from ${browserPath} to ${distPath}...`);
    const files = fs.readdirSync(browserPath);

    files.forEach(file => {
        const src = path.join(browserPath, file);
        const dest = path.join(distPath, file);

        // Move file/dir
        fs.renameSync(src, dest);
    });

    // Remove empty browser dir
    fs.rmdirSync(browserPath);
    console.log('Move complete. Assets are now at the root of dist/angular.');
} else {
    console.log(`No browser directory found at ${browserPath}. Files might already be at root.`);
}
