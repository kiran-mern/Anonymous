import React, { useState } from 'react';

interface SignupForm {
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
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Sign up to see the mirage world</h1>
                </div>
                <button className="flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700">
                    <svg className="-h-6 -w-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.51 2.75L13.24 12l3.27 9.25H3.76L0 12l3.76-9.25z" />
                    </svg>
                    <span>Log in with Google</span>
                </button>
                <div className="text-center">
                    <span className="text-gray-500">OR</span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700"
                    >
                        Sign up
                    </button>
                </form>
                <div className="text-sm text-center">
                    <span>Have an account? </span>
                    <a href="/login" className="font-medium text-blue-500 hover:text-blue-600">
                        Log in here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
