import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1976D2] text-white py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between m-auto px-6">
        <Image src="/favicon.png" width={100} height={50} alt="Logo" />
        <p className="text-sm">&copy; 2025 SmartVision. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

export default Footer;
