import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { MarketHeader } from '../components/MarketHeader'
import { Graph } from '../components/Graph'
import { MarketOptions } from '../components/MarketOptions'
import { MarketRules } from '../components/MarketRules'
import { BuySell } from '../components/BuySell'
import marketsData from '../data/markets.json'
import type { MarketsJson, MarketOption, ChartDataPoint } from '../types/market'
import './Market.scss'

const data = marketsData as unknown as MarketsJson

export const Market = () => {
  const { marketName } = useParams<{ marketName: string }>()
  
  // Find the market from JSON data
  const marketData = data.markets.find(m => m.id === marketName)
  
  const [options, setOptions] = useState<MarketOption[]>(
    () => marketData?.options.map(o => ({ ...o })) || []
  )
  const [chartData, setChartData] = useState<Record<string, ChartDataPoint[]>>(
    () => {
      if (!marketData) return {}
      const copy: Record<string, ChartDataPoint[]> = {}
      for (const key of Object.keys(marketData.chartData)) {
        copy[key] = [...marketData.chartData[key]]
      }
      return copy
    }
  )
  const [selectedOption, setSelectedOption] = useState<MarketOption | null>(
    options[0] || null
  )
  const [selectedRulesCandidate, setSelectedRulesCandidate] = useState(
    options[0]?.id || ''
  )

  // Redirect if market not found
  if (!marketData) {
    return <Navigate to="/" replace />
  }

  // Convert chart data to format needed by Graph component
  const candidates = options.map(opt => ({
    id: opt.id,
    name: opt.name,
    value: opt.chance,
    color: opt.color,
    data: chartData[opt.id] || [],
  }))

  const handleBuySell = (mode: 'buy' | 'sell', selection: 'yes' | 'no', dollars: number) => {
    const current = selectedOption || options[0]
    if (!current) return

    // Each dollar moves the price by 1 cent
    const delta = dollars
    // Determine direction: buying yes pushes yes up, buying no pushes no up
    // Selling is the reverse
    const direction = mode === 'buy' ? 1 : -1
    const yesDirection = selection === 'yes' ? direction : -direction

    setOptions(prev => prev.map(opt => {
      if (opt.id !== current.id) return opt
      const newYes = Math.max(1, Math.min(99, opt.yesPrice + yesDirection * delta))
      const newNo = 100 - newYes
      return { ...opt, yesPrice: newYes, noPrice: newNo, chance: newYes }
    }))

    // Also update selectedOption in place
    setSelectedOption(prev => {
      if (!prev || prev.id !== current.id) return prev
      const newYes = Math.max(1, Math.min(99, prev.yesPrice + yesDirection * delta))
      const newNo = 100 - newYes
      return { ...prev, yesPrice: newYes, noPrice: newNo, chance: newYes }
    })

    // Add a new point to the chart for this option
    setChartData(prev => {
      const points = prev[current.id] || []
      const lastTime = points.length > 0 ? points[points.length - 1].time : Date.now()
      const newYes = Math.max(1, Math.min(99, current.yesPrice + yesDirection * delta))
      return {
        ...prev,
        [current.id]: [...points, { time: lastTime + 86400000, value: newYes }],
      }
    })
  }

  const handleOptionSelect = (option: MarketOption) => {
    setSelectedOption(option)
    setSelectedRulesCandidate(option.id)
  }

  const rulesCandidates = options.map(o => ({ id: o.id, name: o.name }))

  const currentOption = selectedOption || options[0]

  return (
    <div className="market-page">
      <div className="market-main">
        <MarketHeader 
          image={marketData.image}
          title={marketData.title}
          categories={marketData.categories}
        />
        
        <div className="market-content">
          <Graph candidates={candidates} />
          
          <MarketOptions
            volume={marketData.volume}
            options={options}
            onSelectOption={handleOptionSelect}
          />
          
          <MarketRules 
            candidates={rulesCandidates}
            selectedCandidate={selectedRulesCandidate}
            ruleTemplate={marketData.ruleTemplate}
            verificationSource={marketData.verificationSource}
            onCandidateChange={setSelectedRulesCandidate}
          />
        </div>
      </div>
      
      <div className="market-sidebar">
        <BuySell
          question={marketData.title}
          candidate={currentOption.name}
          candidateImage={currentOption.image}
          yesPrice={currentOption.yesPrice}
          noPrice={currentOption.noPrice}
          onBuySell={handleBuySell}
        />
      </div>
    </div>
  )
}