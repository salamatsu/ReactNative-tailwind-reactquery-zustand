import { axiosAuth } from "./axios";

export const loginCashierApi = async (payload) => {
  return await axiosAuth.post("/api/app/v1/auth/login", payload);
};
