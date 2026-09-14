import {
  Search,
  Sparkles,
  Calculator,
} from "lucide-react";

function SearchHero({
  searchType,
  setSearchType,
  searchText,
  setSearchText,
  onSearch,
}) {
  return (
    <section className="hero-section">
      <div className="hero-overlay-content">

        <p className="hero-small-text">
          ESTATEHUB
        </p>

        <h1>
          Your property search just got serious
        </h1>

        <div className="search-card">

          <div className="search-tabs">

            {["Buy", "Rent", "Instant valuation", "Rent checker", "Sold prices"].map(
              (tab) => (
                <button
                  key={tab}
                  className={
                    searchType === tab ? "active" : ""
                  }
                  onClick={() => setSearchType(tab)}
                >
                  {tab}
                </button>
              )
            )}

          </div>

          <div className="search-input-wrap">

            <Sparkles
              size={22}
              className="sparkle-icon"
            />

            <input
              type="text"
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
              placeholder="Search by city, area or postcode"
            />

            <button
              className="search-icon-button"
              onClick={onSearch}
            >
              <Search size={21} />
            </button>

          </div>

          <div className="valuation-bar">

            <div className="valuation-info">

              <div className="calculator-icon">
                <Calculator size={30} />
              </div>

              <div>
                <p>INSTANT PROPERTY VALUATION</p>

                <h2>
                  Find out your home's value, instantly
                </h2>
              </div>

            </div>

            <button
              className="valuation-btn"
              onClick={() => {
                alert(
                  "Instant valuation feature selected."
                );
              }}
            >
              Start instant valuation
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SearchHero;