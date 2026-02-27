use anchor_lang::prelude::*;
use crate::state::{DaoConfig, Proposal, ProposalCategory, ProposalStatus};

const VOTING_PERIOD_SECS: i64 = 72 * 3600; // 72 hours
const TITLE_MAX: usize = 100;
const DESCRIPTION_MAX: usize = 500;

#[derive(Accounts)]
pub struct CreateProposal<'info> {
    #[account(mut)]
    pub proposer: Signer<'info>,

    #[account(
        mut,
        seeds = [b"dao_config"],
        bump = dao_config.bump,
    )]
    pub dao_config: Account<'info, DaoConfig>,

    #[account(
        init,
        payer = proposer,
        space = 8 + 8 + (4 + TITLE_MAX) + (4 + DESCRIPTION_MAX) + 1 + 32 + 8 + 8 + 1 + 8 + 8 + 1,
        seeds = [b"proposal", dao_config.key().as_ref(), &dao_config.next_proposal_id.to_le_bytes()],
        bump
    )]
    pub proposal: Account<'info, Proposal>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<CreateProposal>,
    title: String,
    description: String,
    category: u8,
) -> Result<()> {
    require!(title.len() <= TITLE_MAX && !title.is_empty(), crate::errors::ErrorCode::InvalidTitle);
    require!(description.len() <= DESCRIPTION_MAX && !description.is_empty(), crate::errors::ErrorCode::InvalidDescription);
    require!(category <= 2, crate::errors::ErrorCode::InvalidCategory);

    let clock = Clock::get()?;
    let proposal_id = ctx.accounts.dao_config.next_proposal_id;
    ctx.accounts.dao_config.next_proposal_id = proposal_id.checked_add(1).ok_or(crate::errors::ErrorCode::Overflow)?;

    let proposal = &mut ctx.accounts.proposal;
    proposal.id = proposal_id;
    proposal.title = title;
    proposal.description = description;
    proposal.category = match category {
        0 => ProposalCategory::SupplierApproval,
        1 => ProposalCategory::AssetStandard,
        _ => ProposalCategory::Treasury,
    };
    proposal.proposer = ctx.accounts.proposer.key();
    proposal.votes_yes = 0;
    proposal.votes_no = 0;
    proposal.status = ProposalStatus::Active;
    proposal.created_at = clock.unix_timestamp;
    proposal.voting_ends_at = clock.unix_timestamp.checked_add(VOTING_PERIOD_SECS).ok_or(crate::errors::ErrorCode::Overflow)?;
    proposal.bump = ctx.bumps.proposal;
    Ok(())
}
