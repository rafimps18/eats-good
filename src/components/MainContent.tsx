import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import MealCard from "./MealCard";
import LoadingCard from "./LoadingCard";
import { categoriesList } from "../constants";
import { useThemeContext } from "./ThemeContext";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface UIState {
  dropdownOpen: boolean;
  recipesLoading: boolean;
}

const MainContent = () => {
  const { theme } = useThemeContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Beef");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ui, setUI] = useState<UIState>({
    dropdownOpen: false,
    recipesLoading: false,
  });

  useEffect(() => {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    setUI({ ...ui, recipesLoading: true });
    axios
      .get(url)
      .then((res) => {
        setRecipes(res.data?.meals || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setUI({ ...ui, recipesLoading: false }));
  }, [selectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleDropdownSelect = (selectedVal: string) => {
    if (selectedVal !== selectedCategory) {
      setSelectedCategory(selectedVal);
    }
    setUI({ ...ui, dropdownOpen: false });
  };

  const filteredRecipes = useMemo(() => {
    if (!searchQuery) return recipes;
    return recipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recipes, searchQuery]);

  return (
    <div
      className={`${
        theme === "dark" ? "dark " : " "
      } bg-gray-200 dark:bg-zinc-900 w-[100%] min-h-[95vh] px-8`}
    >
      <section>
        <div className="flex flex-col justify-center items-center mt-8 mb-6  gap-4">
          {/* Search field */}
          <div className="relative text-black dark:text-white bg-white rounded-full h-[50px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search />
            </div>
            <input
              placeholder={`Search ${
                selectedCategory[0]?.toLowerCase() + selectedCategory.slice(1)
              } recipes...`}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              className="w-full rounded-full text-md  bg-white dark:bg-zinc-900 border-gray-400 border-[1px] h-full focus:outline-none pl-10 pr-4 shadow-md"
            />
          </div>

          {/* Category Selection for medium to mobile resolutions*/}
          <div className="relative block lg:hidden">
            <button
              className={`${
                !ui.dropdownOpen ? "rounded-lg" : "rounded-t-lg"
              } flex flex-row items-center w-[150px] bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-blue-50 dark:hover:bg-zinc-950 active:bg-blue-100 px-4 py-3 border-none text-md cursor-pointer gap-2 shadow-md`}
              onClick={() => setUI({ ...ui, dropdownOpen: !ui.dropdownOpen })}
            >
              {ui.dropdownOpen ? <ChevronUp /> : <ChevronDown />}
              {selectedCategory}
            </button>
            <div
              className={
                ui.dropdownOpen ? "absolute right-0 shadow-lg z-40" : "hidden"
              }
            >
              {categoriesList.map((category, index) => (
                <button
                  className={`w-[150px] text-black dark:text-white bg-white dark:bg-zinc-800 p-2 hover:bg-blue-50 dark:hover:bg-zinc-950 active:bg-blue-100 dark:active:bg-zinc-950 cursor-pointer`}
                  key={index}
                  onClick={() => handleDropdownSelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Category selection for large resolutions and up */}
          <div className="hidden lg:flex justify-center w-screen">
            <div className="flex overflow-x-auto gap-2 px-10 pb-2">
              {categoriesList.map((category, index) => (
                <button
                  className={`${
                    selectedCategory === category
                      ? "bg-red-primary text-white hover:bg-red-600 active:bg-red-700"
                      : "bg-white-primary dark:bg-zinc-800 text-black hover:bg-blue-50 hover:dark:bg-zinc-950 active:bg-blue-100 dark:active:bg-zinc-950 dark:text-white "
                  } p-2 rounded-full px-3 text-lg cursor-pointer shadow-md hover:scale-102 active:scale-96`}
                  onClick={() => setSelectedCategory(category)}
                  key={index}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Meals list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-4 mb-8">
          {ui.recipesLoading
            ? Array(5)
                .fill(0)
                .map((_, i) => <LoadingCard key={i} />)
            : filteredRecipes.map((recipe, index) => (
                <div key={index}>
                  <MealCard
                    id={recipe.idMeal}
                    imageURL={recipe.strMealThumb}
                    name={recipe.strMeal}
                  />
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;
