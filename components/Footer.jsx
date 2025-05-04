import Image from "next/image";

const Footer = () => {
  return (
    <footer className=" py-4  md:ml-[118px]">
      <div className="container mx-auto flex flex-col  items-center justify-between m-auto px-6">
        <Image
          src="/favicon.png"
          width={100}
          height={50}
          alt="Logo"
          className="filter grayscale brightness-0"
        />

        <p className="text-sm text-black">
          &copy; 2025 SmartVision. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
