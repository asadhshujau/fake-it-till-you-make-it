import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const prettyName = (folder: string) => {
  return folder[0].toUpperCase() + folder.slice(1);
}

export default function handler(request: VercelRequest, response: VercelResponse) {
  console.log(request)
  const apiDir = path.join(process.cwd(), 'api');
  if (!fs.existsSync(apiDir)) {
    return response.status(500).json({ error: 'api directory missing' });
  }

  const dirs = fs.readdirSync(apiDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const endpoints: Array<{ name: string; url: string }> = [];

  for (const folder of dirs) {
    const folderPath = path.join(apiDir, folder);
    const files = fs.readdirSync(folderPath);

    // list route: folder/folder.ts  (e.g. api/users/users.ts)
    const listFile = `${folder}.ts`;
    if (files.includes(listFile)) {
      endpoints.push({ name: `${prettyName(folder)} List`, url: `/api/${folder}` });
    }

    // single-item route: singular.ts (e.g. user.ts) OR any dynamic file like [id].ts
    const singularFile = `${folder.replace(/s$/, '')}.ts`; // users -> user.ts
    const hasSingular = files.includes(singularFile);
    const hasBracket = files.some(f => /^\[.+\]\.ts$/.test(f));

    if (hasSingular || hasBracket) {
      endpoints.push({ name: `Single ${prettyName(folder.replace(/s$/, ''))}`, url: `/api/${folder}/{anyID}` });
    }
  }

  response.setHeader("Content-Type", "application/json");
  response.status(200).json(endpoints);
}
