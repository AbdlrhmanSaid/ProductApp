"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Loading from "@/components/Loading";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await axios.get(
            `https://nodeproject-production-dc03.up.railway.app/getProducts/${id}`
          );
          setProduct({
            ...res.data,
            price: res.data.price.toString(),
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ خطأ في جلب المنتج:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setProduct({ ...product, price: value });
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setProduct({ ...product, quantity: parseInt(value) });
    }
  };

  const handleBlur = () => {
    if (product.price === "" || isNaN(product.price)) {
      setProduct({ ...product, price: "0" });
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    console.log("📤 البيانات المرسلة:", product);

    try {
      setLoading(true);
      await axios.patch(
        `https://nodeproject-production-dc03.up.railway.app/updateProduct/${id}`,
        { ...product, price: parseFloat(product.price) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error(
        "❌ خطأ في التحديث:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-lg mx-auto bg-white p-5 rounded shadow">
      <h1 className="text-2xl font-bold mb-5 flex items-center gap-1 justify-center">
        <span>
          <MdEdit />
        </span>
        <span>تعديل المنتج</span>
      </h1>
      <form onSubmit={updateProduct} className="space-y-3">
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="اسم المنتج"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handlePriceChange}
          onBlur={handleBlur}
          placeholder="السعر"
          className="border p-2 w-full"
          min="0"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="التصنيف"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="رابط الصورة"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleQuantityChange}
          placeholder="الكمية"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          <FaCheckCircle />
        </button>
      </form>
    </div>
  );
}
