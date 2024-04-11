import * as bip39 from "bip39";

export function getDecodedWord(encodedWord: string, offset: number) {
  const wordList = bip39.wordlists.english;
  const index = wordList.indexOf(encodedWord);

  if (index === -1) {
    return undefined;
  }

  const originalIndex =
    (((index - offset) % wordList.length) + wordList.length) % wordList.length;
  return wordList[originalIndex];
}

// Function to get the offset word
export function getEncodedWord(word: string, offset: number) {
  const wordList = bip39.wordlists.english;
  const index = wordList.indexOf(word);
  if (index === -1) {
    return undefined;
  }
  const offsetIndex = (index + offset) % wordList.length;
  return wordList[offsetIndex];
}
