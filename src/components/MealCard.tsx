interface MealCardPropTypes {
  name: string;
  imageURL: string;
}

const MealCard: React.FC<MealCardPropTypes> = ({ name, imageURL }) => {
  return (
    <div className="flex flex-col bg-white px-8 py-6 w-fit rounded-xl">
      <img
        className="lg:w-[250px] w-[10rem] h-auto mb-2 rounded-lg"
        src={imageURL}
        alt={name}
      />
      <h1 className="text-xl md:text-lg">
        {name.length < 20 ? name : `${name.slice(0, 20)}...`}
      </h1>
    </div>
  );
};

export default MealCard;
