#!/usr/bin/env node

import got from "got";
import minimist from "minimist";

const API = "http://localhost:3000";

const usage = (msg = "Back office for my app") => {
  console.log(`\n${msg}\n`);
  console.log("  usage: my-cli <id> --amount=<int> --api=<string>");
  console.log("         my-cli <id> -n=<int> --api=<strong>\n");
};

/* process.argv is the array of strings, which holds:
    1st index: full path to currently executing node binary
    2nd index: full path to file that was executed (cmd.js)
*/
const argv = process.argv.slice(2);

const args = minimist(argv, {
  alias: { amount: "n" },
  string: ["api"],
  default: { api: API },
});

if (args._.length < 1) {
  usage();
  process.exit(1);
}

const [id] = args._;
const { amount, api } = args;

if (Number.isInteger(amount) === false) {
  usage("Error: amount must be a integer.");
  process.exit(1);
}

try {
  await got.post(`${api}/orders/${id}`, {
    json: { amount },
  });
} catch (err) {
  console.log(err.message);
  process.exit(1);
}
