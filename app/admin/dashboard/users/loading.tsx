export default function Loading() {
    return (
      <div className="p-6 flex flex-col gap-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="ml-auto h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-[400px] w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-48 mx-auto bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }
  