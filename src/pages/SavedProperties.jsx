import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Building2,
  Home,
  Star,
  ChevronRight,
} from "lucide-react";

import { agents } from "../data/agents";
import { properties } from "../data/properties";

function AgentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const agent = agents.find(
    (item) => String(item.id) === String(id)
  );

  const agentProperties = useMemo(() => {
    if (!agent) return [];

    return properties
      .filter(
        (property) =>
          property.agent &&
          (
            property.agent.name === agent.name ||
            property.agent.email === agent.email
          )
      )
      .slice(0, 6);
  }, [agent]);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please complete the required fields.");
      return;
    }

    setEnquirySent(true);
  };

  const closeEnquiry = () => {
    setEnquiryOpen(false);
    setEnquirySent(false);
  };

  if (!agent) {
    return (
      <main className="agent-profile-page">
        <div className="agent-profile-not-found">
          <h1>Agent not found</h1>

          <p>
            The property agent you're looking for could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate("/agents")}
          >
            Back to agents
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="agent-profile-page">

      {/* TOP BAR */}

      <div className="agent-profile-topbar">
        <button
          type="button"
          className="agent-back-button"
          onClick={() => navigate("/agents")}
        >
          <ArrowLeft size={18} />
          Back to agents
        </button>
      </div>

      {/* PROFILE HERO */}

      <section className="agent-profile-hero">

        <div className="agent-profile-container">

          <div className="agent-profile-main">

            <div className="agent-profile-photo">
              <img
                src={agent.image}
                alt={agent.name}
              />
            </div>

            <div className="agent-profile-intro">

              <span className="agent-profile-label">
                PROPERTY EXPERT
              </span>

              <h1>{agent.name}</h1>

              <h2>{agent.agency}</h2>

              <p className="agent-profile-location">
                <MapPin size={17} />
                {agent.location}, Pakistan
              </p>

              <p className="agent-profile-description">
                {agent.name} is a trusted property professional
                helping buyers, renters and property owners find
                the right opportunities in the {agent.location} market.
              </p>

              <div className="agent-profile-actions">

                <a
                  href={`tel:${agent.phone}`}
                  className="agent-primary-action"
                >
                  <Phone size={18} />
                  Call agent
                </a>

                <a
                  href={`mailto:${agent.email}`}
                  className="agent-secondary-action"
                >
                  <Mail size={18} />
                  Email agent
                </a>

              </div>

            </div>

          </div>

          {/* QUICK STATS */}

          <div className="agent-profile-stats">

            <div>
              <Building2 size={22} />
              <strong>{agent.agency}</strong>
              <span>Agency</span>
            </div>

            <div>
              <Home size={22} />
              <strong>{agent.properties}</strong>
              <span>Active properties</span>
            </div>

            <div>
              <Star size={22} />
              <strong>4.9</strong>
              <span>Agent rating</span>
            </div>

            <div>
              <MapPin size={22} />
              <strong>{agent.location}</strong>
              <span>Main area</span>
            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="agent-profile-content">

        <div className="agent-profile-container">

          {/* LISTING HEADING */}

          <div className="agent-profile-section-heading">

            <div>
              <span>PROPERTY LISTINGS</span>

              <h2>
                Properties from {agent.name}
              </h2>

              <p>
                Explore properties currently marketed by this agent.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/properties?location=${encodeURIComponent(
                    agent.location
                  )}`
                )
              }
            >
              View all
              <ChevronRight size={18} />
            </button>

          </div>

          {/* PROPERTIES */}

          {agentProperties.length > 0 ? (
            <div className="agent-properties-grid">

              {agentProperties.map((property) => (

                <article
                  className="agent-property-card"
                  key={property.id}
                  onClick={() =>
                    navigate(`/properties/${property.id}`)
                  }
                >

                  <div className="agent-property-image">

                    <img
                      src={property.image}
                      alt={property.title || property.name}
                    />

                    <span>
                      {property.status ||
                        (property.type === "rent"
                          ? "To rent"
                          : "For sale")}
                    </span>

                  </div>

                  <div className="agent-property-content">

                    <p>
                      <MapPin size={14} />
                      {property.location}
                    </p>

                    <h3>
                      {property.title || property.name}
                    </h3>

                    <div className="agent-property-meta">

                      {property.bedrooms && (
                        <span>
                          {property.bedrooms} beds
                        </span>
                      )}

                      {property.bathrooms && (
                        <span>
                          {property.bathrooms} baths
                        </span>
                      )}

                    </div>

                    <strong>
                      Rs.{" "}
                      {Number(property.price).toLocaleString()}
                    </strong>

                  </div>

                </article>

              ))}

            </div>
          ) : (
            <div className="agent-empty-properties">

              <Home size={35} />

              <h3>No listed properties yet</h3>

              <p>
                This agent currently has no matching
                property listings in the local demo data.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/properties?location=${encodeURIComponent(
                      agent.location
                    )}`
                  )
                }
              >
                Browse {agent.location} properties
              </button>

            </div>
          )}

          {/* CONTACT CARD */}

          <section className="agent-contact-section">

            <div>
              <span>GET IN TOUCH</span>

              <h2>
                Speak to {agent.name}
              </h2>

              <p>
                Have a question about a property or the local
                market? Contact this agent directly.
              </p>
            </div>

            <div className="agent-contact-buttons">

              <a href={`tel:${agent.phone}`}>
                <Phone size={18} />
                {agent.phone}
              </a>

              <a href={`mailto:${agent.email}`}>
                <Mail size={18} />
                {agent.email}
              </a>

              <button
                type="button"
                className="agent-enquiry-button"
                onClick={() => {
                  setEnquiryOpen(true);
                  setEnquirySent(false);
                }}
              >
                Send enquiry
              </button>

            </div>

          </section>

        </div>

      </section>

      {/* ENQUIRY MODAL */}

      {enquiryOpen && (
        <div
          className="enquiry-modal-overlay"
          onClick={closeEnquiry}
        >
          <div
            className="enquiry-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="enquiry-close"
              onClick={closeEnquiry}
              aria-label="Close enquiry"
            >
              ×
            </button>

            {!enquirySent ? (
              <>
                <span>CONTACT AGENT</span>

                <h2>
                  Send an enquiry
                </h2>

                <p>
                  Contact {agent.name} about their properties.
                </p>

                <form onSubmit={handleEnquirySubmit}>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      handleFormChange("name", e.target.value)
                    }
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) =>
                      handleFormChange("email", e.target.value)
                    }
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) =>
                      handleFormChange("phone", e.target.value)
                    }
                  />

                  <textarea
                    placeholder="Your message"
                    rows="5"
                    value={form.message}
                    onChange={(e) =>
                      handleFormChange("message", e.target.value)
                    }
                    required
                  />

                  <button
                    type="submit"
                    className="enquiry-submit"
                  >
                    Send enquiry
                  </button>

                </form>
              </>
            ) : (
              <div className="enquiry-success">

                <div className="enquiry-success-icon">
                  ✓
                </div>

                <h2>
                  Enquiry sent
                </h2>

                <p>
                  Thanks {form.name}. Your enquiry has been
                  recorded for {agent.name}.
                </p>

                <button
                  type="button"
                  onClick={closeEnquiry}
                >
                  Done
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </main>
  );
}

export default AgentProfile;