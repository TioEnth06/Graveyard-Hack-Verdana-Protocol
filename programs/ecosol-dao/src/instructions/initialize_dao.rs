use anchor_lang::prelude::*;
use crate::state::DaoConfig;

#[derive(Accounts)]
pub struct InitializeDao<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = DaoConfig::LEN,
        seeds = [b"dao_config"],
        bump
    )]
    pub dao_config: Account<'info, DaoConfig>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitializeDao>) -> Result<()> {
    let dao_config = &mut ctx.accounts.dao_config;
    dao_config.next_proposal_id = 0;
    dao_config.bump = ctx.bumps.dao_config;
    Ok(())
}
