import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-screen h-[8vh] bg-green-primary px-8 flex items-center">
      <Link to="/" className="flex gap-2 items-center">
        <img src="/logo.svg" alt="logo" className="h-[8vh]" />
        <h1 className="text-[3rem] font-bold text-white">Eat's Good!</h1>
      </Link>
    </div>
  );
};

export default Navbar;
