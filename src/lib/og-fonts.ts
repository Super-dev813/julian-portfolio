import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function loadSerif(): Promise<ArrayBuffer> {
  const file = await readFile(
    join(process.cwd(), "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff")
  );
  return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
}
