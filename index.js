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

/**
 * This function dynamically loads WASM in Node.js
 */
async function setupNodeLoader() {
  const fs = await import("fs");
  const path = await import("path");
  const { fileURLToPath } = await import("url");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return async () => {
    const wasmPath = path.resolve(__dirname, "pkg/strictjs_runtime_bg.wasm");
    const wasmBuffer = fs.readFileSync(wasmPath);
    await initWASM(wasmBuffer);
  };
}

// Lazy initialize Node loader if in Node.js environment
if (typeof window === "undefined") {
  nodeInitWASM = await setupNodeLoader();
}

/**
 * Initializes StrictJS Runtime
 * - Node: Loads WASM from filesystem
 * - Browser: WASM auto-fetch
 */
export default async function strictInit() {
  if (typeof window === "undefined") {
    await nodeInitWASM();
  } else {
    await initWASM(); // Browser automatically fetches the `.wasm` file
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
