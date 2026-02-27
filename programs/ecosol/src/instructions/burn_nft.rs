use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Burn};
use crate::state::GreenImpactNft;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct BurnNft<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    
    #[account(
        seeds = [b"green_impact_nft", nft_account.mint.as_ref()],
        bump = nft_account.bump,
        has_one = owner @ ErrorCode::Unauthorized,
    )]
    pub nft_account: Account<'info, GreenImpactNft>,
    
    /// CHECK: The mint account
    #[account(mut)]
    pub mint: UncheckedAccount<'info>,
    
    /// CHECK: Token account to burn from
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    
    pub token_program: Program<'info, Token>,
}

pub fn handler(ctx: Context<BurnNft>) -> Result<()> {
    let nft_account = &ctx.accounts.nft_account;
    
    // Burn the token
    let cpi_accounts = Burn {
        mint: ctx.accounts.mint.to_account_info(),
        from: ctx.accounts.token_account.to_account_info(),
        authority: ctx.accounts.owner.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::burn(cpi_ctx, 1)?; // Burn 1 token

    msg!("Burned Green Impact NFT: {} kg of {} (Verified: {})", 
         nft_account.weight_kg, 
         nft_account.asset_type,
         nft_account.verification_hash);
    
    Ok(())
}
