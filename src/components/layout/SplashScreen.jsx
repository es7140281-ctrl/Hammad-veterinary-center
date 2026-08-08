function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold animate-pulse">
          H
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-800">
          مركز حماد البيطري
        </h1>

        <p className="mt-2 text-gray-500">جاري تحميل الموقع...</p>
      </div>
    </div>
  );
}

export default SplashScreen;
