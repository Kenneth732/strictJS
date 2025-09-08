
# **StrictJS Runtime**

> ⚡ *StrictJS Runtime is an experimental, low-level JavaScript runtime powered by WebAssembly (WASM).*
>
> It’s built to give JavaScript **strict data handling**, **Rust-like safety**, and **C-like performance** — while staying fully compatible with any environment where JS runs: browser, Node.js, React Native, TensorFlow.js, and more.

---

## **Why StrictJS?**

JavaScript is powerful but *loose*.
- Memory is garbage-collected and unpredictable.
- Numbers, arrays, and objects are dynamic but error-prone.
- Performance bottlenecks appear in **games**, **simulations**, **trading platforms**, and **AI applications**.

StrictJS Runtime solves these problems by introducing **strict, typed structures** running inside a **WebAssembly core** — without abandoning JavaScript.

**Think of it as:**
- The **discipline of Rust**,
- The **familiarity of JavaScript**,
- And the **flexibility to run anywhere**.

---

## **Key Features**

- 🚀 **High performance** – WebAssembly core for heavy computation.
- 🧩 **Strict memory control** – Typed arrays and objects with predictable behavior.
- 🛡 **Runtime type safety** – Reduce hidden bugs and crashes.
- 🌐 **Cross-platform** – Works in browsers, Node.js, and other JS runtimes.
- ⚡ **Universal integration** – Plug it into Three.js, TensorFlow.js, React Native, or your backend logic.

---

## **Installation**

Install via **npm**:

```bash
npm install strictjs-runtime
```

Or use **pnpm**:

```bash
pnpm add strictjs-runtime
```

Or **yarn**:

```bash
yarn add strictjs-runtime
```

Or load directly from a **CDN** in the browser:

```html
<script src="https://unpkg.com/strictjs-runtime/pkg/strictjs_runtime.js"></script>
```

---

## **Quick Start**

Here's a minimal example showing how to initialize StrictJS Runtime and work with strict arrays.

```js


// demo.js
import strictInit from "strictjs-runtime";

const run = async () => {
  const { StrictObject, StrictFunction, HeapType } = await strictInit({});

  console.log("=== StrictJS Demo ===\n");

  // ======= Test 1: Basic Object with Schema =======
  const userSchema = {
    id: "u32",
    name: "string",
    age: "u8",
    isActive: "bool",
    balance: "f64"
  };

  const user = new StrictObject(userSchema);
  user.setField("id", 1234567890);
  user.setField("name", "Alice Johnson");
  user.setField("age", 28);
  user.setField("isActive", true);
  user.setField("balance", 999.99);

  console.log("ID:", user.getFieldAsNumber("id"));
  console.log("Name:", user.getFieldAsString("name"));
  console.log("Age:", user.getFieldAsNumber("age"));
  console.log("Active:", user.getFieldAsBoolean("isActive"));
  console.log("Balance:", user.getFieldAsNumber("balance"));

  // ======= Test 2: Nested Objects =======
  const productSchema = {
    id: "u32",
    name: "string",
    metadata: {
      category: "string",
      tags: {
        featured: "bool",
        newArrival: "bool"
      }
    }
  };

  const product = new StrictObject(productSchema);
  product.setField("metadata", {
    category: "Electronics",
    tags: { featured: true, newArrival: false }
  });

  const metadata = product.getNestedObject("metadata");
  const tags = metadata.getNestedObject("tags");

  console.log("\nProduct Category:", metadata.getFieldAsString("category"));
  console.log("Featured:", tags.getFieldAsBoolean("featured"));
  console.log("New Arrival:", tags.getFieldAsBoolean("newArrival"));

  // ======= Test 3: WebAssembly-backed StrictFunction =======
  const addU8 = new StrictFunction(
    new Function("a", "b", "return a + b;"),
    ["u8", "u8"],
    "u8"
  );

  console.log("\nStrictFunction Add Result (u8 overflow demo):", addU8.call([200, 56]));

  const multiplyU16 = new StrictFunction(
    new Function("x", "y", "return x * y;"),
    ["u16", "u16"],
    "u16"
  );

  console.log("StrictFunction Multiply Result:", multiplyU16.call([300, 300]));
};

run().catch(console.error);



```

---

## **Core APIs**

### **HeapType**
An enum representing different memory layouts for strict arrays.

| Type    | Description              |
|---------|--------------------------|
| `U8`    | Unsigned 8-bit integer  |
| `I32`   | Signed 32-bit integer   |
| `F32`   | 32-bit floating-point   |
| `F64`   | 64-bit floating-point   |

---

### **StrictArray**
A fixed-size, type-safe array backed by the WASM heap.

```js
const arr = new StrictArray(HeapType.U8, 3);
arr.set(0, 10);
console.log(arr.get(0)); // → 10
```

---

### **StrictFunction**
Wraps JavaScript functions with runtime type checking and strict argument enforcement.

```js
const multiply = new StrictFunction(
  (a, b) => a * b,
  ["u8", "u8"], // Input types
  "u8"          // Output type
);

console.log(multiply.call([5, 6])); // → 30
```

---

## **Project Status**

StrictJS Runtime is **early stage and experimental**.
- ✅ Stable core runtime for strict arrays and functions.
- ⚠️ APIs are evolving — expect breaking changes before `v1.0`.
- 🧪 Best for experiments, demos, and learning how to integrate strict, low-level operations into your JS projects.

---

## **Roadmap**

- [ ] Strict object system
- [ ] Improved type inference and enforcement
- [ ] Developer tools & debugging support
- [ ] Performance benchmarks
- [ ] Integrations with React, TensorFlow.js, and Three.js
- [ ] Potential compiler to **StrictJS language** for low-level JS development

---

## **Contributing**

Contributions are welcome!

1. Fork the repo  
2. Create a feature branch  
3. Submit a pull request with clear explanations and tests  

---

## **License**

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for details.

---

## **Links**

- **GitHub:** [https://github.com/kennethmburu/strictjs-runtime](https://github.com/kennethmburu/strictjs-runtime)  
- **NPM:** [https://www.npmjs.com/package/strictjs-runtime](https://www.npmjs.com/package/strictjs-runtime)  
- **Issues / Bug Tracker:** [Open Issues](https://github.com/kennethmburu/strictjs-runtime/issues)

---

## **Vision**

StrictJS is starting small — just a runtime today — but it has **big potential**:
- It could grow into a **framework**, powering full apps like React or Vue.
- It could evolve into a **language**, compiling to strict, predictable JavaScript.
- It could remain a **universal tool**, dropped into any stack to bring low-level safety and performance.

*"Wherever JavaScript runs, StrictJS can run too."*
