import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";




// Create Axios instance
const AxiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://redleaf-bd-backend.vercel.app/",
});

// Custom hook to use the Axios instance
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  // request interceptor to add authorization header for every 
  AxiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    // console.log('request stopped by interceptors', token)
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // intecept 401  and 403 status
  AxiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    // Don't log out on 403 for admin check endpoint - 403 is expected for non-admin users
    if (status === 401 || (status === 403 && !url?.includes('/users/admin/'))) {
      await logOut();
      navigate('/login')
    }
    return Promise.reject(error);
  })
  return AxiosSecure;
};

export default useAxiosSecure;