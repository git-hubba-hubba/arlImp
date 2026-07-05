const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "..", "frontend", "arl-impact", "dist");
const outputDir = path.join(__dirname, "..", "dist");

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Frontend build output not found at ${sourceDir}`);
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.cpSync(sourceDir, outputDir, { recursive: true });

console.log(`Copied frontend build output to ${outputDir}`);
