const locations = [
  {
    city: "Islamabad",
    properties: "320 properties",
    image: "/locations/islamabad.jpg",
  },
  {
    city: "Lahore",
    properties: "450 properties",
    image: "/locations/lahore.jpg",
  },
  {
    city: "Karachi",
    properties: "510 properties",
    image: "/locations/karachi.jpg",
  },
  {
    city: "Rawalpindi",
    properties: "210 properties",
    image: "/locations/rawalpindi.jpg",
  },
];

function PopularLocations({ onLocationClick }) {
  return (
    <section className="locations-section">

      <div className="section-title">
        <span>POPULAR LOCATIONS</span>

        <h2>
          Find properties in popular locations
        </h2>
      </div>

      <div className="locations-grid">

        {locations.map((location) => (
          <button
            key={location.city}
            className="location-card"
            onClick={() =>
              onLocationClick(location.city)
            }
          >
            <img
              src={location.image}
              alt={location.city}
            />

            <div className="location-content">
              <h3>{location.city}</h3>
              <span>{location.properties}</span>
            </div>
          </button>
        ))}

      </div>

    </section>
  );
}

export default PopularLocations;