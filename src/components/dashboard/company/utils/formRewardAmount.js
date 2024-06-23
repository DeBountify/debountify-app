"use client";
import * as anchor from "@project-serum/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function getRewardAmount(rewardAmount) {
  if (rewardAmount) {
    let bNPayableAmount = new anchor.BN(rewardAmount)?.toNumber();
    return bNPayableAmount / LAMPORTS_PER_SOL;
  }
  return 0;
}
