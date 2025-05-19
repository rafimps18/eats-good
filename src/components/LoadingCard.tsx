const LoadingCard = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-col bg-white-primary px-8 py-6 rounded-xl w-full gap-4 lg:gap-1 items-center lg:min-h-[400px] border-none shadow-md animate-pulse">
      {/* Image skeleton */}
      <div className="h-[200px] w-[15rem] md:w-[10rem] lg:w-[15rem] bg-gray-200 dark:bg-gray-400 rounded-lg"></div>

      {/* Text skeleton */}
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-400 rounded mt-2"></div>
    </div>
  );
};

export default LoadingCard;
