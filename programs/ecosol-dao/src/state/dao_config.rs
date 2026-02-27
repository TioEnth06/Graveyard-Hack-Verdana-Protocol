use anchor_lang::prelude::*;

#[account]
pub struct DaoConfig {
    pub next_proposal_id: u64,
    pub bump: u8,
}

impl DaoConfig {
    pub const LEN: usize = 8 + 8 + 1;
}
