import type { LivelinePoint } from 'liveline'

export interface MarketOption {
  id: string
  name: string
  image: string
  chance: number
  change?: number
  yesPrice: number
  noPrice: number
  odds: number
  color: string
}

export interface ChartDataPoint {
  time: number
  value: number
}

export interface MarketData {
  id: string
  title: string
  image: string
  categories: string[]
  volume: string
  marketCount: number
  verificationSource: string
  ruleTemplate: string
  options: MarketOption[]
  chartData: Record<string, ChartDataPoint[]>
}

export interface MarketsJson {
  markets: MarketData[]
}

export interface MarketCandidate {
  id: string
  name: string
  value: number
  color: string
  data: LivelinePoint[]
}

// Helper to convert MarketData to the format needed by components
export function marketDataToCandidates(market: MarketData): MarketCandidate[] {
  return market.options.map(opt => ({
    id: opt.id,
    name: opt.name,
    value: opt.chance,
    color: opt.color,
    data: market.chartData[opt.id] || [],
  }))
}
