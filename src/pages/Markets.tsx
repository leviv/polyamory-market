import { Link } from 'react-router-dom'
import { MarketInfo } from '../components/MarketInfo'
import marketsData from '../data/markets.json'
import type { MarketsJson } from '../types/market'
import './Markets.scss'

const data = marketsData as unknown as MarketsJson

export const Markets = () => {
  return (
    <div className="markets-page">
      <div className="markets-section">
        <div className="section-header">
          <h2 className="section-title">Relationships</h2>
          <span className="section-arrow">›</span>
        </div>
        <div className="markets-grid">
          {data.markets.map(market => (
            <Link key={market.id} to={`/${market.id}`} className="market-link">
              <MarketInfo
                title={market.title}
                icon={market.image}
                options={market.options.map(opt => ({
                  id: opt.id,
                  name: opt.name,
                  image: opt.image,
                  odds: opt.odds,
                  chance: opt.chance,
                }))}
                volume={market.volume}
                marketCount={market.marketCount}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
