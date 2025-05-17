import { useState, useEffect } from "react";
import axios from "axios";
import MealCard from "./MealCard";

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

  if (!selectedCategory) {
    setSelectedCategory("Beef");
  }

  useEffect(() => {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

    axios
      .get(url)
      .then((res) => {
        setRecipes(res.data.meals);
      })
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  useEffect(() => {
    const categoriesURL =
      "https://www.themealdb.com/api/json/v1/1/categories.php";

    axios
      .get(categoriesURL)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-100 w-[100%] min-h-[95vh] px-8">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <input
            placeholder="Search recipe..."
            type="text"
            className="px-4 rounded-full text-md bg-white h-[50px]"
          />
          <div className="flex justify-between gap-1 my-8">
            {categories.map((category, index) => (
              <button
                className={`${
                  selectedCategory === category.strCategory
                    ? "bg-red-primary text-white border-red-primary"
                    : "bg-gray-50 text-black border-black"
                } px-4 py-2 border-[1px] rounded-lg text-lg cursor-pointer`}
                onClick={() => setSelectedCategory(category.strCategory)}
                key={index}
              >
                {category.strCategory}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4">
          {recipes.map((recipe, index) => (
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
