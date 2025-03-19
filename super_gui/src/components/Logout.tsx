
interface LogoutProps {
  setShowLogin: (value: boolean) => void; // Function to update showLogin state
}

export const Logout = ({ setShowLogin }: LogoutProps) => {


  const handleLogout = () => {
    localStorage.removeItem('access_token'); 
    setShowLogin(true); 
    window.location.href = '/';
  };

  return (
    <div className="absolute top-2 right-5 rounded-sm border-charcoal border-1">
      <button 
        onClick={handleLogout}
        className="p-1 text-charcoal"
        >
        Logout
      </button>
    </div>
  );
};