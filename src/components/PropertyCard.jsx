import {
    Heart,
    BedDouble,
    Bath,
    Maximize,
    MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PropertyCard({ property }) {
    const navigate = useNavigate();

    const [saved, setSaved] = useState(() => {
        const existing =
            JSON.parse(localStorage.getItem("estatehub_saved")) || [];

        return existing.some(
            (item) => item.id === property.id
        );
    });

    const toggleSaved = (e) => {
        e.stopPropagation();

        const existing =
            JSON.parse(localStorage.getItem("estatehub_saved")) || [];

        let updated;

        if (existing.some((item) => item.id === property.id)) {
            updated = existing.filter(
                (item) => item.id !== property.id
            );

            setSaved(false);
        } else {
            updated = [...existing, property];

            setSaved(true);
        }

        localStorage.setItem(
            "estatehub_saved",
            JSON.stringify(updated)
        );
    };

    return (
        <article className="result-card">

            <div className="result-image">

                <img
                    src={property.image}
                    alt={property.title}
                />

                <span className="result-status">
                    {property.status}
                </span>

                <button
                    className={`result-heart ${saved ? "saved-heart" : ""
                        }`}
                    onClick={toggleSaved}
                    aria-label="Save property"
                >
                    <Heart
                        size={20}
                        fill={saved ? "currentColor" : "none"}
                    />
                </button>

            </div>

            <div className="result-content">

                <div className="result-top">
                    <span>{property.type}</span>

                    <strong>
                        Rs. {property.price.toLocaleString()}
                        {property.status === "For Rent" &&
                            " /month"}
                    </strong>
                </div>

                <h3>{property.title}</h3>

                <p className="result-location">
                    <MapPin size={16} />
                    {property.location}
                </p>

                <div className="result-meta">

                    <span>
                        <BedDouble size={17} />
                        {property.bedrooms} beds
                    </span>

                    <span>
                        <Bath size={17} />
                        {property.bathrooms} baths
                    </span>

                    <span>
                        <Maximize size={17} />
                        {property.area}
                    </span>

                </div>

                <button
                    className="view-details-btn"
                    onClick={() =>
                        navigate(`/properties/${property.id}`)
                    }
                >
                    View property
                </button>

            </div>

        </article>
    );
}

export default PropertyCard;