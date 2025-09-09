
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import initWASM, {
  StrictNumber,
  StrictString,
  get_memory,
  HeapType,
  StrictArray,
  StrictForLoop,
  StrictFunction,
  StrictObject,
  Schema
} from "./pkg/strictjs_runtime.js";

// Handle __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function strictInit() {
  if (typeof window === "undefined") {
    // Node.js environment: load WASM manually
    const wasmPath = path.resolve(__dirname, "pkg/strictjs_runtime_bg.wasm");
    const wasmBuffer = fs.readFileSync(wasmPath);
    await initWASM(wasmBuffer);
  } else {
    // Browser environment: let it fetch automatically
    await initWASM();
  }

  return {
    StrictNumber,
    StrictString,
    get_memory,
    HeapType,
    StrictArray,
    StrictForLoop,
    StrictFunction,
    StrictObject,
    Schema
  };
}

export {
  get_memory,
  HeapType,
  StrictArray,
  StrictForLoop,
  StrictFunction,
  StrictObject,
  Schema
};
