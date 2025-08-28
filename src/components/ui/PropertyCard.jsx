import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Bed,
  Wifi,
  Award,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PropertyCard = ({ property }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const totalImages = property.images?.length || 0;

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
    // Ici, tu peux ajouter un appel API pour sauvegarder le favori côté backend
  };

  return (
    <Link to={`/properties/${property.id}`}>
      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        {/* Image principale */}
        <img
          src={property.images?.[currentImage]?.image_url}
          alt={property.location}
          className="rounded-t-xl w-full h-48 object-cover"
        />

        {/* Flèches pour changer d'image */}
        {totalImages > 1 && (
          <div className="relative bottom-20">
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {/* Icône favoris */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <Heart
            className={`w-6 h-6 ${favorite ? "text-red-500" : "text-gray-400"}`}
          />
        </button>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 truncate">
            {property.location}
          </h3>
          <p className="text-sm text-gray-500 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1 text-blue-500" />
            {property.type}
          </p>

          <div className="mt-3 flex justify-between items-center">
            <p className="text-lg font-bold text-gray-900">
              {property.price} FCFA
              <span className="text-sm font-normal text-gray-500">/mois</span>
            </p>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="flex items-center text-sm">
                <Bed className="w-4 h-4 mr-1" />
                {property.bedrooms}
              </span>
              <span className="text-sm">{property.area} m²</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500">
            {property.furnished && (
              <span className="flex items-center px-2 py-1 bg-gray-100 rounded-full">
                Meublé
              </span>
            )}
            {property.wifi && (
              <span className="flex items-center px-2 py-1 bg-gray-100 rounded-full">
                <Wifi className="w-3 h-3 mr-1" />
                Wi-Fi
              </span>
            )}
            <span className="flex items-center px-2 py-1 bg-gray-100 rounded-full">
              <Award className="w-3 h-3 mr-1 text-yellow-500" />
              {property.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
