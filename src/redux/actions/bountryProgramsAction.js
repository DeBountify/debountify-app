import {
  createBountyProgram,
  endBountyProgram,
  getBountyPrograms,
  updateBountyProgram,
} from "@/hooks/deBountify_utils";
import {
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

// get all bounty programs
export const getAllBountyPrograms = (wallet) => async (dispatch) => {
  try {
    dispatch({ type: GET_BOUNTY_PROGRAMS_REQUEST });
    const data = await getBountyPrograms(wallet);
    dispatch({
      type: GET_BOUNTY_PROGRAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOUNTY_PROGRAMS_FAIL,
      payload: error,
    });
  }
};

// create bounty program
export const createBountyProgramAction =
  (wallet, programCount, data) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BOUNTY_PROGRAM_REQUEST });
      const response = await createBountyProgram(wallet, programCount, data);
      dispatch({
        type: CREATE_BOUNTY_PROGRAM_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BOUNTY_PROGRAM_FAIL,
        payload: error,
      });
    }
  };

// update bounty program
export const updateBountyProgramAction = (wallet, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BOUNTY_PROGRAM_REQUEST });
    const response = await updateBountyProgram(wallet, data);
    dispatch({
      type: UPDATE_BOUNTY_PROGRAM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BOUNTY_PROGRAM_FAIL,
      payload: error,
    });
  }
};

// delete bounty program
export const deleteBountyProgramAction = (wallet, data) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOUNTY_PROGRAM_REQUEST });
    const response = await endBountyProgram(wallet, data);
    dispatch({
      type: DELETE_BOUNTY_PROGRAM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOUNTY_PROGRAM_FAIL,
      payload: error,
    });
  }
};

//clear errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

// clear messages
export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
