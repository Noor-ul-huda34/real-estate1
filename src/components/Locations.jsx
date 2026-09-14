const locations = [
  {
    name: "Islamabad",
    properties: "320 Properties",
    image: "/locations/islamabad.jpg",
  },
  {
    name: "Lahore",
    properties: "450 Properties",
    image: "/locations/lahore.jpg",
  },
  {
    name: "Karachi",
    properties: "510 Properties",
    image: "/locations/karachi.jpg",
  },
  {
    name: "Rawalpindi",
    properties: "210 Properties",
    image: "/locations/rawalpindi.jpg",
  },
];

function Locations() {
  return (
    <section className="locations-section">
      <div className="section-heading">
        <p>LOCATIONS</p>
        <h2>Explore Popular Locations</h2>
        <span>Discover properties in top cities.</span>
      </div>

      <div className="locations-grid">
        {locations.map((location) => (
          <button className="location-card" key={location.name}>
            <img src={location.image} alt={location.name} />

            <div className="location-overlay">
              <h3>{location.name}</h3>
              <span>{location.properties}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Locations;