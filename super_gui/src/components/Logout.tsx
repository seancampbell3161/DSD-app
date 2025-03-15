import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  }
  return (
    <div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}