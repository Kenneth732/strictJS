import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import initWasm, {
  get_memory,
  HeapType,
  StrictArray,
  StrictForLoop,
  StrictFunction,
  StrictObject
} from "./pkg/strictjs_runtime.js";

// Handle __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function strictInit() {
  // Check if running in Node.js
  if (typeof window === "undefined" && typeof process !== "undefined") {
    // Node.js environment
    const wasmPath = path.resolve(__dirname, "pkg/strictjs_runtime_bg.wasm");
    const wasmBuffer = fs.readFileSync(wasmPath);
    await initWasm(wasmBuffer);
  } else {
    // Browser environment
    await initWasm();
  }

  return {
    get_memory,
    HeapType,
    StrictArray,
    StrictForLoop,
    StrictFunction,
    StrictObject
  };
}

export {
  get_memory,
  HeapType,
  StrictArray,
  StrictForLoop,
  StrictFunction,
  StrictObject
};
