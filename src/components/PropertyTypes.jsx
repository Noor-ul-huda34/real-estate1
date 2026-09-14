import { Home, Building2, Hotel, Map, BriefcaseBusiness } from "lucide-react";

const types = [
  {
    name: "Houses",
    icon: Home,
    count: "245 Properties",
  },
  {
    name: "Apartments",
    icon: Building2,
    count: "180 Properties",
  },
  {
    name: "Villas",
    icon: Hotel,
    count: "95 Properties",
  },
  {
    name: "Plots",
    icon: Map,
    count: "120 Properties",
  },
  {
    name: "Commercial",
    icon: BriefcaseBusiness,
    count: "75 Properties",
  },
];

function PropertyTypes() {
  return (
    <section className="types-section">
      <div className="section-heading">
        <p>EXPLORE</p>
        <h2>Browse by Property Type</h2>
        <span>Find the property that suits your lifestyle.</span>
      </div>

      <div className="types-grid">
        {types.map((type) => {
          const Icon = type.icon;

          return (
            <button className="type-card" key={type.name}>
              <div className="type-icon">
                <Icon size={28} />
              </div>

              <h3>{type.name}</h3>
              <span>{type.count}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default PropertyTypes;