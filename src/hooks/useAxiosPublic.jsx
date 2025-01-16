import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://medical-camp-management-server-zeta.vercel.app/",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
