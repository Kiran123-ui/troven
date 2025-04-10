export default function Loading() {
    return (
      <div className="p-6 flex flex-col gap-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-[400px] w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }
  