use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use crate::state::GreenImpactNft;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct MintNft<'info> {
    #[account(mut)]
    pub mint_authority: Signer<'info>,
    
    #[account(
        init,
        payer = mint_authority,
        space = GreenImpactNft::LEN,
        seeds = [b"green_impact_nft", mint.key().as_ref()],
        bump
    )]
    pub nft_account: Account<'info, GreenImpactNft>,
    
    /// CHECK: We're creating the mint
    #[account(mut)]
    pub mint: UncheckedAccount<'info>,
    
    /// CHECK: Token account for the NFT
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(
    ctx: Context<MintNft>,
    asset_type: String,
    weight_kg: f64,
    verification_hash: String,
) -> Result<()> {
    // Validate inputs
    require!(
        weight_kg > 0.0,
        ErrorCode::InvalidWeight
    );
    
    require!(
        asset_type.len() <= 50 && !asset_type.is_empty(),
        ErrorCode::InvalidAssetType
    );
    
    require!(
        verification_hash.len() <= 64 && !verification_hash.is_empty(),
        ErrorCode::InvalidAssetType
    );

    let nft_account = &mut ctx.accounts.nft_account;
    let clock = Clock::get()?;
    
    nft_account.asset_type = asset_type;
    nft_account.weight_kg = weight_kg;
    nft_account.verification_hash = verification_hash;
    nft_account.mint_authority = ctx.accounts.mint_authority.key();
    nft_account.timestamp = clock.unix_timestamp;
    nft_account.mint = ctx.accounts.mint.key();
    nft_account.owner = ctx.accounts.mint_authority.key();
    nft_account.bump = ctx.bumps.nft_account;

    msg!("Minted Green Impact NFT: {} kg of {}", weight_kg, nft_account.asset_type);
    
    Ok(())
}
