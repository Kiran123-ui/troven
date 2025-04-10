export default function Loading() {
    return (
      <div className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"></div>
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
        </div>
  
        <div className="h-14 w-full bg-gray-200 rounded animate-pulse"></div>
  
        <div className="grid grid-cols-3 gap-6">
          <div className="h-[200px] bg-gray-200 rounded animate-pulse"></div>
          <div className="h-[200px] bg-gray-200 rounded animate-pulse"></div>
          <div className="h-[200px] bg-gray-200 rounded animate-pulse"></div>
        </div>
  
        <div className="h-[400px] bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }
  