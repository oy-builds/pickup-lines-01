// Pickup Lines for Machines — entry program.
// Reads the pickup line stored in entry.txt (beside this file) and writes it
// to the competition output path, /output/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");

let line: string;
try {
  line = readFileSync(sourcePath, "utf8");
} catch (err) {
  console.error(`error: could not read the pickup line from ${sourcePath}: ${(err as Error).message}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");

// Verify the write landed intact: a partial or corrupted copy would silently
// change the judged entry, so fail loudly instead of exiting 0.
if (readFileSync(outPath, "utf8") !== line) {
  console.error(`error: verification failed — ${outPath} does not match ${sourcePath}`);
  process.exit(1);
}
