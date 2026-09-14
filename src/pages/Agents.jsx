import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { agents } from "../data/agents";

function Agents() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        agent.name.toLowerCase().includes(searchValue) ||
        agent.agency.toLowerCase().includes(searchValue);

      const matchesLocation =
        location === "All" ||
        agent.location === location;

      return matchesSearch && matchesLocation;
    });
  }, [search, location]);

  const locations = [
    "All",
    "Islamabad",
    "Lahore",
    "Karachi",
    "Rawalpindi",
  ];

  return (
    <main className="agents-page">

      {/* HERO */}
      <section className="agents-hero">
        <div className="agents-hero-content">

          <span>FIND AN AGENT</span>

          <h1>
            Find the right property expert
            for you
          </h1>

          <p>
            Connect with trusted EstateHub agents
            who know your local property market.
          </p>

        </div>
      </section>

      {/* SEARCH */}
      <section className="agents-search-section">

        <div className="agents-search-box">

          <div className="agent-search-input">
            <Search size={20} />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search agent or agency"
            />
          </div>

          <div className="agent-location-select">
            <MapPin size={19} />

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="agent-search-button"
          >
            <Search size={19} />
            Search
          </button>

        </div>

      </section>

      {/* RESULTS */}
      <section className="agents-content">

        <div className="agents-header">

          <div>
            <span>ESTATEHUB AGENTS</span>

            <h2>Find an agent</h2>

            <p>
              {filteredAgents.length} agents available
            </p>
          </div>

          <button
            type="button"
            className="agent-filter-button"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

        </div>

        {filteredAgents.length > 0 ? (
          <div className="agents-grid">

            {filteredAgents.map((agent) => (

              <article
                className="agent-card"
                key={agent.id}
              >

                <div className="agent-image">

                  <img
                    src={agent.image}
                    alt={agent.name}
                  />

                </div>

                <div className="agent-card-content">

                  <span className="agent-agency">
                    {agent.agency}
                  </span>

                  <h3>{agent.name}</h3>

                  <p className="agent-location">
                    <MapPin size={15} />
                    {agent.location}
                  </p>

                  <p className="agent-properties">
                    {agent.properties} active properties
                  </p>

                  <div className="agent-contact-row">

                    <a
                      href={`tel:${agent.phone}`}
                      aria-label={`Call ${agent.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone size={17} />
                    </a>

                    <a
                      href={`mailto:${agent.email}`}
                      aria-label={`Email ${agent.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail size={17} />
                    </a>

                  </div>

                  <button
                    type="button"
                    className="agent-view-button"
                    onClick={() =>
                      navigate(`/agents/${agent.id}`)
                    }
                  >
                    View profile
                  </button>

                </div>

              </article>

            ))}

          </div>
        ) : (
          <div className="agents-no-results">

            <h3>No agents found</h3>

            <p>
              Try a different name or location.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setLocation("All");
              }}
            >
              Clear search
            </button>

          </div>
        )}

      </section>

    </main>
  );
}

export default Agents;