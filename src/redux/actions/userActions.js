import {
  createProfile,
  fetchAllProfiles,
  getProfile,
  updateProfile,
} from "@/hooks/deBountify_utils";
import { CLEAR_BOUNTY_PROGRAMS } from "../constants/bountyPrograms";
import { CLEAR_BUG_REPORTS } from "../constants/reportConstants";
import {
  CLEAR_ERROR,
  CLEAR_MESSAGES,
  CREATE_USER_PROFILE_FAIL,
  CREATE_USER_PROFILE_REQUEST,
  CREATE_USER_PROFILE_SUCCESS,
  GET_ALL_USER_PROFILES_FAIL,
  GET_ALL_USER_PROFILES_REQUEST,
  GET_ALL_USER_PROFILES_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
} from "../constants/userConstants";
import { checkWalletBalance } from "./web3/userActions";

// logout
export const userLogout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch({
      type: CLEAR_BOUNTY_PROGRAMS,
    });
    dispatch({
      type: CLEAR_BUG_REPORTS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error,
    });
  }
};

// get user profile
export const getUserProfileDetails = (wallet) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });
    const data = await getProfile(wallet);
    data.walletBalance = await checkWalletBalance(data.user);

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: error,
    });
  }
};

// get all user profile
export const getAllUserProfile = (wallet) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_PROFILES_REQUEST });
    const data = await fetchAllProfiles(wallet);
    dispatch({
      type: GET_ALL_USER_PROFILES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_PROFILES_FAIL,
      payload: error,
    });
  }
};

// create user profile
export const createUserProfile = (wallet, data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_PROFILE_REQUEST });
    const response = await createProfile(wallet, data);
    dispatch({
      type: CREATE_USER_PROFILE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_PROFILE_FAIL,
      payload: error,
    });
  }
};

// update user profile
export const updateUserProfile = (wallet, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
    const response = await updateProfile(wallet, data);
    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
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
