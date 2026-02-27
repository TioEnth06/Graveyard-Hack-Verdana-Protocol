use anchor_lang::prelude::*;
use crate::state::DaoTreasury;

#[derive(Accounts)]
pub struct InitTreasury<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        init,
        payer = authority,
        space = DaoTreasury::LEN,
        seeds = [b"dao_treasury"],
        bump
    )]
    pub treasury: Account<'info, DaoTreasury>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitTreasury>) -> Result<()> {
    let treasury = &mut ctx.accounts.treasury;
    treasury.authority = ctx.accounts.authority.key();
    treasury.total_fees_collected = 0;
    treasury.bump = ctx.bumps.treasury;

    msg!("Initialized DAO Treasury with authority: {}", treasury.authority);
    
    Ok(())
}
