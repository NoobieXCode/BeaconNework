import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout.jsx'
import {Home}  from '../components/Home/Home.jsx'
import { SignIn } from '../pages/signin.jsx'
import { Signup } from '../pages/signup.jsx'
import { VerifyEmail } from '../pages/verifyEmail.jsx'
import { ForgotPassword } from '../pages/forgot-password.jsx'
import { ContactUs } from '../components/ContactUs.jsx/ContactUs.jsx'
import { About } from '../components/About.jsx/About.jsx'
import { Products } from '../components/Products/Products.jsx'
import { Provider } from 'react-redux'
import rootReducer from './reducer/index.js'
import { configureStore } from '@reduxjs/toolkit'
import { ChangePassword } from '../pages/changePassword.jsx'
import { RegisterEmail } from '../pages/registerEmail.jsx'
import { Verifyregisteredemail } from '../pages/verifyregisteredemail.jsx'
import {Auth0Provider} from "@auth0/auth0-react"


const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout></Layout>,
    children:[
      {
        path:"",
        element:<Home></Home>
      },
      {
        path:"contact-us",
        element:<ContactUs></ContactUs>
      },
      {
        path:"about",
        element:<About></About>
      },
      {
        path:"products",
        element:<Products></Products>
      },
      {
        path:'signin',
        element:<SignIn></SignIn>
      },
      {
        path:'signup',
        element:<Signup></Signup>
      },
      {
        path:'verify-email',
        element:<VerifyEmail></VerifyEmail>
      },
      {
        path:'/verifyemail',
        element:<Verifyregisteredemail></Verifyregisteredemail>
      },
      {
        path:'forgot-password',
        element:<ForgotPassword></ForgotPassword>
      },
      {
        path:'change-password',
        element:<ChangePassword></ChangePassword>
      },
      {
        path:'registeremail',
        element:<RegisterEmail></RegisterEmail>
      }
    ]
  }

])


const store = configureStore({
  reducer:rootReducer
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-1hnvhis1u72f88qh.us.auth0.com"
    clientId="1AhH2U697OmL79TjE3pExoviF1KDVPFD"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
  </Auth0Provider>
)
 