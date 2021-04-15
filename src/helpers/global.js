import Axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "02bec15caa31e4b13df1a47a86fb0f1e";

export const axiosGlobal = Axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  params: {
    api_key: API_KEY,
  },
});

export const minutesToHours = (minutes) => {
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return `${h}h ${m}m`;
};
