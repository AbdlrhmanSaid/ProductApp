"use client";
import { useEffect, useRef } from "react";
import useProduct from "@/api/useProduct";
import Loading from "@/components/Loading";
import JsBarcode from "jsbarcode";
import CheckAuth from "@/auth/CheckAuth";

const Page = ({ params }) => {
  const { id } = params || {};
  const { product, loading, getProduct } = useProduct();
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (id) getProduct(id);
  }, [id]);

  useEffect(() => {
    if (product && barcodeRef.current) {
      JsBarcode(barcodeRef.current, `${product.title}-${product.price}`, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  }, [product]);

  if (loading) return <Loading />;
  if (!product)
    return <p className="text-center mt-10 text-red-500">Product not found</p>;

  // دالة لطباعة الباركود
  const handlePrint = () => {
    const svg = barcodeRef.current;
    if (!svg) {
      alert("Barcode not generated yet.");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const imgData = `data:image/svg+xml;base64,${btoa(svgData)}`;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
        </head>
        <body style="display: flex; justify-content: center; align-items: center; height: 100vh;">
          <img src="${imgData}" alt="Barcode" />
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
        {/* صورة المنتج */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="rounded-lg w-full h-auto object-cover max-h-[500px]"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-700 mb-4">
              {product.description || "No description available."}
            </p>
            <p className="text-2xl font-semibold text-green-600 mb-6">
              ${product.price || "N/A"}
            </p>

            {/* Barcode */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Product Barcode:</h2>
              <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
                <svg ref={barcodeRef}></svg>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Print Barcode
            </button>
          </div>
        </div>
      </div>
    </CheckAuth>
  );
};

export default Page;
