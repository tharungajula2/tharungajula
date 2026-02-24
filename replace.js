const fs = require('fs');
const file = 'app/protocols/biology_os/page.tsx';
let txt = fs.readFileSync(file, 'utf8');
const newTxt = txt.replace(/emerald/g, 'purple');
fs.writeFileSync(file, newTxt);
console.log('Done replacing emerald with purple in biology page');
