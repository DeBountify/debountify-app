import {
  acceptBugReport,
  createBugReport,
  getBugReportsUser,
  rejectBugReport,
} from "@/hooks/deBountify_utils";
import {
  ACCEPT_BUG_REPORT_FAIL,
  ACCEPT_BUG_REPORT_REQUEST,
  ACCEPT_BUG_REPORT_SUCCESS,
  CLEAR_ERROR,
  CLEAR_MESSAGES,
  CREATE_BUG_REPORT_FAIL,
  CREATE_BUG_REPORT_REQUEST,
  CREATE_BUG_REPORT_SUCCESS,
  GET_BUG_REPORTS_FAIL,
  GET_BUG_REPORTS_REQUEST,
  GET_BUG_REPORTS_SUCCESS,
  REJECT_BUG_REPORT_FAIL,
  REJECT_BUG_REPORT_REQUEST,
  REJECT_BUG_REPORT_SUCCESS,
} from "../constants/reportConstants";

// get bug reports
export const getBugReports = (wallet) => async (dispatch) => {
  try {
    dispatch({ type: GET_BUG_REPORTS_REQUEST });
    const data = await getBugReportsUser(wallet);
    dispatch({
      type: GET_BUG_REPORTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BUG_REPORTS_FAIL,
      payload: error,
    });
  }
};

// create bug report
export const createBugReportAction =
  (wallet, bugReportCount, data) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BUG_REPORT_REQUEST });
      const response = await createBugReport(wallet, bugReportCount, data);
      dispatch({
        type: CREATE_BUG_REPORT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BUG_REPORT_FAIL,
        payload: error,
      });
    }
  };

// accept bug report
export const acceptBugReportAction =
  (wallet, bugReport) => async (dispatch) => {
    try {
      dispatch({ type: ACCEPT_BUG_REPORT_REQUEST });
      const response = await acceptBugReport(wallet, bugReport);
      dispatch({
        type: ACCEPT_BUG_REPORT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: ACCEPT_BUG_REPORT_FAIL,
        payload: error,
      });
    }
  };

// reject bug report
export const rejectBugReportAction =
  (wallet, bugReport) => async (dispatch) => {
    try {
      dispatch({ type: REJECT_BUG_REPORT_REQUEST });
      const response = await rejectBugReport(wallet, bugReport);
      dispatch({
        type: REJECT_BUG_REPORT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: REJECT_BUG_REPORT_FAIL,
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
