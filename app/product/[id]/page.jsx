"use client";
import { use, useEffect, useRef } from "react";
import useProduct from "@/api/useProduct";
import Loading from "@/components/Loading";
import { QRCodeCanvas } from "qrcode.react";
import CheckAuth from "@/auth/checkAuth";

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
      <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="rounded-lg w-full h-auto object-cover max-h-[500px]"
          />
        </div>

        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-700 mb-4">
              {product.description || "No description available."}
            </p>
            <p className="text-2xl font-semibold text-green-600 mb-6">
              ${product.price || "N/A"}
            </p>

            <div className="mt-6" ref={qrRef}>
              <h2 className="text-xl font-semibold mb-2">Product QR Code:</h2>
              <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
                <QRCodeCanvas
                  value={qrValue}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"}
                  includeMargin={true}
                />
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Print QR Code
            </button>
          </div>
        </div>
      </div>
    </CheckAuth>
  );
};

export default Page;
