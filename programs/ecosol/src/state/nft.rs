use anchor_lang::prelude::*;

#[account]
pub struct GreenImpactNft {
    pub asset_type: String,        // Wood, Plastic, Carbon, etc.
    pub weight_kg: f64,            // Weight in kilograms
    pub verification_hash: String, // Hash from IoT + AI verification
    pub mint_authority: Pubkey,    // Authority that minted this NFT
    pub timestamp: i64,            // Unix timestamp
    pub mint: Pubkey,              // The NFT mint address
    pub owner: Pubkey,             // Current owner
    pub bump: u8,                  // Bump seed
}

impl GreenImpactNft {
    pub const LEN: usize = 8 + // discriminator
        4 + 50 +                // asset_type (String)
        8 +                     // weight_kg (f64)
        4 + 64 +                // verification_hash (String)
        32 +                    // mint_authority (Pubkey)
        8 +                     // timestamp (i64)
        32 +                    // mint (Pubkey)
        32 +                    // owner (Pubkey)
        1;                      // bump (u8)
}
