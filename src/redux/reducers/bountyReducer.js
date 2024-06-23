import * as anchor from "@project-serum/anchor";
import {
  CLEAR_BOUNTY_PROGRAMS,
  CLEAR_ERROR,
  CLEAR_MESSAGES,
  CREATE_BOUNTY_PROGRAM_FAIL,
  CREATE_BOUNTY_PROGRAM_REQUEST,
  CREATE_BOUNTY_PROGRAM_SUCCESS,
  DELETE_BOUNTY_PROGRAM_FAIL,
  DELETE_BOUNTY_PROGRAM_REQUEST,
  DELETE_BOUNTY_PROGRAM_SUCCESS,
  GET_BOUNTY_PROGRAMS_FAIL,
  GET_BOUNTY_PROGRAMS_REQUEST,
  GET_BOUNTY_PROGRAMS_SUCCESS,
  UPDATE_BOUNTY_PROGRAM_FAIL,
  UPDATE_BOUNTY_PROGRAM_REQUEST,
  UPDATE_BOUNTY_PROGRAM_SUCCESS,
} from "../constants/bountyPrograms";

export const bountyProgramReducer = (
  state = {
    loading: false,
    bountyProgramsState: [],
    endedBountyPrograms: [],
    reports: [],
    msg: null,
  },
  action
) => {
  switch (action.type) {
    case GET_BOUNTY_PROGRAMS_REQUEST:
    case CREATE_BOUNTY_PROGRAM_REQUEST:
    case UPDATE_BOUNTY_PROGRAM_REQUEST:
    case DELETE_BOUNTY_PROGRAM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_BOUNTY_PROGRAMS_SUCCESS:
      const bountyPrograms = action.payload
        .filter((program) => !program?.account?.isEnded)
        .map((program) => ({
          ...program,
          account: {
            ...program.account,
            reward: new anchor.BN(program.account.reward).toNumber(),
            remainingBalance: new anchor.BN(
              program.account.remainingBalance
            ).toNumber(),
            rewardRange: {
              criticalUb: new anchor.BN(
                program.account.rewardRange.criticalUb
              ).toNumber(),
              criticalLb: new anchor.BN(
                program.account.rewardRange.criticalLb
              ).toNumber(),
              highUb: new anchor.BN(
                program.account.rewardRange.highUb
              ).toNumber(),
              highLb: new anchor.BN(
                program.account.rewardRange.highLb
              ).toNumber(),
              mediumUb: new anchor.BN(
                program.account.rewardRange.mediumUb
              ).toNumber(),
              mediumLb: new anchor.BN(
                program.account.rewardRange.mediumLb
              ).toNumber(),
              lowUb: new anchor.BN(
                program.account.rewardRange.lowUb
              ).toNumber(),
              lowLb: new anchor.BN(
                program.account.rewardRange.lowLb
              ).toNumber(),
            },
          },
        }));
      const endedBountyPrograms = action.payload
        .filter((program) => program?.account?.isEnded)
        .map((program) => ({
          ...program,
          account: {
            ...program.account,
            reward: new anchor.BN(program.account.reward).toNumber(),
            remainingBalance: new anchor.BN(
              program.account.remainingBalance
            ).toNumber(),
            rewardRange: {
              criticalUb: new anchor.BN(
                program.account.rewardRange.criticalUb
              ).toNumber(),
              criticalLb: new anchor.BN(
                program.account.rewardRange.criticalLb
              ).toNumber(),
              highUb: new anchor.BN(
                program.account.rewardRange.highUb
              ).toNumber(),
              highLb: new anchor.BN(
                program.account.rewardRange.highLb
              ).toNumber(),
              mediumUb: new anchor.BN(
                program.account.rewardRange.mediumUb
              ).toNumber(),
              mediumLb: new anchor.BN(
                program.account.rewardRange.mediumLb
              ).toNumber(),
              lowUb: new anchor.BN(
                program.account.rewardRange.lowUb
              ).toNumber(),
              lowLb: new anchor.BN(
                program.account.rewardRange.lowLb
              ).toNumber(),
            },
          },
        }));
      return {
        ...state,
        loading: false,
        bountyProgramsState: bountyPrograms,
        endedBountyPrograms: endedBountyPrograms,
      };

    case CREATE_BOUNTY_PROGRAM_SUCCESS:
    case UPDATE_BOUNTY_PROGRAM_SUCCESS:
    case DELETE_BOUNTY_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };

    case GET_BOUNTY_PROGRAMS_FAIL:
    case CREATE_BOUNTY_PROGRAM_FAIL:
    case UPDATE_BOUNTY_PROGRAM_FAIL:
    case DELETE_BOUNTY_PROGRAM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //clear bounty programs
    case CLEAR_BOUNTY_PROGRAMS:
      return {
        ...state,
        bountyProgramsState: [],
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        msg: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
