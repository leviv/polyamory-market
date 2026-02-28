import { useState } from 'react'
import './MarketRules.scss'

interface Candidate {
  id: string
  name: string
}

interface MarketRulesProps {
  candidates?: Candidate[]
  selectedCandidate?: string
  ruleTemplate?: string
  verificationSource?: string
  onCandidateChange?: (candidateId: string) => void
}

const defaultCandidates: Candidate[] = [
  { id: 'newsom', name: 'Gavin Newsom' },
  { id: 'aoc', name: 'Alexandria Ocasio-Cortez' },
  { id: 'harris', name: 'Kamala Harris' },
]

export const MarketRules = ({
  candidates = defaultCandidates,
  selectedCandidate = 'newsom',
  ruleTemplate = "If {candidate} wins and accepts the nomination for the Presidency for the Democratic party, then the market resolves to {yes}.",
  verificationSource = "Democratic Party",
  onCandidateChange,
}: MarketRulesProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const selected = candidates.find(c => c.id === selectedCandidate) || candidates[0]

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const handleCandidateSelect = (candidateId: string) => {
    onCandidateChange?.(candidateId)
    setIsDropdownOpen(false)
  }

  // Parse the rule template and render with highlights
  const renderRule = () => {
    const parts = ruleTemplate.split(/(\{candidate\}|\{yes\})/)
    return parts.map((part, i) => {
      if (part === '{candidate}') {
        return <span key={i}>{selected.name}</span>
      }
      if (part === '{yes}') {
        return <span key={i} className="yes-highlight">Yes</span>
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div className="market-rules">
      {/* Header */}
      <div className="rules-header">
        <h2 className="rules-title">Rules summary</h2>
        <button className="info-btn" aria-label="Info">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </button>
      </div>

      {/* Candidate dropdown */}
      <div className="candidate-dropdown">
        <button 
          className="dropdown-trigger"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="candidate-name">{selected.name}</span>
          <span className={`chevron ${isDropdownOpen ? 'open' : ''}`}>▾</span>
        </button>
        
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {candidates.map(c => (
              <button 
                key={c.id}
                className={`dropdown-item ${c.id === selectedCandidate ? 'active' : ''}`}
                onClick={() => handleCandidateSelect(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Rule text */}
      <p className="rule-text">
        {renderRule()} Outcome verified from <strong>{verificationSource}</strong>.
      </p>

      {/* Action buttons */}
      <div className="action-buttons">
        <button className="outline-btn">View full rules</button>
        <button className="outline-btn">Help center</button>
      </div>

      {/* Collapsible sections */}
      <div className="collapsible-sections">
        <div className="section">
          <button 
            className="section-header"
            onClick={() => toggleSection('timeline')}
          >
            <div className="section-left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className="section-title">Timeline and payout</span>
            </div>
            <span className={`chevron ${expandedSections.includes('timeline') ? 'open' : ''}`}>▾</span>
          </button>
          {expandedSections.includes('timeline') && (
            <div className="section-content">
              <p>Timeline and payout details would appear here.</p>
            </div>
          )}
        </div>

        <div className="section">
          <button 
            className="section-header"
            onClick={() => toggleSection('prohibitions')}
          >
            <div className="section-left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
              </svg>
              <span className="section-title">Trading prohibitions</span>
            </div>
            <span className={`chevron ${expandedSections.includes('prohibitions') ? 'open' : ''}`}>▾</span>
          </button>
          {expandedSections.includes('prohibitions') && (
            <div className="section-content">
              <p>Trading prohibition details would appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
