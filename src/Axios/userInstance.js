import axios from "axios";

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_ROUTE,
});

userInstance.interceptors.request.use(
  (config) => {
 
    const userToken = localStorage.getItem("userAccessToken");
    console.log(userToken)
    const extractedToken = userToken
      ? JSON.parse(userToken).userAccessToken
      : null;

    if (extractedToken) {

      config.headers.Authorization = `Bearer ${extractedToken}`;
    }

    return config;
  },
  (error) => {
    console.log("Error in Axios interceptor request", error);
    return Promise.reject(error);
  }
);

userInstance.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Error in Axios interceptor response", error);
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem("accessToken");
      } else {
        console.log("Error:", error.response.data);
      }
    } else {
      console.log("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
