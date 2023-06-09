// ** React Imports
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";

// ** Config
import authConfig from "src/config/auth";
import { AlertContext } from "./AlertContext";











// ** Defaults
const defaultProvider = {
  user: null,
  // user: { name: 'Roshan' },
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  setIsInitialized: () => Boolean,

  handleLogin: () => Promise.resolve(),
  handleRegistration: () => Promise.resolve(),

};
export const AuthContext = createContext(defaultProvider);


export const AuthProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(0)

  const { showAlert } = useContext(AlertContext);



  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState(
    defaultProvider.isInitialized
  );

  // ** Hooks
  const router = useRouter();
  useEffect(() => {

    const initAuth = async () => {
      setIsInitialized(true);
      const storedToken =
        "Bearer " + window.localStorage.getItem(authConfig.storageTokenKeyName);

      if (storedToken && window.localStorage.getItem(authConfig.storageTokenKeyName)) {
        setLoading(true);
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken,
            },
          })
          .then(async (response) => {
            setLoading(false);
            // console.log(response)
            setUser({ ...response.data });
          })
          .catch(() => {
            localStorage.removeItem("userData");
            // localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            setUser(null);
            setLoading(false);
            router.reload()
          });
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, [refresh]);




  const refreshAuth = () => {
    setRefresh(refresh + 1)
  }






  const handleLogin = (params, userData) => {
    const data = [];
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(authConfig.loginEndpoint, params, { headers: headers })
      // .post(authConfig.loginEndpoint, { email: 'admin@gmail.com', password: 'password' }, { headers: headers })
      .then(async (res) => {
        // window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
        data["message"] = "success";
        data["data"] = res;
        // console.log("##########################################################", res)
        // userData(data);
        window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          res.data.accessToken
        );
      })
      .then(() => {
        axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization:
                "Bearer " +
                window.localStorage.getItem(authConfig.storageTokenKeyName),
            },
          })
          .then(async (response) => {
            const returnUrl = router.query.returnUrl;
            const url = router.asPath;

            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", response)



            // if (response.data.data.data.name == '' || response.data.data.data.email == '' || response.data.data.data.mobileNo == '') {
            //   router.replace('/account/details')
            // } else {

            if (url.includes('/admin/login') && response.data.role !== "[ADMIN]") {
              // The URL contains "/admin/login"
              data["message"] = "failedType";
              userData(data);
              window.localStorage.clear()
              // console.log('Admin login page');
              showAlert(
                'error',
                'Please Login with Admin credintials',
                () => {
                  // console.log('Please Login with Admin credintials');
                  data["message"] = "failedtype";
                  // data["type"] = 0; /* show in email field */
                  // data["error"] = err.response.data;
                  userData(data);
                  // return
                }
              )
            } else if (!url.includes('/admin/login') && response.data.role !== "[USER]") {
              data["message"] = "failedType";
              userData(data);
              window.localStorage.clear()
              showAlert(
                'error',
                'Please Login with User credintials',
                () => {
                },
                () => {
                },
                () => {
                }
              )

            }
            else {
              // The URL does not contain "/admin/login"
              // console.log('Not admin login page');

              setUser({ ...response.data });

              await window.localStorage.setItem(
                "userData",
                JSON.stringify(response.data)
              );

              if (returnUrl == undefined) {
                if (response.data.role == "[ADMIN]") {
                  router.replace('/admin/booking')
                } else {
                  router.reload();
                }
                // console.log(response.data.role)
              } else {
                const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
                router.replace(redirectURL)
              }

            }


            // }
          });
      })
      .catch((err) => {
        // console.log(err)

        if (err.response.status == 400) {
          data["message"] = "failed";
          data["type"] = 0; /* show in email field */
          data["error"] = err.response.data;
          userData(data);
        } else if (err.response.status == 404) {
          data["message"] = "failed";
          data["type"] = 0; /* show in email field */
          data["error"] = err.response.data;
          userData(data);
        } else if (err.response.status == 401) {
          data["message"] = "failed";
          data["type"] = 1; /* show in password field */
          data["error"] = err.response.data;
          userData(data);
        } else {
          data["message"] = "network-error";
          data["type"] = 0; /* show in email field */
          data["error"] = "some thing went wrong";
          userData(data);
        }
      });
  };


  const handleRegistration = (params, userData) => {
    // console.log(params)
    // return
    const data = [];
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(authConfig.registrationEndpoint, params, { headers: headers })
      .then(async (res) => {
        window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          res.data.accessToken
        );
        data["message"] = "success";
        data["data"] = res;
        userData(data);
      })
      .catch((err) => {
        // console.log('from catch:', err)
        if (err.response.status == 410 ||
          err.response.status == 400 ||
          err.response.status == 401) {
          data["message"] = "failed";
          data["type"] = 0; /* show in email field */
          data["error"] = err.response.data;
          userData(data);
        }
        else {
          data["message"] = "network-error";
          data["type"] = 0; /* show in email field */
          data["error"] = "some thing went wrong";
          userData(data);
        }
        // if (err.response.status == 409) {
        //   data["message"] = "failed";
        //   data["type"] = 0; /* show in email field */
        //   data["error"] = err.response.data;
        //   userData(data);
        // } else if (err.response.status == 404) {
        //   data["message"] = "failed";
        //   data["type"] = 0; /* show in email field */
        //   data["error"] = err.response.data;
        //   userData(data);
        // } else if (err.response.status == 401) {
        //   data["message"] = "failed";
        //   data["type"] = 1; /* show in password field */
        //   data["error"] = err.response.data;
        //   userData(data);
        // } else {


        //   data["message"] = "network-error";
        //   data["type"] = 0; /* show in email field */
        //   data["error"] = "some thing went wrong";
        //   userData(data);
        // }
      });
  };


















  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    refreshAuth: refreshAuth,

    handleLogin: handleLogin,
    handleRegistration: handleRegistration,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  const {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    refreshAuth: refreshAuth,

    handleLogin: handleLogin,
    handleRegistration: handleRegistration,

  } = useContext(AuthContext)

  return useMemo(() => ({
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    refreshAuth,

    handleLogin,
    handleRegistration,
  }), [
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    refreshAuth,

    handleLogin,
    handleRegistration,
  ])
}
