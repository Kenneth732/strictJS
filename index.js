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

let nodeInitWASM = null;

// Only import `fs` and `path` in Node environment
if (typeof window === "undefined") {
  const fs = await import("fs");
  const path = await import("path");
  const { fileURLToPath } = await import("url");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  nodeInitWASM = async () => {
    const wasmPath = path.resolve(__dirname, "pkg/strictjs_runtime_bg.wasm");
    const wasmBuffer = fs.readFileSync(wasmPath);
    await initWASM(wasmBuffer);
  };
}

/**
 * Initializes StrictJS Runtime
 * - Node: Loads WASM from filesystem
 * - Browser: WASM auto-fetch
 */
export default async function strictInit() {
  if (typeof window === "undefined") {
    // Node.js environment
    await nodeInitWASM();
  } else {
    // Browser environment
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

// Named exports
export {
  get_memory,
  HeapType,
  StrictArray,
  StrictForLoop,
  StrictFunction,
  StrictObject,
  Schema
};
