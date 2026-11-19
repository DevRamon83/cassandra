import { useState } from "react";
import type { AuthError } from "../typings/interfaces";

export const useAuthErrors = () => {
  const [errors, setErrors] = useState<AuthError>({
    username: undefined,
    psw: undefined,
    endpoint: undefined,
  });
  const [errorRes, setErrorRes] = useState<null | string>(null);

  const errorHandler = (errorsData: AuthError) => {
    setErrors(errorsData);
  };

  return { errorHandler, errors, errorRes, setErrorRes };
};
