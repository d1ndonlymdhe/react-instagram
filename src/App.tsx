import React, { ChangeEventHandler, useEffect, useRef } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import SignUpPage from './Signup/Signup';
import './App.css';
import { Input } from './Components/Input';
import { Button } from './Components/Button';
import Error from './Components/Error';
import Setup from './Setup/Setup';
import { useState } from 'react';
import axios from 'axios';
import { server } from './vars/vars';
import Cookies from 'js-cookie';
// import { withCredentialsAxios } from './vars/vars';

function App() {
  const [globalUsername, setGlobalUsername] = useState("")
  useEffect(() => {
    document.title = "Instagram";
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Index {...{ setGlobalUsername, globalUsername }} />}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/setup" element={<Setup></Setup>}></Route>
      </Routes>
    </>
  )
}
function Index(props: LoginPageProps) {
  const { setGlobalUsername, globalUsername } = props;
  const buttonColorBlocked = 'bg-[#afdcf9]';
  const buttonColorAvialable = 'bg-[#0095f6]';
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loginButtonColor, setLoginButtonColor] = useState(buttonColorBlocked)
  const [isLoginButtonActive, setIsLoginButtonActive] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [hash, setHash] = useState("");
  useEffect(() => {
    if (loginSuccess) {
      Cookies.set("hash", hash);
      window.location.href = "/setup";
    }
  }, [loginSuccess, hash]);
  const setLoginButtonColorOnChange = (e: ChangeEventHandler) => {
    if (usernameRef.current?.value && usernameRef.current.value.length > 0 && passwordRef.current?.value && passwordRef.current.value.length >= 8) {
      setLoginButtonColor(buttonColorAvialable);
      setIsLoginButtonActive(true);
    } else {
      setLoginButtonColor(buttonColorBlocked);
      setIsLoginButtonActive(false);
    }
  }
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoginButtonActive) {
      const username = usernameRef.current?.value;
      if (username !== undefined) {
        setGlobalUsername(username);
      }
      const password = passwordRef.current?.value;
      if (username !== undefined && password !== undefined) {
        axios.post(`${server}/login`, { username: username, password: password }).then(res => {
          if (res.data.status === "error") {
            setLoginError(res.data.message.text);
          } else {
            setLoginError("");
            setGlobalUsername(username);
            setLoginSuccess(true);
            setHash(res.data.message.hash);
          }
        });
      } else {
        setLoginError("Enter a username and password");
      }
    }
  }
  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.location.href = "/signup";
  }
  return (

    <div className='w-screen h-screen flex flex-row justify-center items-center'>
      <div className='w-[95%] h-fit flex flex-row justify-center items-center md:border-gray-200 border-solid border-2 max-w-[350px]'>
        <div className="my-5 flex flex-col justify-center items-center content-center w-full max-w-[300px]">
          <div className='font-billabong text-5xl mb-10'>Instagram</div>
          {(loginError !== "") && <Error message={loginError} className={`my-5 w-[98%] text-center py-2`}></Error>}
          <div id="loginContainer" className='w-full'>
            <form onSubmit={(e) => {
              e.preventDefault();
              //@ts-ignore
              handleLogin(e)
            }}>
              <div id="loginFormWrapper" className='flex flex-col justify-around items-center content-center w-full'>
                <Input name="username" ref={usernameRef} autoFocus={true} placeholder="Username" type="text" className='w-full h-8 mb-2 pl-2' onChange={setLoginButtonColorOnChange}></Input>
                <Input name="password" ref={passwordRef} placeholder="Password" type="password" className='w-full h-8 pl-2' onChange={setLoginButtonColorOnChange}></Input>
                <Button type="submit" text='Log in' className={`${loginButtonColor} w-full my-2 py-1`} bonClick={handleLogin}></Button>
              </div>
            </form>
          </div>
          <div id="signupContainer" className='w-full flex flex-col justify-center items-center'>
            <div id="---Or----" className='grid grid-cols-[4fr_2fr_4fr] w-full justify-items-center items-center'>
              <div className='h-[2px] border-2 border-solid border-gray-200 w-full'></div>
              <div>or</div>
              <div className='h-[2px] border-2 border-solid border-gray-200 w-full'></div>
            </div>
            <div id="signupButtonWrapper">
              <Button text="Sign Up" bonClick={handleSignup} className={`my-2 bg-neutral border-[1px] rounded-md border-black py-2 hover:bg-gray-300`}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default App;
