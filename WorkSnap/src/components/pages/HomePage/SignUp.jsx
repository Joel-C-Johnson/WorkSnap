import React from 'react'

export default function SignUp() {
  return (
    <div>
      <h1>SignUp</h1>
        <form className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
            >
                Sign Up
            </button>
            </div>
            <div className="text-center mt-4">
                <p className="text-gray-600">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
            </div>
        </form>    
    </div>  
  )
}
