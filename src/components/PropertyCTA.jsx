import { Bell } from "lucide-react";

function PropertyCTA() {
  return (
    <section className="property-cta">
      <div className="cta-content">
        <div className="cta-icon">
          <Bell size={26} />
        </div>

        <div>
          <p className="cta-label">NEVER MISS A PROPERTY</p>
          <h2>Get property alerts tailored to you.</h2>
          <span>
            Save your search and receive updates when new properties
            match your preferences.
          </span>
        </div>

        <button className="cta-btn">Create Alert</button>
      </div>
    </section>
  );
}

export default PropertyCTA;