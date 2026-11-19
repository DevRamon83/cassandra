import { useContext, useState, type SubmitEvent } from "react";
import { authSchema, z } from "../../../shared";
import authHandler from "../api/handlers/authHandler";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useAuthErrors } from "../hooks/useAuthErrors";
import type { AuthError } from "../typings/interfaces";
import { errorCodes } from "../constants/errorCodes";
import AuthEndpoint from "../ui/AuthEndpoint";

export default function Auth() {
  const [type, setType] = useState("login");
  const [button, setButton] = useState("send");
  const { errorHandler, errors, errorRes, setErrorRes } = useAuthErrors();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handler = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (button !== "send") return;
    setButton("wait");
    const rawData = Object.fromEntries(new FormData(e.currentTarget));

    const result = authSchema.safeParse(rawData);

    if (!result.success) {
      setButton("send");
      const fieldErrors = z.flattenError(result.error).fieldErrors as AuthError;
      errorHandler(fieldErrors);
      return;
    }

    const res = await authHandler(result.data);

    if (res.error) {
      setButton("send");
      setErrorRes(res.errorMessage);
      return;
    }

    setButton("success");
    setAuth(res.data);
    navigate("/dashboard");
  };
  return (
    <>
      <AuthEndpoint type={type} setType={setType} />

      <form onSubmit={handler}>
        <input name="endpoint" value={type} type="hidden" />
        <input name="username" type="text" placeholder="username"></input>
        {errors.username && errorCodes[errors.username[0]]}
        <input name="psw" type="text" placeholder="password"></input>
        {errors.psw && errors.psw[0]}
        <button type="submit">{button}</button>
      </form>
      {errorRes}
    </>
  );
}
