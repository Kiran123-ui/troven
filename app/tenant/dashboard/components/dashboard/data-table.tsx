import { Card, CardContent } from "@/components/ui/card"

interface DataTableProps {
  title: string
  data: Array<{
    tier: string
    value: string
    trend: string
  }>
}

export function DataTable({ title, data }: DataTableProps) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <h3 className="font-medium text-gray-800 mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-500">{item.tier}</span>
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-800">{item.value}</span>
                {item.trend === "up" ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 4L12 8L8 12"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 8L8 12L4 8"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
