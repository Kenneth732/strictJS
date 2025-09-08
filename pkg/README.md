
# StrictJS Runtime

Type-safe JavaScript runtime with WebAssembly - Bringing Rust's safety guarantees to JavaScript.

## Features

- 🔒 **Type-safe numbers** with automatic clamping
- 📏 **Bounded strings** with character limits
- 🧮 **Safe arrays** with bounds checking
- 🏗️ **Schema-based objects** with type guarantees
- ⚡ **WebAssembly performance** with JavaScript convenience

## Installation

### CDN (Browser)
```html
<script type="module">
  import { StrictNumber, HeapType, StrictString, StrictArray, StrictObject } from 'https://cdn.jsdelivr.net/npm/strictjs-runtime@latest/pkg/strictjs_runtime.js';
</script>