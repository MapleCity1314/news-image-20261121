/*
 * 将本入口的 entry.png 复制到指定输出目录。
 * 参赛项目：competition news-image-20261121。
 * 复制过程是确定性的，每次运行都写入字节完全一致的内容。
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const entryDirectory = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(entryDirectory, 'entry.png');
const outputDirectory = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
const outputPath = join(outputDirectory, 'entry.png');

if (!existsSync(sourcePath)) {
  throw new Error(`Source entry.png is missing: ${sourcePath}`);
}

const sourceBytes = readFileSync(sourcePath);
if (sourceBytes.length === 0) {
  throw new Error(`Source entry.png is empty: ${sourcePath}`);
}

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(outputPath, sourceBytes);
