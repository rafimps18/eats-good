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

  useEffect(() => {
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    axios
      .get(url)
      .then((res) => {
        let data = res.data.meals[0];
        setRecipe(data);
        console.log(data);

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
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="flex flex-col w-screen h-auto bg-gray-100">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 flex gap-2 z-40 items-center cursor-pointer bg-green-primary text-white text-2xl rounded-r-full px-4 py-2 font-bold"
      >
        <ChevronLeft />
        Back
      </button>

      {/* Header Section */}
      <section className="w-screen h-[450px] md:h-[400px]">
        <div className="relative w-screen">
          <div
            className="z-10 absolute bg-cover bg-fixed bg-center w-screen h-[450px] md:h-[400px] flex flex-col justify-center items-center"
            style={{ backgroundImage: `url(${recipe?.strMealThumb})` }}
          ></div>
          <div className="z-20 absolute bg-black opacity-50 w-screen h-[450px] md:h-[400px] "></div>
          <div className="z-30 absolute">
            <div className="flex flex-col md:flex-row w-screen justify-between items-center py-8">
              <div className="w-[50%] flex items-center justify-end pr-10">
                <img
                  src={recipe?.strMealThumb}
                  alt={recipe?.strMeal}
                  className="w-[320px] rounded-lg"
                />
              </div>
              <div className="w-[50%] flex flex-col justify-baseline">
                <h1 className="text-white font-bold text-[3rem]">
                  {recipe?.strMeal}
                </h1>
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
          <ul className="grid grid-cols-2 md:grid-cols-2 list-disc gap-x-8 gap-y-2 mb-4">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-lg">
                {ingredient.amount} {ingredient.name}
              </li>
            ))}
          </ul>
          {/* Instructions */}
          <h1 className="text-2xl mb-2">Instructions:</h1>
          <h2 className="md:px-10 w-[75%] text-lg">
            {recipe?.strInstructions}
          </h2>
        </div>
        <div className="w-screen flex flex-col md:flex-row justify-center items-center my-4 gap-1">
          <p className="font-bold">Source: </p>
          <a href={recipe?.strSource} className="hover:underline">
            {recipe?.strSource}
          </a>
        </div>
      </section>
    </div>
  );
};

export default MealRecipePage;
