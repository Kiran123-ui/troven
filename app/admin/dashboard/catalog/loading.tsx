export default function Loading() {
    return (
      <div className="p-6 flex flex-col gap-6">
        <div className="h-14 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-14 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-[400px] bg-gray-200 rounded animate-pulse"></div>
          <div className="h-[400px] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }
  