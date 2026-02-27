use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod errors;

use instructions::*;

declare_id!("EcoSol1111111111111111111111111111111111111");

#[program]
pub mod ecosol {
    use super::*;

    pub fn mint_nft(ctx: Context<MintNft>, asset_type: String, weight_kg: f64, verification_hash: String) -> Result<()> {
        instructions::mint_nft::handler(ctx, asset_type, weight_kg, verification_hash)
    }

    pub fn create_listing(ctx: Context<CreateListing>, price: u64) -> Result<()> {
        instructions::create_listing::handler(ctx, price)
    }

    pub fn buy_credit(ctx: Context<BuyCredit>) -> Result<()> {
        instructions::buy_credit::handler(ctx)
    }

    pub fn burn_nft(ctx: Context<BurnNft>) -> Result<()> {
        instructions::burn_nft::handler(ctx)
    }

    pub fn init_treasury(ctx: Context<InitTreasury>) -> Result<()> {
        instructions::init_treasury::handler(ctx)
    }
}
