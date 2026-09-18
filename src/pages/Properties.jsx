import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";

import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
import { properties } from "../data/properties";

function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMode =
    searchParams.get("type") === "rent" ? "Rent" : "Buy";

  const initialLocation =
    searchParams.get("location") || "";

  const [mode, setMode] = useState(initialMode);
  const [location, setLocation] = useState(initialLocation);

  const [type, setType] = useState(
    searchParams.get("propertyType") || "All"
  );

  const [bedrooms, setBedrooms] = useState(
    searchParams.get("bedrooms") || "Any"
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || "Any"
  );

  const [sort, setSort] = useState("Featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  /* =========================
     FILTER PROPERTIES
  ========================= */

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const locationMatch =
        !location.trim() ||
        property.location
          ?.toLowerCase()
          .includes(location.toLowerCase()) ||
        property.city
          ?.toLowerCase()
          .includes(location.toLowerCase());

      const typeMatch =
        type === "All" || property.type === type;

      const bedroomMatch =
        bedrooms === "Any" ||
        property.bedrooms >= Number(bedrooms);

      const priceMatch =
        maxPrice === "Any" ||
        property.price <= Number(maxPrice);

      const modeMatch =
        mode === "Buy"
          ? property.status === "For Sale"
          : property.status === "For Rent";

      return (
        locationMatch &&
        typeMatch &&
        bedroomMatch &&
        priceMatch &&
        modeMatch
      );
    });

    if (sort === "Price low to high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price high to low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    location,
    type,
    bedrooms,
    maxPrice,
    sort,
    mode,
  ]);

  /* =========================
     UPDATE URL
  ========================= */

  const updateURL = () => {
    const params = new URLSearchParams();

    params.set(
      "type",
      mode === "Rent" ? "rent" : "buy"
    );

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (type !== "All") {
      params.set("propertyType", type);
    }

    if (bedrooms !== "Any") {
      params.set("bedrooms", bedrooms);
    }

    if (maxPrice !== "Any") {
      params.set("maxPrice", maxPrice);
    }

    setSearchParams(params);
  };

  /* =========================
     BUY / RENT
  ========================= */

  const handleModeChange = (newMode) => {
    setMode(newMode);

    const params = new URLSearchParams(searchParams);

    params.set(
      "type",
      newMode === "Rent" ? "rent" : "buy"
    );

    setSearchParams(params);
  };

  const handleSearch = () => {
    updateURL();
  };

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setLocation("");
    setType("All");
    setBedrooms("Any");
    setMaxPrice("Any");
    setSort("Featured");

    setSearchParams({
      type: mode === "Rent" ? "rent" : "buy",
    });
  };

  return (
    <>
      <main
        className={
          mode === "Buy"
            ? "properties-page sale-mode"
            : "properties-page rent-mode"
        }
      >

        {/* =========================
            SEARCH HEADER
        ========================= */}

        <section className="properties-search">

          <div className="properties-search-inner">

            {/* BUY / RENT */}

            <div className="property-mode-tabs">

              <button
                className={
                  mode === "Buy" ? "active" : ""
                }
                onClick={() =>
                  handleModeChange("Buy")
                }
              >
                Buy
              </button>

              <button
                className={
                  mode === "Rent" ? "active" : ""
                }
                onClick={() =>
                  handleModeChange("Rent")
                }
              >
                Rent
              </button>

            </div>

            {/* SEARCH */}

            <div className="results-search-row">

              <div className="results-search-input">

                <Search size={20} />

                <input
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search by city, area or postcode"
                />

                <button
                  className="results-search-submit"
                  onClick={handleSearch}
                >
                  <Search size={18} />
                </button>

              </div>

              {/* FILTER BUTTON */}

              <button
                className="results-filter-button mobile-only"
                onClick={() =>
                  setMobileFilters(true)
                }
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>

            </div>

          </div>

        </section>

        {/* =========================
            RESULTS
        ========================= */}

        <section className="results-layout">

          {/* =========================
              DESKTOP FILTERS
          ========================= */}

          <aside className="filters-panel">

            <div className="filters-heading">

              <h2>Filter results</h2>

              <button onClick={clearFilters}>
                Clear
              </button>

            </div>

            <label>Property type</label>

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);

                setSearchParams({
                  type:
                    mode === "Rent"
                      ? "rent"
                      : "buy",

                  ...(location
                    ? { location }
                    : {}),

                  ...(e.target.value !== "All"
                    ? {
                      propertyType:
                        e.target.value,
                    }
                    : {}),
                });
              }}
            >
              <option>All</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
            </select>

            <label>Bedrooms</label>

            <select
              value={bedrooms}
              onChange={(e) =>
                setBedrooms(e.target.value)
              }
            >
              <option>Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>

            <label>Maximum price</label>

            <select
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
            >
              <option>Any</option>

              <option value="10000000">
                Rs. 10M
              </option>

              <option value="20000000">
                Rs. 20M
              </option>

              <option value="30000000">
                Rs. 30M
              </option>

              <option value="50000000">
                Rs. 50M
              </option>

            </select>

            <button
              className="apply-desktop-filters"
              onClick={updateURL}
            >
              Apply filters
            </button>

          </aside>

          {/* =========================
              LISTINGS
          ========================= */}

          <div className="results-content">

            <div className="results-topbar">

              <div>

                <span className="properties-eyebrow">
                  ESTATEHUB
                </span>

                <h1>
                  {mode === "Buy"
                    ? "Properties for sale"
                    : "Properties to rent"}
                </h1>

                <p>
                  {filteredProperties.length}{" "}
                  {filteredProperties.length === 1
                    ? "property"
                    : "properties"}{" "}
                  found
                </p>

              </div>

              {/* SORT */}

              <div className="sort-box">

                <span>Sort by</span>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                >
                  <option>Featured</option>
                  <option>
                    Price low to high
                  </option>
                  <option>
                    Price high to low
                  </option>
                </select>

                <ChevronDown size={16} />

              </div>

            </div>

            {/* PROPERTY CARDS */}

            {filteredProperties.length > 0 ? (

              <div className="results-grid">

                {filteredProperties.map(
                  (property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                    />
                  )
                )}

              </div>

            ) : (

              <div className="no-results">

                <h2>
                  No properties found
                </h2>

                <p>
                  Try changing your location
                  or filters.
                </p>

                <button
                  onClick={clearFilters}
                >
                  Clear filters
                </button>

              </div>

            )}

          </div>

        </section>

        {/* =========================
            MOBILE FILTERS
        ========================= */}

        {mobileFilters && (

          <div className="mobile-filter-overlay">

            <div className="mobile-filter-panel">

              <div className="mobile-filter-header">

                <h2>Filters</h2>

                <button
                  onClick={() =>
                    setMobileFilters(false)
                  }
                >
                  <X size={23} />
                </button>

              </div>

              <label>
                Property type
              </label>

              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
              >
                <option>All</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>

              <label>
                Bedrooms
              </label>

              <select
                value={bedrooms}
                onChange={(e) =>
                  setBedrooms(e.target.value)
                }
              >
                <option>Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>

              <label>
                Maximum price
              </label>

              <select
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
              >
                <option>Any</option>

                <option value="10000000">
                  Rs. 10M
                </option>

                <option value="20000000">
                  Rs. 20M
                </option>

                <option value="30000000">
                  Rs. 30M
                </option>

                <option value="50000000">
                  Rs. 50M
                </option>

              </select>

              <button
                className="apply-filters-btn"
                onClick={() => {
                  updateURL();
                  setMobileFilters(false);
                }}
              >
                Apply filters
              </button>

            </div>

          </div>

        )}

      </main>

      {/* FOOTER */}

      <Footer />

      {/* =========================
          PAGE CSS
      ========================= */}

      <style>{`

        /* =================================
           FULL PROPERTIES PAGE
        ================================= */

        .properties-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;

          background-image:
            linear-gradient(
              rgba(5, 30, 20, 0.78),
              rgba(5, 30, 20, 0.88)
            ),
            url("/hero-house.jpg");

          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }

        .properties-page::before {
          content: "";
          position: fixed;
          inset: 0;

          background-image:
            url("/hero-house.jpg");

          background-size: cover;
          background-position: center;

          z-index: -2;
          pointer-events: none;

          animation:
            estatePropertiesZoom
            16s ease-in-out infinite alternate;
        }

        .properties-page::after {
          content: "";
          position: fixed;
          inset: 0;

          background:
            rgba(5, 30, 20, 0.52);

          z-index: -1;
          pointer-events: none;
        }

        @keyframes estatePropertiesZoom {

          from {
            transform: scale(1);
          }

          to {
            transform: scale(1.08);
          }

        }

        /* =================================
           SEARCH HEADER
        ================================= */

        .properties-search {
          position: relative;
          z-index: 5;

          padding: 55px 5% 35px;

          background: transparent !important;
        }

        .properties-search-inner {
          max-width: 1250px;
          margin: auto;

          padding: 22px;

          background:
            rgba(220, 252, 231, 0.88) !important;

          border:
            1px solid
            rgba(167, 243, 208, 0.9);

          border-radius: 24px;

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          box-shadow:
            0 15px 40px
            rgba(6, 78, 59, 0.20);
        }

        /* =================================
           BUY / RENT
        ================================= */

        .property-mode-tabs {
          display: flex;
          gap: 8px;

          width: fit-content;

          margin-bottom: 18px;

          padding: 4px;

          background:
            rgba(167, 243, 208, 0.45);

          border-radius: 12px;
        }

        .property-mode-tabs button {
          border: none !important;
          outline: none;

          background: transparent !important;

          color: #374151 !important;

          padding: 10px 22px;

          border-radius: 9px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.3s ease;
        }

        .property-mode-tabs button.active {
          background: transparent !important;
          color: #374151 !important;

          box-shadow: none !important;
        }

        .property-mode-tabs button:hover {
          background:
            rgba(255, 255, 255, 0.35) !important;
        }

        /* =================================
           SEARCH INPUT
        ================================= */

        .results-search-row {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .results-search-input {
          flex: 1;

          display: flex;
          align-items: center;
          gap: 12px;

          min-height: 54px;

          padding-left: 17px;

          background:
            rgba(255, 255, 255, 0.92) !important;

          border:
            1px solid #a7f3d0 !important;

          border-radius: 14px;

          box-shadow:
            0 5px 15px
            rgba(6, 78, 59, 0.08);
        }

        .results-search-input > svg {
          flex-shrink: 0;

          color: #374151 !important;
        }

        .results-search-input input {
          flex: 1;

          min-width: 0;

          border: none !important;
          outline: none !important;

          background: transparent !important;

          color: #064e3b !important;

          font-size: 15px;
        }

        .results-search-input
        input::placeholder {
          color: #789086 !important;
        }

        .results-search-submit {
          width: 48px;
          height: 46px;

          margin-right: 4px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: none;

          background: #374151 !important;

          color: white !important;

          border-radius: 11px;

          cursor: pointer;

          transition: 0.3s ease;
        }

        .results-search-submit svg {
          color: white !important;
        }

        .results-search-submit:hover {
          background: #1f2937 !important;
          transform: translateY(-2px);
        }

        /* =================================
           FILTER BUTTON
        ================================= */

        .results-filter-button {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 13px 20px;

          background:
            rgba(220, 252, 231, 0.95) !important;

          color: #065f46 !important;

          border:
            1px solid #a7f3d0 !important;

          border-radius: 12px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.3s ease;
        }

        .results-filter-button svg {
          color: #065f46 !important;
        }

        .results-filter-button:hover {
          background:
            #d1fae5 !important;

          transform: translateY(-2px);

          box-shadow:
            0 6px 18px
            rgba(6, 95, 70, 0.15);
        }

        /* =================================
           RESULTS AREA
        ================================= */

        .results-layout {
          position: relative;
          z-index: 2;

          max-width: 1350px;

          margin: 0 auto;

          padding: 35px 5% 100px;

          background: transparent !important;
        }

        .results-content {
          background: transparent !important;
        }

        /* =================================
           FILTER PANEL
        ================================= */

        .filters-panel {
          background:
            rgba(255, 255, 255, 0.94) !important;

          border-radius: 20px;

          backdrop-filter: blur(10px);

          box-shadow:
            0 15px 35px
            rgba(0, 0, 0, 0.10);
        }

        /* =================================
           TOP TITLE
        ================================= */

        .properties-eyebrow {
          display: inline-block;

          margin-bottom: 7px;

          color: #a7f3d0;

          font-size: 12px;

          font-weight: 800;

          letter-spacing: 2px;
        }

        .results-topbar h1 {
          color: white !important;

          text-shadow:
            0 3px 15px
            rgba(0, 0, 0, 0.35);
        }

        .results-topbar p {
          color:
            rgba(255, 255, 255, 0.78) !important;
        }

        .sort-box {
          background:
            rgba(255, 255, 255, 0.92) !important;

          border-radius: 12px;

          padding: 8px 12px;
        }

        /* =================================
           PROPERTY GRID
        ================================= */

        .results-grid {
          position: relative;
          z-index: 3;
        }

        /* =================================
           NO RESULTS
        ================================= */

        .no-results {
          background:
            rgba(255, 255, 255, 0.94);

          padding: 55px;

          border-radius: 22px;

          text-align: center;
        }

        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 768px) {

          .properties-page {
            background-attachment: scroll;
          }

          .properties-page::before {
            position: absolute;
          }

          .properties-search {
            padding:
              30px 18px 20px;
          }

          .properties-search-inner {
            padding: 16px;

            border-radius: 18px;
          }

          .results-search-row {
            flex-direction: column;
            align-items: stretch;
          }

          .results-search-input {
            width: 100%;
          }

          .results-filter-button {
            width: 100%;
          }

          .results-layout {
            padding:
              20px 18px 70px;
          }

          .filters-panel {
            display: none;
          }

          .results-topbar {
            gap: 20px;
          }

          .results-topbar h1 {
            font-size: 30px !important;
          }

        }

      `}</style>
    </>
  );
}

export default Properties;