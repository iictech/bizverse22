import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, updateProfile } from "./firebase";
export default function SignUp() {
    const navigate = useNavigate(); 
    const [authD,setauthD] = useState({
      name: false,
      email: false,
      password: false,
      password2: false,
      phoneNumber: false,
    });

    const [error,setError] = useState('');
    const [message, setMessage] = useState('');
    
    function signUp(authD){
      setMessage('Signing up...');
      if(authD.name && authD.email && authD.phoneNumber && authD.password && authD.password2){
        if(authD.password === authD.password2){
          createUserWithEmailAndPassword(auth,authD.email, authD.password)
        .then(() => {
          // Signed in 
          updateProfile(auth.currentUser, {
            displayName: authD.name,phoneNumber: authD.phoneNumber
          }).then(() => {
            // Profile updated!
            // ...
            navigate('/dashboard');
          }).catch((error) => {
            setError(error)
          });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + ' ' + errorMessage);
          // ..
        });
        } else {
          setError('Password does not match');
        }
      } else {
        setError('Please fill all the fields')
      }
    }
    return (
      <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          {/* <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>
          </div> */}
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="space-y-6">
              <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e)=>{
                        setauthD({...authD,name:e.target.value})
                      }}
                    />
                  </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone No.
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="tel"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e)=>{
                        setauthD({...authD,phoneNumber:e.target.value})
                      }}
                    />
                  </div>
              </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e)=>{
                        setauthD({...authD,email:e.target.value})
                      }}
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e)=>{
                        setauthD({...authD,password:e.target.value})
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Repeat Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password2"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e)=>{
                        setauthD({...authD,password2:e.target.value})
                      }}
                    />
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={()=>{signUp(authD)}}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="mt-1 text-red-800">
                  {error}
                </div>
                <div className="mt-1 text-green-800">
                  {message}
                </div>
              </div>
  
              {/* <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
  
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div>
                     <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span>Sign in with Google</span>
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </>
    )
  }
  