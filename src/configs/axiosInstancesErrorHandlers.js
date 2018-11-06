import { SubmissionError } from "redux-form";

// Generic Function To Catch Errors Occur in Axios Request.
export function handleAxiosErrors(error) {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx.
    // Just know that in here we have access to "error.response.status", "error.response.headers", "error.request", etc...
    if (error.response.data.errMsg) {
      // Catching specific errors sent in our API.
      return error.response.data.errMsg;
    } else {
      // Catching Genreic Error
      return error.message;
    }
  } else if (error.request) {
    // The request was made but no response was received.
    return "Network Error Occured. Try Again.";
  } else {
    // Something happened in setting up the request that triggered an Error.
    return error.message;
  }
}

/* By default when error occured "redux-promise-middlware" dispatch "XXXX_REJECTED" action. But that actual promise rejection doesn't
 * get catch by it. So we use this function to handle that ""uncaught promise"" after "XXXX_REJECTED" action dispatch is done.
*/
export async function axiosBaseDefaultErrorHandler(error) {
  // In this case we just "console.log" errors. Because for now we are handling errors and changing state using "XXX_REJECTED" action in reducers.
  if (process.env.NODE_ENV === "development") {
    console.log(
      `Error Occured While Making A Request To ${error.request &&
        error.request.responseURL + " " + error.request.status} ==> ` +
        handleAxiosErrors(error)
    );
  }
}

// Throwing specific errors using "SubmissionError" that compatible with redux-form.
export async function axiosBaseReduxFormErrorHandler(error) {
  // In this case we are directly handling errors in here. Becuase we don't have access to "Redux Forms" Reducer to handle it there.

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
