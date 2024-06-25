import React, { useState } from 'react';

type SignupForm = {
  email: string;
  username: string;
  password: string;
}

const SignupPage = () => {
  const [formData, setFormData] = useState<SignupForm>({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form validation and submission logic here
    console.log('Email:', formData.email);
    console.log('Username:', formData.username);
    console.log('Password:', formData.password);
  };

  return (
    <>
      <div className="min-h-screen
       flex flex-col items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-lg">
          <h2 className="text-4xl font-bold text-center mb-6 mt-[50px]  " style={{ fontFamily: 'Kavoon, cursive' }}>Anonymous</h2>
          <p className=" text-1xl text-center mb-6 opacity-50">Sign up to see <br /> the mirage world</p>
          <div className="mb-6">
            <a
              href="#"
              className="w-full py-2 px-4 text-blue mt-[-2px] flex items-center justify-center"
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Log in with Google
            </a>
          </div>
          <div className="relative flex py-5 items-center mb-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-white rounded-lg shadow-md"
                style={{ backgroundColor: '#29DFB3' }}
              >
                Sign up
              </button>
            </div>
          </form>

        </div> 
        <div className=" w-full  max-w-md mt-2 h-20 items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg h-2 items-center justify-center ">
            <p className="text-center mt-[-11px]">
              Have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>

    </>
  );

};

export default SignupPage;
 