import { LoginUser } from "@/API/AUTH/Login";
import { LoginForm } from "@/components/login-form";


import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import React from 'react'

const SignIn = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [onError, setOnError] = useState<boolean>(false);
  const [onErrorMessage, setOnErrorMessage] = useState('');
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: LoginUser,
    onSuccess: () => {
      setOnError(false)
    },
    onSettled(data, error) {
      if(error){
        setOnError(true)
        setOnErrorMessage("Invalid Credentials")
      }
      if(data){
        navigate("/home")
        return console.log(data)
      }
    },
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const val= emailRegex.test(email);
    return val
  }

  const handleLogin = ()=>{
    setOnError(false)
    if(!Username || !validateEmail(Username)){
      //
      setOnError(true)
      return setOnErrorMessage("Invalid email format")
    }
    if(!Password){
      setOnError(true)
      return setOnErrorMessage("Invalid Password")
    }
    mutation.mutate({email:Username,password:Password})
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm
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
