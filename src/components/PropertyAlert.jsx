import { Bell } from "lucide-react";

function PropertyAlert() {
  const createAlert = () => {
    alert(
      "Property alert created! You can connect this button to your backend later."
    );
  };

  return (
    <section className="alert-section">

      <div className="alert-box">

        <div className="alert-icon">
          <Bell size={28} />
        </div>

        <div className="alert-content">
          <span>PROPERTY ALERTS</span>

          <h2>
            Never miss a property that matches your search
          </h2>

          <p>
            Create a property alert and get notified about new
            homes that match your preferences.
          </p>
        </div>

        <button
          className="alert-button"
          onClick={createAlert}
        >
          Create property alert
        </button>

      </div>

    </section>
  );
}

export default PropertyAlert;