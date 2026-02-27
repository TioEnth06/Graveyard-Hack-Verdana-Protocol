import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { EcoSol } from "../target/types/ecosol";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { expect } from "chai";

describe("ecosol", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.EcoSol as Program<EcoSol>;
  const mintAuthority = Keypair.generate();
  const buyer = Keypair.generate();

  it("Initializes test accounts", async () => {
    // Airdrop SOL to test accounts
    const signature = await provider.connection.requestAirdrop(
      mintAuthority.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(signature);

    const signature2 = await provider.connection.requestAirdrop(
      buyer.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(signature2);
  });

  // Add more tests for mint_nft, create_listing, buy_credit, burn_nft
  // These would require proper setup of token mints and accounts
});
