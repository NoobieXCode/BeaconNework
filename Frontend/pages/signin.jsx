import { useState } from "react";
import HighlightText from "../components/HighLightText";
import { toast, Toaster } from "react-hot-toast";
import React from 'react'
import { ArrowRight } from 'lucide-react'
import signin from '../src/assets/signin.png'
import { useEffect } from "react";




export function SignIn() {
  const handleCallbackResponse = (response) => {
      console.log("jwt id token" + response.credential);
      localStorage.setItem("googletoken",response.credential);
      toast.success("SignIn successful")
      setTimeout(() => {
        window.location.reload();
        window.location.href = '/';
      },2000);
  };

  useEffect(() => {
    const google = window.google;

    google.accounts.id.initialize({
      client_id: "537879712076-f6bbqkf0gmo76hs5lba72qklkvc8no02.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('sign-in-div'), {
      theme: 'outline',
      size: '100%',
      width: '600px'
      });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div>
        <Toaster />
      </div>
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img src={signin} style={{height:'80px'}}></img>
          </div>
          <h2  style={{fontFamily: 'Playfair Display'}}className="text-center text-4xl font-bold leading-tight text-black">
            <HighlightText text={"Sign in to your Account"} />
          </h2>
          <p  className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}
            <a
              href="/signup"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </a>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-#084C98 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
              setEmail(e.target.value);
            }}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <a href="/forgot-password" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-#084C98 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
              setPassword(e.target.value);
            }}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  style={{background:'#084C98'}}
                  className="inline-flex mb-4 w-full items-center justify-center rounded-md  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={() => {
                        fetch("http://localhost:3000/user/signin", {
                          method: "POST",
                          body: JSON.stringify({
                            email,
                            password,
                          }),
                          headers: {
                            "Content-type": "application/json",
                          },
                        })
                          .then(async function (res) {
                              if(res.ok){
                                const json = await res.json();
                                toast.success("Sign In successful");
                                const token=json.token;
                                localStorage.setItem('jsonwebtoken',token);
                                setTimeout(() => {
                                  window.location.reload();
                                  window.location.href = '/';
                                }, 1000);
                              }
                              else{
                                throw new Error();
                              }
                          })
                          .catch((e) => {
                            toast.error("Incorrect username or password");
                          });
                        }}
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
                <div id="sign-in-div" className="flex w-full justify-center items-center"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
