"use client";
import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { axiosInstance } from "@/config/axiosConfig";
import Cookies from "js-cookie";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [state, setState] = useState({
    user: {},
    name: "",
    token: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        if (token && token !== state.token) {
          const response = await axiosInstance.get("/user/verify"); // Replace "/api/user" with your actual API endpoint
          setState({
            user: response.data,
            name: response.data.name,
            token: response.data.token,
          });
        }
      } catch (error) {
        localStorage.clear();
        Cookies.remove("token");
        console.log("currently we are facing error");
      }
    };

    fetchData();
  }, [router, state.token]);

  // Adding token in the config
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.API_URL; // now I remove baseURl from everywhere and it works
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; //now I can remove header section it works

  // Adding axios interceptor request -> when token is expired then the user will force logout
  axios.interceptors.response.use(
    function (response) {
      // if everything is fine then I don't have to do anything
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status == 401 && req.config && !res.config._isRetryRequest) {
        setState(null);
        localStorage.clear(); // remove the user from localstorage
      }
    }
  );
  //console.log(state);
  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
