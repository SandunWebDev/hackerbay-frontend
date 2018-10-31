import axios from "axios";
import config from "./main";

export const axiosBase = axios.create({
  baseURL: config.API.baseURL
});
