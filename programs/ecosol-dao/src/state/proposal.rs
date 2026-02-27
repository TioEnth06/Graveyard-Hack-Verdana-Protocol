use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum ProposalStatus {
    Active = 0,
    Passed = 1,
    Rejected = 2,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum ProposalCategory {
    SupplierApproval = 0,
    AssetStandard = 1,
    Treasury = 2,
}

#[account]
pub struct Proposal {
    pub id: u64,
    /// Max 100 bytes
    pub title: String,
    /// Max 500 bytes
    pub description: String,
    pub category: ProposalCategory,
    pub proposer: Pubkey,
    pub votes_yes: u64,
    pub votes_no: u64,
    pub status: ProposalStatus,
    pub created_at: i64,
    pub voting_ends_at: i64,
    pub bump: u8,
}
