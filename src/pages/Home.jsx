import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Sparkles,
  Calculator,
  Bell,
  ChevronRight,
  MapPin,
  Clock3,
  KeyRound,
} from "lucide-react";

import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Buy");
  const [search, setSearch] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Instant valuation
  const [valuationOpen, setValuationOpen] = useState(false);
  const [valuationResult, setValuationResult] = useState(null);

  const [valuationForm, setValuationForm] = useState({
    location: "",
    propertyType: "House",
    bedrooms: "3",
    area: "",
  });

  const tabs = [
    "Buy",
    "Rent",
    "Instant valuation",
    "Rent checker",
    "Sold prices",
  ];

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      setMessage("Please enter a location, city or area.");
      return;
    }

    if (activeTab === "Instant valuation") {
      setValuationResult(null);
      setValuationOpen(true);
      return;
    }

    if (activeTab === "Rent checker") {
      setMessage("Rent checker selected.");
      return;
    }

    if (activeTab === "Sold prices") {
      setMessage("Sold prices selected.");
      return;
    }

    const type = activeTab === "Rent" ? "rent" : "buy";

    navigate(
      `/properties?type=${type}&location=${encodeURIComponent(value)}`
    );
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMessage("");

    if (tab === "Instant valuation") {
      setValuationResult(null);
      setValuationOpen(true);
    }
  };

  const handleLocationClick = (city) => {
    setSearch(city);
    setActiveTab("Buy");

    navigate(
      `/properties?type=buy&location=${encodeURIComponent(city)}`
    );
  };

  const openValuation = () => {
    setMessage("");
    setValuationResult(null);
    setValuationOpen(true);
  };

  const handleValuationSubmit = (e) => {
    e.preventDefault();

    const area = Number(valuationForm.area);

    if (!valuationForm.location.trim()) {
      alert("Please enter your property location.");
      return;
    }

    if (!area || area <= 0) {
      alert("Please enter a valid property area.");
      return;
    }

    const rates = {
      House: 25000,
      Apartment: 18000,
      Plot: 12000,
    };

    const bedroomMultiplier = {
      1: 0.8,
      2: 0.9,
      3: 1,
      4: 1.15,
      5: 1.3,
    };

    const rate =
      rates[valuationForm.propertyType] || 20000;

    const multiplier =
      bedroomMultiplier[valuationForm.bedrooms] || 1;

    const estimatedValue = Math.round(
      area * rate * multiplier
    );

    setValuationResult(estimatedValue);
  };

  const resetValuation = () => {
    setValuationResult(null);

    setValuationForm({
      location: "",
      propertyType: "House",
      bedrooms: "3",
      area: "",
    });
  };

  return (
    <div className="otm-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar />

      {/* =========================
          HERO
      ========================= */}
      <section className="otm-hero">

        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/property-1.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-inner">

          <h1>
            Your property search just got serious
          </h1>

          <div className="hero-search-card">

            {/* SEARCH TABS */}

            <div className="hero-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={
                    activeTab === tab ? "active" : ""
                  }
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* MAIN SEARCH */}

            <div className="main-search">

              <Sparkles
                size={24}
                className="search-spark"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setMessage("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search by city, area or postcode"
              />

              <button
                type="button"
                className="main-search-button"
                onClick={handleSearch}
                aria-label="Search"
              >
                <Search size={22} />
              </button>

            </div>

            {/* SEARCH MESSAGE */}

            {message && (
              <div className="search-result-message">
                {message}
              </div>
            )}

            {/* VALUATION STRIP */}

            <div className="valuation-strip">

              <div className="valuation-left">

                <Calculator size={34} />

                <div>
                  <span>INSTANT VALUATION</span>

                  <h2>
                    Find out your home's value, instantly
                  </h2>
                </div>

              </div>

              <button
                type="button"
                className="valuation-action"
                onClick={openValuation}
              >
                Start instant valuation
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          PROPERTY ALERT
      ========================= */}

      <section className="alert-section">

        <div className="alert-copy">

          <h2>
            Set up a property alert
          </h2>

          <p>
            Stay one step ahead. Whether you're looking
            to buy or rent, receive instant alerts as soon
            as new properties hit the market in your
            search area.
          </p>

          <button
            type="button"
            className="red-pill-button"
            onClick={() => setAlertOpen(true)}
          >
            Create alert
          </button>

        </div>

        <div className="alert-image">

          <img
            src="/property-alert.jpg"
            alt="Property alert"
          />

        </div>

      </section>

      {/* =========================
          LOCATIONS
      ========================= */}

      <section className="location-section">

        <div className="section-heading">

          <span>EXPLORE</span>

          <h2>
            Browse Pakistan locations
          </h2>

        </div>

        <div className="location-links">

          {[
            "Islamabad",
            "Lahore",
            "Karachi",
            "Rawalpindi",
            "Faisalabad",
            "Multan",
          ].map((city) => (

            <button
              type="button"
              key={city}
              onClick={() => handleLocationClick(city)}
            >
              <MapPin size={18} />
              {city}
            </button>

          ))}

        </div>

      </section>

      {/* =========================
          ONLY WITH ESTATEHUB
      ========================= */}

      <section className="featured-section">

        <div className="featured-image">

          <img
            src="/only-estatehub.jpg"
            alt="EstateHub featured properties"
          />

        </div>

        <div className="featured-copy">

          <span>
            ONLY WITH ESTATEHUB
          </span>

          <h2>
            Discover properties you may not
            find anywhere else.
          </h2>

          <p>
            Explore new homes and exclusive properties
            available through EstateHub.
          </p>

          <button
            type="button"
            onClick={() => navigate("/properties")}
          >
            Start your property search
            <ChevronRight size={19} />
          </button>

        </div>

      </section>

      {/* =========================
          SMART SEARCH TOOLS
      ========================= */}

      <section className="tools-section">

        <div className="section-heading">

          <span>
            SMARTER SEARCH
          </span>

          <h2>
            Make finding your property easier
          </h2>

        </div>

        <div className="tools-grid">

          {/* HELP ME CHOOSE */}

          <article className="tool-card">

            <div className="tool-icon">
              <KeyRound size={27} />
            </div>

            <h3>
              Help Me Choose
            </h3>

            <p>
              Tell us what you're looking for and
              we'll guide you towards suitable
              properties.
            </p>

            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Help Me Choose started."
                )
              }
            >
              Let's go
              <ChevronRight size={18} />
            </button>

          </article>

          {/* KEYWORDS */}

          <article className="tool-card">

            <div className="tool-icon">
              <Sparkles size={27} />
            </div>

            <h3>
              Introducing Keywords
            </h3>

            <p>
              Add the features that matter most to
              your search, from must-haves to
              nice-to-haves.
            </p>

            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Keyword search selected."
                )
              }
            >
              Start
              <ChevronRight size={18} />
            </button>

          </article>

          {/* TRAVEL TIME */}

          <article className="tool-card">

            <div className="tool-icon">
              <Clock3 size={27} />
            </div>

            <h3>
              Travel Time Search
            </h3>

            <p>
              Find properties near your workplace,
              school or favourite location.
            </p>

            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Travel Time Search selected."
                )
              }
            >
              Search
              <ChevronRight size={18} />
            </button>

          </article>

        </div>

      </section>

      {/* =========================
          VALUATION
      ========================= */}

      <section className="valuation-section">

        <div>

          <span>
            VALUE YOUR HOME ONLINE
          </span>

          <h2>
            Instant valuation
          </h2>

          <p>
            Get a free estimate of your property's
            current value in minutes.
          </p>

        </div>

        <button
          type="button"
          onClick={openValuation}
        >
          Start
          <ChevronRight size={19} />
        </button>

      </section>

      {/* =========================
          COMMERCIAL
      ========================= */}

      <section className="commercial-section">

        <div className="commercial-copy">

          <span>
            COMMERCIAL PROPERTY
          </span>

          <h2>
            Find your next commercial space
          </h2>

          <p>
            Explore offices, shops, warehouses and
            other commercial opportunities.
          </p>

          <button
            type="button"
            onClick={() => navigate("/commercial")}
          >
            Explore commercial
            <ChevronRight size={18} />
          </button>

        </div>

        <div className="commercial-image">

          <img
            src="/commercial.jpg"
            alt="Commercial property"
          />

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="otm-footer">

        <div className="footer-main">

          <div>

            <h2>
              EstateHub
            </h2>

            <p>
              The simple way to search for property
              to buy or rent in Pakistan.
            </p>

          </div>

          <div>

            <h3>
              Property
            </h3>

            <button
              type="button"
              onClick={() =>
                navigate("/properties?type=buy")
              }
            >
              Property for sale
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/properties?type=rent")
              }
            >
              Property to rent
            </button>

            <button type="button">
              New homes
            </button>

            <button
              type="button"
              onClick={() => navigate("/commercial")}
            >
              Commercial
            </button>

          </div>

          <div>

            <h3>
              EstateHub
            </h3>

            <button
              type="button"
              onClick={() => navigate("/agents")}
            >
              Find an agent
            </button>

            <button type="button">
              House prices
            </button>

            <button
              type="button"
              onClick={openValuation}
            >
              Valuations
            </button>

            <button type="button">
              Contact us
            </button>

          </div>

          <div>

            <h3>
              Help
            </h3>

            <button type="button">
              Help centre
            </button>

            <button
              type="button"
              onClick={() => setAlertOpen(true)}
            >
              Property alerts
            </button>

            <button type="button">
              Privacy
            </button>

            <button type="button">
              Terms
            </button>

          </div>

        </div>

        <div className="footer-bottom">
          © 2026 EstateHub. All rights reserved.
        </div>

      </footer>

      {/* =========================
          PROPERTY ALERT MODAL
      ========================= */}

      {alertOpen && (

        <div
          className="modal-overlay"
          onClick={() => setAlertOpen(false)}
        >

          <div
            className="alert-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="modal-close"
              onClick={() => setAlertOpen(false)}
            >
              ×
            </button>

            <div className="modal-icon">
              <Bell size={26} />
            </div>

            <h2>
              Create a property alert
            </h2>

            <p>
              Enter your email to receive new
              property alerts.
            </p>

            <input
              type="email"
              placeholder="Your email address"
            />

            <button
              type="button"
              className="modal-submit"
              onClick={() => {
                setAlertOpen(false);

                setMessage(
                  "Your property alert has been created."
                );
              }}
            >
              Create alert
            </button>

          </div>

        </div>

      )}

      {/* =========================
          INSTANT VALUATION MODAL
      ========================= */}

      {valuationOpen && (

        <div
          className="valuation-modal-overlay"
          onClick={() => setValuationOpen(false)}
        >

          <div
            className="valuation-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="valuation-modal-close"
              onClick={() => setValuationOpen(false)}
              aria-label="Close valuation"
            >
              ×
            </button>

            {!valuationResult ? (
              <>

                <span className="valuation-modal-label">
                  INSTANT VALUATION
                </span>

                <h2>
                  What's your property worth?
                </h2>

                <p>
                  Enter a few details to get an instant
                  estimated property value.
                </p>

                <form
                  className="valuation-form"
                  onSubmit={handleValuationSubmit}
                >

                  <label>
                    Location

                    <input
                      type="text"
                      placeholder="e.g. DHA Islamabad"
                      value={valuationForm.location}
                      onChange={(e) =>
                        setValuationForm({
                          ...valuationForm,
                          location: e.target.value,
                        })
                      }
                    />

                  </label>

                  <label>
                    Property type

                    <select
                      value={valuationForm.propertyType}
                      onChange={(e) =>
                        setValuationForm({
                          ...valuationForm,
                          propertyType: e.target.value,
                        })
                      }
                    >
                      <option value="House">
                        House
                      </option>

                      <option value="Apartment">
                        Apartment
                      </option>

                      <option value="Plot">
                        Plot
                      </option>
                    </select>

                  </label>

                  <label>
                    Bedrooms

                    <select
                      value={valuationForm.bedrooms}
                      onChange={(e) =>
                        setValuationForm({
                          ...valuationForm,
                          bedrooms: e.target.value,
                        })
                      }
                    >
                      <option value="1">
                        1 bedroom
                      </option>

                      <option value="2">
                        2 bedrooms
                      </option>

                      <option value="3">
                        3 bedrooms
                      </option>

                      <option value="4">
                        4 bedrooms
                      </option>

                      <option value="5">
                        5+ bedrooms
                      </option>
                    </select>

                  </label>

                  <label>
                    Property area (sq ft)

                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 2000"
                      value={valuationForm.area}
                      onChange={(e) =>
                        setValuationForm({
                          ...valuationForm,
                          area: e.target.value,
                        })
                      }
                    />

                  </label>

                  <button
                    type="submit"
                    className="valuation-submit"
                  >
                    Get my valuation
                  </button>

                </form>

              </>
            ) : (

              <div className="valuation-result">

                <div className="valuation-result-icon">
                  ✓
                </div>

                <span className="valuation-modal-label">
                  ESTIMATED PROPERTY VALUE
                </span>

                <h2>
                  Rs.{" "}
                  {valuationResult.toLocaleString()}
                </h2>

                <p>
                  This is a frontend demo estimate based
                  on the details you entered. Actual market
                  value may vary by location and property
                  condition.
                </p>

                <button
                  type="button"
                  className="valuation-submit"
                  onClick={resetValuation}
                >
                  Calculate again
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default Home;