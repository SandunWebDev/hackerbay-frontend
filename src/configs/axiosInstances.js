import axios from "axios";
import config from "./main";

import { SubmissionError } from "redux-form";

export const axiosBase = axios.create({
  baseURL: config.API.baseURL
});

/* By default when error occured "redux-promise-middlware" dispatch "XXXX_REJECTED" action. But that actual promise rejection doesn't
 * get catch by it. So we use this function to handle that ""uncaught promise"" after "XXXX_REJECTED" action dispatch is done.
*/
export async function axiosBaseDefaultErrorHandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx.
    console.log(
      "Error : ",
      error.message,
      error.response.data,
      error.response.status,
      error.response.headers
    );
  } else if (error.request) {
    // The request was made but no response was received.
    console.log("Error : No Response", error.message, error.request);
  } else {
    // Something happened in setting up the request that triggered an Error.
    console.log("Error : Request Error", error.message);
  }
}

// Throwing specific errors using "SubmissionError" that compatible with redux-form.
export async function axiosBaseReduxFromErrorHandler(error) {
  // The request was made and the server responded with a status code that falls out of the range of 2xx.
  if (error.response) {
    if (error.response.data.errMsg) {
      // Catching specific errors sent in our API.
      throw new SubmissionError({
        _error: error.response.data.errMsg
      });
    } else {
      throw new SubmissionError({
        _error: error.message
      });
    }
  }
  // The request was made but no response was received.
  else if (error.request) {
    throw new SubmissionError({
      _error: "Network Error Occured. Try Again."
    });
  }
  // Something happened in setting up the request that triggered an Error.
  else {
    throw new SubmissionError({
      _error: error.message
    });
  }
}
