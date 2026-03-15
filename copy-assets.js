const fs = require('fs');
const path = require('path');

const BRAIN_DIR = 'C:\\Users\\satya\\.gemini\\antigravity\\brain\\a1929b34-d817-4414-bce2-808d7e1717ac';

const assets = [
  { src: 'jayaa_mishra_portrait_1773507673660.png', dest: 'public/images/team/jayaa_mishra.png' },
  { src: 'alexander_sterling_portrait_1773507690210.png', dest: 'public/images/team/alexander_sterling.png' },
  { src: 'elena_vasquez_portrait_1773507706319.png', dest: 'public/images/team/elena_vasquez.png' },
  { src: 'marcus_chen_portrait_1773507724246.png', dest: 'public/images/team/marcus_chen.png' },
  { src: 'press_venice_1_masquerade_1773508547334.png', dest: 'public/images/press/venice_1.png' },
  { src: 'press_venice_2_gondola_1773508565644.png', dest: 'public/images/press/venice_2.png' },
  { src: 'press_venice_3_interior_1773508583160.png', dest: 'public/images/press/venice_3.png' },
  { src: 'press_como_1_villa_1773508604522.png', dest: 'public/images/press/como_1.png' },
  { src: 'press_como_2_table_1773508619530.png', dest: 'public/images/press/como_2.png' },
  { src: 'press_como_3_editorial_1773508635641.png', dest: 'public/images/press/como_3.png' },
  { src: 'press_editorial_1_couple_1773509469937.png', dest: 'public/images/press/editorial_1.png' },
  { src: 'press_editorial_2_details_1773509487187.png', dest: 'public/images/press/editorial_2.png' },
  { src: 'press_editorial_3_exit_1773509505850.png', dest: 'public/images/press/editorial_3.png' }
];

assets.forEach(asset => {
  const fullSrc = path.join(BRAIN_DIR, asset.src);
  const fullDest = path.join(__dirname, asset.dest);
  const destDir = path.dirname(fullDest);
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  try {
    if (fs.existsSync(fullSrc)) {
      fs.copyFileSync(fullSrc, fullDest);
      console.log(`OK: ${asset.dest}`);
    } else {
      console.error(`ERROR: Source not found ${fullSrc}`);
    }
  } catch (err) {
    console.error(`ERROR: ${asset.dest} - ${err.message}`);
  }
});
