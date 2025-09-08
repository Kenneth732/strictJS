import strictInit from "strictjs-runtime";

const strict = await strictInit();
const addFunc = new strict.StrictFunction(
  new Function('a', 'b', 'return a + b;'),
  ["u8", "u8"],
  strict.HeapType.U16
);

console.log(addFunc.call([10, 20])); // 30
