import './MarketInfo.scss'

interface MarketInfoOption {
  id: string
  name: string
  image: string
  odds: number
  chance: number
}

interface MarketInfoProps {
  title?: string
  icon?: string
  options?: MarketInfoOption[]
  volume?: string
  marketCount?: number
}

const defaultOptions: MarketInfoOption[] = [
  {
    id: 'newsom',
    name: 'Gavin Newsom',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gavin_Newsom_official_photo.jpg/440px-Gavin_Newsom_official_photo.jpg',
    odds: 3.85,
    chance: 26,
  },
  {
    id: 'aoc',
    name: 'Alexandria Ocasio-Cortez',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Alexandria_Ocasio-Cortez_Official_Portrait.jpg/440px-Alexandria_Ocasio-Cortez_Official_Portrait.jpg',
    odds: 10.0,
    chance: 10,
  },
]

export const MarketInfo = ({
  title = "2028 Democratic nominee for President?",
  icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png",
  options = defaultOptions,
  volume = "$55,942,798",
  marketCount = 39,
}: MarketInfoProps) => {
  return (
    <div className="market-info">
      {/* Header */}
      <div className="market-info-header">
        <h3 className="market-info-title">{title}</h3>
        <img src={icon} alt="" className="market-info-icon" />
      </div>

      {/* Options list */}
      <div className="market-info-options">
        {options.map(option => (
          <div key={option.id} className="market-info-option">
            <div className="option-left">
              <img src={option.image} alt={option.name} className="option-image" />
              <span className="option-name">{option.name}</span>
            </div>
            <div className="option-right">
              <span className="option-odds">{option.odds.toFixed(option.odds % 1 === 0 ? 1 : 2)}x</span>
              <span className="option-chance">{option.chance}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="market-info-footer">
        <span className="volume">{volume} vol</span>
        <span className="market-count">{marketCount} markets</span>
      </div>
    </div>
  )
}
