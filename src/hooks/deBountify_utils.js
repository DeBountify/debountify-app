import * as anchor from "@project-serum/anchor";
import { profileNotFoundErr, walletNullErr } from "./error";
import * as constants from "./const";
import IDL from "../constants/debountifyProgram.json";
import { SeedUtil } from "./seedUtils";
import { LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";

export async function getAnchorConfigs(wallet) {
  if (!wallet) {
    walletNullErr();
  }
  const provider = new anchor.AnchorProvider(
    new anchor.web3.Connection(
      constants.NETWORK,
      constants.PREFLIGHT_COMMITMENT
    ),
    wallet,
    { preflightCommitment: constants.PREFLIGHT_COMMITMENT }
  );
  const program = new anchor.Program(
    IDL,
    process.env.DEPLOYED_PROGRAM_ADDRESS,
    provider
  );
  let seedUtil = new SeedUtil(program);
  await seedUtil.init(wallet.publicKey);
  return [provider, program, seedUtil];
}

// get profile
export async function getProfile(wallet) {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  const profilePubkey = seedUtil.profilePda;
  let profile = null;
  try {
    profile = await program.account.userProfile.fetch(profilePubkey);
    return profile;
  } catch (error) {
    console.log("error", error);
    profileNotFoundErr();
  }
}

// fetch single profile
export async function fetchAllProfiles(wallet) {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  let profile = null;
  try {
    profile = await program.account.userProfile.all();
    return profile;
  } catch (error) {
    console.log("error", error);
    profileNotFoundErr();
  }
}

// create profile
export async function createProfile(wallet, data) {
  const [provider, program, seedUtil] = await getAnchorConfigs(wallet);
  try {
    const { user_name, user_image, user_type } = data;
    const profilePda = seedUtil.profilePda;
    await program.methods
      .createUserProfile(user_name, user_image, user_type)
      .accounts({
        userProfile: profilePda,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    // new anchor.web3.Transaction().add(ix);
    return "Profile created successfully";
  } catch (error) {
    throw error;
  }
}

// update profile
export async function updateProfile(wallet, data) {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  try {
    const { user_name, user_image, skills } = data;
    const publicKey = wallet.publicKey;
    const profilePda = seedUtil.profilePda;
    await program.methods
      .updateUserProfile(user_name, user_image, skills)
      .accounts({ userProfile: profilePda, user: publicKey })
      .rpc();
    return "Profile updated successfully";
  } catch (error) {
    throw error;
  }
}

// get bounty programs
export async function getBountyPrograms(wallet) {
  const [_provider, program] = await getAnchorConfigs(wallet);
  try {
    const bountyPrograms = await program.account.bountyProgram.all();
    // console.log(await _provider.getBalance(bountyPrograms[0].publicKey), "bountyPrograms");
    return bountyPrograms;
  } catch (error) {
    throw error;
  }
}

// create bounty program
export async function createBountyProgram(wallet, programCount, data) {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  try {
    const {
      title,
      description,
      scope,
      programRules,
      category,
      start_date,
      end_date,
      tags,
      reward,
      critical_ub,
      critical_lb,
      high_ub,
      high_lb,
      medium_ub,
      medium_lb,
      low_ub,
      low_lb,
    } = data;
    const publicKey = wallet.publicKey;
    const profilePda = seedUtil.profilePda;
    const bountyProgramCount = programCount + 1;
    await seedUtil.getBountyProgramPda(bountyProgramCount, publicKey);
    const bountyProgramPda = seedUtil.bountyProgramPda;
    
    const lam_rewards = reward * LAMPORTS_PER_SOL;
    const bNReward = new anchor.BN(lam_rewards);
    
    const bNCritical_ub = new anchor.BN(critical_ub);
    const bNCritical_lb = new anchor.BN(critical_lb);
    
    const bNhigh_ub = new anchor.BN(high_ub);
    const bNhigh_lb = new anchor.BN(high_lb);
    
    const bNmedium_ub = new anchor.BN(medium_ub);
    const bNmedium_lb = new anchor.BN(medium_lb);
    
    const bNlow_ub = new anchor.BN(low_ub);
    const bNlow_lb = new anchor.BN(low_lb);
    
    await program.methods
      .createBountyProgram(
        title,
        description,
        scope,
        programRules,
        category,
        start_date,
        end_date,
        tags,
        bNReward,
        bNCritical_ub,
        bNCritical_lb,
        bNhigh_ub,
        bNhigh_lb,
        bNmedium_ub,
        bNmedium_lb,
        bNlow_ub,
        bNlow_lb
      )
      .accounts({
        userProfile: profilePda,
        bountyProgram: bountyProgramPda,
        user: publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    return "Bounty program created successfully";
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// update bounty program
export async function updateBountyProgram(wallet, data) {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  try {
    const {
      title,
      description,
      scope,
      programRules,
      category,
      start_date,
      end_date,
      tags,
      bountyProgramAddress,
    } = data;
    const publicKey = wallet.publicKey;
    const profilePda = seedUtil.profilePda;

    await program.methods
      .updateBountyProgram(
        title,
        description,
        scope,
        programRules,
        category,
        start_date,
        end_date,
        tags
      )
      .accounts({
        userProfile: profilePda,
        bountyProgram: bountyProgramAddress,
        user: publicKey,
      })
      .rpc();
    return "Bounty program updated successfully";
  } catch (error) {
    throw error;
  }
}

// end bounty program
export async function endBountyProgram(wallet, data) {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  try {
    const { bountyProgramPda } = data;
    const publicKey = wallet.publicKey;
    const profilePda = seedUtil.profilePda;
    console.log(data, "data");
    await program.rpc.endProgram({
      accounts: {
        userProfile: profilePda,
        bountyProgram: bountyProgramPda,
        company: publicKey,
        user: publicKey,
        systemProgram: SystemProgram.programId,
      },
    });
  } catch (error) {
    throw error;
  }
}

// get bug reports
export async function getBugReportsUser(wallet) {
  const [_provider, program] = await getAnchorConfigs(wallet);
  try {
    const bugReports = await program.account.bugReport.all();
    return bugReports;
  } catch (error) {
    throw error;
  }
}

// create bug report
export async function createBugReport(wallet, bugReportCount, data) {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  try {
    const {
      bountyProgramAddress,
      bugTitle,
      bugDescription,
      bugValidationSteps,
      bugScopeTarget,
      bugCategory,
      bugSeverity,
      bugFileURL,
    } = data;
    const publicKey = wallet.publicKey;
    const profilePda = seedUtil.profilePda;
    const newBugReportCount = bugReportCount + 1;
    await seedUtil.getBugReportPda(newBugReportCount, publicKey);
    const bugReportPda = seedUtil.bugReportPda;
    await program.methods
      .createBugReport(
        bugTitle,
        bugDescription,
        bugValidationSteps,
        bugScopeTarget,
        bugCategory,
        bugSeverity,
        bugFileURL
      )
      .accounts({
        userProfile: profilePda,
        bountyProgram: bountyProgramAddress,
        bugReport: bugReportPda,
        user: publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    return "Bug report created successfully";
  } catch (error) {
    throw error;
  }
}

// accept bug report
export async function acceptBugReport(wallet, data) {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  try {
    const {
      bugSeverity,
      payableAmount,
      bountyProgramAddress,
      bugReportAddress,
      hackerPubKey,
      hackerPda,
    } = data;
    const publicKey = wallet.publicKey;
    const profilePda = seedUtil.profilePda;
    const lampNumber = parseFloat(payableAmount) * LAMPORTS_PER_SOL;
    const bNPayableAmount = new anchor.BN(lampNumber);
    await program.methods
      .acceptBug(bugSeverity, bNPayableAmount)
      .accounts({
        userProfile: profilePda,
        bountyProgram: bountyProgramAddress,
        bugReport: bugReportAddress,
        hackerProfile: hackerPda,
        hacker: hackerPubKey,
        user: publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    return "Bug report accepted successfully";
  } catch (error) {
    throw error;
  }
}

//  reject bug report
export async function rejectBugReport(wallet, data) {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  try {
    const { bountyProgramAddress, bugReportAddress, reject_reason } = data;
    const publicKey = wallet.publicKey;
    const profilePda = seedUtil.profilePda;
    await program.methods
      .rejectBug(reject_reason)
      .accounts({
        userProfile: profilePda,
        bountyProgram: bountyProgramAddress,
        bugReport: bugReportAddress,
        user: publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    return "Bug report rejected successfully";
  } catch (error) {
    throw error;
  }
}

// delete bug report
export const deleteBugReport = async (wallet, bugReportAddress) => {
  const [_provider, program, seedUtil] = await getAnchorConfigs(wallet);
  try {
    const publicKey = wallet.publicKey;
    const profilePda = seedUtil.profilePda;
    await program.rpc.deleteBugReport({
      accounts: {
        userProfile: profilePda,
        bugReport: bugReportAddress,
        user: publicKey,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
