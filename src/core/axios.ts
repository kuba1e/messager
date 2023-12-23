import axios from "axios";
import { BASE_URL } from "constants/api";
import { getLoginUrl, getRegistrationUrl } from "services/api";

const jwtToken = localStorage.getItem("token");

//http://localhost:8080/
//https://hiyocky.herokuapp.com/'
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: jwtToken ? `Bearer ${jwtToken}` : "",
    // "X-Custom-Header": "foobar",
  },
});

instance.interceptors.response.use(function (response) {
  if (
    response.request.responseURL === `${BASE_URL}${getLoginUrl()}` ||
    response.request.responseURL === `${BASE_URL}${getRegistrationUrl()}`
  ) {
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data?.accessToken}`;
  }

  return response;
});

export default instance;
