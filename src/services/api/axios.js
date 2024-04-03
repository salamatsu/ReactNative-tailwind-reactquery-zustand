import axios from "axios";
import { useUserAuthStore } from "../../store/useUserAuthStore";

export const baseURL = {
  // DEV
  BASE_URL: "https://office.dynamicglobalsoft.com:1140",
};

export const axiosAuth = axios.create({
  baseURL: baseURL.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const getUsersValues = {
  admin: "ADMIN",
};

export const getUserToken = (user = getUsersValues.admin) => {
  return useUserAuthStore.getState();
};

const refreshtokenApi = (newInstance, error, user) => {
  const originalRequest = error.config;
  const { refreshToken, setUserInfo, setToken } = getUserToken(user);

  return newInstance
    .post("/api/app/v1/auth/refreshToken", { refreshToken })
    .then(({ data }) => {
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      originalRequest.headers["x-no-retry"] = "true";
      // Store the JWT and refresh tokens in session storage

      setUserInfo(data.data);
      setToken(data.accessToken);

      return newInstance(originalRequest)
        .then((response) => {
          // return response;
          return Promise.resolve(response);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    })
    .catch((err) => {
      return err;
    });
};

export const createAxiosInstanceWithInterceptor = (type = "data", user) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  if (type === "data") {
    headers["Content-Type"] = "application/json";
  } else {
    headers["content-type"] = "multipart/form-data";
  }

  const instance = axios.create({
    baseURL: baseURL.BASE_URL,
    headers,
  });

  instance.interceptors.request.use(async (config) => {
    try {
      const { token } = getUserToken(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error("Authorization token not found.");
      }
    } catch (error) {
      throw new Error(error);
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      if (
        error.response.status === 401 &&
        error.response?.data?.code === 2002
      ) {
        return refreshtokenApi(instance, error, user);
      } else {
        return Promise.reject(error);
      }
    }
  );

  return instance;
};
