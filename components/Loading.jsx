export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-14 h-14 border-4 border-[#1976D2] border-t-transparent rounded-full animate-spin"></div>

        <p className="text-[#1976D2] text-lg font-semibold animate-pulse">
          جاري التحميل...
        </p>
      </div>
    </div>
  );
}
