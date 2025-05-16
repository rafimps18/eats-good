interface MealCardPropTypes {
  name: string;
  imageURL: string;
}

const MealCard: React.FC<MealCardPropTypes> = ({ name, imageURL }) => {
  return (
    <div className="flex flex-col bg-white px-4 py-2 w-fit">
      <img className="w-[10rem] h-auto" src={imageURL} alt={name} />
      <h1>{name}</h1>
    </div>
  );
};

export default MealCard;
