import './MarketHeader.scss'

interface MarketHeaderProps {
  image?: string
  title?: string
  categories?: string[]
}

export const MarketHeader = ({
  image = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png",
  title = "2028 Democratic nominee for President?",
  categories = ["Politics", "US Elections"],
}: MarketHeaderProps) => {
  return (
    <div className="market-header">
      <div className="header-left">
        <img src={image} alt={title} className="market-image" />
        <div className="header-info">
          <div className="categories">
            {categories.map((cat, i) => (
              <span key={cat}>
                <span className="category">{cat}</span>
                {i < categories.length - 1 && <span className="separator">·</span>}
              </span>
            ))}
          </div>
          <h1 className="market-title">{title}</h1>
        </div>
      </div>
      
      <div className="header-actions">
        <button className="action-btn" aria-label="Refresh">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2v6h-6"/>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
            <path d="M3 22v-6h6"/>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
          </svg>
        </button>
        <button className="action-btn" aria-label="Share">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </button>
        <button className="action-btn" aria-label="Download">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
        <button className="action-btn" aria-label="Add">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
