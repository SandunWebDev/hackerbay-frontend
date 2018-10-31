/* Pass enviroment variables in pattern of "REACT_APP_XXXX=XXXXX" if want to override these.*/

const { NODE_ENV, REACT_APP_API_BASEURL } = process.env;

// All Configs
const configs = {
  development: {
    API: {
      baseURL: REACT_APP_API_BASEURL || "http://localhost:4000/"
    }
  },

  test: {
    API: {
      baseURL: REACT_APP_API_BASEURL || "http://localhost:4000/"
    }
  },

  production: {
    API: {
      baseURL: REACT_APP_API_BASEURL || "http://localhost:4000/"
    }
  }
};

export default configs[NODE_ENV];
