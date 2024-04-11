import * as bip39 from "bip39";
import { expect, test, describe } from "bun:test";
import { getDecodedWord, getEncodedWord } from "../src/encoding";

test("encryption", () => {
  describe("manual_testing", () => {
    const wordsToCheck: [string, number][] = [
      ["acid", 16],
      ["ahead", 42],
      ["alter", 60],
      ["best", 171],
      ["buddy", 236],
    ];

    const offset1 = 1;
    for (const [word, _offset] of wordsToCheck) {
      switch (word) {
        case "acid":
          expect(getEncodedWord(word, offset1)).toBe("acoustic");
          break;
        case "ahead":
          expect(getEncodedWord(word, offset1)).toBe("aim");
          break;
        case "alter":
          expect(getEncodedWord(word, offset1)).toBe("always");
          break;
        case "best":
          expect(getEncodedWord(word, offset1)).toBe("betray");
          break;
        case "buddy":
          expect(getEncodedWord(word, offset1)).toBe("budget");
          break;
      }
    }

    const offset2 = 500;
    for (const [word, _offset] of wordsToCheck) {
      switch (word) {
        case "acid":
          expect(getEncodedWord(word, offset2)).toBe("document");
          break;
        case "ahead":
          expect(getEncodedWord(word, offset2)).toBe("dry");
          break;
        case "alter":
          expect(getEncodedWord(word, offset2)).toBe("echo");
          break;
        case "best":
          expect(getEncodedWord(word, offset2)).toBe("fatigue");
          break;
        case "buddy":
          expect(getEncodedWord(word, offset2)).toBe("fossil");
          break;
      }
    }

    const offset3 = 2049;
    for (const [word, _offset] of wordsToCheck) {
      switch (word) {
        case "acid":
          expect(getEncodedWord(word, offset3)).toBe("acoustic");
          break;
        case "ahead":
          expect(getEncodedWord(word, offset3)).toBe("aim");
          break;
        case "alter":
          expect(getEncodedWord(word, offset3)).toBe("always");
          break;
        case "best":
          expect(getEncodedWord(word, offset3)).toBe("betray");
          break;
        case "buddy":
          expect(getEncodedWord(word, offset3)).toBe("budget");
          break;
      }
    }
  });
});

test("decryption", () => {
  describe("manual_testing", () => {
    const wordsToCheck: [string, number][] = [
      ["custom", 437],
      ["false", 659],
      ["height", 854],
      ["nice", 1196],
      ["swim", 1760],
    ];

    const offset1 = 1;
    for (const [word, _offset] of wordsToCheck) {
      switch (word) {
        case "custom":
          expect(getDecodedWord(word, offset1)).toBe("cushion");
          break;
        case "false":
          expect(getDecodedWord(word, offset1)).toBe("fall");
          break;
        case "height":
          expect(getDecodedWord(word, offset1)).toBe("hedgehog");
          break;
        case "nice":
          expect(getDecodedWord(word, offset1)).toBe("next");
          break;
        case "swim":
          expect(getDecodedWord(word, offset1)).toBe("swift");
          break;
      }
    }

    const offset2 = 500;
    for (const [word, _offset] of wordsToCheck) {
      switch (word) {
        case "custom":
          expect(getDecodedWord(word, offset2)).toBe("way");
          break;
        case "false":
          expect(getDecodedWord(word, offset2)).toBe("because");
          break;
        case "height":
          expect(getDecodedWord(word, offset2)).toBe("club");
          break;
        case "nice":
          expect(getDecodedWord(word, offset2)).toBe("finger");
          break;
        case "swim":
          expect(getDecodedWord(word, offset2)).toBe("output");
          break;
      }
    }

    const offset3 = 2049;
    for (const [word, _offset] of wordsToCheck) {
      switch (word) {
        case "custom":
          expect(getDecodedWord(word, offset3)).toBe("cushion");
          break;
        case "false":
          expect(getDecodedWord(word, offset3)).toBe("fall");
          break;
        case "height":
          expect(getDecodedWord(word, offset3)).toBe("hedgehog");
          break;
        case "nice":
          expect(getDecodedWord(word, offset3)).toBe("next");
          break;
        case "swim":
          expect(getDecodedWord(word, offset3)).toBe("swift");
          break;
      }
    }
  });
});

test("encryption<=>decryption", () => {
  describe("random_programmatic_testing", () => {
    for (let i = 0; i < 100; i++) {
      const offset = Math.round(Math.random() * 100_000);
      const randomWords = bip39.generateMnemonic().split(" ");

      const encodedWords = randomWords.map((word) => {
        return getEncodedWord(word, offset);
      });

      encodedWords.forEach((word, index) => {
        expect(getDecodedWord(word, offset)).toBe(randomWords[index]);
      });
    }
  });
});
