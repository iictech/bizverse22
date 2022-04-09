/* This example requires Tailwind CSS v2.0+ */
export default function AboutUs() {
    return (
      <div className="flex justify-center" id="about-us">
          <div className="w-4/5 relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1565055887414-3c2b21f9cd73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
            alt=""
          />
          <div className="absolute inset-0 mix-blend-multiply bg-indigo-800 rounded-xl" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About Us</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Inspired by the objectives and vision of IIC, a MHRD initiative, we have established IIC TMSL. This cell will be conducting various innovation and entrepreneurship related activities along with organizing periodic workshops, seminars and interactions with entrepreneurs and innovators. Students will get a chance to showcase their talents by participating in various events like Hackathons, idea competitions etc.
          </p>
        </div>
      </div>
      </div>
    )
  }
  