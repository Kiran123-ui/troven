export default function Loading() {
    return (
      <div className="p-6 flex flex-col gap-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-[240px] bg-gray-200 rounded animate-pulse"></div>
          <div className="h-[240px] bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-[400px] bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-6">
            <div className="h-[180px] bg-gray-200 rounded animate-pulse"></div>
            <div className="h-[180px] bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="h-[400px] bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }
  