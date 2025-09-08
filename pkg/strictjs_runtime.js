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

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function _assertChar(c) {
    if (typeof(c) === 'number' && (c >= 0x110000 || (c >= 0xD800 && c < 0xE000))) throw new Error(`expected a valid Unicode scalar value, found ${c}`);
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
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

let cachedFloat64ArrayMemory0 = null;

function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
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

function __wbg_adapter_40(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h36f2658aa7b0e9c1(arg0, arg1);
}

function __wbg_adapter_43(arg0, arg1, arg2) {
    wasm.closure71_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_260(arg0, arg1, arg2, arg3) {
    wasm.closure93_externref_shim(arg0, arg1, arg2, arg3);
}

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11}
 */
export const HeapType = Object.freeze({
    Number: 0, "0": "Number",
    U8: 1, "1": "U8",
    I8: 2, "2": "I8",
    U16: 3, "3": "U16",
    I16: 4, "4": "I16",
    U32: 5, "5": "U32",
    I32: 6, "6": "I32",
    Bool: 7, "7": "Bool",
    U64: 8, "8": "U64",
    I64: 9, "9": "I64",
    Str: 10, "10": "Str",
    Any: 11, "11": "Any",
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

const ComputedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_computed_free(ptr >>> 0, 1));

export class Computed {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ComputedFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_computed_free(ptr, 0);
    }
}

const ReactiveCellFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reactivecell_free(ptr >>> 0, 1));

export class ReactiveCell {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReactiveCellFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reactivecell_free(ptr, 0);
    }
}

const ReactiveSystemFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reactivesystem_free(ptr >>> 0, 1));

export class ReactiveSystem {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReactiveSystemFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reactivesystem_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.reactivesystem_new();
        this.__wbg_ptr = ret >>> 0;
        ReactiveSystemFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} name
     * @param {number} initial_value
     * @param {HeapType} heap_type
     */
    defineCell(name, initial_value, heap_type) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reactivesystem_defineCell(this.__wbg_ptr, ptr0, len0, initial_value, heap_type);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} name
     * @param {number} new_value
     */
    setCell(name, new_value) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reactivesystem_setCell(this.__wbg_ptr, ptr0, len0, new_value);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} name
     * @returns {number}
     */
    getCell(name) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reactivesystem_getCell(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @param {string} name
     * @param {StrictFunction} computation
     * @param {any} dependencies
     */
    defineComputed(name, computation, dependencies) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(computation, StrictFunction);
        var ptr1 = computation.__destroy_into_raw();
        const ret = wasm.reactivesystem_defineComputed(this.__wbg_ptr, ptr0, len0, ptr1, dependencies);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} name
     * @returns {number}
     */
    getComputed(name) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reactivesystem_getComputed(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {any}
     */
    getSystemState() {
        const ret = wasm.reactivesystem_getSystemState(this.__wbg_ptr);
        return ret;
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
     * @returns {any[]}
     */
    fieldNames() {
        const ret = wasm.schema_fieldNames(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
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
    static from_js_object(js_obj) {
        const ret = wasm.schema_from_js_object(js_obj);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Schema.__wrap(ret[0]);
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
    len() {
        const ret = wasm.strictarray_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {HeapType}
     */
    heap() {
        const ret = wasm.strictarray_heap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    buffer() {
        const ret = wasm.strictarray_as_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    capacity() {
        const ret = wasm.strictarray_byte_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    byte_len() {
        const ret = wasm.strictarray_byte_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    as_ptr() {
        const ret = wasm.strictarray_as_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    get(index) {
        const ret = wasm.strictarray_get(this.__wbg_ptr, index);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @param {number} index
     * @param {number} value
     */
    set(index, value) {
        const ret = wasm.strictarray_set(this.__wbg_ptr, index, value);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
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
     * @param {number} initial_value
     * @returns {number}
     */
    reduce(js_function, initial_value) {
        const ret = wasm.strictarray_reduce(this.__wbg_ptr, js_function, initial_value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @param {number} start
     * @param {Float64Array} values
     */
    setRange(start, values) {
        const ptr0 = passArrayF64ToWasm0(values, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strictarray_setRange(this.__wbg_ptr, start, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} start
     * @param {number} count
     * @returns {Float64Array}
     */
    getRange(start, count) {
        const ret = wasm.strictarray_getRange(this.__wbg_ptr, start, count);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        return v1;
    }
    /**
     * @param {number} value
     */
    fill(value) {
        const ret = wasm.strictarray_fill(this.__wbg_ptr, value);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
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
     */
    addTask(promise, callback, error_handler, return_type) {
        wasm.strictasync_addTask(this.__wbg_ptr, promise, isLikeNone(callback) ? 0 : addToExternrefTable0(callback), isLikeNone(error_handler) ? 0 : addToExternrefTable0(error_handler), return_type);
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
     * @returns {boolean}
     */
    hasNext() {
        const ret = wasm.strictforloop_hasNext(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    next() {
        const ret = wasm.strictforloop_next(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
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
     * @returns {number}
     */
    getCurrent() {
        const ret = wasm.strictforloop_getCurrent(this.__wbg_ptr);
        return ret;
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
        return ret;
    }
    /**
     * @returns {number}
     */
    getEnd() {
        const ret = wasm.strictforloop_getEnd(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {HeapType}
     */
    getHeapType() {
        const ret = wasm.strictforloop_getHeapType(this.__wbg_ptr);
        return ret;
    }
}

const StrictFunctionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictfunction_free(ptr >>> 0, 1));

export class StrictFunction {

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
}

const StrictWhileLoopFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strictwhileloop_free(ptr >>> 0, 1));

export class StrictWhileLoop {

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
        const ret = wasm.threadtask_state(this.__wbg_ptr);
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
    imports.wbg.__wbg_keys_5c77a08ddc2fb8a6 = function(arg0) {
        const ret = Object.keys(arg0);
        return ret;
    };
    imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_new_23a2665fac83c611 = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_260(a, state0.b, arg0, arg1);
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
    imports.wbg.__wbg_new_78feb108b6472713 = function() {
        const ret = new Array();
        return ret;
    };
    imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
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
    imports.wbg.__wbg_set_bb8cecf6a62b9f46 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        return ret;
    }, arguments) };
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
    imports.wbg.__wbindgen_closure_wrapper490 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 64, __wbg_adapter_40);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper672 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 72, __wbg_adapter_43);
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
    cachedFloat64ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
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
