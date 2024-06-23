import * as anchor from "@project-serum/anchor";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

export class SeedUtil {
  program;
  profilePda;
  bountyProgramPda;
  bugReportPda;

  constructor(program) {
    this.program = program;
  }

  async init(walletPubkey) {
    this.profilePda = await findProgramAddressSync(
      [utf8.encode("USER_STATE"), walletPubkey.toBuffer()],
      this.program.programId
    )[0];
  }

  async getBountyProgramPda(incBProgCnt, publicKey) {
    this.bountyProgramPda = findProgramAddressSync(
      [
        Buffer.from("BOUNTY_STATE"),
        publicKey.toBuffer(),
        new anchor.BN(incBProgCnt).toArrayLike(Buffer, "le", 2),
      ],
      this.program.programId
    )[0];
  }

  async getBugReportPda(incBReportCnt, publicKey) {
    this.bugReportPda = findProgramAddressSync(
      [
        Buffer.from("BUG_STATE"),
        publicKey.toBuffer(),
        new anchor.BN(incBReportCnt).toArrayLike(Buffer, "le", 2),
      ],
      this.program.programId
    )[0];
  }
}
