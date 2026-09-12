const s=await (await fetch('https://badmintonplayer.dk/DBF/Ranglister/')).text(); console.log([...s.matchAll(/<script[^>]+src=['"]([^'"]+)/g)].map(m=>m[1]).join('\n'));
