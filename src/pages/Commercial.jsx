import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Building2,
  Store,
  Warehouse,
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";

function Commercial() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const commercialProperties = [
    {
      id: 1,
      title: "Premium Office Space",
      type: "Office",
      location: "Blue Area, Islamabad",
      price: 180000,
      area: "1800 sq ft",
      image: "/commercial/office-1.jpg",
    },
    {
      id: 2,
      title: "Main Boulevard Retail Shop",
      type: "Shop",
      location: "Gulberg, Lahore",
      price: 250000,
      area: "2200 sq ft",
      image: "/commercial/shop-1.jpg",
    },
    {
      id: 3,
      title: "Industrial Warehouse",
      type: "Warehouse",
      location: "Korangi, Karachi",
      price: 320000,
      area: "6500 sq ft",
      image: "/commercial/warehouse-1.jpg",
    },
    {
      id: 4,
      title: "Modern Business Office",
      type: "Office",
      location: "DHA Phase 2, Islamabad",
      price: 145000,
      area: "1400 sq ft",
      image: "/commercial/office-2.jpg",
    },
    {
      id: 5,
      title: "High Street Commercial Unit",
      type: "Shop",
      location: "MM Alam Road, Lahore",
      price: 390000,
      area: "2600 sq ft",
      image: "/commercial/shop-2.jpg",
    },
    {
      id: 6,
      title: "Large Distribution Warehouse",
      type: "Warehouse",
      location: "SITE Area, Karachi",
      price: 450000,
      area: "9000 sq ft",
      image: "/commercial/warehouse-2.jpg",
    },
  ];

  const types = [
    "All",
    "Office",
    "Shop",
    "Warehouse",
  ];

  const filteredProperties = useMemo(() => {
    const value = search.toLowerCase().trim();

    return commercialProperties.filter((property) => {
      const matchesSearch =
        !value ||
        property.title.toLowerCase().includes(value) ||
        property.location.toLowerCase().includes(value);

      const matchesType =
        type === "All" || property.type === type;

      return matchesSearch && matchesType;
    });
  }, [search, type]);

  const getIcon = (propertyType) => {
    if (propertyType === "Office") {
      return <BriefcaseBusiness size={18} />;
    }

    if (propertyType === "Shop") {
      return <Store size={18} />;
    }

    return <Warehouse size={18} />;
  };

  return (
    <main className="commercial-page">

      {/* HERO */}

      <section className="commercial-hero-page">

        <div className="commercial-hero-content">

          <span>COMMERCIAL PROPERTY</span>

          <h1>
            Find your next commercial space
          </h1>

          <p>
            Discover offices, shops, warehouses and
            other commercial opportunities across Pakistan.
          </p>

        </div>

      </section>

      {/* SEARCH */}

      <section className="commercial-search-section">

        <div className="commercial-search-box">

          <div className="commercial-search-input">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search by area, city or property"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button type="button">
            <Search size={18} />
            Search
          </button>

        </div>

      </section>

      {/* CONTENT */}

      <section className="commercial-content">

        <div className="commercial-content-header">

          <div>
            <span>ESTATEHUB COMMERCIAL</span>

            <h2>
              Commercial properties
            </h2>

            <p>
              {filteredProperties.length} properties available
            </p>
          </div>

        </div>

        {filteredProperties.length > 0 ? (
          <div className="commercial-property-grid">

            {filteredProperties.map((property) => (

              <article
                className="commercial-property-card"
                key={property.id}
                onClick={() =>
                  navigate(`/commercial/${property.id}`)
                }
              >

                <div className="commercial-property-image">

                  <img
                    src={property.image}
                    alt={property.title}
                  />

                  <span>
                    {property.type}
                  </span>

                </div>

                <div className="commercial-property-body">

                  <div className="commercial-property-type">
                    {getIcon(property.type)}
                    {property.type}
                  </div>

                  <h3>
                    {property.title}
                  </h3>

                  <p className="commercial-property-location">
                    <MapPin size={15} />
                    {property.location}
                  </p>

                  <div className="commercial-property-meta">
                    <span>
                      {property.area}
                    </span>
                  </div>

                  <div className="commercial-property-bottom">

                    <strong>
                      Rs.{" "}
                      {property.price.toLocaleString()}
                    </strong>

                    <ChevronRight size={19} />

                  </div>

                </div>

              </article>

            ))}

          </div>
        ) : (
          <div className="commercial-no-results">

            <Building2 size={40} />

            <h3>
              No commercial properties found
            </h3>

            <p>
              Try another location or property type.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setType("All");
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

export default Commercial;