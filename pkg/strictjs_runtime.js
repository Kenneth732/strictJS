let wasm;

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_3.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_3.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
 * @param {StrictArray} array
 * @returns {ArrayIterator}
 */
export function getIterator(array) {
    _assertClass(array, StrictArray);
    const ret = wasm.getIterator(array.__wbg_ptr);
    return ArrayIterator.__wrap(ret);
}

/**
 * @param {HeapType} heap
 * @param {Uint32Array} shape
 * @returns {StrictArray}
 */
export function createTensor(heap, shape) {
    const ptr0 = passArray32ToWasm0(shape, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.createTensor(heap, ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return StrictArray.__wrap(ret[0]);
}

/**
 * @param {HeapType} heap
 * @param {number} length
 * @returns {StrictArray}
 */
export function createVector(heap, length) {
    const ret = wasm.createVector(heap, length);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return StrictArray.__wrap(ret[0]);
}

/**
 * @param {HeapType} heap
 * @param {number} rows
 * @param {number} cols
 * @returns {StrictArray}
 */
export function createMatrix(heap, rows, cols) {
    const ret = wasm.createMatrix(heap, rows, cols);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return StrictArray.__wrap(ret[0]);
}

/**
 * @param {HeapType} heap
 * @param {number} length
 * @returns {StrictArray}
 */
export function createZeros(heap, length) {
    const ret = wasm.createZeros(heap, length);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return StrictArray.__wrap(ret[0]);
}

/**
 * @param {HeapType} heap
 * @param {number} length
 * @returns {StrictArray}
 */
export function createOnes(heap, length) {
    const ret = wasm.createOnes(heap, length);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return StrictArray.__wrap(ret[0]);
}

/**
 * @param {HeapType} heap
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @returns {StrictArray}
 */
export function createRange(heap, start, end, step) {
    const ret = wasm.createRange(heap, start, end, step);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return StrictArray.__wrap(ret[0]);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_2.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}
/**
 * @param {string} url
 * @param {HeapType} return_type
 * @returns {Promise<any>}
 */
export function strict_fetch(url, return_type) {
    const ptr0 = passStringToWasm0(url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.strict_fetch(ptr0, len0, return_type);
    return ret;
}

/**
 * @param {any} config
 * @returns {ThreadManager}
 */
export function init_thread_manager(config) {
    const ret = wasm.init_thread_manager(config);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ThreadManager.__wrap(ret[0]);
}

/**
 * @returns {any}
 */
export function get_memory() {
    const ret = wasm.get_memory();
    return ret;
}

/**
 * @returns {JsSIMDType}
 */
export function create_simd_f32x4() {
    const ret = wasm.create_simd_f32x4();
    return JsSIMDType.__wrap(ret);
}

/**
 * @returns {JsSIMDType}
 */
export function create_simd_i32x4() {
    const ret = wasm.create_simd_i32x4();
    return JsSIMDType.__wrap(ret);
}

/**
 * @returns {JsSIMDType}
 */
export function create_simd_u8x16() {
    const ret = wasm.create_simd_u8x16();
    return JsSIMDType.__wrap(ret);
}

let cachedUint16ArrayMemory0 = null;

function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function _assertChar(c) {
    if (typeof(c) === 'number' && (c >= 0x110000 || (c >= 0xD800 && c < 0xE000))) throw new Error(`expected a valid Unicode scalar value, found ${c}`);
}
/**
 * @param {string} type_str
 * @returns {JsGPUType}
 */
export function createGPUType(type_str) {
    const ptr0 = passStringToWasm0(type_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.createGPUType(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return JsGPUType.__wrap(ret[0]);
}

/**
 * @returns {Array<any>}
 */
export function getAvailableGPUTypes() {
    const ret = wasm.getAvailableGPUTypes();
    return ret;
}

/**
 * @param {string} type_str
 * @returns {JsSIMDType}
 */
export function createSIMDType(type_str) {
    const ptr0 = passStringToWasm0(type_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.createSIMDType(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return JsSIMDType.__wrap(ret[0]);
}

/**
 * @returns {Array<any>}
 */
export function getAvailableSIMDTypes() {
    const ret = wasm.getAvailableSIMDTypes();
    return ret;
}

/**
 * @param {string} use_case
 * @returns {JsSIMDType | undefined}
 */
export function getSIMDTypeForUseCase(use_case) {
    const ptr0 = passStringToWasm0(use_case, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.getSIMDTypeForUseCase(ptr0, len0);
    return ret === 0 ? undefined : JsSIMDType.__wrap(ret);
}

function __wbg_adapter_44(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8b528cab5092fbfe(arg0, arg1);
}

function __wbg_adapter_47(arg0, arg1, arg2) {
    wasm.closure89_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_531(arg0, arg1, arg2, arg3) {
    wasm.closure111_externref_shim(arg0, arg1, arg2, arg3);
}

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47}
 */
export const HeapType = Object.freeze({
    Number: 0, "0": "Number",
    U8: 1, "1": "U8",
    I8: 2, "2": "I8",
    U16: 3, "3": "U16",
    I16: 4, "4": "I16",
    U32: 5, "5": "U32",
    I32: 6, "6": "I32",
    U64: 7, "7": "U64",
    I64: 8, "8": "I64",
    F32: 9, "9": "F32",
    F64: 10, "10": "F64",
    Bool: 11, "11": "Bool",
    Str: 12, "12": "Str",
    Str16: 13, "13": "Str16",
    Any: 14, "14": "Any",
    Struct: 15, "15": "Struct",
    Array: 16, "16": "Array",
    Map: 17, "17": "Map",
    Date: 18, "18": "Date",
    Buffer: 19, "19": "Buffer",
    Null: 20, "20": "Null",
    Undefined: 21, "21": "Undefined",
    Symbol: 22, "22": "Symbol",
    TensorF32: 23, "23": "TensorF32",
    TensorF64: 24, "24": "TensorF64",
    TensorI32: 25, "25": "TensorI32",
    TensorU8: 26, "26": "TensorU8",
    TensorI8: 27, "27": "TensorI8",
    TensorI16: 28, "28": "TensorI16",
    TensorU16: 29, "29": "TensorU16",
    MatrixF32: 30, "30": "MatrixF32",
    MatrixF64: 31, "31": "MatrixF64",
    MatrixC32: 32, "32": "MatrixC32",
    MatrixC64: 33, "33": "MatrixC64",
    VectorF32: 34, "34": "VectorF32",
    VectorF64: 35, "35": "VectorF64",
    VectorI32: 36, "36": "VectorI32",
    SparseMatrix: 37, "37": "SparseMatrix",
    Quantized8: 38, "38": "Quantized8",
    Quantized16: 39, "39": "Quantized16",
    Embedding: 40, "40": "Embedding",
    Attention: 41, "41": "Attention",
    WeightF32: 42, "42": "WeightF32",
    BiasF32: 43, "43": "BiasF32",
    GradientF32: 44, "44": "GradientF32",
    Activation: 45, "45": "Activation",
    GPUTensor: 46, "46": "GPUTensor",
    SIMDVector: 47, "47": "SIMDVector",
});
/**
 * @enum {0 | 1 | 2 | 3 | 4}
 */
export const OptimizationMode = Object.freeze({
    Sequential: 0, "0": "Sequential",
    Batched: 1, "1": "Batched",
    GPU: 2, "2": "GPU",
    SIMD: 3, "3": "SIMD",
    Auto: 4, "4": "Auto",
});
/**
 * @enum {0 | 1 | 2}
 */
export const StringEncoding = Object.freeze({
    Utf8: 0, "0": "Utf8",
    Utf16: 1, "1": "Utf16",
    Ascii: 2, "2": "Ascii",
});
/**
 * @enum {0 | 1 | 2 | 3}
 */
export const TaskPriority = Object.freeze({
    Low: 0, "0": "Low",
    Normal: 1, "1": "Normal",
    High: 2, "2": "High",
    Critical: 3, "3": "Critical",
});
/**
 * @enum {0 | 1 | 2 | 3}
 */
export const ThreadPriority = Object.freeze({
    Low: 0, "0": "Low",
    Normal: 1, "1": "Normal",
    High: 2, "2": "High",
    Critical: 3, "3": "Critical",
});
/**
 * @enum {0 | 1 | 2 | 3 | 4}
 */
export const ThreadState = Object.freeze({
    Idle: 0, "0": "Idle",
    Running: 1, "1": "Running",
    Paused: 2, "2": "Paused",
    Completed: 3, "3": "Completed",
    Error: 4, "4": "Error",
});

const ArrayIteratorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_arrayiterator_free(ptr >>> 0, 1));

export class ArrayIterator {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ArrayIterator.prototype);
        obj.__wbg_ptr = ptr;
        ArrayIteratorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ArrayIteratorFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_arrayiterator_free(ptr, 0);
    }
    /**
     * @returns {any}
     */
    next() {
        const ret = wasm.arrayiterator_next(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {boolean}
     */
    hasNext() {
        const ret = wasm.arrayiterator_hasNext(this.__wbg_ptr);
        return ret !== 0;
    }
    reset() {
        wasm.arrayiterator_reset(this.__wbg_ptr);
    }
}

const GPUBufferInfoFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gpubufferinfo_free(ptr >>> 0, 1));

export class GPUBufferInfo {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GPUBufferInfo.prototype);
        obj.__wbg_ptr = ptr;
        GPUBufferInfoFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GPUBufferInfoFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gpubufferinfo_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get id() {
        const ret = wasm.gpubufferinfo_id(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.gpubufferinfo_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {GPUBufferUsage}
     */
    get usage() {
        const ret = wasm.gpubufferinfo_usage(this.__wbg_ptr);
        return GPUBufferUsage.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.gpubufferinfo_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const GPUBufferUsageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gpubufferusage_free(ptr >>> 0, 1));

export class GPUBufferUsage {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GPUBufferUsage.prototype);
        obj.__wbg_ptr = ptr;
        GPUBufferUsageFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GPUBufferUsageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gpubufferusage_free(ptr, 0);
    }
    /**
     * @param {number} bits
     */
    constructor(bits) {
        const ret = wasm.gpubufferusage_new(bits);
        this.__wbg_ptr = ret >>> 0;
        GPUBufferUsageFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    bits() {
        const ret = wasm.gpubufferinfo_id(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {GPUBufferUsage} other
     * @returns {boolean}
     */
    contains(other) {
        _assertClass(other, GPUBufferUsage);
        const ret = wasm.gpubufferusage_contains(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {GPUBufferUsage} other
     * @returns {GPUBufferUsage}
     */
    with(other) {
        _assertClass(other, GPUBufferUsage);
        const ret = wasm.gpubufferusage_with(this.__wbg_ptr, other.__wbg_ptr);
        return GPUBufferUsage.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.gpubufferusage_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const GPUMemoryManagerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gpumemorymanager_free(ptr >>> 0, 1));

export class GPUMemoryManager {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GPUMemoryManagerFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gpumemorymanager_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.gpumemorymanager_new();
        this.__wbg_ptr = ret >>> 0;
        GPUMemoryManagerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {JsGPUType} _gpu_type
     * @param {number} size
     * @param {GPUBufferUsage} usage
     * @returns {number}
     */
    createBuffer(_gpu_type, size, usage) {
        _assertClass(_gpu_type, JsGPUType);
        _assertClass(usage, GPUBufferUsage);
        var ptr0 = usage.__destroy_into_raw();
        const ret = wasm.gpumemorymanager_createBuffer(this.__wbg_ptr, _gpu_type.__wbg_ptr, size, ptr0);
        return ret >>> 0;
    }
    /**
     * @param {number} id
     * @returns {GPUBufferInfo | undefined}
     */
    getBufferInfo(id) {
        const ret = wasm.gpumemorymanager_getBufferInfo(this.__wbg_ptr, id);
        return ret === 0 ? undefined : GPUBufferInfo.__wrap(ret);
    }
    /**
     * @param {number} id
     * @returns {boolean}
     */
    destroyBuffer(id) {
        const ret = wasm.gpumemorymanager_destroyBuffer(this.__wbg_ptr, id);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    getTotalMemory() {
        const ret = wasm.gpumemorymanager_getTotalMemory(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    getBufferCount() {
        const ret = wasm.gpumemorymanager_getBufferCount(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const JsGPUTypeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_jsgputype_free(ptr >>> 0, 1));

export class JsGPUType {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JsGPUType.prototype);
        obj.__wbg_ptr = ptr;
        JsGPUTypeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        JsGPUTypeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsgputype_free(ptr, 0);
    }
    /**
     * @param {string} type_str
     */
    constructor(type_str) {
        const ptr0 = passStringToWasm0(type_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.jsgputype_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        JsGPUTypeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {boolean}
     */
    isTensor() {
        const ret = wasm.jsgputype_isTensor(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isMatrix() {
        const ret = wasm.jsgputype_isMatrix(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {any}
     */
    getInfo() {
        const ret = wasm.jsgputype_getInfo(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Array<any>}
     */
    getBackends() {
        const ret = wasm.jsgputype_getBackends(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    elementSize() {
        const ret = wasm.jsgputype_elementSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    alignment() {
        const ret = wasm.jsgputype_alignment(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.jsgputype_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {Array<any>}
     */
    supportedOperations() {
        const ret = wasm.jsgputype_supportedOperations(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {JsGPUType} other
     * @returns {boolean}
     */
    isCompatibleWith(other) {
        _assertClass(other, JsGPUType);
        const ret = wasm.jsgputype_isCompatibleWith(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {HeapType}
     */
    getHeapType() {
        const ret = wasm.jsgputype_getHeapType(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Array<any>}
     */
    computeCapabilities() {
        const ret = wasm.jsgputype_computeCapabilities(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Array<any>}
     */
    optimalWorkgroupSize() {
        const ret = wasm.jsgputype_optimalWorkgroupSize(this.__wbg_ptr);
        return ret;
    }
}

const JsHeapTypeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_jsheaptype_free(ptr >>> 0, 1));

export class JsHeapType {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JsHeapType.prototype);
        obj.__wbg_ptr = ptr;
        JsHeapTypeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        JsHeapTypeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsheaptype_free(ptr, 0);
    }
    /**
     * @returns {HeapType}
     */
    get 0() {
        const ret = wasm.__wbg_get_jsheaptype_0(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {HeapType} arg0
     */
    set 0(arg0) {
        wasm.__wbg_set_jsheaptype_0(this.__wbg_ptr, arg0);
    }
    /**
     * @param {HeapType} heap_type
     */
    constructor(heap_type) {
        const ret = wasm.jsheaptype_new(heap_type);
        this.__wbg_ptr = ret >>> 0;
        JsHeapTypeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get element_size() {
        const ret = wasm.jsheaptype_element_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {HeapType}
     */
    getHeapType() {
        const ret = wasm.jsheaptype_getHeapType(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get isPrimitive() {
        const ret = wasm.jsheaptype_isPrimitive(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get isComplex() {
        const ret = wasm.jsheaptype_isComplex(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get isNumeric() {
        const ret = wasm.jsheaptype_isNumeric(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {string} type_str
     * @returns {JsHeapType}
     */
    static fromString(type_str) {
        const ptr0 = passStringToWasm0(type_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.jsheaptype_fromString(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return JsHeapType.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.jsheaptype_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {any} js_value
     * @returns {JsHeapType}
     */
    static fromJSValue(js_value) {
        const ret = wasm.jsheaptype_fromJSValue(js_value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return JsHeapType.__wrap(ret[0]);
    }
    /**
     * @returns {number}
     */
    getDefaultValue() {
        const ret = wasm.jsheaptype_getDefaultValue(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    canStoreInArray() {
        const ret = wasm.jsheaptype_canStoreInArray(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    alignment() {
        const ret = wasm.jsheaptype_alignment(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {any}
     */
    toJSValue() {
        const ret = wasm.jsheaptype_toJSValue(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} operation
     * @returns {boolean}
     */
    supportsOperation(operation) {
        const ptr0 = passStringToWasm0(operation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.jsheaptype_supportsOperation(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @returns {any}
     */
    getCapabilities() {
        const ret = wasm.jsheaptype_getCapabilities(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {JsTypeCapabilities}
     */
    getCapabilitiesObject() {
        const ret = wasm.jsheaptype_getCapabilitiesObject(this.__wbg_ptr);
        return JsTypeCapabilities.__wrap(ret);
    }
    /**
     * @param {JsTypeCapabilities} capabilities
     * @returns {boolean}
     */
    supportsAllCapabilities(capabilities) {
        _assertClass(capabilities, JsTypeCapabilities);
        const ret = wasm.jsheaptype_supportsAllCapabilities(this.__wbg_ptr, capabilities.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {JsTypeCapabilities} capabilities
     * @returns {boolean}
     */
    supportsAnyCapability(capabilities) {
        _assertClass(capabilities, JsTypeCapabilities);
        const ret = wasm.jsheaptype_supportsAnyCapability(this.__wbg_ptr, capabilities.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {JsHeapType} other
     * @returns {Array<any>}
     */
    getCompatibleOperationsWith(other) {
        _assertClass(other, JsHeapType);
        const ret = wasm.jsheaptype_getCompatibleOperationsWith(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Array<any>}
     */
    recommendedOperations() {
        const ret = wasm.jsheaptype_recommendedOperations(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {JsHeapType} other
     * @returns {boolean}
     */
    isBinaryCompatibleWith(other) {
        _assertClass(other, JsHeapType);
        const ret = wasm.jsheaptype_isBinaryCompatibleWith(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {JsHeapType} other
     * @returns {JsHeapType | undefined}
     */
    getBinaryResultType(other) {
        _assertClass(other, JsHeapType);
        const ret = wasm.jsheaptype_getBinaryResultType(this.__wbg_ptr, other.__wbg_ptr);
        return ret === 0 ? undefined : JsHeapType.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isStringType() {
        const ret = wasm.jsheaptype_isStringType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isContainerType() {
        const ret = wasm.jsheaptype_isContainerType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    requiresManagedMemory() {
        const ret = wasm.jsheaptype_requiresManagedMemory(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {string} type_str
     * @returns {JsHeapType | undefined}
     */
    static fromTypeStr(type_str) {
        const ptr0 = passStringToWasm0(type_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.jsheaptype_fromTypeStr(ptr0, len0);
        return ret === 0 ? undefined : JsHeapType.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    typeName() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.jsheaptype_typeName(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {number}
     */
    capabilityScore() {
        const ret = wasm.jsheaptype_capabilityScore(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {JsHeapType} other
     * @returns {boolean}
     */
    isMoreCapableThan(other) {
        _assertClass(other, JsHeapType);
        const ret = wasm.jsheaptype_isMoreCapableThan(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isTensorType() {
        const ret = wasm.jsheaptype_isTensorType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isMatrixType() {
        const ret = wasm.jsheaptype_isMatrixType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isVectorType() {
        const ret = wasm.jsheaptype_isVectorType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isNeuralNetworkType() {
        const ret = wasm.jsheaptype_isNeuralNetworkType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isQuantizedType() {
        const ret = wasm.jsheaptype_isQuantizedType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isSparseType() {
        const ret = wasm.jsheaptype_isSparseType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {Array<any>}
     */
    getMLOperations() {
        const ret = wasm.jsheaptype_getMLOperations(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    getPrecisionInfo() {
        const ret = wasm.jsheaptype_getPrecisionInfo(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    getRecommendedBackend() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.jsheaptype_getRecommendedBackend(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    getOptimalLayout() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.jsheaptype_getOptimalLayout(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} element_count
     * @returns {number}
     */
    estimateMemoryFootprint(element_count) {
        const ret = wasm.jsheaptype_estimateMemoryFootprint(this.__wbg_ptr, element_count);
        return ret >>> 0;
    }
}

const JsSIMDTypeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_jssimdtype_free(ptr >>> 0, 1));

export class JsSIMDType {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JsSIMDType.prototype);
        obj.__wbg_ptr = ptr;
        JsSIMDTypeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        JsSIMDTypeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jssimdtype_free(ptr, 0);
    }
    /**
     * @param {string} type_str
     */
    constructor(type_str) {
        const ptr0 = passStringToWasm0(type_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.jssimdtype_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        JsSIMDTypeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    elementCount() {
        const ret = wasm.jssimdtype_elementCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    alignment() {
        const ret = wasm.jssimdtype_alignment(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    totalSize() {
        const ret = wasm.jssimdtype_totalSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    isFloatingPoint() {
        const ret = wasm.jssimdtype_isFloatingPoint(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isInteger() {
        const ret = wasm.jssimdtype_isInteger(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isBoolean() {
        const ret = wasm.jssimdtype_isBoolean(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {Array<any>}
     */
    supportedOperations() {
        const ret = wasm.jssimdtype_supportedOperations(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {HeapType}
     */
    elementType() {
        const ret = wasm.jssimdtype_elementType(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.jssimdtype_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {any}
     */
    getInfo() {
        const ret = wasm.jssimdtype_getInfo(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} operation
     * @returns {boolean}
     */
    canPerformOperation(operation) {
        const ptr0 = passStringToWasm0(operation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.jssimdtype_canPerformOperation(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    getOptimalLaneCount() {
        const ret = wasm.jssimdtype_elementCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {JsSIMDType} other
     * @returns {boolean}
     */
    isCompatibleWith(other) {
        _assertClass(other, JsSIMDType);
        const ret = wasm.jssimdtype_isCompatibleWith(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {JsSIMDType} other
     * @returns {JsSIMDType | undefined}
     */
    getBinaryResultType(other) {
        _assertClass(other, JsSIMDType);
        const ret = wasm.jssimdtype_getBinaryResultType(this.__wbg_ptr, other.__wbg_ptr);
        return ret === 0 ? undefined : JsSIMDType.__wrap(ret);
    }
}

const JsTypeCapabilitiesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_jstypecapabilities_free(ptr >>> 0, 1));

export class JsTypeCapabilities {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JsTypeCapabilities.prototype);
        obj.__wbg_ptr = ptr;
        JsTypeCapabilitiesFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        JsTypeCapabilitiesFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jstypecapabilities_free(ptr, 0);
    }
    /**
     * @param {number} bits
     */
    constructor(bits) {
        const ret = wasm.jstypecapabilities_new(bits);
        this.__wbg_ptr = ret >>> 0;
        JsTypeCapabilitiesFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    getBits() {
        const ret = wasm.jstypecapabilities_bits(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {JsTypeCapabilities} other
     * @returns {boolean}
     */
    contains(other) {
        _assertClass(other, JsTypeCapabilities);
        const ret = wasm.jstypecapabilities_contains(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {JsTypeCapabilities} other
     * @returns {JsTypeCapabilities}
     */
    union(other) {
        _assertClass(other, JsTypeCapabilities);
        const ret = wasm.jstypecapabilities_union(this.__wbg_ptr, other.__wbg_ptr);
        return JsTypeCapabilities.__wrap(ret);
    }
    /**
     * @param {JsTypeCapabilities} other
     * @returns {JsTypeCapabilities}
     */
    intersection(other) {
        _assertClass(other, JsTypeCapabilities);
        const ret = wasm.jstypecapabilities_intersection(this.__wbg_ptr, other.__wbg_ptr);
        return JsTypeCapabilities.__wrap(ret);
    }
    /**
     * @param {JsTypeCapabilities} other
     * @returns {JsTypeCapabilities}
     */
    without(other) {
        _assertClass(other, JsTypeCapabilities);
        const ret = wasm.jstypecapabilities_without(this.__wbg_ptr, other.__wbg_ptr);
        return JsTypeCapabilities.__wrap(ret);
    }
    /**
     * @param {JsTypeCapabilities} other
     * @returns {boolean}
     */
    isSubsetOf(other) {
        _assertClass(other, JsTypeCapabilities);
        const ret = wasm.jstypecapabilities_isSubsetOf(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {JsTypeCapabilities} other
     * @returns {boolean}
     */
    isSupersetOf(other) {
        _assertClass(other, JsTypeCapabilities);
        const ret = wasm.jstypecapabilities_isSupersetOf(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {JsTypeCapabilities} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, JsTypeCapabilities);
        const ret = wasm.jstypecapabilities_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    count() {
        const ret = wasm.jstypecapabilities_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.jstypecapabilities_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    bits() {
        const ret = wasm.jstypecapabilities_bits(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Array<any>}
     */
    toNames() {
        const ret = wasm.jstypecapabilities_toNames(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {JsTypeCapabilities} other
     * @returns {boolean}
     */
    supportsAll(other) {
        _assertClass(other, JsTypeCapabilities);
        const ret = wasm.jstypecapabilities_isSupersetOf(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {JsTypeCapabilities} other
     * @returns {boolean}
     */
    supportsAny(other) {
        _assertClass(other, JsTypeCapabilities);
        const ret = wasm.jstypecapabilities_contains(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}

const SchemaFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_schema_free(ptr >>> 0, 1));

export class Schema {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Schema.prototype);
        obj.__wbg_ptr = ptr;
        SchemaFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SchemaFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_schema_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.schema_new();
        this.__wbg_ptr = ret >>> 0;
        SchemaFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} field
     * @param {string} type_str
     */
    addField(field, type_str) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(type_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.schema_addField(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} field
     * @param {string} element_type
     */
    addArrayField(field, element_type) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(element_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.schema_addArrayField(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} field
     * @param {Schema} schema
     */
    addNestedArrayField(field, schema) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(schema, Schema);
        var ptr1 = schema.__destroy_into_raw();
        wasm.schema_addNestedArrayField(this.__wbg_ptr, ptr0, len0, ptr1);
    }
    /**
     * @param {string} field
     * @param {Schema} schema
     */
    addNestedField(field, schema) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(schema, Schema);
        var ptr1 = schema.__destroy_into_raw();
        wasm.schema_addNestedField(this.__wbg_ptr, ptr0, len0, ptr1);
    }
    /**
     * @param {string} field
     * @param {number} dimensions
     */
    addTensorField(field, dimensions) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.schema_addTensorField(this.__wbg_ptr, ptr0, len0, dimensions);
    }
    /**
     * @param {string} field
     * @param {number} rows
     * @param {number} cols
     */
    addMatrixField(field, rows, cols) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.schema_addMatrixField(this.__wbg_ptr, ptr0, len0, rows, cols);
    }
    /**
     * @param {string} field
     * @param {number} length
     */
    addVectorField(field, length) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.schema_addVectorField(this.__wbg_ptr, ptr0, len0, length);
    }
    /**
     * @param {string} field
     */
    addSparseMatrixField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.schema_addSparseMatrixField(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} field
     * @param {string} precision
     */
    addQuantizedField(field, precision) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(precision, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.schema_addQuantizedField(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} field
     * @param {string} gpu_type
     */
    addGPUField(field, gpu_type) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(gpu_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.schema_addGPUField(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} field
     * @param {string} simd_type
     */
    addSIMDField(field, simd_type) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(simd_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.schema_addSIMDField(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} key
     * @param {string} value
     */
    addMetadata(key, value) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.schema_addMetadata(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} key
     * @returns {string | undefined}
     */
    getMetadata(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_getMetadata(this.__wbg_ptr, ptr0, len0);
        let v2;
        if (ret[0] !== 0) {
            v2 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v2;
    }
    /**
     * @param {string} field
     * @returns {string | undefined}
     */
    getFieldType(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_getFieldType(this.__wbg_ptr, ptr0, len0);
        let v2;
        if (ret[0] !== 0) {
            v2 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v2;
    }
    /**
     * @param {string} field
     * @returns {any}
     */
    getFieldTypeInfo(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_getFieldTypeInfo(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string} field
     * @returns {Schema | undefined}
     */
    getNestedSchema(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_getNestedSchema(this.__wbg_ptr, ptr0, len0);
        return ret === 0 ? undefined : Schema.__wrap(ret);
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    hasField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_hasField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isNestedField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_isNestedField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isArrayField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_isArrayField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isTensorField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_isTensorField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isMatrixField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_isMatrixField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isVectorField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_isVectorField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isGPUField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_isGPUField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isSIMDField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schema_isSIMDField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @returns {any[]}
     */
    fieldNames() {
        const ret = wasm.schema_fieldNames(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    fieldCount() {
        const ret = wasm.schema_fieldCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {any}
     */
    toJS() {
        const ret = wasm.schema_toJS(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {object} js_obj
     * @returns {Schema}
     */
    static fromJSObject(js_obj) {
        const ret = wasm.schema_fromJSObject(js_obj);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Schema.__wrap(ret[0]);
    }
    /**
     * @param {number} sample_size
     * @returns {number}
     */
    estimateMemoryUsage(sample_size) {
        const ret = wasm.schema_estimateMemoryUsage(this.__wbg_ptr, sample_size);
        return ret;
    }
    /**
     * @returns {any}
     */
    getOptimizationHints() {
        const ret = wasm.schema_getOptimizationHints(this.__wbg_ptr);
        return ret;
    }
}

const StrictArrayFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictarray_free(ptr >>> 0, 1));

export class StrictArray {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(StrictArray.prototype);
        obj.__wbg_ptr = ptr;
        StrictArrayFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictArrayFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictarray_free(ptr, 0);
    }
    /**
     * @param {HeapType} heap
     * @param {number} len
     */
    constructor(heap, len) {
        const ret = wasm.strictarray_new(heap, len);
        this.__wbg_ptr = ret >>> 0;
        StrictArrayFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get len() {
        const ret = wasm.strictarray_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {HeapType}
     */
    get heap() {
        const ret = wasm.strictarray_heap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get capacity() {
        const ret = wasm.strictarray_byte_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get byte_len() {
        const ret = wasm.strictarray_byte_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get element_size() {
        const ret = wasm.strictarray_element_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    isTensorType() {
        const ret = wasm.strictarray_isTensorType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isMatrixType() {
        const ret = wasm.strictarray_isMatrixType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isVectorType() {
        const ret = wasm.strictarray_isVectorType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isQuantizedType() {
        const ret = wasm.strictarray_isQuantizedType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isSparseType() {
        const ret = wasm.strictarray_isSparseType(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {string}
     */
    getRecommendedBackend() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.strictarray_getRecommendedBackend(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    getOptimalLayout() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.strictarray_getOptimalLayout(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {number}
     */
    estimateMemoryFootprint() {
        const ret = wasm.strictarray_estimateMemoryFootprint(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Array<any>}
     */
    getMLOperations() {
        const ret = wasm.strictarray_getMLOperations(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} operation
     * @returns {boolean}
     */
    canPerformOperation(operation) {
        const ptr0 = passStringToWasm0(operation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictarray_canPerformOperation(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {number} index
     * @returns {any}
     */
    getValue(index) {
        const ret = wasm.strictarray_getValue(this.__wbg_ptr, index);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {number} index
     * @param {any} value
     */
    setValue(index, value) {
        const ret = wasm.strictarray_setValue(this.__wbg_ptr, index, value);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {ArrayBuffer}
     */
    copyToArrayBuffer() {
        const ret = wasm.strictarray_copyToArrayBuffer(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {ArrayBuffer} array_buffer
     */
    copyFromArrayBuffer(array_buffer) {
        const ret = wasm.strictarray_copyFromArrayBuffer(this.__wbg_ptr, array_buffer);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {Uint8Array}
     */
    toUint8Array() {
        const ret = wasm.strictarray_toUint8Array(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {HeapType} heap
     * @param {Uint8Array} array
     * @returns {StrictArray}
     */
    static fromUint8Array(heap, array) {
        const ret = wasm.strictarray_fromUint8Array(heap, array);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @param {any} js_function
     * @returns {StrictArray}
     */
    map(js_function) {
        const ret = wasm.strictarray_map(this.__wbg_ptr, js_function);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @param {any} js_function
     */
    forEach(js_function) {
        const ret = wasm.strictarray_forEach(this.__wbg_ptr, js_function);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {any} js_function
     * @param {any} initial_value
     * @returns {any}
     */
    reduce(js_function, initial_value) {
        const ret = wasm.strictarray_reduce(this.__wbg_ptr, js_function, initial_value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {number} start
     * @param {Array<any>} values
     */
    setRange(start, values) {
        const ret = wasm.strictarray_setRange(this.__wbg_ptr, start, values);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} start
     * @param {number} count
     * @returns {Array<any>}
     */
    getRange(start, count) {
        const ret = wasm.strictarray_getRange(this.__wbg_ptr, start, count);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {any} value
     */
    fill(value) {
        const ret = wasm.strictarray_fill(this.__wbg_ptr, value);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} new_len
     */
    resize(new_len) {
        const ret = wasm.strictarray_resize(this.__wbg_ptr, new_len);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    clear() {
        const ret = wasm.strictarray_clear(this.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {StrictArray}
     */
    clone() {
        const ret = wasm.strictarray_clone(this.__wbg_ptr);
        return StrictArray.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.strictarray_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {Float32Array}
     */
    toFloat32Array() {
        const ret = wasm.strictarray_toFloat32Array(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {Float64Array}
     */
    toFloat64Array() {
        const ret = wasm.strictarray_toFloat64Array(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {HeapType} heap
     * @param {Float32Array} array
     * @returns {StrictArray}
     */
    static fromFloat32Array(heap, array) {
        const ret = wasm.strictarray_fromFloat32Array(heap, array);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @param {HeapType} heap
     * @param {Float64Array} array
     * @returns {StrictArray}
     */
    static fromFloat64Array(heap, array) {
        const ret = wasm.strictarray_fromFloat64Array(heap, array);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @returns {number}
     */
    sum() {
        const ret = wasm.strictarray_sum(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {number}
     */
    average() {
        const ret = wasm.strictarray_average(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {number}
     */
    min() {
        const ret = wasm.strictarray_min(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {number}
     */
    max() {
        const ret = wasm.strictarray_max(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    normalize() {
        const ret = wasm.strictarray_normalize(this.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {StrictArray} other
     * @returns {number}
     */
    dotProduct(other) {
        _assertClass(other, StrictArray);
        const ret = wasm.strictarray_dotProduct(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @param {StrictArray} kernel
     * @returns {StrictArray}
     */
    convolution(kernel) {
        _assertClass(kernel, StrictArray);
        const ret = wasm.strictarray_convolution(this.__wbg_ptr, kernel.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @param {string} activation_type
     */
    activation(activation_type) {
        const ptr0 = passStringToWasm0(activation_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictarray_activation(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} epsilon
     */
    batchNormalization(epsilon) {
        const ret = wasm.strictarray_batchNormalization(this.__wbg_ptr, epsilon);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {number}
     */
    variance() {
        const ret = wasm.strictarray_variance(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {number}
     */
    standardDeviation() {
        const ret = wasm.strictarray_standardDeviation(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @param {Uint32Array} new_shape
     * @returns {StrictArray}
     */
    reshape(new_shape) {
        const ptr0 = passArray32ToWasm0(new_shape, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictarray_reshape(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @param {number} rows
     * @param {number} cols
     * @returns {StrictArray}
     */
    transpose(rows, cols) {
        const ret = wasm.strictarray_transpose(this.__wbg_ptr, rows, cols);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @param {StrictArray} other
     * @param {number} a_rows
     * @param {number} a_cols
     * @param {number} b_cols
     * @returns {StrictArray}
     */
    matrixMultiply(other, a_rows, a_cols, b_cols) {
        _assertClass(other, StrictArray);
        const ret = wasm.strictarray_matrixMultiply(this.__wbg_ptr, other.__wbg_ptr, a_rows, a_cols, b_cols);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @param {number} bits
     * @returns {StrictArray}
     */
    quantize(bits) {
        const ret = wasm.strictarray_quantize(this.__wbg_ptr, bits);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @param {number} original_min
     * @param {number} original_max
     * @returns {StrictArray}
     */
    dequantize(original_min, original_max) {
        const ret = wasm.strictarray_dequantize(this.__wbg_ptr, original_min, original_max);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
    /**
     * @param {Array<any>} values
     */
    setValuesBatch(values) {
        const ret = wasm.strictarray_setValuesBatch(this.__wbg_ptr, values);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {Uint32Array} indices
     * @returns {Array<any>}
     */
    getValuesBatch(indices) {
        const ptr0 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictarray_getValuesBatch(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {number} start
     * @param {number} stride
     * @param {any} js_function
     */
    applyStrided(start, stride, js_function) {
        const ret = wasm.strictarray_applyStrided(this.__wbg_ptr, start, stride, js_function);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {any}
     */
    getMemoryInfo() {
        const ret = wasm.strictarray_getMemoryInfo(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    getCapabilities() {
        const ret = wasm.strictarray_getCapabilities(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {StrictArray} other
     * @returns {boolean}
     */
    isCompatibleWith(other) {
        _assertClass(other, StrictArray);
        const ret = wasm.strictarray_isCompatibleWith(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {StrictArray} other
     * @returns {HeapType | undefined}
     */
    getBinaryResultType(other) {
        _assertClass(other, StrictArray);
        const ret = wasm.strictarray_getBinaryResultType(this.__wbg_ptr, other.__wbg_ptr);
        return ret === 48 ? undefined : ret;
    }
    /**
     * @returns {any}
     */
    toJSON() {
        const ret = wasm.strictarray_toJSON(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {any} json
     * @returns {StrictArray}
     */
    static fromJSON(json) {
        const ret = wasm.strictarray_fromJSON(json);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictArray.__wrap(ret[0]);
    }
}

const StrictAsyncFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictasync_free(ptr >>> 0, 1));

export class StrictAsync {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictAsyncFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictasync_free(ptr, 0);
    }
    /**
     * @param {number} max_concurrent
     */
    constructor(max_concurrent) {
        const ret = wasm.strictasync_new(max_concurrent);
        this.__wbg_ptr = ret >>> 0;
        StrictAsyncFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Promise<any>} promise
     * @param {Function | null | undefined} callback
     * @param {Function | null | undefined} error_handler
     * @param {HeapType} return_type
     * @returns {number}
     */
    addTask(promise, callback, error_handler, return_type) {
        const ret = wasm.strictasync_addTask(this.__wbg_ptr, promise, isLikeNone(callback) ? 0 : addToExternrefTable0(callback), isLikeNone(error_handler) ? 0 : addToExternrefTable0(error_handler), return_type);
        return ret >>> 0;
    }
    /**
     * @param {Promise<any>} promise
     * @param {Function | null | undefined} callback
     * @param {Function | null | undefined} error_handler
     * @param {HeapType} return_type
     * @param {TaskPriority} priority
     * @returns {number}
     */
    addTaskWithPriority(promise, callback, error_handler, return_type, priority) {
        const ret = wasm.strictasync_addTaskWithPriority(this.__wbg_ptr, promise, isLikeNone(callback) ? 0 : addToExternrefTable0(callback), isLikeNone(error_handler) ? 0 : addToExternrefTable0(error_handler), return_type, priority);
        return ret >>> 0;
    }
    /**
     * @returns {Promise<any>}
     */
    runTasks() {
        const ret = wasm.strictasync_runTasks(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    getQueueSize() {
        const ret = wasm.strictasync_getQueueSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    getRunningTasks() {
        const ret = wasm.strictasync_getRunningTasks(this.__wbg_ptr);
        return ret >>> 0;
    }
    clearQueue() {
        wasm.strictasync_clearQueue(this.__wbg_ptr);
    }
    /**
     * @param {number} task_id
     * @returns {boolean}
     */
    cancelTask(task_id) {
        const ret = wasm.strictasync_cancelTask(this.__wbg_ptr, task_id);
        return ret !== 0;
    }
    /**
     * @param {number} max
     */
    setMaxConcurrent(max) {
        wasm.strictasync_setMaxConcurrent(this.__wbg_ptr, max);
    }
    /**
     * @returns {string | undefined}
     */
    getLastError() {
        const ret = wasm.strictasync_getLastError(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    cleanup() {
        wasm.strictasync_cleanup(this.__wbg_ptr);
    }
    /**
     * @returns {number}
     */
    getNextTaskId() {
        const ret = wasm.strictasync_getNextTaskId(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const StrictBigIntFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictbigint_free(ptr >>> 0, 1));

export class StrictBigInt {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictBigIntFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictbigint_free(ptr, 0);
    }
    /**
     * @param {any} value
     * @param {HeapType} heap
     */
    constructor(value, heap) {
        const ret = wasm.strictbigint_new(value, heap);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        StrictBigIntFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    get() {
        const ret = wasm.strictbigint_get(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} value
     */
    set(value) {
        const ret = wasm.strictbigint_set(this.__wbg_ptr, value);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {any} delta
     */
    add(delta) {
        const ret = wasm.strictbigint_add(this.__wbg_ptr, delta);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
}

const StrictBooleanFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictboolean_free(ptr >>> 0, 1));

export class StrictBoolean {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictBooleanFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictboolean_free(ptr, 0);
    }
    /**
     * @param {boolean} value
     */
    constructor(value) {
        const ret = wasm.strictboolean_new(value);
        this.__wbg_ptr = ret >>> 0;
        StrictBooleanFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {boolean}
     */
    get() {
        const ret = wasm.strictboolean_get(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} value
     */
    set(value) {
        wasm.strictboolean_set(this.__wbg_ptr, value);
    }
    toggle() {
        wasm.strictboolean_toggle(this.__wbg_ptr);
    }
    /**
     * @param {boolean} other
     * @returns {boolean}
     */
    and(other) {
        const ret = wasm.strictboolean_and(this.__wbg_ptr, other);
        return ret !== 0;
    }
    /**
     * @param {boolean} other
     * @returns {boolean}
     */
    or(other) {
        const ret = wasm.strictboolean_or(this.__wbg_ptr, other);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    not() {
        const ret = wasm.strictboolean_not(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.strictboolean_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const StrictForLoopFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictforloop_free(ptr >>> 0, 1));

export class StrictForLoop {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(StrictForLoop.prototype);
        obj.__wbg_ptr = ptr;
        StrictForLoopFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictForLoopFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictforloop_free(ptr, 0);
    }
    /**
     * @param {number} start
     * @param {number} end
     * @param {number} step
     * @param {HeapType} heap_type
     * @param {number} max_iterations
     */
    constructor(start, end, step, heap_type, max_iterations) {
        const ret = wasm.strictforloop_new(start, end, step, heap_type, max_iterations);
        this.__wbg_ptr = ret >>> 0;
        StrictForLoopFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} start
     * @param {number} end
     * @param {number} step
     * @param {HeapType} heap_type
     * @param {number} max_iterations
     * @param {OptimizationMode} optimization_mode
     * @returns {StrictForLoop}
     */
    static newWithOptimization(start, end, step, heap_type, max_iterations, optimization_mode) {
        const ret = wasm.strictforloop_newWithOptimization(start, end, step, heap_type, max_iterations, optimization_mode);
        return StrictForLoop.__wrap(ret);
    }
    /**
     * @param {Array<any>} data
     * @param {HeapType} heap_type
     * @param {number} max_iterations
     * @returns {StrictForLoop}
     */
    static newForArray(data, heap_type, max_iterations) {
        const ret = wasm.strictforloop_newForArray(data, heap_type, max_iterations);
        return StrictForLoop.__wrap(ret);
    }
    /**
     * @param {Array<any>} data
     * @param {HeapType} heap_type
     * @param {number} max_iterations
     * @param {OptimizationMode} optimization_mode
     * @returns {StrictForLoop}
     */
    static newForArrayWithOptimization(data, heap_type, max_iterations, optimization_mode) {
        const ret = wasm.strictforloop_newForArrayWithOptimization(data, heap_type, max_iterations, optimization_mode);
        return StrictForLoop.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    hasNext() {
        const ret = wasm.strictforloop_hasNext(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {any}
     */
    next() {
        const ret = wasm.strictforloop_next(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {number}
     */
    nextValue() {
        const ret = wasm.strictforloop_nextValue(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {Array<any>}
     */
    nextBatch() {
        const ret = wasm.strictforloop_nextBatch(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {Array<any>}
     */
    nextNumericBatch() {
        const ret = wasm.strictforloop_nextNumericBatch(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {any}
     */
    nextGPUBatch() {
        const ret = wasm.strictforloop_nextGPUBatch(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {Array<any>}
     */
    nextSIMDBatch() {
        const ret = wasm.strictforloop_nextSIMDBatch(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Function} callback
     * @returns {number}
     */
    forEach(callback) {
        const ret = wasm.strictforloop_forEach(this.__wbg_ptr, callback);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     * @returns {number}
     */
    forEachValue(callback) {
        const ret = wasm.strictforloop_forEachValue(this.__wbg_ptr, callback);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     * @returns {number}
     */
    forEachBatch(callback) {
        const ret = wasm.strictforloop_forEachBatch(this.__wbg_ptr, callback);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     * @returns {number}
     */
    forEachNumericBatch(callback) {
        const ret = wasm.strictforloop_forEachNumericBatch(this.__wbg_ptr, callback);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     * @returns {number}
     */
    forEachTensorBatch(callback) {
        const ret = wasm.strictforloop_forEachTensorBatch(this.__wbg_ptr, callback);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     * @param {number} row_size
     * @returns {number}
     */
    forEachMatrixRow(callback, row_size) {
        const ret = wasm.strictforloop_forEachMatrixRow(this.__wbg_ptr, callback, row_size);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     * @returns {number}
     */
    forEachObject(callback) {
        const ret = wasm.strictforloop_forEachObject(this.__wbg_ptr, callback);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     */
    setProgressCallback(callback) {
        wasm.strictforloop_setProgressCallback(this.__wbg_ptr, callback);
    }
    /**
     * @returns {number}
     */
    getIterationCount() {
        const ret = wasm.strictforloop_getIterationCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    reset() {
        wasm.strictforloop_reset(this.__wbg_ptr);
    }
    /**
     * @returns {any}
     */
    getCurrent() {
        const ret = wasm.strictforloop_getCurrent(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    getCurrentValue() {
        const ret = wasm.strictforloop_getCurrentValue(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {number}
     */
    getProgress() {
        const ret = wasm.strictforloop_getProgress(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    getStep() {
        const ret = wasm.strictforloop_getStep(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {number}
     */
    getEnd() {
        const ret = wasm.strictforloop_getEnd(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {HeapType}
     */
    getHeapType() {
        const ret = wasm.strictforloop_getHeapType(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {OptimizationMode}
     */
    getOptimizationMode() {
        const ret = wasm.strictforloop_getOptimizationMode(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    getBatchSize() {
        const ret = wasm.strictforloop_getBatchSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {JsGPUType | undefined}
     */
    getGPUType() {
        const ret = wasm.strictforloop_getGPUType(this.__wbg_ptr);
        return ret === 0 ? undefined : JsGPUType.__wrap(ret);
    }
    /**
     * @returns {JsSIMDType | undefined}
     */
    getSIMDType() {
        const ret = wasm.strictforloop_getSIMDType(this.__wbg_ptr);
        return ret === 0 ? undefined : JsSIMDType.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isArrayIteration() {
        const ret = wasm.strictforloop_isArrayIteration(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    getArrayLength() {
        const ret = wasm.strictforloop_getArrayLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
}

const StrictFunctionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictfunction_free(ptr >>> 0, 1));

export class StrictFunction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(StrictFunction.prototype);
        obj.__wbg_ptr = ptr;
        StrictFunctionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictFunctionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictfunction_free(ptr, 0);
    }
    /**
     * @param {Function} js_function
     * @param {any} arg_types
     * @param {HeapType} return_type
     */
    constructor(js_function, arg_types, return_type) {
        const ret = wasm.strictfunction_new(js_function, arg_types, return_type);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        StrictFunctionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Function} js_function
     * @param {any} arg_types
     * @param {HeapType} return_type
     * @param {JsTypeCapabilities} required_capabilities
     * @returns {StrictFunction}
     */
    static createWithCapabilities(js_function, arg_types, return_type, required_capabilities) {
        _assertClass(required_capabilities, JsTypeCapabilities);
        var ptr0 = required_capabilities.__destroy_into_raw();
        const ret = wasm.strictfunction_createWithCapabilities(js_function, arg_types, return_type, ptr0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictFunction.__wrap(ret[0]);
    }
    /**
     * @param {any} args
     * @param {any} context
     * @returns {StrictFunctionResult}
     */
    callComplex(args, context) {
        const ret = wasm.strictfunction_callComplex(this.__wbg_ptr, args, context);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictFunctionResult.__wrap(ret[0]);
    }
    /**
     * @param {any} args
     */
    validateArguments(args) {
        const ret = wasm.strictfunction_validateArguments(this.__wbg_ptr, args);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {any} args
     * @returns {number}
     */
    call(args) {
        const ret = wasm.strictfunction_call(this.__wbg_ptr, args);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @param {string} operation
     * @returns {boolean}
     */
    supportsOperation(operation) {
        const ptr0 = passStringToWasm0(operation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictfunction_supportsOperation(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @returns {JsTypeCapabilities}
     */
    getCapabilities() {
        const ret = wasm.strictfunction_getCapabilities(this.__wbg_ptr);
        return JsTypeCapabilities.__wrap(ret);
    }
    /**
     * @returns {Array<any>}
     */
    getCompatibleOperations() {
        const ret = wasm.strictfunction_getCompatibleOperations(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} args
     * @returns {JsHeapType}
     */
    inferResultType(args) {
        const ret = wasm.strictfunction_inferResultType(this.__wbg_ptr, args);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return JsHeapType.__wrap(ret[0]);
    }
    /**
     * @param {any} args_batch
     * @returns {Array<any>}
     */
    processArgumentsBatch(args_batch) {
        const ret = wasm.strictfunction_processArgumentsBatch(this.__wbg_ptr, args_batch);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {any} args
     * @returns {any}
     */
    getTypeCompatibility(args) {
        const ret = wasm.strictfunction_getTypeCompatibility(this.__wbg_ptr, args);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {StrictFunction} next_function
     * @returns {StrictFunction}
     */
    chain(next_function) {
        _assertClass(next_function, StrictFunction);
        const ret = wasm.strictfunction_chain(this.__wbg_ptr, next_function.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictFunction.__wrap(ret[0]);
    }
    /**
     * @returns {any}
     */
    getArgTypes() {
        const ret = wasm.strictfunction_getArgTypes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    getReturnType() {
        const ret = wasm.strictfunction_getReturnType(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Function}
     */
    getFunction() {
        const ret = wasm.strictfunction_getFunction(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    getArgCount() {
        const ret = wasm.strictfunction_getArgCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    clearCache() {
        wasm.strictfunction_clearCache(this.__wbg_ptr);
    }
    /**
     * @returns {number}
     */
    getCacheSize() {
        const ret = wasm.strictfunction_getCacheSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {any} common_args
     * @returns {StrictFunction}
     */
    optimizeForArgs(common_args) {
        const ret = wasm.strictfunction_optimizeForArgs(this.__wbg_ptr, common_args);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictFunction.__wrap(ret[0]);
    }
}

const StrictFunctionResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictfunctionresult_free(ptr >>> 0, 1));

export class StrictFunctionResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(StrictFunctionResult.prototype);
        obj.__wbg_ptr = ptr;
        StrictFunctionResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictFunctionResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictfunctionresult_free(ptr, 0);
    }
    /**
     * @returns {any}
     */
    get value() {
        const ret = wasm.strictfunctionresult_value(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    get result_type() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.strictfunctionresult_result_type(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {JsTypeCapabilities}
     */
    get capabilities() {
        const ret = wasm.strictfunctionresult_capabilities(this.__wbg_ptr);
        return JsTypeCapabilities.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    toNumber() {
        const ret = wasm.strictfunctionresult_toNumber(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @returns {boolean | undefined}
     */
    toBoolean() {
        const ret = wasm.strictfunctionresult_toBoolean(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    toString() {
        const ret = wasm.strictfunctionresult_toString(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {object | undefined}
     */
    toObject() {
        const ret = wasm.strictfunctionresult_toObject(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} operation
     * @returns {boolean}
     */
    supportsOperation(operation) {
        const ptr0 = passStringToWasm0(operation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictfunctionresult_supportsOperation(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @returns {Array<any>}
     */
    getRecommendedOperations() {
        const ret = wasm.strictfunctionresult_getRecommendedOperations(this.__wbg_ptr);
        return ret;
    }
}

const StrictNumberFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictnumber_free(ptr >>> 0, 1));

export class StrictNumber {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictNumberFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictnumber_free(ptr, 0);
    }
    /**
     * @param {number} val
     * @param {HeapType} heap
     */
    constructor(val, heap) {
        const ret = wasm.strictnumber_new(val, heap);
        this.__wbg_ptr = ret >>> 0;
        StrictNumberFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {HeapType}
     */
    heap() {
        const ret = wasm.strictnumber_heap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get() {
        const ret = wasm.strictnumber_get(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} val
     */
    set(val) {
        wasm.strictnumber_set(this.__wbg_ptr, val);
    }
    /**
     * @param {number} delta
     */
    add(delta) {
        wasm.strictnumber_add(this.__wbg_ptr, delta);
    }
    /**
     * @param {number} delta
     */
    sub(delta) {
        wasm.strictnumber_sub(this.__wbg_ptr, delta);
    }
    /**
     * @param {number} factor
     */
    mul(factor) {
        wasm.strictnumber_mul(this.__wbg_ptr, factor);
    }
    /**
     * @param {number} divisor
     */
    div(divisor) {
        wasm.strictnumber_div(this.__wbg_ptr, divisor);
    }
    /**
     * @returns {number}
     */
    valueOf() {
        const ret = wasm.strictnumber_get(this.__wbg_ptr);
        return ret;
    }
}

const StrictObjectFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictobject_free(ptr >>> 0, 1));

export class StrictObject {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(StrictObject.prototype);
        obj.__wbg_ptr = ptr;
        StrictObjectFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictObjectFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictobject_free(ptr, 0);
    }
    /**
     * @param {any} schema
     */
    constructor(schema) {
        const ret = wasm.strictobject_new(schema);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        StrictObjectFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} field
     * @param {any} value
     */
    setField(field, value) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_setField(this.__wbg_ptr, ptr0, len0, value);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {any} schema
     * @param {any} initial_data
     * @returns {StrictObject}
     */
    static newWithData(schema, initial_data) {
        const ret = wasm.strictobject_newWithData(schema, initial_data);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictObject.__wrap(ret[0]);
    }
    /**
     * @param {string} field
     * @returns {any}
     */
    getField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getField(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {string} field
     * @returns {Array<any>}
     */
    getArrayField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getArrayField(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {string} field
     * @param {number} index
     * @returns {any}
     */
    getArrayElement(field, index) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getArrayElement(this.__wbg_ptr, ptr0, len0, index);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {string} field
     * @param {any} value
     */
    pushToArray(field, value) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_pushToArray(this.__wbg_ptr, ptr0, len0, value);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} field
     * @returns {string}
     */
    getFieldAsString(field) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.strictobject_getFieldAsString(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string} field
     * @returns {number}
     */
    getFieldAsNumber(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getFieldAsNumber(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    getFieldAsBoolean(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getFieldAsBoolean(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * @param {string} field
     * @returns {StrictObject}
     */
    getNestedObject(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getNestedObject(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictObject.__wrap(ret[0]);
    }
    /**
     * @returns {any}
     */
    getSchema() {
        const ret = wasm.strictobject_getSchema(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    toJS() {
        const ret = wasm.strictobject_toJS(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any[]}
     */
    fieldNames() {
        const ret = wasm.strictobject_fieldNames(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isNestedField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_isNestedField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isArrayField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_isArrayField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {number}
     */
    arrayLength(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_arrayLength(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isTensorField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_isTensorField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isMatrixField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_isMatrixField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isVectorField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_isVectorField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isGPUField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_isGPUField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {boolean}
     */
    isSIMDField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_isSIMDField(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} field
     * @returns {any}
     */
    getTensorField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getTensorField(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {string} field
     * @returns {any}
     */
    getMatrixField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getMatrixField(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {string} field
     * @returns {any}
     */
    getVectorField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getVectorField(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {string} field
     * @returns {any}
     */
    getGPUField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getGPUField(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {string} field
     * @returns {any}
     */
    getSIMDField(field) {
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictobject_getSIMDField(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
}

const StrictPromiseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictpromise_free(ptr >>> 0, 1));

export class StrictPromise {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(StrictPromise.prototype);
        obj.__wbg_ptr = ptr;
        StrictPromiseFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictPromiseFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictpromise_free(ptr, 0);
    }
    /**
     * @param {Function} executor
     * @param {HeapType} return_type
     */
    constructor(executor, return_type) {
        const ret = wasm.strictpromise_new(executor, return_type);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        StrictPromiseFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Promise<any>}
     */
    awaitValue() {
        const ret = wasm.strictpromise_awaitValue(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Function} on_fulfilled
     * @returns {StrictPromise}
     */
    then(on_fulfilled) {
        const ret = wasm.strictpromise_then(this.__wbg_ptr, on_fulfilled);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictPromise.__wrap(ret[0]);
    }
    /**
     * @param {Function} on_rejected
     * @returns {StrictPromise}
     */
    catch(on_rejected) {
        const ret = wasm.strictpromise_catch(this.__wbg_ptr, on_rejected);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictPromise.__wrap(ret[0]);
    }
    cleanup() {
        wasm.strictpromise_cleanup(this.__wbg_ptr);
    }
}

const StrictStringFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictstring_free(ptr >>> 0, 1));

export class StrictString {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(StrictString.prototype);
        obj.__wbg_ptr = ptr;
        StrictStringFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictStringFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictstring_free(ptr, 0);
    }
    /**
     * @param {string} val
     * @param {number} max_chars
     */
    constructor(val, max_chars) {
        const ptr0 = passStringToWasm0(val, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_new(ptr0, len0, max_chars);
        this.__wbg_ptr = ret >>> 0;
        StrictStringFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} val
     * @param {number} max_chars
     * @param {StringEncoding} encoding
     * @returns {StrictString}
     */
    static newWithEncoding(val, max_chars, encoding) {
        const ptr0 = passStringToWasm0(val, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_newWithEncoding(ptr0, len0, max_chars, encoding);
        return StrictString.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    get() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.strictstring_get(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {Uint8Array}
     */
    getBytes() {
        const ret = wasm.strictstring_getBytes(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint16Array}
     */
    getBytes16() {
        const ret = wasm.strictstring_getBytes16(this.__wbg_ptr);
        var v1 = getArrayU16FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 2, 2);
        return v1;
    }
    /**
     * @param {string} val
     */
    set(val) {
        const ptr0 = passStringToWasm0(val, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_set(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} extra
     */
    push(extra) {
        const ptr0 = passStringToWasm0(extra, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_push(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} c
     */
    pushChar(c) {
        const char0 = c.codePointAt(0);
        _assertChar(char0);
        const ret = wasm.strictstring_pushChar(this.__wbg_ptr, char0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {string | undefined}
     */
    popChar() {
        const ret = wasm.strictstring_popChar(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : String.fromCodePoint(ret);
    }
    /**
     * @returns {number}
     */
    len_chars() {
        const ret = wasm.strictstring_len_chars(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    lenBytes() {
        const ret = wasm.strictstring_lenBytes(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    lenBytes16() {
        const ret = wasm.strictstring_lenBytes16(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    max_chars() {
        const ret = wasm.strictstring_max_chars(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {StringEncoding}
     */
    getEncoding() {
        const ret = wasm.strictstring_getEncoding(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {StringEncoding} encoding
     */
    setEncoding(encoding) {
        const ret = wasm.strictstring_setEncoding(this.__wbg_ptr, encoding);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} start
     * @param {number} end
     * @returns {StrictString}
     */
    substring(start, end) {
        const ret = wasm.strictstring_substring(this.__wbg_ptr, start, end);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictString.__wrap(ret[0]);
    }
    /**
     * @param {number} index
     * @returns {string | undefined}
     */
    charAt(index) {
        const ret = wasm.strictstring_charAt(this.__wbg_ptr, index);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string} search
     * @returns {number}
     */
    indexOf(search) {
        const ptr0 = passStringToWasm0(search, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_indexOf(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string} search
     * @returns {number}
     */
    lastIndexOf(search) {
        const ptr0 = passStringToWasm0(search, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_lastIndexOf(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string} prefix
     * @returns {boolean}
     */
    startsWith(prefix) {
        const ptr0 = passStringToWasm0(prefix, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_startsWith(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} suffix
     * @returns {boolean}
     */
    endsWith(suffix) {
        const ptr0 = passStringToWasm0(suffix, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_endsWith(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} search
     * @returns {boolean}
     */
    contains(search) {
        const ptr0 = passStringToWasm0(search, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_contains(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} old
     * @param {string} _new
     */
    replace(old, _new) {
        const ptr0 = passStringToWasm0(old, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(_new, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_replace(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    toLowerCase() {
        wasm.strictstring_toLowerCase(this.__wbg_ptr);
    }
    toUpperCase() {
        wasm.strictstring_toUpperCase(this.__wbg_ptr);
    }
    trim() {
        wasm.strictstring_trim(this.__wbg_ptr);
    }
    trimStart() {
        wasm.strictstring_trimStart(this.__wbg_ptr);
    }
    trimEnd() {
        wasm.strictstring_trimEnd(this.__wbg_ptr);
    }
    /**
     * @param {number} target_length
     * @param {string} pad_char
     */
    padStart(target_length, pad_char) {
        const ptr0 = passStringToWasm0(pad_char, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_padStart(this.__wbg_ptr, target_length, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} target_length
     * @param {string} pad_char
     */
    padEnd(target_length, pad_char) {
        const ptr0 = passStringToWasm0(pad_char, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_padEnd(this.__wbg_ptr, target_length, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} delimiter
     * @returns {Array<any>}
     */
    split(delimiter) {
        const ptr0 = passStringToWasm0(delimiter, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictstring_split(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {any} js_function
     * @returns {StrictString}
     */
    map(js_function) {
        const ret = wasm.strictstring_map(this.__wbg_ptr, js_function);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictString.__wrap(ret[0]);
    }
    /**
     * @param {any} js_function
     * @returns {StrictString}
     */
    filter(js_function) {
        const ret = wasm.strictstring_filter(this.__wbg_ptr, js_function);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return StrictString.__wrap(ret[0]);
    }
}

const StrictTimeoutFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_stricttimeout_free(ptr >>> 0, 1));

export class StrictTimeout {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictTimeoutFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_stricttimeout_free(ptr, 0);
    }
    /**
     * @param {number} duration
     * @param {Function} callback
     * @param {HeapType} return_type
     */
    constructor(duration, callback, return_type) {
        const ret = wasm.stricttimeout_new(duration, callback, return_type);
        this.__wbg_ptr = ret >>> 0;
        StrictTimeoutFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Promise<any>}
     */
    start() {
        const ret = wasm.stricttimeout_start(this.__wbg_ptr);
        return ret;
    }
    cancel() {
        wasm.stricttimeout_cancel(this.__wbg_ptr);
    }
}

const StrictWhileLoopFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictwhileloop_free(ptr >>> 0, 1));

export class StrictWhileLoop {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(StrictWhileLoop.prototype);
        obj.__wbg_ptr = ptr;
        StrictWhileLoopFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrictWhileLoopFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strictwhileloop_free(ptr, 0);
    }
    /**
     * @param {Function} condition
     * @param {number} max_iterations
     */
    constructor(condition, max_iterations) {
        const ret = wasm.strictwhileloop_new(condition, max_iterations);
        this.__wbg_ptr = ret >>> 0;
        StrictWhileLoopFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Function} condition
     * @param {number} max_iterations
     * @param {OptimizationMode} optimization_mode
     * @param {number} batch_size
     * @returns {StrictWhileLoop}
     */
    static newWithOptimization(condition, max_iterations, optimization_mode, batch_size) {
        const ret = wasm.strictwhileloop_newWithOptimization(condition, max_iterations, optimization_mode, batch_size);
        return StrictWhileLoop.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    shouldContinue() {
        const ret = wasm.strictwhileloop_shouldContinue(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * @param {number} batch_size
     * @returns {boolean}
     */
    shouldContinueBatch(batch_size) {
        const ret = wasm.strictwhileloop_shouldContinueBatch(this.__wbg_ptr, batch_size);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * @returns {number}
     */
    increment() {
        const ret = wasm.strictwhileloop_increment(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} batch_size
     * @returns {number}
     */
    incrementBatch(batch_size) {
        const ret = wasm.strictwhileloop_incrementBatch(this.__wbg_ptr, batch_size);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     * @returns {number}
     */
    run(callback) {
        const ret = wasm.strictwhileloop_run(this.__wbg_ptr, callback);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     * @returns {number}
     */
    runBatch(callback) {
        const ret = wasm.strictwhileloop_runBatch(this.__wbg_ptr, callback);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Function} callback
     * @param {number} convergence_threshold
     * @param {number} max_iterations_without_improvement
     * @returns {any}
     */
    runUntilConvergence(callback, convergence_threshold, max_iterations_without_improvement) {
        const ret = wasm.strictwhileloop_runUntilConvergence(this.__wbg_ptr, callback, convergence_threshold, max_iterations_without_improvement);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Function} callback
     */
    setProgressCallback(callback) {
        wasm.strictwhileloop_setProgressCallback(this.__wbg_ptr, callback);
    }
    /**
     * @returns {number}
     */
    getIterationCount() {
        const ret = wasm.strictwhileloop_getIterationCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    reset() {
        wasm.strictwhileloop_reset(this.__wbg_ptr);
    }
    /**
     * @returns {number}
     */
    getProgress() {
        const ret = wasm.strictwhileloop_getProgress(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {OptimizationMode}
     */
    getOptimizationMode() {
        const ret = wasm.strictwhileloop_getOptimizationMode(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    getBatchSize() {
        const ret = wasm.strictwhileloop_getBatchSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    getMaxIterations() {
        const ret = wasm.strictwhileloop_getMaxIterations(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const ThreadConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_threadconfig_free(ptr >>> 0, 1));

export class ThreadConfig {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ThreadConfigFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_threadconfig_free(ptr, 0);
    }
    /**
     * @returns {ThreadPriority}
     */
    get priority() {
        const ret = wasm.__wbg_get_threadconfig_priority(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {ThreadPriority} arg0
     */
    set priority(arg0) {
        wasm.__wbg_set_threadconfig_priority(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get stack_size() {
        const ret = wasm.__wbg_get_threadconfig_stack_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set stack_size(arg0) {
        wasm.__wbg_set_threadconfig_stack_size(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get timeout_ms() {
        const ret = wasm.__wbg_get_threadconfig_timeout_ms(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set timeout_ms(arg0) {
        wasm.__wbg_set_threadconfig_timeout_ms(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get max_retries() {
        const ret = wasm.__wbg_get_threadconfig_max_retries(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set max_retries(arg0) {
        wasm.__wbg_set_threadconfig_max_retries(this.__wbg_ptr, arg0);
    }
}

const ThreadManagerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_threadmanager_free(ptr >>> 0, 1));

export class ThreadManager {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ThreadManager.prototype);
        obj.__wbg_ptr = ptr;
        ThreadManagerFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ThreadManagerFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_threadmanager_free(ptr, 0);
    }
    /**
     * @param {any} config
     */
    constructor(config) {
        const ret = wasm.threadmanager_new(config);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ThreadManagerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} name
     * @param {number} max_threads
     * @returns {boolean}
     */
    createPool(name, max_threads) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.threadmanager_createPool(this.__wbg_ptr, ptr0, len0, max_threads);
        return ret !== 0;
    }
    /**
     * @param {string} name
     * @returns {ThreadPool | undefined}
     */
    getPool(name) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.threadmanager_getPool(this.__wbg_ptr, ptr0, len0);
        return ret === 0 ? undefined : ThreadPool.__wrap(ret);
    }
    /**
     * @param {string} pool_name
     * @param {Function} _function
     * @param {any} args
     * @param {any} result_type
     * @param {ThreadPriority} priority
     * @returns {string}
     */
    submitToPool(pool_name, _function, args, result_type, priority) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(pool_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.threadmanager_submitToPool(this.__wbg_ptr, ptr0, len0, _function, args, result_type, priority);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string | null | undefined} pool_name
     * @param {number} count
     * @returns {Promise<any>}
     */
    executeBatch(pool_name, count) {
        var ptr0 = isLikeNone(pool_name) ? 0 : passStringToWasm0(pool_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.threadmanager_executeBatch(this.__wbg_ptr, ptr0, len0, count);
        return ret;
    }
    /**
     * @param {any} array
     * @param {Function} mapper
     * @param {any} result_type
     * @param {string | null} [_pool_name]
     * @returns {Promise<any>}
     */
    parallelMap(array, mapper, result_type, _pool_name) {
        var ptr0 = isLikeNone(_pool_name) ? 0 : passStringToWasm0(_pool_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.threadmanager_parallelMap(this.__wbg_ptr, array, mapper, result_type, ptr0, len0);
        return ret;
    }
}

const ThreadPoolFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_threadpool_free(ptr >>> 0, 1));

export class ThreadPool {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ThreadPool.prototype);
        obj.__wbg_ptr = ptr;
        ThreadPoolFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ThreadPoolFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_threadpool_free(ptr, 0);
    }
    /**
     * @param {number} max_threads
     */
    constructor(max_threads) {
        const ret = wasm.threadpool_new(max_threads);
        this.__wbg_ptr = ret >>> 0;
        ThreadPoolFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {ThreadTask} task
     * @returns {string}
     */
    submitTask(task) {
        let deferred2_0;
        let deferred2_1;
        try {
            _assertClass(task, ThreadTask);
            var ptr0 = task.__destroy_into_raw();
            const ret = wasm.threadpool_submitTask(this.__wbg_ptr, ptr0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {Function} _function
     * @param {any} args
     * @param {any} result_type
     * @param {ThreadPriority} priority
     * @returns {string}
     */
    submitFunction(_function, args, result_type, priority) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.threadpool_submitFunction(this.__wbg_ptr, _function, args, result_type, priority);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {Promise<any>}
     */
    executeNext() {
        const ret = wasm.threadpool_executeNext(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} task_id
     * @returns {any}
     */
    getTaskStatus(task_id) {
        const ptr0 = passStringToWasm0(task_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.threadpool_getTaskStatus(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string} task_id
     * @returns {boolean}
     */
    cancelTask(task_id) {
        const ptr0 = passStringToWasm0(task_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.threadpool_cancelTask(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} task_id
     * @returns {any}
     */
    getCompletedResult(task_id) {
        const ptr0 = passStringToWasm0(task_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.threadpool_getCompletedResult(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @returns {number}
     */
    get active_count() {
        const ret = wasm.threadpool_active_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get pending_count() {
        const ret = wasm.threadpool_pending_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get completed_count() {
        const ret = wasm.threadpool_completed_count(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const ThreadTaskFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_threadtask_free(ptr >>> 0, 1));

export class ThreadTask {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ThreadTaskFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_threadtask_free(ptr, 0);
    }
    /**
     * @param {Function} _function
     * @param {any} args
     * @param {HeapType} result_type
     * @param {ThreadPriority} priority
     */
    constructor(_function, args, result_type, priority) {
        const ret = wasm.threadtask_new(_function, args, result_type, priority);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ThreadTaskFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string}
     */
    get id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.threadtask_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {ThreadState}
     */
    get state() {
        const ret = wasm.strictwhileloop_getOptimizationMode(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {ThreadPriority}
     */
    get priority() {
        const ret = wasm.threadtask_priority(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    execute() {
        const ret = wasm.threadtask_execute(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    to_promise() {
        const ret = wasm.threadtask_to_promise(this.__wbg_ptr);
        return ret;
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_all_d5bf227e8f68795d = function(arg0) {
        const ret = Promise.all(arg0);
        return ret;
    };
    imports.wbg.__wbg_apply_36be6a55257c99bf = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.apply(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_arrayBuffer_d1b44c4390db422f = function() { return handleError(function (arg0) {
        const ret = arg0.arrayBuffer();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
        const ret = arg0.buffer;
        return ret;
    };
    imports.wbg.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_7cccdd69e0791ae2 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_catch_a6e601879b2610e9 = function(arg0, arg1) {
        const ret = arg0.catch(arg1);
        return ret;
    };
    imports.wbg.__wbg_clearTimeout_b2651b7485c58446 = function(arg0, arg1) {
        arg0.clearTimeout(arg1);
    };
    imports.wbg.__wbg_fetch_1b7e793ab8320753 = function(arg0, arg1, arg2) {
        const ret = arg0.fetch(getStringFromWasm0(arg1, arg2));
        return ret;
    };
    imports.wbg.__wbg_getRandomValues_38a1ff1ea09f6cc7 = function() { return handleError(function (arg0, arg1) {
        globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_get_67b2ba62fc30de12 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_getindex_013d4b906bc5aa19 = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_getindex_b3df41665d83d8f3 = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_hasOwnProperty_eb9a168e9990a716 = function(arg0, arg1) {
        const ret = arg0.hasOwnProperty(arg1);
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Date_e9a9be8b9cea7890 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Date;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Object_7f2dcef8f78644a4 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Object;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Response_f2cc20d9f7dfd644 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Response;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Window_def73ea0955fc569 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Window;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_isArray_a1eab7e0d067391b = function(arg0) {
        const ret = Array.isArray(arg0);
        return ret;
    };
    imports.wbg.__wbg_json_1671bfa3e3625686 = function() { return handleError(function (arg0) {
        const ret = arg0.json();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_keys_5c77a08ddc2fb8a6 = function(arg0) {
        const ret = Object.keys(arg0);
        return ret;
    };
    imports.wbg.__wbg_length_3b4f022188ae8db6 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_c67d5e5c3b83737f = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_new0_f788a2397c7ca929 = function() {
        const ret = new Date();
        return ret;
    };
    imports.wbg.__wbg_new_23a2665fac83c611 = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_531(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_new_405e22f390576ce2 = function() {
        const ret = new Object();
        return ret;
    };
    imports.wbg.__wbg_new_757fd34d47ff40d2 = function(arg0) {
        const ret = new ArrayBuffer(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_new_78feb108b6472713 = function() {
        const ret = new Array();
        return ret;
    };
    imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithlength_5a5efe313cfd59f1 = function(arg0) {
        const ret = new Float32Array(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithlength_5ebc38e611488614 = function(arg0) {
        const ret = new Float64Array(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithlength_a381634e90c276d4 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithlength_c4c419ef0bc8a1f8 = function(arg0) {
        const ret = new Array(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_ok_3aaf32d069979723 = function(arg0) {
        const ret = arg0.ok;
        return ret;
    };
    imports.wbg.__wbg_parse_def2e24ef1252aff = function() { return handleError(function (arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
        const ret = arg0.push(arg1);
        return ret;
    };
    imports.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5 = function(arg0) {
        queueMicrotask(arg0);
    };
    imports.wbg.__wbg_queueMicrotask_d3219def82552485 = function(arg0) {
        const ret = arg0.queueMicrotask;
        return ret;
    };
    imports.wbg.__wbg_resolve_4851785c9c5f573d = function(arg0) {
        const ret = Promise.resolve(arg0);
        return ret;
    };
    imports.wbg.__wbg_setTimeout_360b2cfb66ec92c4 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.setTimeout(arg1, arg2, ...arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_37837023f3d740e8 = function(arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    };
    imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_bb8cecf6a62b9f46 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setindex_1ee8d4cff9651c00 = function(arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    };
    imports.wbg.__wbg_setindex_4e73afdcd9bb95cd = function(arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
        const ret = typeof global === 'undefined' ? null : global;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
        const ret = typeof globalThis === 'undefined' ? null : globalThis;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
        const ret = typeof self === 'undefined' ? null : self;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
        const ret = typeof window === 'undefined' ? null : window;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_stringify_f7ed6987935b4a24 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_text_7805bea50de2af49 = function() { return handleError(function (arg0) {
        const ret = arg0.text();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_then_44b73946d2fb3e7d = function(arg0, arg1) {
        const ret = arg0.then(arg1);
        return ret;
    };
    imports.wbg.__wbg_then_48b406749878a531 = function(arg0, arg1, arg2) {
        const ret = arg0.then(arg1, arg2);
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_i64 = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = arg0;
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = arg0.original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper1211 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 90, __wbg_adapter_47);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper899 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 36, __wbg_adapter_44);
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_is_array = function(arg0) {
        const ret = Array.isArray(arg0);
        return ret;
    };
    imports.wbg.__wbindgen_is_falsy = function(arg0) {
        const ret = !arg0;
        return ret;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(arg0) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = arg0 === null;
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(arg0) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_is_symbol = function(arg0) {
        const ret = typeof(arg0) === 'symbol';
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('strictjs_runtime_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
