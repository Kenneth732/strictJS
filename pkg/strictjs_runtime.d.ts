/* tslint:disable */
/* eslint-disable */
export function getIterator(array: StrictArray): ArrayIterator;
export function createTensor(heap: HeapType, shape: Uint32Array): StrictArray;
export function createVector(heap: HeapType, length: number): StrictArray;
export function createMatrix(heap: HeapType, rows: number, cols: number): StrictArray;
export function createZeros(heap: HeapType, length: number): StrictArray;
export function createOnes(heap: HeapType, length: number): StrictArray;
export function createRange(heap: HeapType, start: number, end: number, step: number): StrictArray;
export function strict_fetch(url: string, return_type: HeapType): Promise<any>;
export function init_thread_manager(config: any): ThreadManager;
export function get_memory(): any;
export function create_simd_f32x4(): JsSIMDType;
export function create_simd_i32x4(): JsSIMDType;
export function create_simd_u8x16(): JsSIMDType;
export function createGPUType(type_str: string): JsGPUType;
export function getAvailableGPUTypes(): Array<any>;
export function createSIMDType(type_str: string): JsSIMDType;
export function getAvailableSIMDTypes(): Array<any>;
export function getSIMDTypeForUseCase(use_case: string): JsSIMDType | undefined;
export enum HeapType {
  Number = 0,
  U8 = 1,
  I8 = 2,
  U16 = 3,
  I16 = 4,
  U32 = 5,
  I32 = 6,
  U64 = 7,
  I64 = 8,
  F32 = 9,
  F64 = 10,
  Bool = 11,
  Str = 12,
  Str16 = 13,
  Any = 14,
  Struct = 15,
  Array = 16,
  Map = 17,
  Date = 18,
  Buffer = 19,
  Null = 20,
  Undefined = 21,
  Symbol = 22,
  TensorF32 = 23,
  TensorF64 = 24,
  TensorI32 = 25,
  TensorU8 = 26,
  TensorI8 = 27,
  TensorI16 = 28,
  TensorU16 = 29,
  MatrixF32 = 30,
  MatrixF64 = 31,
  MatrixC32 = 32,
  MatrixC64 = 33,
  VectorF32 = 34,
  VectorF64 = 35,
  VectorI32 = 36,
  SparseMatrix = 37,
  Quantized8 = 38,
  Quantized16 = 39,
  Embedding = 40,
  Attention = 41,
  WeightF32 = 42,
  BiasF32 = 43,
  GradientF32 = 44,
  Activation = 45,
  GPUTensor = 46,
  SIMDVector = 47,
}
export enum OptimizationMode {
  Sequential = 0,
  Batched = 1,
  GPU = 2,
  SIMD = 3,
  Auto = 4,
}
export enum StringEncoding {
  Utf8 = 0,
  Utf16 = 1,
  Ascii = 2,
}
export enum TaskPriority {
  Low = 0,
  Normal = 1,
  High = 2,
  Critical = 3,
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
export class ArrayIterator {
  private constructor();
  free(): void;
  next(): any;
  hasNext(): boolean;
  reset(): void;
}
export class GPUBufferInfo {
  private constructor();
  free(): void;
  toString(): string;
  readonly id: number;
  readonly size: number;
  readonly usage: GPUBufferUsage;
}
export class GPUBufferUsage {
  free(): void;
  constructor(bits: number);
  bits(): number;
  contains(other: GPUBufferUsage): boolean;
  with(other: GPUBufferUsage): GPUBufferUsage;
  toString(): string;
}
export class GPUMemoryManager {
  free(): void;
  constructor();
  createBuffer(_gpu_type: JsGPUType, size: number, usage: GPUBufferUsage): number;
  getBufferInfo(id: number): GPUBufferInfo | undefined;
  destroyBuffer(id: number): boolean;
  getTotalMemory(): number;
  getBufferCount(): number;
}
export class JsGPUType {
  free(): void;
  constructor(type_str: string);
  isTensor(): boolean;
  isMatrix(): boolean;
  getInfo(): any;
  getBackends(): Array<any>;
  elementSize(): number;
  alignment(): number;
  toString(): string;
  supportedOperations(): Array<any>;
  isCompatibleWith(other: JsGPUType): boolean;
  getHeapType(): HeapType;
  computeCapabilities(): Array<any>;
  optimalWorkgroupSize(): Array<any>;
}
export class JsHeapType {
  free(): void;
  constructor(heap_type: HeapType);
  getHeapType(): HeapType;
  static fromString(type_str: string): JsHeapType;
  toString(): string;
  static fromJSValue(js_value: any): JsHeapType;
  getDefaultValue(): number;
  canStoreInArray(): boolean;
  alignment(): number;
  toJSValue(): any;
  supportsOperation(operation: string): boolean;
  getCapabilities(): any;
  getCapabilitiesObject(): JsTypeCapabilities;
  supportsAllCapabilities(capabilities: JsTypeCapabilities): boolean;
  supportsAnyCapability(capabilities: JsTypeCapabilities): boolean;
  getCompatibleOperationsWith(other: JsHeapType): Array<any>;
  recommendedOperations(): Array<any>;
  isBinaryCompatibleWith(other: JsHeapType): boolean;
  getBinaryResultType(other: JsHeapType): JsHeapType | undefined;
  isStringType(): boolean;
  isContainerType(): boolean;
  requiresManagedMemory(): boolean;
  static fromTypeStr(type_str: string): JsHeapType | undefined;
  typeName(): string;
  capabilityScore(): number;
  isMoreCapableThan(other: JsHeapType): boolean;
  isTensorType(): boolean;
  isMatrixType(): boolean;
  isVectorType(): boolean;
  isNeuralNetworkType(): boolean;
  isQuantizedType(): boolean;
  isSparseType(): boolean;
  getMLOperations(): Array<any>;
  getPrecisionInfo(): any;
  getRecommendedBackend(): string;
  getOptimalLayout(): string;
  estimateMemoryFootprint(element_count: number): number;
  0: HeapType;
  readonly element_size: number;
  readonly isPrimitive: boolean;
  readonly isComplex: boolean;
  readonly isNumeric: boolean;
}
export class JsSIMDType {
  free(): void;
  constructor(type_str: string);
  elementCount(): number;
  alignment(): number;
  totalSize(): number;
  isFloatingPoint(): boolean;
  isInteger(): boolean;
  isBoolean(): boolean;
  supportedOperations(): Array<any>;
  elementType(): HeapType;
  toString(): string;
  getInfo(): any;
  canPerformOperation(operation: string): boolean;
  getOptimalLaneCount(): number;
  isCompatibleWith(other: JsSIMDType): boolean;
  getBinaryResultType(other: JsSIMDType): JsSIMDType | undefined;
}
export class JsTypeCapabilities {
  free(): void;
  constructor(bits: number);
  getBits(): number;
  contains(other: JsTypeCapabilities): boolean;
  union(other: JsTypeCapabilities): JsTypeCapabilities;
  intersection(other: JsTypeCapabilities): JsTypeCapabilities;
  without(other: JsTypeCapabilities): JsTypeCapabilities;
  isSubsetOf(other: JsTypeCapabilities): boolean;
  isSupersetOf(other: JsTypeCapabilities): boolean;
  equals(other: JsTypeCapabilities): boolean;
  count(): number;
  isEmpty(): boolean;
  bits(): number;
  toNames(): Array<any>;
  supportsAll(other: JsTypeCapabilities): boolean;
  supportsAny(other: JsTypeCapabilities): boolean;
}
export class Schema {
  free(): void;
  constructor();
  addField(field: string, type_str: string): void;
  addArrayField(field: string, element_type: string): void;
  addNestedArrayField(field: string, schema: Schema): void;
  addNestedField(field: string, schema: Schema): void;
  addTensorField(field: string, dimensions: number): void;
  addMatrixField(field: string, rows: number, cols: number): void;
  addVectorField(field: string, length: number): void;
  addSparseMatrixField(field: string): void;
  addQuantizedField(field: string, precision: string): void;
  addGPUField(field: string, gpu_type: string): void;
  addSIMDField(field: string, simd_type: string): void;
  addMetadata(key: string, value: string): void;
  getMetadata(key: string): string | undefined;
  getFieldType(field: string): string | undefined;
  getFieldTypeInfo(field: string): any;
  getNestedSchema(field: string): Schema | undefined;
  hasField(field: string): boolean;
  isNestedField(field: string): boolean;
  isArrayField(field: string): boolean;
  isTensorField(field: string): boolean;
  isMatrixField(field: string): boolean;
  isVectorField(field: string): boolean;
  isGPUField(field: string): boolean;
  isSIMDField(field: string): boolean;
  fieldNames(): any[];
  fieldCount(): number;
  toJS(): any;
  static fromJSObject(js_obj: object): Schema;
  estimateMemoryUsage(sample_size: number): number;
  getOptimizationHints(): any;
}
export class StrictArray {
  free(): void;
  constructor(heap: HeapType, len: number);
  isTensorType(): boolean;
  isMatrixType(): boolean;
  isVectorType(): boolean;
  isQuantizedType(): boolean;
  isSparseType(): boolean;
  getRecommendedBackend(): string;
  getOptimalLayout(): string;
  estimateMemoryFootprint(): number;
  getMLOperations(): Array<any>;
  canPerformOperation(operation: string): boolean;
  getValue(index: number): any;
  setValue(index: number, value: any): void;
  copyToArrayBuffer(): ArrayBuffer;
  copyFromArrayBuffer(array_buffer: ArrayBuffer): void;
  toUint8Array(): Uint8Array;
  static fromUint8Array(heap: HeapType, array: Uint8Array): StrictArray;
  map(js_function: any): StrictArray;
  forEach(js_function: any): void;
  reduce(js_function: any, initial_value: any): any;
  setRange(start: number, values: Array<any>): void;
  getRange(start: number, count: number): Array<any>;
  fill(value: any): void;
  resize(new_len: number): void;
  clear(): void;
  clone(): StrictArray;
  toString(): string;
  toFloat32Array(): Float32Array;
  toFloat64Array(): Float64Array;
  static fromFloat32Array(heap: HeapType, array: Float32Array): StrictArray;
  static fromFloat64Array(heap: HeapType, array: Float64Array): StrictArray;
  sum(): number;
  average(): number;
  min(): number;
  max(): number;
  normalize(): void;
  dotProduct(other: StrictArray): number;
  convolution(kernel: StrictArray): StrictArray;
  activation(activation_type: string): void;
  batchNormalization(epsilon: number): void;
  variance(): number;
  standardDeviation(): number;
  reshape(new_shape: Uint32Array): StrictArray;
  transpose(rows: number, cols: number): StrictArray;
  matrixMultiply(other: StrictArray, a_rows: number, a_cols: number, b_cols: number): StrictArray;
  quantize(bits: number): StrictArray;
  dequantize(original_min: number, original_max: number): StrictArray;
  setValuesBatch(values: Array<any>): void;
  getValuesBatch(indices: Uint32Array): Array<any>;
  applyStrided(start: number, stride: number, js_function: any): void;
  getMemoryInfo(): any;
  getCapabilities(): any;
  isCompatibleWith(other: StrictArray): boolean;
  getBinaryResultType(other: StrictArray): HeapType | undefined;
  toJSON(): any;
  static fromJSON(json: any): StrictArray;
  readonly len: number;
  readonly heap: HeapType;
  readonly capacity: number;
  readonly byte_len: number;
  readonly element_size: number;
}
export class StrictAsync {
  free(): void;
  constructor(max_concurrent: number);
  addTask(promise: Promise<any>, callback: Function | null | undefined, error_handler: Function | null | undefined, return_type: HeapType): number;
  addTaskWithPriority(promise: Promise<any>, callback: Function | null | undefined, error_handler: Function | null | undefined, return_type: HeapType, priority: TaskPriority): number;
  runTasks(): Promise<any>;
  getQueueSize(): number;
  getRunningTasks(): number;
  clearQueue(): void;
  cancelTask(task_id: number): boolean;
  setMaxConcurrent(max: number): void;
  getLastError(): string | undefined;
  cleanup(): void;
  getNextTaskId(): number;
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
  static newWithOptimization(start: number, end: number, step: number, heap_type: HeapType, max_iterations: number, optimization_mode: OptimizationMode): StrictForLoop;
  static newForArray(data: Array<any>, heap_type: HeapType, max_iterations: number): StrictForLoop;
  static newForArrayWithOptimization(data: Array<any>, heap_type: HeapType, max_iterations: number, optimization_mode: OptimizationMode): StrictForLoop;
  hasNext(): boolean;
  next(): any;
  nextValue(): number;
  nextBatch(): Array<any>;
  nextNumericBatch(): Array<any>;
  nextGPUBatch(): any;
  nextSIMDBatch(): Array<any>;
  forEach(callback: Function): number;
  forEachValue(callback: Function): number;
  forEachBatch(callback: Function): number;
  forEachNumericBatch(callback: Function): number;
  forEachTensorBatch(callback: Function): number;
  forEachMatrixRow(callback: Function, row_size: number): number;
  forEachObject(callback: Function): number;
  setProgressCallback(callback: Function): void;
  getIterationCount(): number;
  reset(): void;
  getCurrent(): any;
  getCurrentValue(): number;
  getProgress(): number;
  getStep(): number;
  getEnd(): number;
  getHeapType(): HeapType;
  getOptimizationMode(): OptimizationMode;
  getBatchSize(): number;
  getGPUType(): JsGPUType | undefined;
  getSIMDType(): JsSIMDType | undefined;
  isArrayIteration(): boolean;
  getArrayLength(): number;
}
export class StrictFunction {
  free(): void;
  constructor(js_function: Function, arg_types: any, return_type: HeapType);
  static createWithCapabilities(js_function: Function, arg_types: any, return_type: HeapType, required_capabilities: JsTypeCapabilities): StrictFunction;
  callComplex(args: any, context: any): StrictFunctionResult;
  validateArguments(args: any): void;
  call(args: any): number;
  supportsOperation(operation: string): boolean;
  getCapabilities(): JsTypeCapabilities;
  getCompatibleOperations(): Array<any>;
  inferResultType(args: any): JsHeapType;
  processArgumentsBatch(args_batch: any): Array<any>;
  getTypeCompatibility(args: any): any;
  chain(next_function: StrictFunction): StrictFunction;
  getArgTypes(): any;
  getReturnType(): any;
  getFunction(): Function;
  getArgCount(): number;
  clearCache(): void;
  getCacheSize(): number;
  optimizeForArgs(common_args: any): StrictFunction;
}
export class StrictFunctionResult {
  private constructor();
  free(): void;
  toNumber(): number | undefined;
  toBoolean(): boolean | undefined;
  toString(): string | undefined;
  toObject(): object | undefined;
  supportsOperation(operation: string): boolean;
  getRecommendedOperations(): Array<any>;
  readonly value: any;
  readonly result_type: string;
  readonly capabilities: JsTypeCapabilities;
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
  getArrayField(field: string): Array<any>;
  getArrayElement(field: string, index: number): any;
  pushToArray(field: string, value: any): void;
  getFieldAsString(field: string): string;
  getFieldAsNumber(field: string): number;
  getFieldAsBoolean(field: string): boolean;
  getNestedObject(field: string): StrictObject;
  getSchema(): any;
  toJS(): any;
  fieldNames(): any[];
  isNestedField(field: string): boolean;
  isArrayField(field: string): boolean;
  arrayLength(field: string): number;
  isTensorField(field: string): boolean;
  isMatrixField(field: string): boolean;
  isVectorField(field: string): boolean;
  isGPUField(field: string): boolean;
  isSIMDField(field: string): boolean;
  getTensorField(field: string): any;
  getMatrixField(field: string): any;
  getVectorField(field: string): any;
  getGPUField(field: string): any;
  getSIMDField(field: string): any;
}
export class StrictPromise {
  free(): void;
  constructor(executor: Function, return_type: HeapType);
  awaitValue(): Promise<any>;
  then(on_fulfilled: Function): StrictPromise;
  catch(on_rejected: Function): StrictPromise;
  cleanup(): void;
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
  cancel(): void;
}
export class StrictWhileLoop {
  free(): void;
  constructor(condition: Function, max_iterations: number);
  static newWithOptimization(condition: Function, max_iterations: number, optimization_mode: OptimizationMode, batch_size: number): StrictWhileLoop;
  shouldContinue(): boolean;
  shouldContinueBatch(batch_size: number): boolean;
  increment(): number;
  incrementBatch(batch_size: number): number;
  run(callback: Function): number;
  runBatch(callback: Function): number;
  runUntilConvergence(callback: Function, convergence_threshold: number, max_iterations_without_improvement: number): any;
  setProgressCallback(callback: Function): void;
  getIterationCount(): number;
  reset(): void;
  getProgress(): number;
  getOptimizationMode(): OptimizationMode;
  getBatchSize(): number;
  getMaxIterations(): number;
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
  readonly __wbg_strictarray_free: (a: number, b: number) => void;
  readonly strictarray_new: (a: number, b: number) => number;
  readonly strictarray_len: (a: number) => number;
  readonly strictarray_heap: (a: number) => number;
  readonly strictarray_byte_len: (a: number) => number;
  readonly strictarray_element_size: (a: number) => number;
  readonly strictarray_isTensorType: (a: number) => number;
  readonly strictarray_isMatrixType: (a: number) => number;
  readonly strictarray_isVectorType: (a: number) => number;
  readonly strictarray_isQuantizedType: (a: number) => number;
  readonly strictarray_isSparseType: (a: number) => number;
  readonly strictarray_getRecommendedBackend: (a: number) => [number, number];
  readonly strictarray_getOptimalLayout: (a: number) => [number, number];
  readonly strictarray_estimateMemoryFootprint: (a: number) => number;
  readonly strictarray_getMLOperations: (a: number) => any;
  readonly strictarray_canPerformOperation: (a: number, b: number, c: number) => number;
  readonly strictarray_getValue: (a: number, b: number) => [number, number, number];
  readonly strictarray_setValue: (a: number, b: number, c: any) => [number, number];
  readonly strictarray_copyToArrayBuffer: (a: number) => [number, number, number];
  readonly strictarray_copyFromArrayBuffer: (a: number, b: any) => [number, number];
  readonly strictarray_toUint8Array: (a: number) => any;
  readonly strictarray_fromUint8Array: (a: number, b: any) => [number, number, number];
  readonly strictarray_map: (a: number, b: any) => [number, number, number];
  readonly strictarray_forEach: (a: number, b: any) => [number, number];
  readonly strictarray_reduce: (a: number, b: any, c: any) => [number, number, number];
  readonly strictarray_setRange: (a: number, b: number, c: any) => [number, number];
  readonly strictarray_getRange: (a: number, b: number, c: number) => [number, number, number];
  readonly strictarray_fill: (a: number, b: any) => [number, number];
  readonly strictarray_resize: (a: number, b: number) => [number, number];
  readonly strictarray_clear: (a: number) => [number, number];
  readonly strictarray_clone: (a: number) => number;
  readonly strictarray_toString: (a: number) => [number, number];
  readonly strictarray_toFloat32Array: (a: number) => [number, number, number];
  readonly strictarray_toFloat64Array: (a: number) => [number, number, number];
  readonly strictarray_fromFloat32Array: (a: number, b: any) => [number, number, number];
  readonly strictarray_fromFloat64Array: (a: number, b: any) => [number, number, number];
  readonly strictarray_sum: (a: number) => [number, number, number];
  readonly strictarray_average: (a: number) => [number, number, number];
  readonly strictarray_min: (a: number) => [number, number, number];
  readonly strictarray_max: (a: number) => [number, number, number];
  readonly strictarray_normalize: (a: number) => [number, number];
  readonly strictarray_dotProduct: (a: number, b: number) => [number, number, number];
  readonly strictarray_convolution: (a: number, b: number) => [number, number, number];
  readonly strictarray_activation: (a: number, b: number, c: number) => [number, number];
  readonly strictarray_batchNormalization: (a: number, b: number) => [number, number];
  readonly strictarray_variance: (a: number) => [number, number, number];
  readonly strictarray_standardDeviation: (a: number) => [number, number, number];
  readonly strictarray_reshape: (a: number, b: number, c: number) => [number, number, number];
  readonly strictarray_transpose: (a: number, b: number, c: number) => [number, number, number];
  readonly strictarray_matrixMultiply: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly strictarray_quantize: (a: number, b: number) => [number, number, number];
  readonly strictarray_dequantize: (a: number, b: number, c: number) => [number, number, number];
  readonly strictarray_setValuesBatch: (a: number, b: any) => [number, number];
  readonly strictarray_getValuesBatch: (a: number, b: number, c: number) => [number, number, number];
  readonly strictarray_applyStrided: (a: number, b: number, c: number, d: any) => [number, number];
  readonly strictarray_getMemoryInfo: (a: number) => any;
  readonly strictarray_getCapabilities: (a: number) => any;
  readonly strictarray_isCompatibleWith: (a: number, b: number) => number;
  readonly strictarray_getBinaryResultType: (a: number, b: number) => number;
  readonly strictarray_toJSON: (a: number) => [number, number, number];
  readonly strictarray_fromJSON: (a: any) => [number, number, number];
  readonly __wbg_arrayiterator_free: (a: number, b: number) => void;
  readonly arrayiterator_next: (a: number) => [number, number, number];
  readonly arrayiterator_hasNext: (a: number) => number;
  readonly arrayiterator_reset: (a: number) => void;
  readonly getIterator: (a: number) => number;
  readonly createTensor: (a: number, b: number, c: number) => [number, number, number];
  readonly createVector: (a: number, b: number) => [number, number, number];
  readonly createMatrix: (a: number, b: number, c: number) => [number, number, number];
  readonly createZeros: (a: number, b: number) => [number, number, number];
  readonly createOnes: (a: number, b: number) => [number, number, number];
  readonly createRange: (a: number, b: number, c: number, d: number) => [number, number, number];
  readonly strictarray_capacity: (a: number) => number;
  readonly __wbg_strictfunction_free: (a: number, b: number) => void;
  readonly __wbg_strictfunctionresult_free: (a: number, b: number) => void;
  readonly strictfunctionresult_value: (a: number) => any;
  readonly strictfunctionresult_result_type: (a: number) => [number, number];
  readonly strictfunctionresult_capabilities: (a: number) => number;
  readonly strictfunctionresult_toNumber: (a: number) => [number, number];
  readonly strictfunctionresult_toBoolean: (a: number) => number;
  readonly strictfunctionresult_toString: (a: number) => [number, number];
  readonly strictfunctionresult_toObject: (a: number) => any;
  readonly strictfunctionresult_supportsOperation: (a: number, b: number, c: number) => number;
  readonly strictfunctionresult_getRecommendedOperations: (a: number) => any;
  readonly strictfunction_new: (a: any, b: any, c: number) => [number, number, number];
  readonly strictfunction_createWithCapabilities: (a: any, b: any, c: number, d: number) => [number, number, number];
  readonly strictfunction_callComplex: (a: number, b: any, c: any) => [number, number, number];
  readonly strictfunction_validateArguments: (a: number, b: any) => [number, number];
  readonly strictfunction_call: (a: number, b: any) => [number, number, number];
  readonly strictfunction_supportsOperation: (a: number, b: number, c: number) => number;
  readonly strictfunction_getCapabilities: (a: number) => number;
  readonly strictfunction_getCompatibleOperations: (a: number) => any;
  readonly strictfunction_inferResultType: (a: number, b: any) => [number, number, number];
  readonly strictfunction_processArgumentsBatch: (a: number, b: any) => [number, number, number];
  readonly strictfunction_getTypeCompatibility: (a: number, b: any) => [number, number, number];
  readonly strictfunction_chain: (a: number, b: number) => [number, number, number];
  readonly strictfunction_getArgTypes: (a: number) => any;
  readonly strictfunction_getReturnType: (a: number) => any;
  readonly strictfunction_getFunction: (a: number) => any;
  readonly strictfunction_getArgCount: (a: number) => number;
  readonly strictfunction_clearCache: (a: number) => void;
  readonly strictfunction_getCacheSize: (a: number) => number;
  readonly strictfunction_optimizeForArgs: (a: number, b: any) => [number, number, number];
  readonly __wbg_schema_free: (a: number, b: number) => void;
  readonly schema_new: () => number;
  readonly schema_addField: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly schema_addArrayField: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly schema_addNestedArrayField: (a: number, b: number, c: number, d: number) => void;
  readonly schema_addNestedField: (a: number, b: number, c: number, d: number) => void;
  readonly schema_addTensorField: (a: number, b: number, c: number, d: number) => void;
  readonly schema_addMatrixField: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly schema_addVectorField: (a: number, b: number, c: number, d: number) => void;
  readonly schema_addSparseMatrixField: (a: number, b: number, c: number) => void;
  readonly schema_addQuantizedField: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly schema_addGPUField: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly schema_addSIMDField: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly schema_addMetadata: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly schema_getMetadata: (a: number, b: number, c: number) => [number, number];
  readonly schema_getFieldType: (a: number, b: number, c: number) => [number, number];
  readonly schema_getFieldTypeInfo: (a: number, b: number, c: number) => any;
  readonly schema_getNestedSchema: (a: number, b: number, c: number) => number;
  readonly schema_hasField: (a: number, b: number, c: number) => number;
  readonly schema_isNestedField: (a: number, b: number, c: number) => number;
  readonly schema_isArrayField: (a: number, b: number, c: number) => number;
  readonly schema_isTensorField: (a: number, b: number, c: number) => number;
  readonly schema_isMatrixField: (a: number, b: number, c: number) => number;
  readonly schema_isVectorField: (a: number, b: number, c: number) => number;
  readonly schema_isGPUField: (a: number, b: number, c: number) => number;
  readonly schema_isSIMDField: (a: number, b: number, c: number) => number;
  readonly schema_fieldNames: (a: number) => [number, number];
  readonly schema_fieldCount: (a: number) => number;
  readonly schema_toJS: (a: number) => any;
  readonly schema_fromJSObject: (a: any) => [number, number, number];
  readonly schema_estimateMemoryUsage: (a: number, b: number) => number;
  readonly schema_getOptimizationHints: (a: number) => any;
  readonly __wbg_strictnumber_free: (a: number, b: number) => void;
  readonly strictnumber_new: (a: number, b: number) => number;
  readonly strictnumber_heap: (a: number) => number;
  readonly strictnumber_get: (a: number) => number;
  readonly strictnumber_set: (a: number, b: number) => void;
  readonly strictnumber_add: (a: number, b: number) => void;
  readonly strictnumber_sub: (a: number, b: number) => void;
  readonly strictnumber_mul: (a: number, b: number) => void;
  readonly strictnumber_div: (a: number, b: number) => void;
  readonly __wbg_strictasync_free: (a: number, b: number) => void;
  readonly strictasync_new: (a: number) => number;
  readonly strictasync_addTask: (a: number, b: any, c: number, d: number, e: number) => number;
  readonly strictasync_addTaskWithPriority: (a: number, b: any, c: number, d: number, e: number, f: number) => number;
  readonly strictasync_runTasks: (a: number) => any;
  readonly strictasync_getQueueSize: (a: number) => number;
  readonly strictasync_getRunningTasks: (a: number) => number;
  readonly strictasync_clearQueue: (a: number) => void;
  readonly strictasync_cancelTask: (a: number, b: number) => number;
  readonly strictasync_setMaxConcurrent: (a: number, b: number) => void;
  readonly strictasync_getLastError: (a: number) => [number, number];
  readonly strictasync_cleanup: (a: number) => void;
  readonly strictasync_getNextTaskId: (a: number) => number;
  readonly __wbg_strictpromise_free: (a: number, b: number) => void;
  readonly strictpromise_new: (a: any, b: number) => [number, number, number];
  readonly strictpromise_awaitValue: (a: number) => any;
  readonly strictpromise_then: (a: number, b: any) => [number, number, number];
  readonly strictpromise_catch: (a: number, b: any) => [number, number, number];
  readonly strictpromise_cleanup: (a: number) => void;
  readonly __wbg_stricttimeout_free: (a: number, b: number) => void;
  readonly stricttimeout_new: (a: number, b: any, c: number) => number;
  readonly stricttimeout_start: (a: number) => any;
  readonly stricttimeout_cancel: (a: number) => void;
  readonly strict_fetch: (a: number, b: number, c: number) => any;
  readonly init_thread_manager: (a: any) => [number, number, number];
  readonly get_memory: () => any;
  readonly create_simd_f32x4: () => number;
  readonly create_simd_i32x4: () => number;
  readonly create_simd_u8x16: () => number;
  readonly strictnumber_valueOf: (a: number) => number;
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
  readonly __wbg_jstypecapabilities_free: (a: number, b: number) => void;
  readonly jstypecapabilities_contains: (a: number, b: number) => number;
  readonly jstypecapabilities_union: (a: number, b: number) => number;
  readonly jstypecapabilities_intersection: (a: number, b: number) => number;
  readonly jstypecapabilities_without: (a: number, b: number) => number;
  readonly jstypecapabilities_isSubsetOf: (a: number, b: number) => number;
  readonly jstypecapabilities_isSupersetOf: (a: number, b: number) => number;
  readonly jstypecapabilities_equals: (a: number, b: number) => number;
  readonly jstypecapabilities_count: (a: number) => number;
  readonly jstypecapabilities_isEmpty: (a: number) => number;
  readonly jstypecapabilities_bits: (a: number) => number;
  readonly jstypecapabilities_toNames: (a: number) => any;
  readonly __wbg_jsheaptype_free: (a: number, b: number) => void;
  readonly __wbg_get_jsheaptype_0: (a: number) => number;
  readonly __wbg_set_jsheaptype_0: (a: number, b: number) => void;
  readonly jsheaptype_new: (a: number) => number;
  readonly jsheaptype_element_size: (a: number) => number;
  readonly jsheaptype_getHeapType: (a: number) => number;
  readonly jsheaptype_isPrimitive: (a: number) => number;
  readonly jsheaptype_isComplex: (a: number) => number;
  readonly jsheaptype_isNumeric: (a: number) => number;
  readonly jsheaptype_fromString: (a: number, b: number) => [number, number, number];
  readonly jsheaptype_toString: (a: number) => [number, number];
  readonly jsheaptype_fromJSValue: (a: any) => [number, number, number];
  readonly jsheaptype_getDefaultValue: (a: number) => number;
  readonly jsheaptype_canStoreInArray: (a: number) => number;
  readonly jsheaptype_alignment: (a: number) => number;
  readonly jsheaptype_toJSValue: (a: number) => any;
  readonly jsheaptype_supportsOperation: (a: number, b: number, c: number) => number;
  readonly jsheaptype_getCapabilities: (a: number) => any;
  readonly jsheaptype_getCapabilitiesObject: (a: number) => number;
  readonly jsheaptype_supportsAllCapabilities: (a: number, b: number) => number;
  readonly jsheaptype_supportsAnyCapability: (a: number, b: number) => number;
  readonly jsheaptype_getCompatibleOperationsWith: (a: number, b: number) => any;
  readonly jsheaptype_recommendedOperations: (a: number) => any;
  readonly jsheaptype_isBinaryCompatibleWith: (a: number, b: number) => number;
  readonly jsheaptype_getBinaryResultType: (a: number, b: number) => number;
  readonly jsheaptype_isStringType: (a: number) => number;
  readonly jsheaptype_isContainerType: (a: number) => number;
  readonly jsheaptype_requiresManagedMemory: (a: number) => number;
  readonly jsheaptype_fromTypeStr: (a: number, b: number) => number;
  readonly jsheaptype_typeName: (a: number) => [number, number];
  readonly jsheaptype_capabilityScore: (a: number) => number;
  readonly jsheaptype_isMoreCapableThan: (a: number, b: number) => number;
  readonly jsheaptype_isTensorType: (a: number) => number;
  readonly jsheaptype_isMatrixType: (a: number) => number;
  readonly jsheaptype_isVectorType: (a: number) => number;
  readonly jsheaptype_isNeuralNetworkType: (a: number) => number;
  readonly jsheaptype_isQuantizedType: (a: number) => number;
  readonly jsheaptype_isSparseType: (a: number) => number;
  readonly jsheaptype_getMLOperations: (a: number) => any;
  readonly jsheaptype_getPrecisionInfo: (a: number) => any;
  readonly jsheaptype_getRecommendedBackend: (a: number) => [number, number];
  readonly jsheaptype_getOptimalLayout: (a: number) => [number, number];
  readonly jsheaptype_estimateMemoryFootprint: (a: number, b: number) => number;
  readonly jstypecapabilities_supportsAll: (a: number, b: number) => number;
  readonly jstypecapabilities_supportsAny: (a: number, b: number) => number;
  readonly jstypecapabilities_new: (a: number) => number;
  readonly jstypecapabilities_getBits: (a: number) => number;
  readonly __wbg_strictobject_free: (a: number, b: number) => void;
  readonly strictobject_new: (a: any) => [number, number, number];
  readonly strictobject_setField: (a: number, b: number, c: number, d: any) => [number, number];
  readonly strictobject_newWithData: (a: any, b: any) => [number, number, number];
  readonly strictobject_getField: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getArrayField: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getArrayElement: (a: number, b: number, c: number, d: number) => [number, number, number];
  readonly strictobject_pushToArray: (a: number, b: number, c: number, d: any) => [number, number];
  readonly strictobject_getFieldAsString: (a: number, b: number, c: number) => [number, number, number, number];
  readonly strictobject_getFieldAsNumber: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getFieldAsBoolean: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getNestedObject: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getSchema: (a: number) => any;
  readonly strictobject_toJS: (a: number) => any;
  readonly strictobject_fieldNames: (a: number) => [number, number];
  readonly strictobject_isNestedField: (a: number, b: number, c: number) => number;
  readonly strictobject_isArrayField: (a: number, b: number, c: number) => number;
  readonly strictobject_arrayLength: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_isTensorField: (a: number, b: number, c: number) => number;
  readonly strictobject_isMatrixField: (a: number, b: number, c: number) => number;
  readonly strictobject_isVectorField: (a: number, b: number, c: number) => number;
  readonly strictobject_isGPUField: (a: number, b: number, c: number) => number;
  readonly strictobject_isSIMDField: (a: number, b: number, c: number) => number;
  readonly strictobject_getTensorField: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getMatrixField: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getVectorField: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getGPUField: (a: number, b: number, c: number) => [number, number, number];
  readonly strictobject_getSIMDField: (a: number, b: number, c: number) => [number, number, number];
  readonly __wbg_jsgputype_free: (a: number, b: number) => void;
  readonly jsgputype_isTensor: (a: number) => number;
  readonly jsgputype_isMatrix: (a: number) => number;
  readonly jsgputype_getInfo: (a: number) => any;
  readonly jsgputype_getBackends: (a: number) => any;
  readonly jsgputype_elementSize: (a: number) => number;
  readonly jsgputype_alignment: (a: number) => number;
  readonly jsgputype_toString: (a: number) => [number, number];
  readonly jsgputype_supportedOperations: (a: number) => any;
  readonly jsgputype_isCompatibleWith: (a: number, b: number) => number;
  readonly jsgputype_getHeapType: (a: number) => number;
  readonly jsgputype_computeCapabilities: (a: number) => any;
  readonly jsgputype_optimalWorkgroupSize: (a: number) => any;
  readonly __wbg_gpumemorymanager_free: (a: number, b: number) => void;
  readonly __wbg_gpubufferinfo_free: (a: number, b: number) => void;
  readonly __wbg_gpubufferusage_free: (a: number, b: number) => void;
  readonly gpumemorymanager_new: () => number;
  readonly gpumemorymanager_createBuffer: (a: number, b: number, c: number, d: number) => number;
  readonly gpumemorymanager_getBufferInfo: (a: number, b: number) => number;
  readonly gpumemorymanager_destroyBuffer: (a: number, b: number) => number;
  readonly gpumemorymanager_getTotalMemory: (a: number) => number;
  readonly gpumemorymanager_getBufferCount: (a: number) => number;
  readonly gpubufferinfo_id: (a: number) => number;
  readonly gpubufferinfo_size: (a: number) => number;
  readonly gpubufferinfo_usage: (a: number) => number;
  readonly gpubufferinfo_toString: (a: number) => [number, number];
  readonly gpubufferusage_new: (a: number) => number;
  readonly gpubufferusage_contains: (a: number, b: number) => number;
  readonly gpubufferusage_with: (a: number, b: number) => number;
  readonly gpubufferusage_toString: (a: number) => [number, number];
  readonly createGPUType: (a: number, b: number) => [number, number, number];
  readonly getAvailableGPUTypes: () => any;
  readonly jsgputype_new: (a: number, b: number) => [number, number, number];
  readonly gpubufferusage_bits: (a: number) => number;
  readonly __wbg_jssimdtype_free: (a: number, b: number) => void;
  readonly jssimdtype_elementCount: (a: number) => number;
  readonly jssimdtype_alignment: (a: number) => number;
  readonly jssimdtype_totalSize: (a: number) => number;
  readonly jssimdtype_isFloatingPoint: (a: number) => number;
  readonly jssimdtype_isInteger: (a: number) => number;
  readonly jssimdtype_isBoolean: (a: number) => number;
  readonly jssimdtype_supportedOperations: (a: number) => any;
  readonly jssimdtype_elementType: (a: number) => number;
  readonly jssimdtype_toString: (a: number) => [number, number];
  readonly jssimdtype_getInfo: (a: number) => any;
  readonly jssimdtype_canPerformOperation: (a: number, b: number, c: number) => number;
  readonly jssimdtype_isCompatibleWith: (a: number, b: number) => number;
  readonly jssimdtype_getBinaryResultType: (a: number, b: number) => number;
  readonly createSIMDType: (a: number, b: number) => [number, number, number];
  readonly getAvailableSIMDTypes: () => any;
  readonly getSIMDTypeForUseCase: (a: number, b: number) => number;
  readonly __wbg_threadmanager_free: (a: number, b: number) => void;
  readonly threadmanager_new: (a: any) => [number, number, number];
  readonly threadmanager_createPool: (a: number, b: number, c: number, d: number) => number;
  readonly threadmanager_getPool: (a: number, b: number, c: number) => number;
  readonly threadmanager_submitToPool: (a: number, b: number, c: number, d: any, e: any, f: any, g: number) => [number, number, number, number];
  readonly threadmanager_executeBatch: (a: number, b: number, c: number, d: number) => any;
  readonly threadmanager_parallelMap: (a: number, b: any, c: any, d: any, e: number, f: number) => any;
  readonly jssimdtype_new: (a: number, b: number) => [number, number, number];
  readonly jssimdtype_getOptimalLaneCount: (a: number) => number;
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
  readonly __wbg_threadconfig_free: (a: number, b: number) => void;
  readonly __wbg_get_threadconfig_priority: (a: number) => number;
  readonly __wbg_set_threadconfig_priority: (a: number, b: number) => void;
  readonly __wbg_get_threadconfig_stack_size: (a: number) => number;
  readonly __wbg_set_threadconfig_stack_size: (a: number, b: number) => void;
  readonly __wbg_get_threadconfig_timeout_ms: (a: number) => number;
  readonly __wbg_set_threadconfig_timeout_ms: (a: number, b: number) => void;
  readonly __wbg_get_threadconfig_max_retries: (a: number) => number;
  readonly __wbg_set_threadconfig_max_retries: (a: number, b: number) => void;
  readonly __wbg_strictboolean_free: (a: number, b: number) => void;
  readonly strictboolean_new: (a: number) => number;
  readonly strictboolean_get: (a: number) => number;
  readonly strictboolean_set: (a: number, b: number) => void;
  readonly strictboolean_toggle: (a: number) => void;
  readonly strictboolean_and: (a: number, b: number) => number;
  readonly strictboolean_or: (a: number, b: number) => number;
  readonly strictboolean_not: (a: number) => number;
  readonly strictboolean_toString: (a: number) => [number, number];
  readonly __wbg_strictbigint_free: (a: number, b: number) => void;
  readonly strictbigint_new: (a: any, b: number) => [number, number, number];
  readonly strictbigint_get: (a: number) => any;
  readonly strictbigint_set: (a: number, b: any) => [number, number];
  readonly strictbigint_add: (a: number, b: any) => [number, number];
  readonly __wbg_strictwhileloop_free: (a: number, b: number) => void;
  readonly strictwhileloop_new: (a: any, b: number) => number;
  readonly strictwhileloop_newWithOptimization: (a: any, b: number, c: number, d: number) => number;
  readonly strictwhileloop_shouldContinue: (a: number) => [number, number, number];
  readonly strictwhileloop_shouldContinueBatch: (a: number, b: number) => [number, number, number];
  readonly strictwhileloop_increment: (a: number) => [number, number, number];
  readonly strictwhileloop_incrementBatch: (a: number, b: number) => [number, number, number];
  readonly strictwhileloop_run: (a: number, b: any) => [number, number, number];
  readonly strictwhileloop_runBatch: (a: number, b: any) => [number, number, number];
  readonly strictwhileloop_runUntilConvergence: (a: number, b: any, c: number, d: number) => [number, number, number];
  readonly strictwhileloop_setProgressCallback: (a: number, b: any) => void;
  readonly strictwhileloop_getIterationCount: (a: number) => number;
  readonly strictwhileloop_reset: (a: number) => void;
  readonly strictwhileloop_getProgress: (a: number) => number;
  readonly strictwhileloop_getOptimizationMode: (a: number) => number;
  readonly strictwhileloop_getBatchSize: (a: number) => number;
  readonly strictwhileloop_getMaxIterations: (a: number) => number;
  readonly __wbg_threadtask_free: (a: number, b: number) => void;
  readonly threadtask_new: (a: any, b: any, c: number, d: number) => [number, number, number];
  readonly threadtask_id: (a: number) => [number, number];
  readonly threadtask_priority: (a: number) => number;
  readonly threadtask_execute: (a: number) => any;
  readonly threadtask_to_promise: (a: number) => any;
  readonly threadtask_state: (a: number) => number;
  readonly __wbg_strictforloop_free: (a: number, b: number) => void;
  readonly strictforloop_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly strictforloop_newWithOptimization: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly strictforloop_newForArray: (a: any, b: number, c: number) => number;
  readonly strictforloop_newForArrayWithOptimization: (a: any, b: number, c: number, d: number) => number;
  readonly strictforloop_hasNext: (a: number) => number;
  readonly strictforloop_next: (a: number) => [number, number, number];
  readonly strictforloop_nextValue: (a: number) => [number, number, number];
  readonly strictforloop_nextBatch: (a: number) => [number, number, number];
  readonly strictforloop_nextNumericBatch: (a: number) => [number, number, number];
  readonly strictforloop_nextGPUBatch: (a: number) => [number, number, number];
  readonly strictforloop_nextSIMDBatch: (a: number) => [number, number, number];
  readonly strictforloop_forEach: (a: number, b: any) => [number, number, number];
  readonly strictforloop_forEachValue: (a: number, b: any) => [number, number, number];
  readonly strictforloop_forEachBatch: (a: number, b: any) => [number, number, number];
  readonly strictforloop_forEachNumericBatch: (a: number, b: any) => [number, number, number];
  readonly strictforloop_forEachTensorBatch: (a: number, b: any) => [number, number, number];
  readonly strictforloop_forEachMatrixRow: (a: number, b: any, c: number) => [number, number, number];
  readonly strictforloop_forEachObject: (a: number, b: any) => [number, number, number];
  readonly strictforloop_setProgressCallback: (a: number, b: any) => void;
  readonly strictforloop_getIterationCount: (a: number) => number;
  readonly strictforloop_reset: (a: number) => void;
  readonly strictforloop_getCurrent: (a: number) => any;
  readonly strictforloop_getCurrentValue: (a: number) => [number, number, number];
  readonly strictforloop_getProgress: (a: number) => number;
  readonly strictforloop_getStep: (a: number) => [number, number, number];
  readonly strictforloop_getEnd: (a: number) => [number, number, number];
  readonly strictforloop_getHeapType: (a: number) => number;
  readonly strictforloop_getOptimizationMode: (a: number) => number;
  readonly strictforloop_getBatchSize: (a: number) => number;
  readonly strictforloop_getGPUType: (a: number) => number;
  readonly strictforloop_getSIMDType: (a: number) => number;
  readonly strictforloop_isArrayIteration: (a: number) => number;
  readonly strictforloop_getArrayLength: (a: number) => [number, number, number];
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8b528cab5092fbfe: (a: number, b: number) => void;
  readonly closure89_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure111_externref_shim: (a: number, b: number, c: any, d: any) => void;
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
