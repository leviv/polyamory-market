import { Liveline } from 'liveline'
import type { LivelineSeries, LivelinePoint } from 'liveline'
import './Graph.scss'

const startDate = new Date('2024-11-01')
const endDate = new Date('2026-02-28')

// Generate realistic-looking data for each candidate
const newsom: LivelinePoint[] = (() => {
  const points: LivelinePoint[] = []
  const dayMs = 24 * 60 * 60 * 1000
  let value = 15
  
  for (let time = startDate.getTime(); time <= endDate.getTime(); time += dayMs) {
    const date = new Date(time)
    // Simulate jump around Aug 2025
    if (date >= new Date('2025-08-01') && date < new Date('2025-08-15')) {
      value += 1.5
    } else if (date >= new Date('2026-01-15')) {
      value -= 0.3
    }
    value += (Math.random() - 0.5) * 2
    value = Math.max(10, Math.min(45, value))
    points.push({ time, value })
  }
  // Ensure ends at ~27%
  if (points.length > 0) points[points.length - 1].value = 27
  return points
})()

const aoc: LivelinePoint[] = (() => {
  const points: LivelinePoint[] = []
  const dayMs = 24 * 60 * 60 * 1000
  let value = 5
  
  for (let time = startDate.getTime(); time <= endDate.getTime(); time += dayMs) {
    const date = new Date(time)
    // Gradual rise mid-2025
    if (date >= new Date('2025-06-01') && date < new Date('2025-09-01')) {
      value += 0.05
    }
    value += (Math.random() - 0.5) * 1
    value = Math.max(3, Math.min(15, value))
    points.push({ time, value })
  }
  if (points.length > 0) points[points.length - 1].value = 10
  return points
})()

const harris: LivelinePoint[] = (() => {
  const points: LivelinePoint[] = []
  const dayMs = 24 * 60 * 60 * 1000
  let value = 4
  
  for (let time = startDate.getTime(); time <= endDate.getTime(); time += dayMs) {
    value += (Math.random() - 0.5) * 0.8
    value = Math.max(2, Math.min(12, value))
    points.push({ time, value })
  }
  if (points.length > 0) points[points.length - 1].value = 7
  return points
})()

interface Candidate {
  id: string
  name: string
  value: number
  color: string
  data: LivelinePoint[]
}

interface GraphProps {
  candidates?: Candidate[]
}

const defaultCandidates: Candidate[] = [
  { id: 'newsom', name: 'Gavin Newsom', value: 27, color: '#4ade80', data: newsom },
  { id: 'aoc', name: 'Alexandria Ocasio-Cortez', value: 10, color: '#3b82f6', data: aoc },
  { id: 'harris', name: 'Kamala Harris', value: 7, color: '#f97316', data: harris },
]

export const Graph = ({ candidates = defaultCandidates }: GraphProps) => {
  const series: LivelineSeries[] = candidates.map(c => ({
    id: c.id,
    data: c.data,
    value: c.value,
    color: c.color,
    label: c.name,
  }))

  return (
    <div className="graph-container">
      {/* Legend */}
      <div className="graph-legend">
        {candidates.map(c => (
          <div key={c.id} className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: c.color }} />
            <span className="legend-name">{c.name}</span>
            <span className="legend-value">{c.value}%</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="graph-chart">
        <Liveline
          data={candidates[0]?.data || []}
          value={candidates[0]?.value || 0}
          series={series}
          theme="light"
          grid={true}
          scrub={true}
          fill={false}
          badge={false}
          formatValue={(v) => `${Math.round(v)}%`}
          formatTime={(t) => {
            const date = new Date(t)
            const month = date.toLocaleDateString('en-US', { month: 'short' })
            const year = date.getFullYear()
            return `${month} ${year}`
          }}
          padding={{ top: 20, right: 50, bottom: 40, left: 20 }}
        />
      </div>
    </div>
  )
}
