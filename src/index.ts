import * as bip39 from "bip39";
import readline from "readline";
import { getDecodedWord, getEncodedWord } from "./encoding";

const MIN_OFFSET_DIGITS = 4; // Minimum number of digits for the offset, provides entropy

// Get the offset from the command-line arguments
const scriptType = process.argv[2];
if (scriptType !== "decode" && scriptType !== "encode") {
  console.error(
    `Invalid type provided. Please provide 'decode' or 'encode'. (e.g. npm run <type> <offset>)`
  );
  process.exit(1);
}
let offset = parseInt(process.argv[3], 10);
if (isNaN(offset)) {
  console.error(
    `Invalid offset provided. Please provide a valid number. (e.g. npm run ${scriptType} <offset>)`
  );
  process.exit(1);
}
if (Math.abs(offset).toString().length < MIN_OFFSET_DIGITS) {
  console.error(
    `Invalid offset provided. Please provide an offset with at least ${MIN_OFFSET_DIGITS} digits.`
  );
  process.exit(1);
}
const numWords = parseInt(process.argv[4], 10) || 24; // Number of words in the seed phrase

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Offset: ${offset}`);

// Array to store the input words and their offset words
const words: { input: string; output: string }[] = [];
let wordNumber = 1;

// Prompt the user for seed words
const prompt = () => {
  if (words.length === numWords) {
    console.log("");
    console.log("");
    console.log("Output words:");
    words.forEach(({ input, output }, index) => {
      console.log(`[${index + 1}] ${output}`);
    });
    console.log("");
    console.log("");
    rl.close();
    return;
  }

  rl.question(
    `Enter BIP-39 seed word ${wordNumber} (or 'exit' to quit): `,
    (input) => {
      if (input.trim().toLowerCase() === "exit") {
        rl.close();
        return;
      }

      const offsetWord =
        scriptType === "encode"
          ? getEncodedWord(input.trim(), offset)
          : getDecodedWord(input.trim(), offset);

      if (!offsetWord) {
        console.error("Invalid seed word provided.");
        prompt();
        return;
      }

      wordNumber++;

      words.push({ input: input.trim(), output: offsetWord });

      prompt();
    }
  );
};

prompt();

rl.on("close", () => {
  console.log("Exiting...");
  process.exit(0);
});
