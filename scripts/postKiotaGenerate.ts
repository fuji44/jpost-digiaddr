// Kiota generate code modification

import { walk } from "@std/fs";

for await (const entry of walk("client")) {
  if (entry.isFile && entry.name.endsWith(".ts")) {
    // replace .js to .ts
    const content = await Deno.readTextFile(entry.path);
    const replaced = content.replace(/\.js/g, ".ts");
    // write back to file
    await Deno.writeTextFile(entry.path, replaced);
    console.log(`Replaced .js to .ts in ${entry.name}`);
  }
}

const jPostDigiAddrClient = await Deno.readTextFile(
  "client/jPostDigiAddrClient.ts",
);

const replaced = jPostDigiAddrClient
  // append return type
  .replace(
    /(function createJPostDigiAddrClient.*\)) \{/g,
    "$1: JPostDigiAddrClient {",
  );
await Deno.writeTextFile("client/jPostDigiAddrClient.ts", replaced);
