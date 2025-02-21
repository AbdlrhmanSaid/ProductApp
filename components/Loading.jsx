export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full m-auto">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-700 text-lg">جاري التحميل...</p>
      </div>
    </div>
  );
}
