import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://expenses-calculator.herokuapp.com",
});

axiosAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("loginToken");
  if (!req.headers.Authorization && token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

axiosAPI.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAPI;
