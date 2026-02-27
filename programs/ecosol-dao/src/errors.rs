use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Title is invalid or too long")]
    InvalidTitle,
    #[msg("Description is invalid or too long")]
    InvalidDescription,
    #[msg("Invalid category")]
    InvalidCategory,
    #[msg("Proposal is not active")]
    ProposalNotActive,
    #[msg("Voting has ended")]
    VotingEnded,
    #[msg("Overflow")]
    Overflow,
}
