import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  X,
  Play,
  ArrowLeft,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Heart,
  Share2,
  Phone,
  Mail,
  Check,
} from "lucide-react";
import { properties } from "../data/properties";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
    return (
      <main className="property-not-found">
        <h1>Property not found</h1>

        <button onClick={() => navigate("/properties")}>
          Back to properties
        </button>
      </main>
    );
  }

  const features = [
    `${property.bedrooms} bedrooms`,
    `${property.bathrooms} bathrooms`,
    property.area,
    property.type,
    "Parking available",
    "Modern interior",
  ];

  const hasVideo = Boolean(property.video);

  const closeVideo = () => {
    setVideoOpen(false);
  };

  return (
    <main className="property-details-page">

      {/* =========================================
          TOP BAR
      ========================================= */}
      <div className="details-topbar">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={19} />
          Back
        </button>

        <div className="details-actions">

          <button
            className={saved ? "saved-action" : ""}
            onClick={() => setSaved((prev) => !prev)}
          >
            <Heart
              size={19}
              fill={saved ? "currentColor" : "none"}
            />

            {saved ? "Saved" : "Save"}
          </button>

          <button>
            <Share2 size={18} />
            Share
          </button>

        </div>

      </div>


      {/* =========================================
          IMAGE GALLERY
      ========================================= */}
      <section className="details-gallery">

        {/* MAIN IMAGE */}
        <div className="gallery-main">

          <img
            src={property.image}
            alt={property.title}
          />

          {/* VIDEO BUTTON */}
          {hasVideo && (
            <>
              <button
                type="button"
                className="property-video-play"
                onClick={() => setVideoOpen(true)}
                aria-label={`Play video for ${property.title}`}
              >
                <Play
                  size={28}
                  fill="currentColor"
                />
              </button>

              <div className="video-label">
                <Play
                  size={15}
                  fill="currentColor"
                />
                Property Video
              </div>
            </>
          )}

        </div>


        {/* SIDE IMAGES */}
        <div className="gallery-side">

          <img
            src={property.image}
            alt={`${property.title} view 2`}
          />

          <img
            src={property.image}
            alt={`${property.title} view 3`}
          />

        </div>

      </section>


      {/* =========================================
          MAIN DETAILS
      ========================================= */}
      <section className="details-layout">

        <div className="details-main">

          <span className="details-status">
            {property.status}
          </span>

          <h1>{property.title}</h1>

          <p className="details-location">
            <MapPin size={19} />
            {property.location}
          </p>

          <div className="details-price">
            Rs. {property.price.toLocaleString()}

            {property.status === "For Rent" && (
              <small>/month</small>
            )}
          </div>


          {/* =====================================
              PROPERTY INFO
          ===================================== */}
          <div className="details-specs">

            <div>
              <BedDouble size={23} />

              <span>
                <strong>{property.bedrooms}</strong>
                Bedrooms
              </span>
            </div>

            <div>
              <Bath size={23} />

              <span>
                <strong>{property.bathrooms}</strong>
                Bathrooms
              </span>
            </div>

            <div>
              <Maximize size={23} />

              <span>
                <strong>{property.area}</strong>
                Area
              </span>
            </div>

          </div>


          {/* =====================================
              DESCRIPTION
          ===================================== */}
          <section className="details-section">

            <h2>Property description</h2>

            <p>
              This beautiful {property.type.toLowerCase()} is
              located in {property.location}. It offers a
              comfortable and modern living environment with
              spacious rooms, attractive finishes and everything
              you need for contemporary living.
            </p>

            <p>
              Whether you're looking for a family home or a
              long-term investment, this property offers an
              excellent combination of location, space and
              convenience.
            </p>

          </section>


          {/* =====================================
              FEATURES
          ===================================== */}
          <section className="details-section">

            <h2>Key features</h2>

            <div className="features-grid">

              {features.map((feature) => (
                <div key={feature}>
                  <Check size={18} />
                  <span>{feature}</span>
                </div>
              ))}

            </div>

          </section>

        </div>


        {/* =========================================
            CONTACT CARD
        ========================================= */}
        <aside className="agent-card">

          <h2>
            Interested in this property?
          </h2>

          <p>
            Contact our property agent to arrange a
            viewing or get more information.
          </p>

          <div className="agent-info">

            <div className="agent-avatar">
              AH
            </div>

            <div>
              <strong>Ali Hassan</strong>
              <span>EstateHub Property Agent</span>
            </div>

          </div>

          <button className="contact-button">
            <Phone size={18} />
            Call agent
          </button>

          <button className="email-button">
            <Mail size={18} />
            Send enquiry
          </button>

        </aside>

      </section>


      {/* =========================================
          VIDEO MODAL
      ========================================= */}
      {videoOpen && hasVideo && (
        <div
          className="property-video-modal"
          onClick={closeVideo}
        >

          <div
            className="property-video-modal-content"
            onClick={(event) => event.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <button
              type="button"
              className="property-video-close"
              onClick={closeVideo}
              aria-label="Close property video"
            >
              <X size={24} />
            </button>


            {/* VIDEO */}
            <video
              className="property-video-player"
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
            >
              <source
                src={property.video}
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>

          </div>

        </div>
      )}

    </main>
  );
}

export default PropertyDetails;