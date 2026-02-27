#!/bin/bash

# Deploy EcoSol DAO to Solana devnet
# Make sure you have:
# 1. Solana CLI installed and configured
# 2. Anchor installed
# 3. A wallet with SOL for deployment

set -e

echo "Building Anchor program..."
anchor build

echo "Deploying to devnet..."
anchor deploy --provider.cluster devnet

echo "Deployment complete!"
echo "Update the PROGRAM_ID in:"
echo "  - programs/ecosol/src/lib.rs"
echo "  - app/lib/solana.ts"
echo "  - Anchor.toml"
