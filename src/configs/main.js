/* Pass enviroment variables in pattern of "REACT_APP_XXXX=XXXXX" if want to override these.*/

/* 

"dotenv" package can't be used with "react-scripts@1.1.5" and need "react-scripts@2.0.0". But since this prject's storybook really depending on
"react-scripts@1.1.5"  upgrading it will be really messy and need lots of tweaks to make it work with tests..

So in this project just pass enviroment variables manually. (like export ABC=hello)

    //require("dotenv").config(); // Loading enviroment variables from ".env" file. Pass explicit values if want to override these.

*/

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

export const configsOf = enviroment => {
  return configs[enviroment];
};
