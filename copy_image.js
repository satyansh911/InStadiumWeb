const fs = require('fs');
const src = "C:\\Users\\satya\\.gemini\\antigravity\\brain\\69cad8a9-d74c-40fe-a150-22bf6648259e\\instadium_hero_view_1773572321549.png";
const dest = "e:\\Minor Project\\New folder\\luxury-events-platform\\public\\images\\hero.png";

try {
  fs.copyFileSync(src, dest);
  console.log("Successfully copied hero image to " + dest);
} catch (err) {
  console.error("Error copy image: ", err);
  process.exit(1);
}
