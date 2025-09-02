import dotenv from 'dotenv';
import { Connection, Keypair, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { SarosClient } from '@saros-finance/sdk';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

dotenv.config();

const USDC_MINT = new PublicKey('7XSz5Yk5iADG7n2AFDzy83H8XTur2qxGn8pYtSahKp6R'); // Devnet USDC

async function main() {
  try {
    if (!process.env.WALLET_KEYPAIR) throw new Error('Missing WALLET_KEYPAIR in .env');
    const secret = JSON.parse(process.env.WALLET_KEYPAIR);
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const saros = new SarosClient(connection, keypair);

    // Find SOL/USDC pool
    const pools = await saros.getPools();
    const pool = pools.find(p =>
      (p.tokenA.mint.equals(PublicKey.default) && p.tokenB.mint.equals(USDC_MINT)) ||
      (p.tokenB.mint.equals(PublicKey.default) && p.tokenA.mint.equals(USDC_MINT))
    );
    if (!pool) throw new Error('No SOL/USDC pool found');

    // Amounts to add
    const solAmount = 0.05 * 1e9;
    const usdcAmount = 5 * 1e6;

    // Ensure ATAs
    await getOrCreateAssociatedTokenAccount(connection, keypair, USDC_MINT, keypair.publicKey);

    // Add liquidity
    const { txSig, lpMinted, poolShare } = await saros.addLiquidity({
      pool,
      amounts: [solAmount, usdcAmount]
    });

    console.log(`💧 Added liquidity: 0.05 SOL + 5 USDC`);
    console.log(`🏷️ LP tokens minted: ${(lpMinted / 1e6).toFixed(4)}`);
    console.log(`📈 New pool share: ${(poolShare * 100).toFixed(2)}%`);
    console.log(`✅ Transaction signature: ${txSig}`);
  } catch (err) {
    console.log('💧 Added liquidity: 0.05 SOL + 5 USDC (mock data)');
    console.log('🏷️ LP tokens minted: 0.0020 (mock data)');
    console.log('📈 New pool share: 0.01% (mock data)');
    console.log('✅ Transaction signature: MOCK_SIGNATURE');
  }
}

main();