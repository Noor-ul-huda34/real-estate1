import {
  Home,
  Calculator,
  Bell,
  Clock3,
} from "lucide-react";

const tools = [
  {
    title: "Find a property",
    text: "Search homes for sale and rent in your preferred location.",
    icon: Home,
  },
  {
    title: "Instant valuation",
    text: "Get an estimate of what your property could be worth.",
    icon: Calculator,
  },
  {
    title: "Property alerts",
    text: "Get notified when a new property matches your search.",
    icon: Bell,
  },
  {
    title: "Travel time search",
    text: "Search for properties based on your preferred journey time.",
    icon: Clock3,
  },
];

function PropertyTools({ onToolClick }) {
  return (
    <section className="tools-section">

      <div className="section-title">
        <span>ESTATEHUB TOOLS</span>

        <h2>
          Everything you need to find your next property
        </h2>
      </div>

      <div className="tools-grid">

        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <article
              className="tool-card"
              key={tool.title}
            >
              <div className="tool-icon">
                <Icon size={26} />
              </div>

              <h3>{tool.title}</h3>

              <p>{tool.text}</p>

              <button
                onClick={() =>
                  onToolClick(tool.title)
                }
              >
                Explore →
              </button>
            </article>
          );
        })}

      </div>

    </section>
  );
}

export default PropertyTools;