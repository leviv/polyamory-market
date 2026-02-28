import { useState } from 'react'
import type { MarketOption } from '../types/market'
import './MarketOptions.scss'

interface MarketOptionsProps {
  volume?: string
  options?: MarketOption[]
  onSelectOption?: (option: MarketOption) => void
}

const defaultOptions: MarketOption[] = [
  {
    id: 'newsom',
    name: 'Gavin Newsom',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gavin_Newsom_official_photo.jpg/440px-Gavin_Newsom_official_photo.jpg',
    chance: 27,
    yesPrice: 27,
    noPrice: 75,
    odds: 3.7,
    color: '#4ade80',
  },
  {
    id: 'aoc',
    name: 'Alexandria Ocasio-Cortez',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Alexandria_Ocasio-Cortez_Official_Portrait.jpg/440px-Alexandria_Ocasio-Cortez_Official_Portrait.jpg',
    chance: 10,
    yesPrice: 10,
    noPrice: 91,
    odds: 10.0,
    color: '#3b82f6',
  },
  {
    id: 'harris',
    name: 'Kamala Harris',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/440px-Kamala_Harris_Vice_Presidential_Portrait.jpg',
    chance: 7,
    change: 1,
    yesPrice: 7,
    noPrice: 94,
    odds: 14.3,
    color: '#f97316',
  },
]

export const MarketOptions = ({
  volume = "$55,928,199",
  options = defaultOptions,
  onSelectOption,
}: MarketOptionsProps) => {
  const [selectedId, setSelectedId] = useState<string | null>('aoc')
  const [activeTimeframe, setActiveTimeframe] = useState('ALL')

  const timeframes = ['1D', '1W', '1M', 'ALL']

  const handleSelect = (option: MarketOption) => {
    setSelectedId(option.id)
    onSelectOption?.(option)
  }

  return (
    <div className="market-options">
      {/* Top bar */}
      <div className="top-bar">
        <span className="volume">{volume} vol</span>
        <div className="timeframe-controls">
          {timeframes.map(tf => (
            <button
              key={tf}
              className={`timeframe-btn ${activeTimeframe === tf ? 'active' : ''}`}
              onClick={() => setActiveTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
          <button className="icon-btn" aria-label="Options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="18" x2="14" y2="18"/>
              <line x1="18" y1="18" x2="20" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Table header */}
      <div className="table-header">
        <span className="chance-label">Chance</span>
        <div className="header-icons">
          <button className="icon-btn" aria-label="Filter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="16" y2="6"/>
              <line x1="8" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="18" x2="12" y2="18"/>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Sort">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <polyline points="5 12 12 5 19 12"/>
              <line x1="12" y1="19" x2="12" y2="19"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Options list */}
      <div className="options-list">
        {options.map(option => (
          <div 
            key={option.id} 
            className={`option-row ${selectedId === option.id ? 'selected' : ''}`}
            onClick={() => handleSelect(option)}
          >
            <div className="option-info">
              <img src={option.image} alt={option.name} className="option-image" />
              <span className="option-name">{option.name}</span>
            </div>
            
            <div className="option-chance">
              <span className="chance-value">{option.chance}%</span>
              {option.change !== undefined && (
                <span className="change-indicator">
                  <span className="arrow">▲</span>
                  <span className="change-value">{option.change}</span>
                </span>
              )}
            </div>

            <div className="option-buttons">
              <button 
                className={`price-btn yes ${selectedId === option.id ? 'active' : ''}`}
              >
                Yes {option.yesPrice}¢
              </button>
              <button className="price-btn no">
                No {option.noPrice}¢
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* More markets link */}
      <div className="more-markets">
        <span>More markets</span>
      </div>
    </div>
  )
}
