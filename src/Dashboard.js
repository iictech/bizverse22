import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, 
  AcademicCapIcon,
IdentificationIcon,
ChipIcon,
LocationMarkerIcon,
MailIcon,
UsersIcon,
PhoneIcon} from '@heroicons/react/outline'
import logo from "./logo.png"
import { useEffect, useState } from 'react';
import {db,auth, onAuthStateChanged, doc, getDoc} from "./firebase";
import {useNavigate} from 'react-router-dom';
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Registered Events', href: '/registered-events', current: false },
  { name: 'All Events', href: '/all-events', current: false },
  { name: 'Calendar', href: '/calender', current: false },
  { name: 'Rules', href: '/rules', current: false },
]
const userNavigation = [
  { name: 'Sign out', href: '/sign-out' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [userData, setUserData]= useState({
    name: {
      first: '',
      last: ''
    },
    email: '',
    imageUrl: false,
    evg_id: 'Loading...',
  });
  useEffect(()=>{
    fetch('https://stormy-journey-29948.herokuapp.com/').then(()=>{
      console.log('Welcome to the dashboard');
      setTimeout(()=>{
        if(!auth.currentUser){
          navigate('/');
        }
      },2000)
    })
    
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        setUserId(user.uid)
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData({
            name: {
              first: user.displayName.split(' ')[0],
              last: user.displayName.split(' ')[1]
            },
            email: user.email,
            imageUrl: user.photoURL,
            ...docSnap.data(),
          })
        } else {
          console.log("User Not Found");
          navigate('/');
        }
      }
    });
  },[])
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <a href='/'>
                          <img
                            className="h-8 w-8"
                            src={logo}
                            alt=""
                          />
                          </a>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>

                          {/* Profile dropdown */}
                          <Menu as="div" className="ml-3 relative">
                            <div>
                              <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={userData.imageUrl} alt="" />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="px-2 py-3 space-y-1 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={userData.imageUrl || logo} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{userData.name.first + ' ' + userData.name.last}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{userData.email}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Welcome {userData.name.first + ' ' + userData.name.last}</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <div className="text-center p-4 border-4 border-dashed border-gray-200 rounded-lg text-xl font-semibold ">
                <div className="mt-5 font-bold">
                EVG ID : {userData.evg_id}
                </div>
                <div className="mt-2 text-lg">
                Your Details
                <div className="flex flex-wrap p-4 justify-evenly text-xl">
                  <div className='flex p-4 items-center justify-center flex-col'>
                  <AcademicCapIcon className="h-6 w-6" aria-hidden="true"/>
                  <p>College : {userData.college}</p>
                  </div>

                  <div className='flex p-4 items-center justify-center flex-col'>
                  <IdentificationIcon className="h-6 w-6" aria-hidden="true"/>
                  <p>College ID : {userData.college_id}</p>
                  </div>

                  <div className='flex p-4 items-center justify-center flex-col'>
                  <ChipIcon className="h-6 w-6" aria-hidden="true"/>
                  <p>Department : {userData.department}</p>
                  </div>

                  <div className='flex p-4 items-center justify-center flex-col'>
                  <LocationMarkerIcon className="h-6 w-6" aria-hidden="true"/>
                  <p>State : {userData.state}</p>
                  </div>

                  <div className='flex p-4 items-center justify-center flex-col'>
                  <LocationMarkerIcon className="h-6 w-6" aria-hidden="true"/>
                  <p>City : {userData.city}</p>
                  </div>

                  <div className='flex p-4 items-center justify-center flex-col'>
                  <MailIcon className="h-6 w-6" aria-hidden="true"/>
                  <p>Email : {userData.email}</p>
                  </div>

                  <div className='flex p-4 items-center justify-center flex-col'>
                  <UsersIcon className="h-6 w-6" aria-hidden="true"/>
                  <p>Gender : {userData.gender}</p>
                  </div>

                  <div className='flex p-4 items-center justify-center flex-col'>
                  <PhoneIcon className="h-6 w-6" aria-hidden="true"/>
                  <p>Phone Number : {userData.number}</p>
                  </div>

                </div>
              </div>
            </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}
