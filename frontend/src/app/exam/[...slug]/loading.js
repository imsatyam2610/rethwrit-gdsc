export default function Loading() {
    return (
      <>
        <div className="flex flex-col bg-white rounded-lg shadow p-4 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gray-300 h-8 w-full text-center">
              <div className="bg-gray-400 h-6 w-96 rounded-full m-auto my-1"></div>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/4 p-4">
              <div className="bg-gray-300 h-48 mb-4"></div>
              <div className="bg-gray-300 h-16 mb-4"></div>
              <div className="bg-gray-300 h-16 mb-4"></div>
              <div className="bg-gray-300 h-16 mb-4"></div>
              <div className="bg-gray-300 h-16 mb-4"></div>
            </div>
            <div className="w-2/4 p-4">
              <div className="bg-gray-300 h-64 mb-4 flex items-center justify-center">
                <p className="text-xl">Exam Loading...</p>
              </div>
              <div className="bg-gray-300 h-64"></div>
            </div>
            <div className="w-1/4 p-4">
              <div className="bg-gray-300 h-48 mb-4"></div>
              <div className="bg-gray-300 h-16 mb-4"></div>
              <div className="bg-gray-300 h-16 mb-4"></div>
              <div className="bg-gray-300 h-16 mb-4"></div>
              <div className="bg-gray-300 h-16 mb-4"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
  