import { LoginForm } from "../components/LoginForm"


export const Login = () => {
  return (
    <section className="absolute md:hidden h-lvh z-20 md:flex md:flex-row bg-accentBlue md:bg-white">
      <div className="hero w-4/5 text-center md:border-charcoal md:border-r-10">
        <div className="hero-text pt-[100px]">
          <h1 className="font-[Bebas_Neue] text-6xl text-red tracking-tighter my-auto">Super</h1>
          <h2 className="font-header mobile-subheader font-normal text-charcoal text-2xl pb-6 tracking-tighter">Your Pocket Superintendant, Simplifying Apartment living.</h2>
        </div>
        <div className="hidden md:grid md:h-[800px] md:w-[800px] overflow-hidden md:mx-auto">
          <img className="object-cover object-top" src="/assets/images/freepik__background__40241 1.webp" />
        </div>  
      </div>
      <div className="bg-brown grid content-center px-5">
        <LoginForm />
      </div>
    </section>
  )
}