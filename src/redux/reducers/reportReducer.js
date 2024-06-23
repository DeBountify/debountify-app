import {
  ACCEPT_BUG_REPORT_FAIL,
  ACCEPT_BUG_REPORT_REQUEST,
  ACCEPT_BUG_REPORT_SUCCESS,
  CLEAR_BUG_REPORTS,
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

export const reportReducer = (
  state = {
    loading: false,
    reportState: [],
    msg: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_BUG_REPORTS_REQUEST:
    case CREATE_BUG_REPORT_REQUEST:
    case ACCEPT_BUG_REPORT_REQUEST:
    case REJECT_BUG_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_BUG_REPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        reportState: action.payload,
      };

    case CREATE_BUG_REPORT_SUCCESS:
    case ACCEPT_BUG_REPORT_SUCCESS:
    case REJECT_BUG_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };

    case GET_BUG_REPORTS_FAIL:
    case CREATE_BUG_REPORT_FAIL:
    case ACCEPT_BUG_REPORT_FAIL:
    case REJECT_BUG_REPORT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_BUG_REPORTS:
      return {
        ...state,
        reportState: [],
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
