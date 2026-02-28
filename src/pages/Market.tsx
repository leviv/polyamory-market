import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { MarketHeader } from '../components/MarketHeader'
import { Graph } from '../components/Graph'
import { MarketOptions } from '../components/MarketOptions'
import { MarketRules } from '../components/MarketRules'
import { BuySell } from '../components/BuySell'
import marketsData from '../data/markets.json'
import type { MarketsJson, MarketOption } from '../types/market'
import './Market.scss'

const data = marketsData as unknown as MarketsJson

export const Market = () => {
  const { marketName } = useParams<{ marketName: string }>()
  
  // Find the market from JSON data
  const marketData = data.markets.find(m => m.id === marketName)
  
  const [selectedOption, setSelectedOption] = useState<MarketOption | null>(
    marketData?.options[0] || null
  )
  const [selectedRulesCandidate, setSelectedRulesCandidate] = useState(
    marketData?.options[0]?.id || ''
  )

  // Redirect if market not found
  if (!marketData) {
    return <Navigate to="/" replace />
  }

  // Convert chart data to format needed by Graph component
  const candidates = marketData.options.map(opt => ({
    id: opt.id,
    name: opt.name,
    value: opt.chance,
    color: opt.color,
    data: marketData.chartData[opt.id] || [],
  }))

  const handleOptionSelect = (option: MarketOption) => {
    setSelectedOption(option)
    setSelectedRulesCandidate(option.id)
  }

  const rulesCandidates = marketData.options.map(o => ({ id: o.id, name: o.name }))

  const currentOption = selectedOption || marketData.options[0]

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
            options={marketData.options}
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
        />
      </div>
    </div>
  )
}