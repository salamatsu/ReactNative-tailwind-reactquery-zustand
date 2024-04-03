import { useMutation } from "react-query";
import { loginCashierApi } from "../api/auth";

export const useLogin = ({ ...props }) => {
  return useMutation({
    mutationFn: loginCashierApi,
    ...props,
  });
};
