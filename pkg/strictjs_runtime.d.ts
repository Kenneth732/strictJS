/* tslint:disable */
/* eslint-disable */
export function strict_fetch(url: string, return_type: HeapType): Promise<any>;
export function init_thread_manager(config: any): ThreadManager;
export function get_memory(): any;
export enum HeapType {
  Number = 0,
  U8 = 1,
  I8 = 2,
  U16 = 3,
  I16 = 4,
  U32 = 5,
  I32 = 6,
  Bool = 7,
  U64 = 8,
  I64 = 9,
  Str = 10,
  Any = 11,
}
export enum StringEncoding {
  Utf8 = 0,
  Utf16 = 1,
  Ascii = 2,
}
export enum ThreadPriority {
  Low = 0,
  Normal = 1,
  High = 2,
  Critical = 3,
}
export enum ThreadState {
  Idle = 0,
  Running = 1,
  Paused = 2,
  Completed = 3,
  Error = 4,
}
export class Computed {
  private constructor();
  free(): void;
}
export class ReactiveCell {
  private constructor();
  free(): void;
}
export class ReactiveSystem {
  free(): void;
  constructor();
  defineCell(name: string, initial_value: number, heap_type: HeapType): void;
  setCell(name: string, new_value: number): void;
  getCell(name: string): number;
  defineComputed(name: string, computation: StrictFunction, dependencies: any): void;
  getComputed(name: string): number;
  getSystemState(): any;
}
export class Schema {
  free(): void;
  constructor();
  addField(field: string, type_str: string): void;
  addNestedField(field: string, schema: Schema): void;
  getFieldType(field: string): string | undefined;
  getNestedSchema(field: string): Schema | undefined;
  hasField(field: string): boolean;
  isNestedField(field: string): boolean;
  fieldNames(): any[];
  toJS(): any;
  static from_js_object(js_obj: object): Schema;
}
export class StrictArray {
  free(): void;
  constructor(heap: HeapType, len: number);
  len(): number;
  heap(): HeapType;
  buffer(): number;
  capacity(): number;
  byte_len(): number;
  as_ptr(): number;
  get(index: number): number;
  set(index: number, value: number): void;
  map(js_function: any): StrictArray;
  forEach(js_function: any): void;
  reduce(js_function: any, initial_value: number): number;
  setRange(start: number, values: Float64Array): void;
  getRange(start: number, count: number): Float64Array;
  fill(value: number): void;
}
export class StrictAsync {
  free(): void;
  constructor(max_concurrent: number);
  addTask(promise: Promise<any>, callback: Function | null | undefined, error_handler: Function | null | undefined, return_type: HeapType): void;
  runTasks(): Promise<any>;
  getQueueSize(): number;
  getRunningTasks(): number;
  clearQueue(): void;
}
export class StrictBigInt {
  free(): void;
  constructor(value: any, heap: HeapType);
  get(): any;
  set(value: any): void;
  add(delta: any): void;
}
export class StrictBoolean {
  free(): void;
  constructor(value: boolean);
  get(): boolean;
  set(value: boolean): void;
  toggle(): void;
  and(other: boolean): boolean;
  or(other: boolean): boolean;
  not(): boolean;
  toString(): string;
}
export class StrictForLoop {
  free(): void;
  constructor(start: number, end: number, step: number, heap_type: HeapType, max_iterations: number);
  hasNext(): boolean;
  next(): number;
  getIterationCount(): number;
  reset(): void;
  getCurrent(): number;
  getProgress(): number;
  getStep(): number;
  getEnd(): number;
  getHeapType(): HeapType;
}
export class StrictFunction {
  free(): void;
  constructor(js_function: Function, arg_types: any, return_type: HeapType);
  callComplex(args: any, context: any): StrictFunctionResult;
  validateArguments(args: any): void;
  call(args: any): number;
  getArgTypes(): any;
  getReturnType(): any;
}
export class StrictFunctionResult {
  private constructor();
  free(): void;
  toNumber(): number | undefined;
  toBoolean(): boolean | undefined;
  toString(): string | undefined;
  readonly value: any;
  readonly result_type: string;
}
export class StrictNumber {
  free(): void;
  constructor(val: number, heap: HeapType);
  heap(): HeapType;
  get(): number;
  set(val: number): void;
  add(delta: number): void;
  sub(delta: number): void;
  mul(factor: number): void;
  div(divisor: number): void;
  valueOf(): number;
}
export class StrictObject {
  free(): void;
  constructor(schema: any);
  setField(field: string, value: any): void;
  static newWithData(schema: any, initial_data: any): StrictObject;
  getField(field: string): any;
  getFieldAsString(field: string): string;
  getFieldAsNumber(field: string): number;
  getFieldAsBoolean(field: string): boolean;
  getNestedObject(field: string): StrictObject;
  getSchema(): any;
  toJS(): any;
  fieldNames(): any[];
  isNestedField(field: string): boolean;
}
export class StrictPromise {
  free(): void;
  constructor(executor: Function, return_type: HeapType);
  awaitValue(): Promise<any>;
  then(on_fulfilled: Function): StrictPromise;
  catch(on_rejected: Function): StrictPromise;
}
export class StrictString {
  free(): void;
  constructor(val: string, max_chars: number);
  static newWithEncoding(val: string, max_chars: number, encoding: StringEncoding): StrictString;
  get(): string;
  getBytes(): Uint8Array;
  getBytes16(): Uint16Array;
  set(val: string): void;
  push(extra: string): void;
  pushChar(c: string): void;
  popChar(): string | undefined;
  len_chars(): number;
  lenBytes(): number;
  lenBytes16(): number;
  max_chars(): number;
  getEncoding(): StringEncoding;
  setEncoding(encoding: StringEncoding): void;
  substring(start: number, end: number): StrictString;
  charAt(index: number): string | undefined;
  indexOf(search: string): number;
  lastIndexOf(search: string): number;
  startsWith(prefix: string): boolean;
  endsWith(suffix: string): boolean;
  contains(search: string): boolean;
  replace(old: string, _new: string): void;
  toLowerCase(): void;
  toUpperCase(): void;
  trim(): void;
  trimStart(): void;
  trimEnd(): void;
  padStart(target_length: number, pad_char: string): void;
  padEnd(target_length: number, pad_char: string): void;
  split(delimiter: string): Array<any>;
  map(js_function: any): StrictString;
  filter(js_function: any): StrictString;
}
export class StrictTimeout {
  free(): void;
  constructor(duration: number, callback: Function, return_type: HeapType);
  start(): Promise<any>;
}
export class StrictWhileLoop {
  free(): void;
  constructor(condition: Function, max_iterations: number);
  shouldContinue(): boolean;
  increment(): number;
  getIterationCount(): number;
  reset(): void;
  run(callback: Function): number;
}
export class ThreadConfig {
  private constructor();
  free(): void;
  priority: ThreadPriority;
  stack_size: number;
  timeout_ms: number;
  max_retries: number;
}
export class ThreadManager {
  free(): void;
  constructor(config: any);
  createPool(name: string, max_threads: number): boolean;
  getPool(name: string): ThreadPool | undefined;
  submitToPool(pool_name: string, _function: Function, args: any, result_type: any, priority: ThreadPriority): string;
  executeBatch(pool_name: string | null | undefined, count: number): Promise<any>;
  parallelMap(array: any, mapper: Function, result_type: any, _pool_name?: string | null): Promise<any>;
}
export class ThreadPool {
  free(): void;
  constructor(max_threads: number);
  submitTask(task: ThreadTask): string;
  submitFunction(_function: Function, args: any, result_type: any, priority: ThreadPriority): string;
  executeNext(): Promise<any>;
  getTaskStatus(task_id: string): any;
  cancelTask(task_id: string): boolean;
  getCompletedResult(task_id: string): any;
  readonly active_count: number;
  readonly pending_count: number;
  readonly completed_count: number;
}
export class ThreadTask {
  free(): void;
  constructor(_function: Function, args: any, result_type: HeapType, priority: ThreadPriority);
  execute(): Promise<any>;
  to_promise(): Promise<any>;
  readonly id: string;
  readonly state: ThreadState;
  readonly priority: ThreadPriority;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_strictstring_free: (a: number, b: number) => void;
  readonly strictstring_new: (a: number, b: number, c: number) => number;
  readonly strictstring_newWithEncoding: (a: number, b: number, c: number, d: number) => number;
  readonly strictstring_get: (a: number) => [number, number];
  readonly strictstring_getBytes: (a: number) => [number, number];
  readonly strictstring_getBytes16: (a: number) => [number, number];
  readonly strictstring_set: (a: number, b: number, c: number) => [number, number];
  readonly strictstring_push: (a: number, b: number, c: number) => [number, number];
  readonly strictstring_pushChar: (a: number, b: number) => [number, number];
  readonly strictstring_popChar: (a: number) => number;
  readonly strictstring_len_chars: (a: number) => number;
  readonly strictstring_lenBytes: (a: number) => number;
  readonly strictstring_lenBytes16: (a: number) => number;
  readonly strictstring_max_chars: (a: number) => number;
  readonly strictstring_getEncoding: (a: number) => number;
  readonly strictstring_setEncoding: (a: number, b: number) => [number, number];
  readonly strictstring_substring: (a: number, b: number, c: number) => [number, number, number];
  readonly strictstring_charAt: (a: number, b: number) => [number, number];
  readonly strictstring_indexOf: (a: number, b: number, c: number) => number;
  readonly strictstring_lastIndexOf: (a: number, b: number, c: number) => number;
  readonly strictstring_startsWith: (a: number, b: number, c: number) => number;
  readonly strictstring_endsWith: (a: number, b: number, c: number) => number;
  readonly strictstring_contains: (a: number, b: number, c: number) => number;
  readonly strictstring_replace: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly strictstring_toLowerCase: (a: number) => void;
  readonly strictstring_toUpperCase: (a: number) => void;
  readonly strictstring_trim: (a: number) => void;
  readonly strictstring_trimStart: (a: number) => void;
  readonly strictstring_trimEnd: (a: number) => void;
  readonly strictstring_padStart: (a: number, b: number, c: number, d: number) => [number, number];
  readonly strictstring_padEnd: (a: number, b: number, c: number, d: number) => [number, number];
  readonly strictstring_split: (a: number, b: number, c: number) => any;
  readonly strictstring_map: (a: number, b: any) => [number, number, number];
  readonly strictstring_filter: (a: number, b: any) => [number, number, number];
  readonly __wbg_strictfunction_free: (a: number, b: number) => void;
  readonly __wbg_strictfunctionresult_free: (a: number, b: number) => void;
  readonly strictfunctionresult_value: (a: number) => any;
  readonly strictfunctionresult_result_type: (a: number) => [number, number];
  readonly strictfunctionresult_toNumber: (a: number) => [number, number];
  readonly strictfunctionresult_toBoolean: (a: number) => number;
  readonly strictfunctionresult_toString: (a: number) => [number, number];
  readonly strictfunction_new: (a: any, b: any, c: number) => [number, number, number];
  readonly strictfunction_callComplex: (a: number, b: any, c: any) => [number, number, number];
  readonly strictfunction_validateArguments: (a: number, b: any) => [number, number];
  readonly strictfunction_call: (a: number, b: any) => [number, number, number];
  readonly strictfunction_getArgTypes: (a: number) => any;
  readonly strictfunction_getReturnType: (a: number) => any;
  readonly __wbg_reactivesystem_free: (a: number, b: number) => void;
  readonly __wbg_reactivecell_free: (a: number, b: number) => void;
  readonly __wbg_computed_free: (a: number, b: number) => void;
  readonly reactivesystem_new: () => number;
  readonly reactivesystem_defineCell: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly reactivesystem_setCell: (a: number, b: number, c: number, d: number) => [number, number];
  readonly reactivesystem_getCell: (a: number, b: number, c: number) => [number, number, number];
  readonly reactivesystem_defineComputed: (a: number, b: number, c: number, d: number, e: any) => [number, number];
  readonly reactivesystem_getComputed: (a: number, b: number, c: number) => [number, number, number];
  readonly reactivesystem_getSystemState: (a: number) => any;
  readonly __wbg_strictasync_free: (a: number, b: number) => void;
  readonly strictasync_new: (a: number) => number;
  readonly strictasync_addTask: (a: number, b: any, c: number, d: number, e: number) => void;
  readonly strictasync_runTasks: (a: number) => any;
  readonly strictasync_getQueueSize: (a: number) => number;
  readonly strictasync_getRunningTasks: (a: number) => number;
  readonly strictasync_clearQueue: (a: number) => void;
  readonly __wbg_strictpromise_free: (a: number, b: number) => void;
  readonly strictpromise_new: (a: any, b: number) => [number, number, number];
  readonly strictpromise_awaitValue: (a: number) => any;
  readonly strictpromise_then: (a: number, b: any) => [number, number, number];
  readonly strictpromise_catch: (a: number, b: any) => [number, number, number];
  readonly __wbg_stricttimeout_free: (a: number, b: number) => void;
  readonly stricttimeout_new: (a: number, b: any, c: number) => number;
  readonly stricttimeout_start: (a: number) => any;
  readonly strict_fetch: (a: number, b: number, c: number) => any;
  readonly __wbg_threadtask_free: (a: number, b: number) => void;
  readonly threadtask_new: (a: any, b: any, c: number, d: number) => [number, number, number];
  readonly threadtask_id: (a: number) => [number, number];
  readonly threadtask_state: (a: number) => number;
  readonly threadtask_priority: (a: number) => number;
  readonly threadtask_execute: (a: number) => any;
  readonly threadtask_to_promise: (a: number) => any;
  readonly __wbg_strictnumber_free: (a: number, b: number) => void;
  readonly strictnumber_new: (a: number, b: number) => number;
  readonly strictnumber_heap: (a: number) => number;
  readonly strictnumber_get: (a: number) => number;
  readonly strictnumber_set: (a: number, b: number) => void;
  readonly strictnumber_add: (a: number, b: number) => void;
  readonly strictnumber_sub: (a: number, b: number) => void;
  readonly strictnumber_mul: (a: number, b: number) => void;
  readonly strictnumber_div: (a: number, b: number) => void;
  readonly strictnumber_valueOf: (a: number) => number;
  readonly __wbg_schema_free: (a: number, b: number) => void;
  readonly schema_new: () => number;
  readonly schema_addField: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly schema_addNestedField: (a: number, b: number, c: number, d: number) => void;
  readonly schema_getFieldType: (a: number, b: number, c: number) => [number, number];
  readonly schema_getNestedSchema: (a: number, b: number, c: number) => number;
  readonly schema_hasField: (a: number, b: number, c: number) => number;
  readonly schema_isNestedField: (a: number, b: number, c: number) => number;
  readonly schema_fieldNames: (a: number) => [number, number];
  readonly schema_toJS: (a: number) => any;
  readonly schema_from_js_object: (a: any) => [number, number, number];
  readonly __wbg_strictforloop_free: (a: number, b: number) => void;
  readonly strictforloop_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly strictforloop_hasNext: (a: number) => number;
  readonly strictforloop_next: (a: number) => [number, number, number];
  readonly strictforloop_getIterationCount: (a: number) => number;
  readonly strictforloop_reset: (a: number) => void;
  readonly strictforloop_getCurrent: (a: number) => number;
  readonly strictforloop_getProgress: (a: number) => number;
  readonly strictforloop_getStep: (a: number) => number;
  readonly strictforloop_getEnd: (a: number) => number;
  readonly strictforloop_getHeapType: (a: number) => number;
  readonly __wbg_strictboolean_free: (a: number, b: number) => void;
  readonly strictboolean_new: (a: number) => number;
  readonly strictboolean_get: (a: number) => number;
  readonly strictboolean_set: (a: number, b: number) => void;
  readonly strictboolean_toggle: (a: number) => void;
  readonly strictboolean_and: (a: number, b: number) => number;
  readonly strictboolean_or: (a: number, b: number) => number;
  readonly strictboolean_not: (a: number) => number;
  readonly strictboolean_toString: (a: number) => [number, number];
  readonly __wbg_strictarray_free: (a: number, b: number) => void;
  readonly strictarray_new: (a: number, b: number) => number;
  readonly strictarray_len: (a: number) => number;
  readonly strictarray_heap: (a: number) => number;
  readonly strictarray_byte_len: (a: number) => number;
  readonly strictarray_as_ptr: (a: number) => number;
  readonly strictarray_get: (a: number, b: number) => [number, number, number];
  readonly strictarray_set: (a: number, b: number, c: number) => [number, number];
  readonly strictarray_map: (a: number, b: any) => [number, number, number];
  readonly strictarray_forEach: (a: number, b: any) => [number, number];
  readonly strictarray_reduce: (a: number, b: any, c: number) => [number, number, number];
  readonly strictarray_setRange: (a: number, b: number, c: number, d: number) => [number, number];
  readonly strictarray_getRange: (a: number, b: number, c: number) => [number, number, number, number];
  readonly strictarray_fill: (a: number, b: number) => [number, number];
  readonly __wbg_threadconfig_free: (a: number, b: number) => void;
  readonly __wbg_get_threadconfig_priority: (a: number) => number;
  readonly __wbg_set_threadconfig_priority: (a: number, b: number) => void;
  readonly __wbg_get_threadconfig_stack_size: (a: number) => number;
  readonly __wbg_set_threadconfig_stack_size: (a: number, b: number) => void;
  readonly __wbg_get_threadconfig_timeout_ms: (a: number) => number;
  readonly __wbg_set_threadconfig_timeout_ms: (a: number, b: number) => void;
  readonly __wbg_get_threadconfig_max_retries: (a: number) => number;
  readonly __wbg_set_threadconfig_max_retries: (a: number, b: number) => void;
  readonly init_thread_manager: (a: any) => [number, number, number];
  readonly get_memory: () => any;
  readonly strictarray_capacity: (a: number) => number;
  readonly strictarray_buffer: (a: number) => number;
  readonly __wbg_strictobject_free: (a: number, b: number) => void;
  readonly strictobject_new: (a: any) => [number, number, number];
  readonly strictobject_setField: (a: number, b: number, c: number, d: any) => [number, number];
  readonly strictobject_newWithData: (a: any, b: any) => [number, number, number];
  readonly strictobject_getField: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getFieldAsString: (a: number, b: number, c: number) => [number, number, number, number];
  readonly strictobject_getFieldAsNumber: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getFieldAsBoolean: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getNestedObject: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getSchema: (a: number) => any;
  readonly strictobject_toJS: (a: number) => any;
  readonly strictobject_fieldNames: (a: number) => [number, number];
  readonly strictobject_isNestedField: (a: number, b: number, c: number) => number;
  readonly __wbg_strictbigint_free: (a: number, b: number) => void;
  readonly strictbigint_new: (a: any, b: number) => [number, number, number];
  readonly strictbigint_get: (a: number) => any;
  readonly strictbigint_set: (a: number, b: any) => [number, number];
  readonly strictbigint_add: (a: number, b: any) => [number, number];
  readonly __wbg_strictwhileloop_free: (a: number, b: number) => void;
  readonly strictwhileloop_new: (a: any, b: number) => number;
  readonly strictwhileloop_shouldContinue: (a: number) => [number, number, number];
  readonly strictwhileloop_increment: (a: number) => [number, number, number];
  readonly strictwhileloop_getIterationCount: (a: number) => number;
  readonly strictwhileloop_reset: (a: number) => void;
  readonly strictwhileloop_run: (a: number, b: any) => [number, number, number];
  readonly __wbg_threadmanager_free: (a: number, b: number) => void;
  readonly threadmanager_new: (a: any) => [number, number, number];
  readonly threadmanager_createPool: (a: number, b: number, c: number, d: number) => number;
  readonly threadmanager_getPool: (a: number, b: number, c: number) => number;
  readonly threadmanager_submitToPool: (a: number, b: number, c: number, d: any, e: any, f: any, g: number) => [number, number, number, number];
  readonly threadmanager_executeBatch: (a: number, b: number, c: number, d: number) => any;
  readonly threadmanager_parallelMap: (a: number, b: any, c: any, d: any, e: number, f: number) => any;
  readonly __wbg_threadpool_free: (a: number, b: number) => void;
  readonly threadpool_new: (a: number) => number;
  readonly threadpool_submitTask: (a: number, b: number) => [number, number];
  readonly threadpool_submitFunction: (a: number, b: any, c: any, d: any, e: number) => [number, number, number, number];
  readonly threadpool_executeNext: (a: number) => any;
  readonly threadpool_getTaskStatus: (a: number, b: number, c: number) => any;
  readonly threadpool_cancelTask: (a: number, b: number, c: number) => number;
  readonly threadpool_getCompletedResult: (a: number, b: number, c: number) => any;
  readonly threadpool_active_count: (a: number) => number;
  readonly threadpool_pending_count: (a: number) => number;
  readonly threadpool_completed_count: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h36f2658aa7b0e9c1: (a: number, b: number) => void;
  readonly closure71_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure93_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
