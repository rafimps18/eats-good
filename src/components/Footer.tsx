import { Facebook, Globe2, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-green-primary h-[400px] md:h-[200px] w-screen flex flex-col md:flex-row justify-center md:items-center px-10 gap-2 md:gap-0">
      <div className="flex flex-col md:flex-row w-[100%] md:w-[50%] justify-baseline md:justify-center items-center">
        <img src="/logo.svg" alt="logo" className="h-[15vh] md:h-[8vh]" />
        <h1 className="text-[3rem] font-bold text-white">Eat's Good!</h1>
      </div>
      <div className="flex flex-col w-[100%] md:w-[50%] justify-center md:justify-baseline gap-4">
        <h2 className="text-white text-3xl text-center">Social Media</h2>
        <div className="flex gap-2 justify-center">
          <Facebook color="white" height={40} width={40} />
          <Twitter color="white" height={40} width={40} />
          <Instagram color="white" height={40} width={40} />
          <Globe2 color="white" height={40} width={40} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
