import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../api";

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties()
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="border p-4 rounded">
          <img
            src={property.photos[0]}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <h3 className="text-lg font-bold">{property.title}</h3>
          <p>{property.price} €</p>
          <Link to={`/properties/${property.id}`} className="text-blue-500">
            Voir plus
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PropertiesList;
