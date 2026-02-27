use anchor_lang::prelude::*;

#[account]
pub struct VoteRecord {
    pub proposal: Pubkey,
    pub voter: Pubkey,
    /// true = Yes, false = No
    pub side: bool,
    pub bump: u8,
}

impl VoteRecord {
    pub const LEN: usize = 8 + 32 + 32 + 1 + 1;
}
