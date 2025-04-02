"use client";
import { use, useEffect, useRef } from "react";
import useProduct from "@/hooks/useProduct";
import Loading from "@/components/Loading";
import { QRCodeCanvas } from "qrcode.react";
import CheckAuth from "@/auth/checkAuth";
import NavPage from "@/components/NavPage";

const Page = ({ params }) => {
  const safeParams = use(params) || {};
  const { id } = safeParams;
  const { product, loading, getProduct } = useProduct();
  const qrRef = useRef(null);

  useEffect(() => {
    if (id) getProduct(id);
  }, [id]);

  if (loading) return <Loading />;
  if (!product)
    return <p className="text-center mt-10 text-red-500">Product not found</p>;

  const qrValue = JSON.stringify({
    title: product.title,
    price: product.price,
  });

  const handlePrint = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) {
      alert("QR Code not generated yet.");
      return;
    }

    const imgData = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
        </head>
        <body style="display: flex; justify-content: center; align-items: center; height: 100vh;">
          <img src="${imgData}" alt="QR Code" />
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <CheckAuth>
      <NavPage link={"تفاصيل منتج"} next={true} />

      <div className="container mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image or Product Name */}
          <div className="lg:w-1/2 w-full">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="rounded-lg w-full h-auto max-h-[500px] object-contain mx-auto"
              />
            ) : (
              <div 
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-blue-600 rounded-lg flex items-center justify-center p-4"
              >
                <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center">
                  {product.title}
                </h2>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 w-full flex flex-col">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
                {product.title}
              </h1>
              <p className="text-gray-600 mb-4">
                {product.description || "No description available."}
              </p>
              <p className="text-xl md:text-2xl font-semibold text-green-600">
                ${product.price.toLocaleString() || "N/A"}
              </p>
            </div>

            {/* QR Code Section */}
            <div className="mt-auto">
              <div className="mb-4" ref={qrRef}>
                <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
                  Product QR Code:
                </h2>
                <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
                  <QRCodeCanvas
                    value={qrValue}
                    size={window.innerWidth < 768 ? 160 : 200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={true}
                  />
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
              >
                Print QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </CheckAuth>
  );
};

export default Page;