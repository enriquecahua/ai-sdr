
interface StatusBadgeProps {
  status: string
}

const statusColors: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Qualified': 'bg-green-100 text-green-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Responded': 'bg-purple-100 text-purple-800',
  'Meeting Scheduled': 'bg-indigo-100 text-indigo-800',
  'Closed': 'bg-gray-100 text-gray-800'
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800'

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  )
}
