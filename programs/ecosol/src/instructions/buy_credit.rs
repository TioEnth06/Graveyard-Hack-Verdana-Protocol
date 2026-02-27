use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};
use crate::state::{MarketplaceListing, GreenImpactNft, DaoTreasury};
use crate::errors::ErrorCode;

const FEE_PERCENTAGE: u64 = 250; // 2.5% = 250 basis points
const BASIS_POINTS: u64 = 10000;

#[derive(Accounts)]
pub struct BuyCredit<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    
    #[account(mut)]
    pub seller: SystemAccount<'info>,
    
    #[account(
        mut,
        seeds = [b"marketplace_listing", listing.nft_mint.as_ref()],
        bump = listing.bump,
    )]
    pub listing: Account<'info, MarketplaceListing>,
    
    #[account(
        seeds = [b"green_impact_nft", listing.nft_mint.as_ref()],
        bump = nft_account.bump,
    )]
    pub nft_account: Account<'info, GreenImpactNft>,
    
    /// CHECK: Token account for the NFT
    #[account(mut)]
    pub seller_token_account: UncheckedAccount<'info>,
    
    /// CHECK: Buyer's token account
    #[account(mut)]
    pub buyer_token_account: UncheckedAccount<'info>,
    
    #[account(
        seeds = [b"dao_treasury"],
        bump = treasury.bump,
    )]
    pub treasury: Account<'info, DaoTreasury>,
    
    /// CHECK: Treasury SOL account
    #[account(mut)]
    pub treasury_account: UncheckedAccount<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<BuyCredit>) -> Result<()> {
    require!(
        ctx.accounts.listing.is_active,
        ErrorCode::ListingNotActive
    );
    
    require!(
        ctx.accounts.buyer.key() != ctx.accounts.seller.key(),
        ErrorCode::Unauthorized
    );

    let listing = &ctx.accounts.listing;
    let price = listing.price;
    
    // Calculate fee: 2.5% of the sale price
    let fee_amount = (price as u128)
        .checked_mul(FEE_PERCENTAGE as u128)
        .and_then(|x| x.checked_div(BASIS_POINTS as u128))
        .ok_or(ErrorCode::InsufficientFunds)? as u64;
    
    let seller_amount = price.checked_sub(fee_amount)
        .ok_or(ErrorCode::InsufficientFunds)?;

    // Transfer SOL from buyer to seller (minus fee)
    **ctx.accounts.buyer.to_account_info().try_borrow_mut_lamports()? -= price;
    **ctx.accounts.seller.to_account_info().try_borrow_mut_lamports()? += seller_amount;
    
    // Transfer fee to treasury
    **ctx.accounts.treasury_account.to_account_info().try_borrow_mut_lamports()? += fee_amount;
    
    // Update treasury total
    let treasury = &mut ctx.accounts.treasury;
    treasury.total_fees_collected = treasury.total_fees_collected
        .checked_add(fee_amount)
        .ok_or(ErrorCode::InsufficientFunds)?;

    // Transfer NFT token from seller to buyer
    let cpi_accounts = token::Transfer {
        from: ctx.accounts.seller_token_account.to_account_info(),
        to: ctx.accounts.buyer_token_account.to_account_info(),
        authority: ctx.accounts.seller.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, 1)?; // Assuming 1 token per NFT

    // Update NFT owner
    let nft_account = &mut ctx.accounts.nft_account;
    nft_account.owner = ctx.accounts.buyer.key();

    // Deactivate listing
    let listing_account = &mut ctx.accounts.listing;
    listing_account.is_active = false;

    msg!("Credit purchased: {} SOL (fee: {} SOL)", price, fee_amount);
    
    Ok(())
}
