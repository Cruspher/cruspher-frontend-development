import axios from "axios";

const axiosAuthorized = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosAuthorized.interceptors.request.use((req) => {
  const token = localStorage.getItem("Authorization");

  req.headers = {
    ...req.headers,
    Authorization: `Token ${token}`,
  };

  return req;
});

axiosAuthorized.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 403 || error.response.status === 401) {
    localStorage.removeItem("Authorization");
    window.location.reload();
    return Promise.reject(error);
  }
  throw error;
});


const axiosRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


export { axiosAuthorized, axiosRequest };
