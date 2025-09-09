

import { fileURLToPath } from "url";
import {
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

// Check if we're in Node.js environment
const isNode = typeof process !== 'undefined' && 
               process.versions != null && 
               process.versions.node != null;

let initWASM;
let wasmInitialized = false;

// Dynamic import to handle different environments
if (isNode) {
  // Node.js environment
  const fs = await import("fs");
  const path = await import("path");
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  initWASM = (await import("./pkg/strictjs_runtime.js")).initWASM;
  
  const wasmPath = path.resolve(__dirname, "pkg/strictjs_runtime_bg.wasm");
  const wasmBuffer = fs.readFileSync(wasmPath);
  
  await initWASM(wasmBuffer);
  wasmInitialized = true;
  
} else {
  // Browser environment
  initWASM = (await import("./pkg/strictjs_runtime.js")).initWASM;
}

export default async function strictInit() {
  if (!wasmInitialized && !isNode) {
    // Initialize WASM for browser
    await initWASM();
    wasmInitialized = true;
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

