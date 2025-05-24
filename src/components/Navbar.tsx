import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeContext } from "./ThemeContext";
const Navbar = () => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <div className="w-screen h-[8vh] bg-green-primary px-4 md:px-8 flex justify-between items-center">
      <Link to="/" className="flex gap-2 items-center cursor-pointer">
        <img src="/logo.svg" alt="logo" className="h-[5vh] md:h-[8vh]" />
        <h1 className="text-white text-[2rem] md:text-[2.5rem] font-bold">
          Eat's Good!
        </h1>
      </Link>
      <button
        onClick={toggleTheme}
        className="bg-green-primary hover:bg-green-700 hover:scale-102 active:bg-green-800 p-2 rounded-full cursor-pointer shadow-md"
      >
        {theme === "dark" ? <Moon color="white" /> : <Sun color="white" />}
      </button>
    </div>
  );
};

export default Navbar;
