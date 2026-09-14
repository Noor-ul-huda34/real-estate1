import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Phone,
  Mail,
} from "lucide-react";

function CommercialDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const commercialProperties = [
    {
      id: 1,
      title: "Premium Office Space",
      type: "Office",
      location: "Blue Area, Islamabad",
      price: 180000,
      area: "1800 sq ft",
      image: "/commercial/office-1.jpg",
      description:
        "A premium commercial office space in a highly accessible business location.",
    },
    {
      id: 2,
      title: "Main Boulevard Retail Shop",
      type: "Shop",
      location: "Gulberg, Lahore",
      price: 250000,
      area: "2200 sq ft",
      image: "/commercial/shop-1.jpg",
      description:
        "Excellent retail opportunity situated on a busy commercial boulevard.",
    },
    {
      id: 3,
      title: "Industrial Warehouse",
      type: "Warehouse",
      location: "Korangi, Karachi",
      price: 320000,
      area: "6500 sq ft",
      image: "/commercial/warehouse-1.jpg",
      description:
        "Spacious warehouse suitable for storage, distribution and industrial operations.",
    },
    {
      id: 4,
      title: "Modern Business Office",
      type: "Office",
      location: "DHA Phase 2, Islamabad",
      price: 145000,
      area: "1400 sq ft",
      image: "/commercial/office-2.jpg",
      description:
        "Modern office space suitable for startups, consultants and established businesses.",
    },
    {
      id: 5,
      title: "High Street Commercial Unit",
      type: "Shop",
      location: "MM Alam Road, Lahore",
      price: 390000,
      area: "2600 sq ft",
      image: "/commercial/shop-2.jpg",
      description:
        "High-visibility commercial unit in one of Lahore's busiest retail areas.",
    },
    {
      id: 6,
      title: "Large Distribution Warehouse",
      type: "Warehouse",
      location: "SITE Area, Karachi",
      price: 450000,
      area: "9000 sq ft",
      image: "/commercial/warehouse-2.jpg",
      description:
        "Large-scale warehouse with excellent space for logistics and distribution.",
    },
  ];

  const property = commercialProperties.find(
    (item) => String(item.id) === String(id)
  );

  if (!property) {
    return (
      <main className="commercial-details-page">
        <div className="commercial-not-found">
          <h1>Commercial property not found</h1>

          <p>
            The commercial property you're looking for
            does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/commercial")}
          >
            Back to commercial
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="commercial-details-page">

      <div className="commercial-details-topbar">
        <button
          type="button"
          onClick={() => navigate("/commercial")}
          className="commercial-back-button"
        >
          <ArrowLeft size={18} />
          Back to commercial
        </button>
      </div>

      <section className="commercial-details-main">

        <div className="commercial-details-container">

          <div className="commercial-details-gallery">
            <img
              src={property.image}
              alt={property.title}
            />
          </div>

          <div className="commercial-details-info">

            <span className="commercial-details-type">
              {property.type}
            </span>

            <h1>{property.title}</h1>

            <p className="commercial-details-location">
              <MapPin size={17} />
              {property.location}
            </p>

            <strong className="commercial-details-price">
              Rs. {property.price.toLocaleString()}
            </strong>

            <div className="commercial-details-meta">

              <div>
                <Building2 size={20} />
                <span>{property.area}</span>
              </div>

              <div>
                <span>{property.type}</span>
              </div>

            </div>

            <div className="commercial-details-description">

              <h2>About this property</h2>

              <p>
                {property.description}
              </p>

            </div>

            <div className="commercial-details-actions">

              <a href="tel:+923001234567">
                <Phone size={18} />
                Call agent
              </a>

              <a href="mailto:info@estatehub.com">
                <Mail size={18} />
                Email agent
              </a>

            </div>

          </div>

        </div>

      </section>

      <section className="commercial-enquiry">

        <div className="commercial-details-container">

          <div>
            <span>COMMERCIAL PROPERTY</span>

            <h2>
              Interested in this property?
            </h2>

            <p>
              Contact an EstateHub property expert
              for more information or to arrange a viewing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/agents")}
          >
            Find an agent
          </button>

        </div>

      </section>

    </main>
  );
}

export default CommercialDetails;