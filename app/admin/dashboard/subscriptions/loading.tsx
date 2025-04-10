export default function Loading() {
    return (
      <div className="p-6 flex flex-col gap-6">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-[240px] bg-gray-200 rounded animate-pulse"></div>
          <div className="h-[240px] bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="h-[300px] bg-gray-200 rounded animate-pulse"></div>
          <div className="h-[300px] bg-gray-200 rounded animate-pulse"></div>
          <div className="h-[300px] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }
  