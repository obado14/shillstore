import fs from 'node:fs';

const file = 'node_modules/@tailwindcss/node/dist/index.js';
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf-8');

  // Patch Nt
  const targetNt = 'async function Nt(e,r,t,i){let o=await ii(e,r,i);';
  const replaceNt = 'async function Nt(e,r,t,i){let o=await ii(e,r,i);if(typeof o==="string")o=o.replace(/\\x00/g,"");';

  if (content.includes(targetNt)) {
    content = content.replace(targetNt, replaceNt);
    console.log('Patched Nt');
  }

  // Patch De
  const targetDe = 'let o=await St(e,r,i);if(!o)';
  const replaceDe = 'let o=await St(e,r,i);if(typeof o==="string")o=o.replace(/\\x00/g,"");if(!o)';
  if (content.includes(targetDe)) {
    content = content.replace(targetDe, replaceDe);
    console.log('Patched De (o)');
  }

  const targetDeS = 'let s=await St(e,r,i);if(!s)';
  const replaceDeS = 'let s=await St(e,r,i);if(typeof s==="string")s=s.replace(/\\x00/g,"");if(!s)';
  if (content.includes(targetDeS)) {
    content = content.replace(targetDeS, replaceDeS);
    console.log('Patched De (s)');
  }

  fs.writeFileSync(file, content, 'utf-8');
  console.log('Done patching @tailwindcss/node');
}

// Also check node_modules/tailwindcss/dist/lib.js
const tailwindLib = 'node_modules/tailwindcss/dist/lib.js';
if (fs.existsSync(tailwindLib)) {
  let content = fs.readFileSync(tailwindLib, 'utf-8');
  // Check if there are any resolvers or null byte usages
  console.log('Checked tailwind lib');
}
