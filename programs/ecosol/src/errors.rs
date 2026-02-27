use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid asset type")]
    InvalidAssetType,
    #[msg("Weight must be greater than zero")]
    InvalidWeight,
    #[msg("Listing not found")]
    ListingNotFound,
    #[msg("Listing is not active")]
    ListingNotActive,
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("NFT not found")]
    NftNotFound,
}
