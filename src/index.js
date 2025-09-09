

import { initStrict, StrictObject } from '../index'

async function main() {
  const { StrictObject } = await initStrict();

  const schema = {
    name: "string",
    age: "number"
  };

  const person = new StrictObject(schema);
  person.setField("name", "Alice");
  person.setField("age", 25);

  console.log("Person name:", person.getField("name"));
  console.log("Person age:", person.getField("age"));
}

main();


