import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import MealCard from "./MealCard";
import LoadingCard from "./LoadingCard";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
}

const MainContent = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Setting beef as default selected category
  if (!selectedCategory) {
    setSelectedCategory("Beef");
  }

  useEffect(() => {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setRecipes(res.data.meals);
      })
      .finally(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const categoriesURL =
      "https://www.themealdb.com/api/json/v1/1/categories.php";

    axios
      .get(categoriesURL)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDropdownSelect = (selectedVal: string) => {
    if (selectedVal !== selectedCategory) {
      setSelectedCategory(selectedVal);
    }
    setDropdownOpen(false);
  };

  const getFilteredRecipes = () => {
    let filteredRecipes = recipes;

    if (searchQuery) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredRecipes;
  };

  const filteredRecipes = getFilteredRecipes();

  return (
    <div className="bg-gray-200 w-[100%] min-h-[95vh] px-8">
      <section>
        <div className="flex flex-col justify-center items-center mt-8 mb-6  gap-4">
          {/* Search field */}
          <div className="relative bg-white rounded-full h-[50px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search />
            </div>
            <input
              placeholder={`Search ${
                selectedCategory[0]?.toLowerCase() + selectedCategory.slice(1)
              } recipes...`}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              className="w-full rounded-full text-md bg-white h-full focus:outline-none pl-10 pr-4 shadow-md"
            />
          </div>

          {/* Category Selection for medium to mobile resolutions*/}
          <div className="relative block lg:hidden">
            <button
              className={`${
                !dropdownOpen ? "rounded-lg" : "rounded-t-lg"
              } flex flex-row items-center w-[150px] bg-white hover:bg-blue-50 active:bg-blue-100 px-4 py-3 border-none text-md cursor-pointer gap-2 shadow-md`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {dropdownOpen ? <ChevronUp /> : <ChevronDown />}
              {selectedCategory}
            </button>
            <div
              className={
                dropdownOpen ? "absolute right-0 shadow-lg z-50" : "hidden"
              }
            >
              {categories.map((category, index) => (
                <button
                  className={`w-[150px] bg-white p-2 hover:bg-blue-50 active:bg-blue-100 cursor-pointer`}
                  key={index}
                  onClick={() => handleDropdownSelect(category.strCategory)}
                >
                  {category.strCategory}
                </button>
              ))}
            </div>
          </div>

          {/* Category selection for large resolutions and up */}
          <div className="hidden lg:flex justify-center w-screen">
            <div className="flex overflow-x-auto gap-2 px-10 pb-2">
              {loading
                ? Array(14)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white-primary dark:bg-gray-400 animate-pulse rounded-full shadow-md w-[5rem] h-[2.5rem]"
                      ></div>
                    ))
                : categories.map((category, index) => (
                    <button
                      className={`${
                        selectedCategory === category.strCategory
                          ? "bg-red-primary text-white hover:bg-red-600 active:bg-red-700"
                          : "bg-white-primary text-black hover:bg-blue-50 active:bg-blue-100"
                      } p-2 rounded-full px-3 text-lg cursor-pointer shadow-md`}
                      onClick={() => setSelectedCategory(category.strCategory)}
                      key={index}
                    >
                      {category.strCategory}
                    </button>
                  ))}
            </div>
          </div>
        </div>

        {/* Meals list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-4 mb-8">
          {loading
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
