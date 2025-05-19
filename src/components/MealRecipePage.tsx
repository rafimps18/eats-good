import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strSource: string;
  strYoutube: string;
}

interface ingredientItem {
  name: string;
  amount: string;
}

const MealRecipePage = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  let [ingredients, setIngredients] = useState<ingredientItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    axios
      .get(url)
      .then((res) => {
        let data = res.data.meals[0];
        setRecipe(data);

        const ingredientsAndAmounts: ingredientItem[] = [];

        for (let i = 1; i <= 20; i++) {
          const name = data[`strIngredient${i}`];
          const amount = data[`strMeasure${i}`];
          if (name && name !== "") {
            ingredientsAndAmounts.push({
              name: name.trim(),
              amount: amount.trim() || "",
            });
          }
        }

        setIngredients(ingredientsAndAmounts);
      })
      .finally(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col w-screen h-auto bg-gray-100">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 flex gap-2 z-40 items-center cursor-pointer bg-green-primary hover:bg-green-700 active:bg-green-800 text-white text-2xl rounded-r-full px-4 py-2 font-bold shadow-lg"
      >
        <ChevronLeft />
        Back
      </button>

      {/* Header Section */}
      <section className="w-screen h-[450px] md:h-[400px]">
        <div className="relative w-screen">
          {loading ? (
            <div className="z-10 absolute bg-cover bg-fixed bg-gray-300 dark:bg-gray-500 animate-pulse w-screen h-[450px] md:h-[400px] flex flex-col justify-center items-center"></div>
          ) : (
            <div
              className="z-10 absolute bg-cover bg-fixed bg-center w-screen h-[450px] md:h-[400px] flex flex-col justify-center items-center"
              style={{ backgroundImage: `url(${recipe?.strMealThumb})` }}
            ></div>
          )}
          <div
            className={`${
              loading ? "opacity-0" : " opacity-50"
            } bg-black z-20 absolute w-screen h-[450px] md:h-[400px] `}
          ></div>
          <div className="z-30 absolute">
            <div className="flex flex-col md:flex-row w-screen justify-between items-center py-8">
              <div className="md:w-[50%] flex items-center justify-center md:justify-end md:pr-10">
                {loading ? (
                  <div className="w-[320px] h-[320px] rounded-lg bg-gray-400 dark:bg-gray-600 animate-pulse"></div>
                ) : (
                  <img
                    src={recipe?.strMealThumb}
                    alt={recipe?.strMeal}
                    className="w-[320px] rounded-lg shadow-lg"
                  />
                )}
              </div>
              <div className="md:w-[50%] flex flex-col justify-baseline">
                {loading ? (
                  <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-400 rounded mt-2 animate-pulse"></div>
                ) : (
                  <h1
                    className={`text-white text-center md:text-justify font-bold w-full md:w-[50%] ${
                      recipe && recipe?.strMeal.length >= 50
                        ? "text-[1.25rem] md:text-[1.75rem]"
                        : recipe && recipe?.strMeal.length >= 25
                        ? "text-[1.25rem] md:text-[2rem]"
                        : "text-[1.75rem] md:text-[3rem]"
                    }`}
                  >
                    {recipe?.strMeal}
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section>
        <div className="w-screen flex flex-col justify-center items-center my-4">
          <h1 className="text-2xl mb-2">Ingredients</h1>
          {/* Ingredients */}
          <ul className="grid grid-cols-1 md:grid-cols-2 list-disc gap-x-8 gap-y-2 mb-8">
            {loading
              ? Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-40 bg-gray-300 dark:bg-gray-400 rounded animate-pulse"
                    ></div>
                  ))
              : ingredients.map((ingredient, index) => (
                  <li key={index} className="text-lg">
                    {ingredient.amount} {ingredient.name}
                  </li>
                ))}
          </ul>
          {/* Instructions */}
          <h1 className="text-2xl mb-2">Instructions:</h1>
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-[70vw] lg:w-[60vw] bg-gray-300 dark:bg-gray-400 rounded animate-pulse mb-2"
                ></div>
              ))
          ) : (
            <h2 className="md:px-10 w-[75%] text-lg">
              {recipe?.strInstructions}
            </h2>
          )}
        </div>
        {recipe?.strSource !== "" ? (
          <div className="w-screen flex flex-col md:flex-row justify-center items-center my-4 gap-1 px-8">
            <p className="font-bold">Source: </p>
            <a href={recipe?.strSource} className="hover:underline">
              {recipe?.strSource}
            </a>
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
};

export default MealRecipePage;
