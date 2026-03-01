import { useState } from "react";
import "./BuySell.scss";

interface BuySellProps {
  question?: string;
  candidate?: string;
  candidateImage?: string;
  yesPrice?: number;
  noPrice?: number;
  onBuySell?: (
    mode: "buy" | "sell",
    selection: "yes" | "no",
    dollars: number,
  ) => void;
}

function addCommas(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "$&,");
}

export const BuySell = ({
  question = "2028 Democratic nominee for President?",
  candidate = "Alexandria Ocasio-Cortez",
  candidateImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Alexandria_Ocasio-Cortez_Official_Portrait.jpg/440px-Alexandria_Ocasio-Cortez_Official_Portrait.jpg",
  yesPrice = 10,
  noPrice = 91,
  onBuySell,
}: BuySellProps) => {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [selection, setSelection] = useState<"yes" | "no">("yes");
  const [dollars, setDollars] = useState(0);

  return (
    <div className="buysell-container">
      {/* Header */}
      <div className="buysell-header">
        <img src={candidateImage} alt={candidate} className="candidate-image" />
        <div className="header-text">
          <p className="question">{question}</p>
          <p className="action-text">
            <span className="buy-yes">Buy Yes</span> · {candidate}
          </p>
        </div>
      </div>

      {/* Buy/Sell Toggle & Currency */}
      <div className="controls-row">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === "buy" ? "active" : ""}`}
            onClick={() => setMode("buy")}
          >
            Buy
          </button>
          <button
            className={`mode-btn ${mode === "sell" ? "active" : ""}`}
            onClick={() => setMode("sell")}
          >
            Sell
          </button>
        </div>
        <button className="currency-dropdown">
          Dollars <span className="chevron">▾</span>
        </button>
      </div>

      {/* Yes/No Selection */}
      <div className="selection-row">
        <button
          className={`selection-btn yes ${selection === "yes" ? "active" : ""}`}
          onClick={() => setSelection("yes")}
        >
          Yes {yesPrice}¢
        </button>
        <button
          className={`selection-btn no ${selection === "no" ? "active" : ""}`}
          onClick={() => setSelection("no")}
        >
          No {noPrice}¢
        </button>
      </div>

      {/* Dollars Input */}
      <div className="dollars-input">
        <div className="dollars-info">
          <span className="dollars-label">Dollars</span>
          <span className="interest-text">Earn 3.25% Interest</span>
        </div>
        <input
          style={{ color: dollars > 0 ? "black" : undefined }}
          className="dollars-amount"
          type="input"
          min={0}
          value={`$${addCommas(dollars)}`}
          onChange={(e) =>
            setDollars(
              Math.max(
                0,
                Number(e.target.value.slice(1).replaceAll(",", "")) || 0,
              ),
            )
          }
          onFocus={(e) => {
            e.target.select();
            setTimeout(function () {
              e.target.select();
            }, 10);
          }}
        />
      </div>

      {/* Buy Button */}
      <button
        className="buy-button"
        disabled={dollars <= 0}
        onClick={() => {
          if (onBuySell && dollars > 0) {
            onBuySell(mode, selection, dollars);
            setDollars(0);
          }
        }}
      >
        {mode === "buy" ? "Buy" : "Sell"}
      </button>
    </div>
  );
};
