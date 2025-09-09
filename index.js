import { fileURLToPath } from "url";
import * as wasmModule from "./pkg/strictjs_runtime.js";

// Check if we're in Node.js environment
const isNode = typeof process !== 'undefined' && 
               process.versions != null && 
               process.versions.node != null;

let wasmInitialized = false;

// Dynamic import to handle different environments
if (isNode) {
  // Node.js environment
  const fs = await import("fs");
  const path = await import("path");
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  const wasmPath = path.resolve(__dirname, "pkg/strictjs_runtime_bg.wasm");
  const wasmBuffer = fs.readFileSync(wasmPath);
  
  await wasmModule.default(wasmBuffer);
  wasmInitialized = true;
}

export default async function strictInit() {
  if (!wasmInitialized && !isNode) {
    // Initialize WASM for browser
    await wasmModule.default();
    wasmInitialized = true;
  }

  return {
    StrictNumber: wasmModule.StrictNumber,
    StrictString: wasmModule.StrictString,
    get_memory: wasmModule.get_memory,
    HeapType: wasmModule.HeapType,
    StrictArray: wasmModule.StrictArray,
    StrictForLoop: wasmModule.StrictForLoop,
    StrictFunction: wasmModule.StrictFunction,
    StrictObject: wasmModule.StrictObject,
    Schema: wasmModule.Schema
  };
}

// Export all the named exports directly
export const {
  StrictNumber,
  StrictString,
  get_memory,
  HeapType,
  StrictArray,
  StrictForLoop,
  StrictFunction,
  StrictObject,
  Schema
} = wasmModule;