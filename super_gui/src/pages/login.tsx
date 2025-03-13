import { useState } from "react";
import TestEndpoint from "../components/TestEndpoint";

import api from "../api/api"

export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', credentials)
      const { access_token } = response.data;
      console.log(access_token);
      localStorage.setItem('accessToken', access_token);

    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          className="border border-gray-700 p-2 w-full"
        />
        <input 
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="border border-gray-700 p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      {/* <TestEndpoint /> */}
    </div>
  )
}