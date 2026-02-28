import { useState } from 'react'
import { MarketHeader } from '../components/MarketHeader'
import { Graph } from '../components/Graph'
import { MarketOptions } from '../components/MarketOptions'
import { MarketRules } from '../components/MarketRules'
import { BuySell } from '../components/BuySell'
import type { LivelinePoint } from 'liveline'
import './Market.scss'

interface MarketOption {
  id: string
  name: string
  image: string
  chance: number
  change?: number
  yesPrice: number
  noPrice: number
}

interface MarketCandidate {
  id: string
  name: string
  value: number
  color: string
  data: LivelinePoint[]
}

interface MarketData {
  image: string
  title: string
  categories: string[]
  volume: string
  verificationSource: string
  ruleTemplate: string
  options: MarketOption[]
  candidates: MarketCandidate[]
}

// Generate chart data for candidates
const generateChartData = (
  baseValue: number,
  jumpDate: Date | null,
  finalValue: number
): LivelinePoint[] => {
  const points: LivelinePoint[] = []
  const dayMs = 24 * 60 * 60 * 1000
  const startDate = new Date('2024-11-01')
  const endDate = new Date('2026-02-28')
  let value = baseValue

  for (let time = startDate.getTime(); time <= endDate.getTime(); time += dayMs) {
    const date = new Date(time)
    if (jumpDate && date >= jumpDate && date < new Date(jumpDate.getTime() + 14 * dayMs)) {
      value += 1.2
    }
    value += (Math.random() - 0.5) * 1.5
    value = Math.max(3, Math.min(45, value))
    points.push({ time, value })
  }
  if (points.length > 0) points[points.length - 1].value = finalValue
  return points
}

const defaultMarketData: MarketData = {
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png",
  title: "2028 Democratic nominee for President?",
  categories: ["Politics", "US Elections"],
  volume: "$55,929,966",
  verificationSource: "Democratic Party",
  ruleTemplate: "If {candidate} wins and accepts the nomination for the Presidency for the Democratic party, then the market resolves to {yes}.",
  options: [
    {
      id: 'newsom',
      name: 'Gavin Newsom',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gavin_Newsom_official_photo.jpg/440px-Gavin_Newsom_official_photo.jpg',
      chance: 25,
      change: -2,
      yesPrice: 27,
      noPrice: 75,
    },
    {
      id: 'aoc',
      name: 'Alexandria Ocasio-Cortez',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Alexandria_Ocasio-Cortez_Official_Portrait.jpg/440px-Alexandria_Ocasio-Cortez_Official_Portrait.jpg',
      chance: 10,
      yesPrice: 10,
      noPrice: 91,
    },
    {
      id: 'harris',
      name: 'Kamala Harris',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/440px-Kamala_Harris_Vice_Presidential_Portrait.jpg',
      chance: 7,
      change: 1,
      yesPrice: 7,
      noPrice: 94,
    },
  ],
  candidates: [
    { 
      id: 'newsom', 
      name: 'Gavin Newsom', 
      value: 25, 
      color: '#4ade80',
      data: generateChartData(15, new Date('2025-08-01'), 25)
    },
    { 
      id: 'aoc', 
      name: 'Alexandria Ocasio-Cortez', 
      value: 10, 
      color: '#3b82f6',
      data: generateChartData(5, null, 10)
    },
    { 
      id: 'harris', 
      name: 'Kamala Harris', 
      value: 7, 
      color: '#f97316',
      data: generateChartData(4, null, 7)
    },
  ],
}

interface MarketProps {
  data?: MarketData
}

export const Market = ({ data = defaultMarketData }: MarketProps) => {
  const [selectedOption, setSelectedOption] = useState<MarketOption>(data.options[0])
  const [selectedRulesCandidate, setSelectedRulesCandidate] = useState(data.options[0].id)

  const handleOptionSelect = (option: MarketOption) => {
    setSelectedOption(option)
    setSelectedRulesCandidate(option.id)
  }

  const rulesCandidates = data.options.map(o => ({ id: o.id, name: o.name }))

  return (
    <div className="market-page">
      <div className="market-main">
        <MarketHeader 
          image={data.image}
          title={data.title}
          categories={data.categories}
        />
        
        <div className="market-content">
          <Graph candidates={data.candidates} />
          
          <MarketOptions 
            volume={data.volume}
            options={data.options}
            onSelectOption={handleOptionSelect}
          />
          
          <MarketRules 
            candidates={rulesCandidates}
            selectedCandidate={selectedRulesCandidate}
            ruleTemplate={data.ruleTemplate}
            verificationSource={data.verificationSource}
            onCandidateChange={setSelectedRulesCandidate}
          />
        </div>
      </div>
      
      <div className="market-sidebar">
        <BuySell 
          question={data.title}
          candidate={selectedOption.name}
          candidateImage={selectedOption.image}
          yesPrice={selectedOption.yesPrice}
          noPrice={selectedOption.noPrice}
        />
      </div>
    </div>
  )
}
