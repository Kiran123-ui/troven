interface ActivityItemProps {
  color: string
  title: string
  description: string
  time: string
}

export function ActivityItem({ color, title, description, time }: ActivityItemProps) {
  return (
    <div className="flex gap-3">
      <div className={`w-2 h-2 rounded-full mt-1.5 ${color === "red" ? "bg-red-500" : "bg-green-500"}`}></div>
      <div className="space-y-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  )
}
