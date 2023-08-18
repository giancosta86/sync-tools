# sync-tools

_Synchronization tools for TypeScript_

![GitHub CI](https://github.com/giancosta86/sync-tools/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fsync-tools.svg)](https://badge.fury.io/js/@giancosta86%2Fsync-tools)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

## Introduction

**sync-tools** is a TypeScript library providing _functional-style_ synchronization tools.

## Installation

The package on NPM is:

> @giancosta86/sync-tools

The public API entirely resides in the root package index, so one shouldn't reference specific modules.

## Usage

### Barrier

`Barrier` is just an alias for `Promise<void>`; however, it must be created via its `createBarrier()` factory function, which takes the following parameters:

- `requiredTokens`: integer number >= 1; it represents the number of tokens that must be cumulated in order to lift the barrier

- `barrierBody`: a `void`-returning function similar to a `Promise` body, with a fundamental difference:

  - instead of a `(resolve, reject)` pair, it takes an `(addToken, reject)` pair.

    `addToken()` must be called to _add a token to the barrier_, **resolving** the Promise as soon as the required number of tokens has been reached

#### Toy example:

```typescript
//You can also pass (addToken, reject)
await createBarrier(3, addToken => {
  addToken();
  addToken();

  //Just like in any other Promise, you could
  //even throw to cause a reject()

  //This 3rd token lifts the barrier, resolving the Promise
  addToken();
});
```
