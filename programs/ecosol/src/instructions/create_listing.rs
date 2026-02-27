use anchor_lang::prelude::*;
use crate::state::{MarketplaceListing, GreenImpactNft};
use crate::errors::ErrorCode;

#[derive(Accounts)]
#[instruction(price: u64)]
pub struct CreateListing<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    
    #[account(
        seeds = [b"green_impact_nft", nft_account.mint.as_ref()],
        bump = nft_account.bump,
    )]
    pub nft_account: Account<'info, GreenImpactNft>,
    
    #[account(
        init,
        payer = seller,
        space = MarketplaceListing::LEN,
        seeds = [b"marketplace_listing", nft_account.mint.as_ref()],
        bump
    )]
    pub listing: Account<'info, MarketplaceListing>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CreateListing>, price: u64) -> Result<()> {
    require!(
        ctx.accounts.nft_account.owner == ctx.accounts.seller.key(),
        ErrorCode::Unauthorized
    );
    
    require!(
        price > 0,
        ErrorCode::InsufficientFunds
    );

    let listing = &mut ctx.accounts.listing;
    let clock = Clock::get()?;
    
    listing.nft_mint = ctx.accounts.nft_account.mint;
    listing.seller = ctx.accounts.seller.key();
    listing.price = price;
    listing.is_active = true;
    listing.created_at = clock.unix_timestamp;
    listing.bump = ctx.bumps.listing;

    msg!("Created marketplace listing for NFT: {} at price: {} lamports", 
         listing.nft_mint, price);
    
    Ok(())
}
