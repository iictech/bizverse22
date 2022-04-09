/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { BsLinkedin, BsGithub } from "react-icons/bs";
const people = [
  {
    name: 'Name',
    title: 'Title',
    role: 'Role',
    email: 'Email',
    telephone: 'Phone',
    linkedin: '',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Name 2',
    title: 'Title',
    role: 'Role',
    email: 'Email',
    telephone: 'Phone',
    linkedin: '',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Name 3',
    title: 'Title',
    role: 'Role',
    email: 'Email',
    telephone: 'Phone',
    linkedin: '',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]

export default function Contact() {
  return (
    <div className='flex justify-center pt-32 pb-20'>
      <div className='w-4/5'>
      <h1 id="contact-us"className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl pb-20">Contact Us</h1>
           <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <li key={person.email} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm font-medium truncate">{person.name}</h3>
                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {person.role}
                </span>
              </div>
              <p className="mt-1 text-gray-500 text-sm truncate">{person.title}</p>
            </div>
            <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={person.imageUrl} alt="" />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Email</span>
                </a>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                <a
                  href={person.linkedin}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <BsLinkedin className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">LinkedIn</span>
                </a>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                <a
                  href={person.github}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <BsGithub className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
    </div>
  )
}
