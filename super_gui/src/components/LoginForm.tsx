import { useState } from "react";
import api from "../api/api";

export const LoginForm = () => {
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
      localStorage.setItem('access_token', access_token);

    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="bg-beige h-[300px] rounded-lg p-5 shadow-md">
      <img className="w-20 h-20 mx-auto" src="/assets/icons/super-s.png" alt="super-s" />
      <h1>Login</h1>
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
          type="text"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
          className="border border-grey-400 bg-grey-100 rounded-md p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue text-white py-2 px-4 w-[200px] mx-auto rounded relative bottom-0"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}