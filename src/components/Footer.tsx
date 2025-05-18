import { Facebook, Globe2, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-green-primary h-[300px] md:h-[200px] w-screen flex flex-col md:flex-row justify-center items-center px-10 gap-2 md:gap-0">
      <div className="flex md:w-[50%] justify-center">
        <h1 className="text-[3rem] font-bold text-white">Eat's Good!</h1>
      </div>
      <div className="flex flex-col w-[50%] justify-baseline gap-4">
        <h2 className="text-white text-xl">Social Media</h2>
        <div className="flex gap-2">
          <Facebook color="white" />
          <Twitter color="white" />
          <Instagram color="white" />
          <Globe2 color="white" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
