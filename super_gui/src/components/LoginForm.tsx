import { useState } from "react";
import api from "../api/api"; 

interface LoginFormProps {
  setShowLogin: (value: boolean) => void;
}

export const LoginForm = ({ setShowLogin }: LoginFormProps) => {
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
      const response = await api.post('/auth/login', credentials);
      const { access_token } = response.data;
   
      localStorage.setItem('access_token', access_token);

      setShowLogin(false);

    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="bg-beige max-h-[400px] my-auto rounded-lg p-5 shadow-md mt-[100px]">
      <img className="hidden md:block w-20 h-20 mx-auto" src="/assets/icons/super-s.png" alt="super-s" />
      <h1 className="font-body">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <input 
          type="text"
          name="username"
          placeholder="username"
          value={credentials.username}
          onChange={handleChange}
          className="border border-grey-400 bg-grey-100 rounded-md p-2 w-full"
        />
        <input 
          type="password" 
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
          className="border border-grey-400 bg-grey-100 rounded-md p-2 w-full"
        />
        <button
          type="submit"
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 md:relative md:bottom-0 bg-blue text-white py-2 p-4 w-[200px] md:w-full rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};