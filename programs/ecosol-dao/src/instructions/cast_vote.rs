use anchor_lang::prelude::*;
use crate::state::{DaoConfig, Proposal, ProposalStatus, VoteRecord};

#[derive(Accounts)]
#[instruction(side: bool)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub voter: Signer<'info>,

    #[account(seeds = [b"dao_config"], bump = dao_config.bump)]
    pub dao_config: Account<'info, DaoConfig>,

    #[account(
        mut,
        seeds = [b"proposal", dao_config.key().as_ref(), &proposal.id.to_le_bytes()],
        bump = proposal.bump,
        constraint = proposal.status == ProposalStatus::Active @ crate::errors::ErrorCode::ProposalNotActive,
    )]
    pub proposal: Account<'info, Proposal>,

    #[account(
        init,
        payer = voter,
        space = VoteRecord::LEN,
        seeds = [b"vote", proposal.key().as_ref(), voter.key().as_ref()],
        bump
    )]
    pub vote_record: Account<'info, VoteRecord>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CastVote>, _side: bool) -> Result<()> {
    let clock = Clock::get()?;
    let proposal = &mut ctx.accounts.proposal;
    require!(clock.unix_timestamp < proposal.voting_ends_at, crate::errors::ErrorCode::VotingEnded);

    let vote_record = &mut ctx.accounts.vote_record;
    vote_record.proposal = proposal.key();
    vote_record.voter = ctx.accounts.voter.key();
    vote_record.side = _side;
    vote_record.bump = ctx.bumps.vote_record;

    if _side {
        proposal.votes_yes = proposal.votes_yes.checked_add(1).ok_or(crate::errors::ErrorCode::Overflow)?;
    } else {
        proposal.votes_no = proposal.votes_no.checked_add(1).ok_or(crate::errors::ErrorCode::Overflow)?;
    }
    Ok(())
}
