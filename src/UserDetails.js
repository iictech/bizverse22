import logo from './logo.png';
import { useEffect, useState } from 'react';
import {db,auth, onAuthStateChanged, doc, setDoc, getDoc} from "./firebase";
import {useNavigate} from 'react-router-dom';
import { nanoid } from 'nanoid';
export default function SignUp() {
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [evgId,setEvgId] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: {
      first: '',
      last: '',
    },
    email: '',
    number: false,
    gender: false,
    college: false,
    college_id: false,
    department: false,
    city: false,
    state: false,
    reg_events:{
      brain_it_out: false,
      ipr_workshop: false,
      hackathon: {
        is_registered: false,
        is_lead: false,
        team_id: '',
      },
      logo_and_poster: false
    }
  });
  async function updateUser(){
    try {
      await setDoc(doc(db, "users", userId), {...userDetails,
      evg_id: evgId
      });
    } catch (error) {
      setError('Something went wrong... please try again');
    }
  }
  function saveUserDetails(){
    let e = true
    Object.values(userDetails).forEach(value=>{
      if(!value){
        setError('Please fill all the details');
        e = false;
      }
    });
    if(e){
    setError('');
    setMessage('Saving your details...');
     updateUser().then(async ()=>{
       await fetch(`https://mail-micros.herokuapp.com/register?evgId=${evgId}`,{
        method: 'POST'
       })
          setMessage('Your details have been saved');
          navigate('/dashboard');
        }).catch(()=>{
          setError('Something went wrong... please try again');
        })
    }
  }
  useEffect(()=>{
    setEvgId('22EVG'+nanoid(3).replace('-','Z').replace('_','X').toUpperCase()+Date.now().toString().substr(7));
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        setUserId(user.uid)
        setUserDetails({...userDetails,email:user.email});
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          if(docSnap.data()?.evg_id){
               navigate('/dashboard')
          }
        }
      }
    });
  },[])
    return (
      <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">Complete Your Registration</h2>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="space-y-6">
              <div>
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
               First Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your full name"
                  onChange={(e)=>{setUserDetails({...userDetails,name:{...userDetails.name,first:e.target.value}})}}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
               Last Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your full name"
                  onChange={(e)=>{setUserDetails({...userDetails,name:{...userDetails.name,last:e.target.value}})}}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  value={userDetails.email}
                  onChange={(e)=>{setUserDetails({...userDetails,email:e.target.value})}}
                  disabled
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  maxLength="10"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your phone number"
                  onChange={(e)=>{setUserDetails({...userDetails,number:e.target.value})}}
                />
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue="Other"
                onChange={(e)=>{setUserDetails({...userDetails,gender:e.target.value})}}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="" className="block text-sm font-medium text-gray-700">
                College
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your college name"
                  onChange={(e)=>{setUserDetails({...userDetails,college:e.target.value})}}
                />
              </div>
            </div>

            <div>
              <label htmlFor="" className="block text-sm font-medium text-gray-700">
                College ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your college ID"
                  onChange={(e)=>{setUserDetails({...userDetails,college_id:e.target.value})}}
                />
              </div>
            </div>
                
            <div>
              <label htmlFor="" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your college department"
                  onChange={(e)=>{setUserDetails({...userDetails,department:e.target.value})}}
                />
              </div>
            </div>

            <div>
              <label htmlFor="" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your college  city"
                  onChange={(e)=>{setUserDetails({...userDetails,city:e.target.value})}}
                />
              </div>
            </div>

            <div>
              <label htmlFor="" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your college state"
                  onChange={(e)=>{setUserDetails({...userDetails,state:e.target.value})}}
                />
              </div>
            </div>

            <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={()=>{saveUserDetails()}}
                >
                  Save and Continue
                </button>
              </div>

              <div className="mt-1 text-center text-red-800">
                {error}
              </div>

              <div className="mt-1 text-center text-green-800">
                {message}
              </div>
           
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  