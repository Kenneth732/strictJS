// index.js
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

let wasmInitialized = false;

/**
 * Initialize StrictJS Runtime.
 * Works in both Node.js and Browser.
 */
export async function initStrict() {
  if (wasmInitialized) return { StrictNumber, StrictString, get_memory, HeapType, StrictArray, StrictForLoop, StrictFunction, StrictObject, Schema };

  // Node.js environment
  if (typeof window === "undefined") {
    const fs = await import("fs");
    const path = await import("path");
    const url = await import("url");

    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const wasmPath = path.resolve(__dirname, "pkg/strictjs_runtime_bg.wasm");
    const wasmBuffer = fs.readFileSync(wasmPath);

    await initWASM(wasmBuffer);
  } else {
    // Browser environment: fetch automatically
    await initWASM();
  }

  wasmInitialized = true;

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

// Re-export types for convenience
export {
  get_memory,
  HeapType,
  StrictArray,
  StrictForLoop,
  StrictFunction,
  StrictObject,
  Schema
};
