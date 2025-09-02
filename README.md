 HEAD
# saroz-c
=======
## 📚 Table of Contents

- [Quick Start](#-quick-start)
- [Scripts & Usage](#-scripts--usage)
- [Integration Tutorials](#-integration-tutorials)
- [Saros SDK API Reference (Methods Used)](#-saros-sdk-api-reference-methods-used)
- [SDK Analysis & Suggestions](#-sdk-analysis--suggestions)
- [Troubleshooting Guide](#-troubleshooting-guide)
- [Choosing the Right Saros SDK Feature](#-choosing-the-right-saros-sdk-feature)
- [Visual Aids](#-visual-aids)
- [FAQ](#-faq)
- [Known Issues](#-known-issues)
- [Resources](#-resources)

---


# Saros SDK Quick Start & Integration Guide

Welcome! This guide will help you set up and use the Saros SDK on Solana Devnet for DeFi operations like checking balances, swapping SOL/USDC, adding liquidity, and staking LP tokens.

---

## 🚀 Quick Start

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Your Wallet

- Export your Solana wallet's **private key** (from Phantom or Sollet).
- Convert it to a JSON array if needed (see `convert.js` in this repo).
- Create a `.env` file in your project root:

  ```
  WALLET_KEYPAIR=[12,34,56,...]
  ```

### 4. Fund Your Wallet (Devnet)

- Use [Solana Faucet](https://solfaucet.com/) to airdrop SOL to your wallet address on Devnet.

---

## 🛠️ Scripts & Usage

### 1. Check Balance

```sh
node src/check-balance.js
```
- Prints your SOL and USDC balances.

### 2. Swap SOL to USDC

```sh
node src/swap.js
```
- Swaps 0.1 SOL for USDC using Saros SDK.

### 3. Add Liquidity

```sh
node src/liquidity.js
```
- Adds 0.05 SOL and 5 USDC to the SOL/USDC pool.

### 4. Stake LP Tokens

```sh
node src/stake.js
```
- Stakes your LP tokens in a Saros farm.

---

## ⚙️ Script Usage & Compatibility

> **Important:**  
> The latest Saros SDK requires [ESM (ECMAScript Modules)](https://nodejs.org/api/esm.html) syntax.  
> All scripts are provided as `.mjs` files and use `import` statements.

**How to run the scripts:**

```sh
node src/check-balance.js
node src/swap.mjs
node src/liquidity.mjs
node src/stake.mjs
```

- Make sure you are using **Node.js v20** for best compatibility.
- Do **not** use `.js` files with `require(...)`—this will cause import errors with the latest SDK.

> **Note:**  
> `check-balance.js` works as a CommonJS script (`require`), but all scripts using the Saros SDK (`swap`, `liquidity`, `stake`) must use ESM (`.mjs` and `import`) for compatibility with the latest SDK.

---

## 🧑‍💻 Integration Tutorials

### Example: Swapping SOL to USDC

1. Make sure your wallet has SOL on Devnet.
2. Run:
   ```sh
   node src/swap.js
   ```
3. Output will show the transaction signature and amount swapped.

### Example: Adding Liquidity

1. Make sure you have both SOL and USDC.
2. Run:
   ```sh
   node src/liquidity.js
   ```
3. Output will show LP tokens minted and your pool share.

---


## ❓ FAQ

### 1. **Why do I see “mock data” instead of my real balance?**
This happens if your wallet is not set up correctly, has no SOL on Devnet, or there’s a network issue. Double-check your `.env` file and ensure your wallet has SOL on Devnet.

### 2. **How do I get my Phantom wallet’s private key in the right format?**
Export your private key from Phantom, then use the provided `convert.js` script to turn it into a JSON array for your `.env` file.

### 3. **How do I get SOL on Devnet?**
Use a faucet like [https://solfaucet.com/](https://solfaucet.com/) and paste your wallet address to receive free SOL for testing.

### 4. **Can I use these scripts on mainnet?**
These scripts are designed for Devnet. For mainnet, you must change the network endpoint and use a mainnet wallet with real funds (not recommended for beginners).

### 5. **Is it safe to use my real wallet?**
**No!** Only use a test wallet for hackathons and demos. Never share your private key and never use your main wallet.

### 6. **What if I get an error about missing pools or tokens?**
This usually means the Saros pool or token account doesn’t exist on Devnet, or the SDK is out of date. Make sure you’re using the latest SDK and Devnet addresses.

### 7. **How do I add more tokens or pools?**
Update the mint addresses in the scripts and ensure the pools exist on Saros Devnet. Refer to the Saros SDK documentation for more details.

### 8. **Where can I get help?**
- [Saros SDK GitHub](https://github.com/saros-xyz/saros-sdk)

- Open an issue or discussion in this repo

---

## ⚠️ Known Issues

- The Saros SDK currently throws an `ERR_UNSUPPORTED_DIR_IMPORT` error on Node.js v22 and may also have compatibility issues on other recent Node.js versions.
- For best results, use **Node.js v20** with these scripts.
- If you still encounter errors after switching to Node.js v20, this is likely an SDK issue and has been reported to the Saros team.
- All scripts include mock/demo data as a fallback, so you can still demonstrate functionality even if the SDK fails.

---

## 🔀 Choosing the Right Saros SDK Feature

Saros offers several DeFi features through its SDK. Here’s a quick guide to help you pick the right one for your use case:

- **AMM (Automated Market Maker):**
  - Use for swapping tokens (e.g., SOL ↔ USDC) and providing/removing liquidity.
  - Relevant SDK methods: `getPools`, `swap`, `addLiquidity`.

- **Stake/Farm:**
  - Use for staking LP tokens to earn rewards.
  - Relevant SDK methods: `getFarms`, `stake`, `getPendingRewards`.

- **DLMM (Dynamic Liquidity Market Maker):**
  - Advanced liquidity management for more experienced users.
  - Not covered in these beginner scripts, but see [Saros DLMM SDK](https://github.com/saros-xyz/saros-sdk) for details.

**Tip:**  
If you’re new, start with AMM for swaps and liquidity, then explore staking/farming for extra rewards.

For more details, see the [Saros SDK documentation](https://github.com/saros-xyz/saros-sdk).

---

## 🛠️ Troubleshooting Guide

**Common issues and solutions when using these scripts:**

- **I see “mock data” instead of real balances or transactions**
  - Check that your `.env` file contains your wallet’s private key as a JSON array.
  - Make sure your wallet has SOL on Devnet (use [Solana Faucet](https://solfaucet.com/)).
  - Ensure you have a stable internet connection.

- **Error: `ERR_UNSUPPORTED_DIR_IMPORT`**
  - This means the Saros SDK is not compatible with your Node.js version.
  - Solution: Use Node.js v20 (not v22 or higher).

- **Error: “No SOL/USDC pool found” or “No Saros farm found”**
  - The pool or farm may not exist on Devnet, or the SDK’s pool list is outdated.
  - Solution: Check the Saros SDK documentation for current pool/farm addresses.

- **Error: “Missing WALLET_KEYPAIR in .env”**
  - Your `.env` file is missing or not formatted correctly.
  - Solution: Add your wallet’s private key as a JSON array to `.env`.

- **Error: “insufficient balance”**
  - Your wallet does not have enough SOL or USDC for the operation.
  - Solution: Airdrop more SOL or acquire USDC on Devnet.

- **Other unexpected errors**
  - Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.
  - Make sure all dependencies are up to date.
  - If the problem persists, check [Saros SDK GitHub Issues](https://github.com/saros-xyz/saros-sdk) or open a new issue.

---

## 📚 Resources

- [Saros SDK GitHub](https://github.com/saros-xyz/saros-sdk)
- [Saros SDK NPM](https://www.npmjs.com/package/@saros-finance/sdk)
- [Solana Devnet Explorer](https://explorer.solana.com/?cluster=devnet)
- [Solana Faucet](https://solfaucet.com/)

---

## 📖 Saros SDK API Reference (Methods Used)

Below are the main Saros SDK methods used in these scripts:

- **`new SarosClient(connection, wallet)`**  
  Creates a new Saros SDK client instance.

- **`saros.getPools()`**  
  Fetches available liquidity pools (e.g., SOL/USDC).

- **`saros.getSwapQuote({ pool, amountIn, slippage, fromMint, toMint })`**  
  Estimates the output amount and slippage for a swap.

- **`saros.swap({ pool, amountIn, minAmountOut, fromMint, toMint, slippage })`**  
  Executes a token swap in a Saros pool.

- **`saros.addLiquidity({ pool, amounts })`**  
  Adds liquidity to a pool with the specified token amounts.

- **`saros.getFarms()`**  
  Fetches available staking/farming pools.

- **`saros.getPendingRewards({ farm })`**  
  Gets pending staking/farming rewards for the wallet.

- **`saros.stake({ farm, amount })`**  
  Stakes LP tokens in a Saros farm.

Refer to the [Saros SDK documentation](https://github.com/saros-xyz/saros-sdk) for a full list of available methods and advanced usage.

---

## 📝 Notes

- All scripts are for educational/demo purposes on Solana Devnet.
- Never share your private key with anyone.
- For questions or improvements, open an issue or PR!

---

## 📝 SDK Analysis & Suggestions

As a new developer using the Saros SDK, here are some observations and suggestions:

- **ESM-Only Support:**  
  The SDK requires ECMAScript Modules (`import`/`.mjs`). This is modern but may confuse beginners who expect CommonJS (`require`). Clearer documentation and migration guides would help.

- **Node.js Version Compatibility:**  
  The SDK does not work with Node.js v22+ and may throw directory import errors. It works best with Node.js v20. Explicitly stating supported Node.js versions in the docs would save time.

- **Error Messages:**  
  Some errors (like unsupported directory imports) are not user-friendly. More descriptive error messages and troubleshooting tips would improve the developer experience.

- **Documentation:**  
  The SDK’s documentation could include more real-world code samples, especially for common DeFi actions (swap, add liquidity, stake).

- **Mock/Fallback Support:**  
  Having built-in mock/fallback modes for demo purposes would be helpful for hackathons and onboarding.

**Overall:**  
The Saros SDK is powerful and covers key DeFi use cases, but improving onboarding, error handling, and documentation would make it even more accessible to new developers.

---

## 🖼️ Visual Aids

### Example: Terminal Output

Below is a sample output from running the swap script:

```
$ node src/swap.mjs
🔄 Swapped 0.1 SOL for ~2.48 USDC
✅ Transaction signature: 5h3...abc
```

### Example: Swap Flow Diagram

```mermaid
flowchart LR
    A[Wallet with SOL] --> B[Saros SDK Swap Script]
    B --> C[Saros AMM Pool (SOL/USDC)]
    C --> D[Wallet receives USDC]
```



---
>>>>>>> bbf8b8a (Initial commit)
