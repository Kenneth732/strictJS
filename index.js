import initWASM, {
  StrictNumber, StrictString, get_memory, HeapType, StrictArray, StrictForLoop, StrictFunction, StrictObject, Schema,
  // Additional exports from your wasm file
  StrictBoolean, StrictBigInt, StrictPromise, StrictTimeout, StrictWhileLoop, StrictAsync,
  ThreadManager, ThreadPool, ThreadTask, GPUMemoryManager, JsGPUType, JsSIMDType, JsHeapType,
  JsTypeCapabilities, OptimizationMode, StringEncoding, TaskPriority, ThreadPriority, ThreadState,
  getIterator, createTensor, createVector, createMatrix, createZeros, createOnes, createRange,
  strict_fetch, init_thread_manager, create_simd_f32x4, create_simd_i32x4, create_simd_u8x16,
  createGPUType, getAvailableGPUTypes, createSIMDType, getAvailableSIMDTypes, getSIMDTypeForUseCase
} from "./pkg/strictjs_runtime.js";

let nodeInitWASM = null;
let isInitialized = false;

/**
 * This function dynamically loads WASM in Node.js
 */
async function setupNodeLoader() {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const { fileURLToPath } = await import("url");
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    return async () => {
      try {
        const wasmPath = path.resolve(__dirname, "pkg/strictjs_runtime_bg.wasm");
        
        // Check if file exists before reading
        if (!fs.existsSync(wasmPath)) {
          // Try alternative path
          const altWasmPath = path.resolve(__dirname, "strictjs_runtime_bg.wasm");
          if (!fs.existsSync(altWasmPath)) {
            throw new Error(`WASM file not found at ${wasmPath} or ${altWasmPath}`);
          }
          const wasmBuffer = fs.readFileSync(altWasmPath);
          await initWASM(wasmBuffer);
        } else {
          const wasmBuffer = fs.readFileSync(wasmPath);
          await initWASM(wasmBuffer);
        }
        
        isInitialized = true;
      } catch (error) {
        throw new Error(`Failed to load WASM in Node.js: ${error.message}`);
      }
    };
  } catch (error) {
    throw new Error(`Failed to setup Node.js loader: ${error.message}`);
  }
}

// Lazy initialize Node loader if in Node.js environment
if (typeof window === "undefined" && typeof process !== "undefined" && process.versions != null && process.versions.node != null) {
  nodeInitWASM = await setupNodeLoader();
}

/**
 * Initializes StrictJS Runtime
 * - Node: Loads WASM from filesystem
 * - Browser: WASM auto-fetch
 * 
 * @param {Object} options - Initialization options
 * @param {string} [options.wasmPath] - Custom path to WASM file (browser only)
 * @param {boolean} [options.sync=false] - Use synchronous initialization (Node.js only)
 * @returns {Promise<Object>} Runtime exports
 * @throws {Error} If initialization fails
 */
export default async function strictInit(options = {}) {
  // Prevent multiple initializations
  if (isInitialized) {
    return getExports();
  }
  
  try {
    if (typeof window === "undefined") {
      // Node.js environment
      if (!nodeInitWASM) {
        throw new Error("Node.js loader not initialized");
      }
      await nodeInitWASM();
    } else {
      // Browser environment
      if (options.wasmPath) {
        // Custom WASM path
        const response = await fetch(options.wasmPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch WASM: ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        await initWASM(buffer);
      } else {
        // Default - let the wasm bindings fetch it
        await initWASM();
      }
    }
    
    isInitialized = true;
    return getExports();
  } catch (error) {
    throw new Error(`StrictJS initialization failed: ${error.message}`);
  }
}

/**
 * Get runtime exports
 * @private
 */
function getExports() {
  return {
    // Core types
    StrictNumber,
    StrictString,
    StrictArray,
    StrictBoolean,
    StrictBigInt,
    StrictObject,
    StrictFunction,
    StrictPromise,
    
    // Loops and async
    StrictForLoop,
    StrictWhileLoop,
    StrictTimeout,
    StrictAsync,
    
    // Threading
    ThreadManager,
    ThreadPool,
    ThreadTask,
    
    // GPU and SIMD
    GPUMemoryManager,
    JsGPUType,
    JsSIMDType,
    JsHeapType,
    JsTypeCapabilities,
    
    // Schema
    Schema,
    
    // Memory
    get_memory,
    
    // Enums
    HeapType,
    OptimizationMode,
    StringEncoding,
    TaskPriority,
    ThreadPriority,
    ThreadState,
    
    // Factory functions
    getIterator,
    createTensor,
    createVector,
    createMatrix,
    createZeros,
    createOnes,
    createRange,
    strict_fetch,
    init_thread_manager,
    create_simd_f32x4,
    create_simd_i32x4,
    create_simd_u8x16,
    createGPUType,
    getAvailableGPUTypes,
    createSIMDType,
    getAvailableSIMDTypes,
    getSIMDTypeForUseCase
  };
}

// Named exports for core functionality
export {
  // Core types
  StrictNumber,
  StrictString,
  StrictArray,
  StrictBoolean,
  StrictBigInt,
  StrictObject,
  StrictFunction,
  StrictPromise,
  
  // Loops and async
  StrictForLoop,
  StrictWhileLoop,
  StrictTimeout,
  StrictAsync,
  
  // Threading
  ThreadManager,
  ThreadPool,
  ThreadTask,
  
  // GPU and SIMD
  GPUMemoryManager,
  JsGPUType,
  JsSIMDType,
  JsHeapType,
  JsTypeCapabilities,
  
  // Schema
  Schema,
  
  // Memory
  get_memory,
  
  // Enums
  HeapType,
  OptimizationMode,
  StringEncoding,
  TaskPriority,
  ThreadPriority,
  ThreadState,
  
  // Factory functions
  getIterator,
  createTensor,
  createVector,
  createMatrix,
  createZeros,
  createOnes,
  createRange,
  strict_fetch,
  init_thread_manager,
  create_simd_f32x4,
  create_simd_i32x4,
  create_simd_u8x16,
  createGPUType,
  getAvailableGPUTypes,
  createSIMDType,
  getAvailableSIMDTypes,
  getSIMDTypeForUseCase
};






