import { MarketInfo } from '../components/MarketInfo'
import './Markets.scss'

interface MarketInfoOption {
  id: string
  name: string
  image: string
  odds: number
  chance: number
}

interface MarketData {
  id: string
  title: string
  subtitle?: string
  icon: string
  options: MarketInfoOption[]
  volume: string
  marketCount: number
}

interface MarketSection {
  title: string
  markets: MarketData[]
}

const electionsMarkets: MarketData[] = [
  {
    id: 'dem-nominee',
    title: '2028 Democratic nominee for President?',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png',
    options: [
      { id: 'newsom', name: 'Gavin Newsom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gavin_Newsom_official_photo.jpg/440px-Gavin_Newsom_official_photo.jpg', odds: 3.85, chance: 26 },
      { id: 'aoc', name: 'Alexandria Ocasio-Cortez', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Alexandria_Ocasio-Cortez_Official_Portrait.jpg/440px-Alexandria_Ocasio-Cortez_Official_Portrait.jpg', odds: 10.0, chance: 10 },
    ],
    volume: '$55,942,798',
    marketCount: 39,
  },
  {
    id: 'rep-nominee',
    title: '2028 Republican nominee for President?',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1200px-Republicanlogo.svg.png',
    options: [
      { id: 'vance', name: 'J.D. Vance', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/JD_Vance_official_portrait_%28cropped%29.jpg/440px-JD_Vance_official_portrait_%28cropped%29.jpg', odds: 2.27, chance: 44 },
      { id: 'rubio', name: 'Marco Rubio', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Senator_Rubio_official_portrait_%28cropped%29.jpg/440px-Senator_Rubio_official_portrait_%28cropped%29.jpg', odds: 5.00, chance: 20 },
    ],
    volume: '$16,329,713',
    marketCount: 30,
  },
  {
    id: 'pres-winner',
    title: '2028 U.S. Presidential Election winner?',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Seal_of_the_President_of_the_United_States.svg/1200px-Seal_of_the_President_of_the_United_States.svg.png',
    options: [
      { id: 'vance2', name: 'J.D. Vance', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/JD_Vance_official_portrait_%28cropped%29.jpg/440px-JD_Vance_official_portrait_%28cropped%29.jpg', odds: 4.35, chance: 23 },
      { id: 'newsom2', name: 'Gavin Newsom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gavin_Newsom_official_photo.jpg/440px-Gavin_Newsom_official_photo.jpg', odds: 5.56, chance: 18 },
    ],
    volume: '$14,852,707',
    marketCount: 24,
  },
  {
    id: 'house-winner',
    title: 'Which party will win the U.S. House?',
    subtitle: 'Jul 1 @ 8:40AM',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Seal_of_the_United_States_House_of_Representatives.svg/1200px-Seal_of_the_United_States_House_of_Representatives.svg.png',
    options: [
      { id: 'dem-party', name: 'Democratic Party', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png', odds: 1.22, chance: 82 },
      { id: 'rep-party', name: 'Republican Party', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1200px-Republicanlogo.svg.png', odds: 5.26, chance: 19 },
    ],
    volume: '$6,034,837',
    marketCount: 2,
  },
]

interface MarketTitleCard {
  id: string
  title: string
  badge: string
  badgeColor?: string
}

const democratsMarkets: MarketTitleCard[] = [
  { id: 'tx-senate', title: 'Texas Democratic Senate nominee?', badge: 'TX', badgeColor: '#14b8a6' },
  { id: 'mn-gov', title: 'Tim Walz out as Governor of Minnesota?', badge: 'MN', badgeColor: '#14b8a6' },
]

const sections: MarketSection[] = [
  { title: 'Elections', markets: electionsMarkets },
]

export const Markets = () => {
  return (
    <div className="markets-page">
      {sections.map(section => (
        <div key={section.title} className="markets-section">
          <div className="section-header">
            <h2 className="section-title">{section.title}</h2>
            <span className="section-arrow">›</span>
          </div>
          <div className="markets-grid">
            {section.markets.map(market => (
              <MarketInfo
                key={market.id}
                title={market.title}
                icon={market.icon}
                options={market.options}
                volume={market.volume}
                marketCount={market.marketCount}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Democrats section with title cards */}
      <div className="markets-section">
        <div className="section-header">
          <h2 className="section-title">Democrats</h2>
          <span className="section-arrow">›</span>
        </div>
        <div className="markets-grid">
          {democratsMarkets.map(market => (
            <div key={market.id} className="market-title-card">
              <span className="card-title">{market.title}</span>
              <span 
                className="card-badge" 
                style={{ backgroundColor: market.badgeColor }}
              >
                {market.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
