import { LoginForm } from "../components/LoginForm";

interface LoginProps {
  setShowLogin: (value: boolean) => void; // Function to update showLogin state
}

export const Login = ({ setShowLogin }: LoginProps) => {
  return (
    <section className="w-full h-lvh md:h-full fixed z-20 md:flex md:flex-row bg-white">
      <div className="hero lg:w-4/5 text-center grid content-center md:border-charcoal md:border-r-10">
        <div className="hero-text py-[100px] md:py-0 md:pt-[100px] bg-accentBlue md:bg-white w-full text-center">
          <img className="md:hidden w-20 h-20 mx-auto" src="/assets/icons/super-s.png" alt="super-s" />
          <h1 className="font-[Bebas_Neue] text-6xl text-white md:text-red tracking-tighter my-auto pt-4">Super</h1>
          <h2 className="hidden md:block font-header mobile-subheader font-normal text-charcoal text-2xl pb-6 tracking-tighter">
            Your Pocket Superintendant, Simplifying Apartment living.
          </h2>
        </div>
        <div className="hidden md:grid md:h-[800px] md:w-[800px] overflow-hidden md:mx-auto">
          <img
            className="object-cover object-top"
            src="/assets/images/freepik__background__40241 1.webp"
            alt="background"
          />
        </div>
      </div>
      <div className="absolute top-45 md:relative md:top-0 h-lvh md:bg-brown px-5">
        <LoginForm 
          setShowLogin={setShowLogin} 
        />
      </div>
    </section>
  );
};