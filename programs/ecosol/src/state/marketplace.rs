use anchor_lang::prelude::*;

#[account]
pub struct MarketplaceListing {
    pub nft_mint: Pubkey,      // The NFT mint address
    pub seller: Pubkey,        // Seller's wallet address
    pub price: u64,            // Price in lamports
    pub is_active: bool,       // Whether listing is active
    pub created_at: i64,       // Unix timestamp
    pub bump: u8,              // Bump seed
}

impl MarketplaceListing {
    pub const LEN: usize = 8 + // discriminator
        32 +                    // nft_mint (Pubkey)
        32 +                    // seller (Pubkey)
        8 +                     // price (u64)
        1 +                     // is_active (bool)
        8 +                     // created_at (i64)
        1;                      // bump (u8)
}

#[account]
pub struct DaoTreasury {
    pub authority: Pubkey,      // DAO authority (multisig)
    pub total_fees_collected: u64, // Total fees collected
    pub bump: u8,
}

impl DaoTreasury {
    pub const LEN: usize = 8 + // discriminator
        32 +                    // authority (Pubkey)
        8 +                     // total_fees_collected (u64)
        1;                      // bump (u8)
}
