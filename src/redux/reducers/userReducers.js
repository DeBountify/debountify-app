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
import * as anchor from "@project-serum/anchor";

export const userReducer = (
  state = {
    loading: false,
    userState: {},
    is_authenticated: false,
    msg: null,
    balance: null,
    companyUserState: {}, //fetch company user state for bug reports
  },
  action
) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
    case GET_USER_PROFILE_REQUEST:
    case CREATE_USER_PROFILE_REQUEST:
    case UPDATE_USER_PROFILE_REQUEST:
    case GET_ALL_USER_PROFILES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        userState: {},
        is_authenticated: false,
      };

    case GET_USER_PROFILE_SUCCESS:
      const userData = action.payload;
      userData.bountyEarned = new anchor.BN(userData.bountyEarned).toNumber();
      return {
        ...state,
        loading: false,
        userState: userData,
        is_authenticated: true,
      };

    case GET_ALL_USER_PROFILES_SUCCESS:
      const companyData = action.payload
        .filter((data) => data?.account?.userType === "Company")
        .map((user) => ({
          ...user,
          account: {
            ...user.account,
            bountyEarned: new anchor.BN(user.account.bountyEarned).toNumber(),
          },
        }));
      const hackerData = action.payload
        .filter((data) => data?.account?.userType === "Hacker")
        .map((user) => ({
          ...user,
          account: {
            ...user.account,
            bountyEarned: new anchor.BN(user.account.bountyEarned).toNumber(),
          },
        }));
      return {
        ...state,
        loading: false,
        companyUserState: companyData,
        hackerUserState: hackerData,
      };

    case CREATE_USER_PROFILE_SUCCESS:
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };

    case LOGOUT_FAIL:
    case GET_USER_PROFILE_FAIL:
    case CREATE_USER_PROFILE_FAIL:
    case UPDATE_USER_PROFILE_FAIL:
    case GET_ALL_USER_PROFILES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        is_authenticated: false,
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
