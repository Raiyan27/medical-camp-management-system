import axios from "axios";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
});
const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      } else {
        console.log("no token found");
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
