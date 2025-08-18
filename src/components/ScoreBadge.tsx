
import { getScoreColor, getScoreLabel } from '@/lib/scoring'

interface ScoreBadgeProps {
  score: number
  showLabel?: boolean
}

export default function ScoreBadge({ score, showLabel = false }: ScoreBadgeProps) {
  const colorClass = getScoreColor(score)
  const label = getScoreLabel(score)

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
      {score}
      {showLabel && ` (${label})`}
    </span>
  )
}
