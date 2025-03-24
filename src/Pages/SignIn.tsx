import base from "@/API/BaseApi";
import { API_ENDPOINTS } from "@/API/EndPoints";
import { LoginForm } from "@/components/login-form";
import { setUser } from "@/store/slices/auth";
import { setToken } from "@/store/slices/auth/tokenSlice";
import { useAppDispatch } from "@/store/storeSetup";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import React from 'react'

const SignIn = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [onError, setOnError] = useState<boolean>(false);
  const [onErrorMessage, setOnErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const validateEmail = (email: string) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const val = emailRegex.test(email);
    return val;
  };

  const handleLogin = async () => {
    setOnError(false);
    if (!Username || !validateEmail(Username)) {
      //
      setOnError(true);
      return setOnErrorMessage("Invalid email format");
    }
    if (!Password) {
      setOnError(true);
      return setOnErrorMessage("Invalid Password");
    }

    try {
      setLoading(true);
      const { data } = await base.post(
        API_ENDPOINTS.LOGIN_API,
        {
          email: Username,
          password: Password,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(
        setToken({ access: data?.access_token, refresh: data?.refresh_token })
      );
  

      dispatch(
        setUser({
          email:data.user.email,
          id:data.user.id,
          userName:data.user.name,
        })
      )
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm
          loading={loading}
          Password={Password}
          setPassword={setPassword}
          Username={Username}
          setUsername={setUsername}
          handleOnSubmit={handleLogin}
          onErrorMessage={onErrorMessage}
          onError={onError}
        />
      </div>
    </div>
  );
};

export default SignIn;
