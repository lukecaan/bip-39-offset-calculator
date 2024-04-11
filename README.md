# bip-39-offset-calculator

obfuscate your bip39 seed phrase with a numerical offset

forces using a 4-digit offset to encourage entropy

this is intended to be used with bip39's "25th word" (passcode" - just using this offset obfuscation would be easy to brute force if someone knew you were using it.

## Installation

`npm install`

## Instructions

To encode an obfuscated word list : `npm run encode {offset} {wordCount}(default 24)`

To decode an obfuscated word list : `npm run decode {offset} {wordCount}(default 24)`

Note : This is to be used as an example only - no guarantees are given as to the accuracy or security of this code
