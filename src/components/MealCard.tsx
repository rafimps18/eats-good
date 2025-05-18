import { Link } from "react-router-dom";

interface MealCardPropTypes {
  id: string;
  name: string;
  imageURL: string;
}

const MealCard: React.FC<MealCardPropTypes> = ({ id, name, imageURL }) => {
  return (
    <Link to={`/recipe/${id}`}>
      <div className="flex flex-row lg:flex-col bg-white-primary px-8 py-6 rounded-xl w-full gap-4 lg:gap-1 items-center lg:min-h-[400px] border-1 border-white hover:border-black">
        <img
          className="h-auto mb-2 rounded-lg w-[10rem] lg:w-[20rem]"
          src={imageURL}
          alt={name}
        />
        <h1 className="text-xl md:text-lg text-wrap font-bold">{name}</h1>
      </div>
    </Link>
  );
};

export default MealCard;
