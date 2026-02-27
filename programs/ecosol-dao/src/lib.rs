use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("Gs65WU8V3iMhvgqGfsbQ4nojUqzRXWAGFeAjnVM1ZDSb");

#[program]
pub mod ecosol_dao {
    use super::*;

    pub fn initialize_dao(ctx: Context<InitializeDao>) -> Result<()> {
        instructions::initialize_dao::handler(ctx)
    }

    pub fn create_proposal(
        ctx: Context<CreateProposal>,
        title: String,
        description: String,
        category: u8,
    ) -> Result<()> {
        instructions::create_proposal::handler(ctx, title, description, category)
    }

    pub fn cast_vote(ctx: Context<CastVote>, side: bool) -> Result<()> {
        instructions::cast_vote::handler(ctx, side)
    }
}
