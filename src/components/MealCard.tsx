import { Link } from "react-router-dom";

interface MealCardPropTypes {
  id: string;
  name: string;
  imageURL: string;
}

const MealCard: React.FC<MealCardPropTypes> = ({ id, name, imageURL }) => {
  return (
    <Link to={`/recipe/${id}`}>
      <div className="flex flex-col md:flex-row lg:flex-col bg-white-primary px-8 py-6 rounded-xl w-full gap-4 lg:gap-1 items-center lg:min-h-[400px] border-none hover:bg-blue-50 active:bg-blue-100 hover:scale-102 shadow-md">
        <img
          loading="lazy"
          className="h-auto mb-2 rounded-lg w-[20rem] md:w-[10rem] lg:w-[20rem]"
          src={imageURL}
          alt={name}
        />
        <h1 className="text-xl md:text-lg text-wrap font-bold">{name}</h1>
      </div>
    </Link>
  );
};

export default MealCard;
