import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import PropertyCard from "../components/PropertyCard";
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

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const locationMatch =
        !location.trim() ||
        property.location
          .toLowerCase()
          .includes(location.toLowerCase()) ||
        property.city
          .toLowerCase()
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
    <main className="properties-page">

      {/* SEARCH HEADER */}
      <section className="properties-search">
        <div className="properties-search-inner">

          <div className="property-mode-tabs">
            <button
              className={mode === "Buy" ? "active" : ""}
              onClick={() => handleModeChange("Buy")}
            >
              Buy
            </button>

            <button
              className={mode === "Rent" ? "active" : ""}
              onClick={() => handleModeChange("Rent")}
            >
              Rent
            </button>
          </div>

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

            <button
              className="results-filter-button mobile-only"
              onClick={() => setMobileFilters(true)}
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

          </div>

        </div>
      </section>

      {/* RESULTS */}
      <section className="results-layout">

        {/* DESKTOP FILTERS */}
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
                type: mode === "Rent" ? "rent" : "buy",
                ...(location
                  ? { location }
                  : {}),
                ...(e.target.value !== "All"
                  ? { propertyType: e.target.value }
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
            onChange={(e) => {
              setBedrooms(e.target.value);
            }}
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
            onChange={(e) => {
              setMaxPrice(e.target.value);
            }}
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

        {/* LISTINGS */}
        <div className="results-content">

          <div className="results-topbar">

            <div>
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

            <div className="sort-box">
              <span>Sort by</span>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >
                <option>Featured</option>
                <option>Price low to high</option>
                <option>Price high to low</option>
              </select>

              <ChevronDown size={16} />
            </div>

          </div>

          {filteredProperties.length > 0 ? (
            <div className="results-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h2>No properties found</h2>

              <p>
                Try changing your location or filters.
              </p>

              <button onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* MOBILE FILTERS */}
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

            <label>Property type</label>

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
  );
}

export default Properties;