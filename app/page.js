import Products from "@/components/Products";
import UsersTable from "@/components/UsersTable";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5 flex items-center gap-1">
        <span className="py-3">قائمة المنتجات</span>
      </h1>
      <Products />
      <UsersTable />
    </div>
  );
}
