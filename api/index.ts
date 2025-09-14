import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const apiDir = path.join(process.cwd(), 'api');
  const files = fs.readdirSync(apiDir)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts');

  const endpoints = files.map(file => ({
    name: file.replace('.ts', ''),
    url: `/api/${file.replace('.ts', '')}`
  }));

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(endpoints);
}
