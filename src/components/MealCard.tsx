import { Link } from "react-router-dom";
import { useThemeContext } from "./ThemeContext";

interface MealCardPropTypes {
  id: string;
  name: string;
  imageURL: string;
}

const MealCard: React.FC<MealCardPropTypes> = ({ id, name, imageURL }) => {
  const { theme } = useThemeContext();
  return (
    <Link to={`/recipe/${id}`}>
      <div
        className={`${
          theme === "dark" ? "dark" : " "
        } flex flex-col md:flex-row lg:flex-col pb-0 lg:pb-3 text-black dark:text-white bg-white-primary dark:bg-zinc-800 rounded-xl w-full lg:gap-1 items-center lg:min-h-[300px] border-none hover:bg-blue-50 active:bg-blue-100 dark:hover:bg-zinc-800 hover:scale-102 active:scale-98 shadow-md`}
      >
        <img
          loading="lazy"
          className="h-auto rounded-t-lg lg:mb-2 md:rounded-l-lg md:rounded-r-none lg:rounded-t-lg lg:rounded-b-none w-[20rem] md:w-[10rem] lg:w-[20rem]"
          src={imageURL}
          alt={name}
        />
        <h1 className="text-sm md:text-lg lg:text-xl m-2 lg:m-0 font-bold line-clamp-1 text-center px-4 w-full">
          {name}
        </h1>
      </div>
    </Link>
  );
};

export default MealCard;
