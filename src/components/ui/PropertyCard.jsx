import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Users,
  Heart,
  Eye,
  Star,
  Bed,
  Bath,
  Square,
  Home,
  Wifi,
  Car,
  Shield,
  Calendar,
  Info,
  CheckCircle,
} from "lucide-react";

// TODO: REMPLACER CETTE URL SI VOTRE BACKEND N'EST PAS À CETTE ADRESSE
// C'est l'URL de base de votre backend Django.
// Par exemple: "http://127.0.0.1:8000" ou "http://votre-domaine.com"
const BASE_BACKEND_URL = "http://127.0.0.1:8000";

const PropertyCard = ({ property }) => {
  // Fonction utilitaire pour obtenir l'URL complète
  const getFullUrl = (path) => {
    if (path && (path.startsWith("http://") || path.startsWith("https://"))) {
      return path;
    }
    return `${BASE_BACKEND_URL}${path}`;
  };

  const getBadgeClass = (badge) => {
    const badgeStyles = {
      nouveau: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
      disponible: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      premium: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
      luxe: "bg-gradient-to-r from-purple-600 to-purple-700 text-white",
      meublé: "bg-blue-100 text-blue-800 border border-blue-200",
      étudiant: "bg-indigo-100 text-indigo-800 border border-indigo-200",
      climatise: "bg-cyan-100 text-cyan-800 border border-cyan-200",
      jardin: "bg-green-100 text-green-800 border border-green-200",
      teletravail: "bg-pink-100 text-pink-800 border border-pink-200",
    };
    return (
      badgeStyles[badge.toLowerCase()] ||
      "bg-gray-100 text-gray-800 border border-gray-200"
    );
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <Wifi className="w-4 h-4 text-blue-500" />,
      parking: <Car className="w-4 h-4 text-blue-500" />,
      security: <Shield className="w-4 h-4 text-blue-500" />,
      furnished: <Home className="w-4 h-4 text-blue-500" />,
    };
    return icons[amenity] || <CheckCircle className="w-4 h-4 text-blue-500" />;
  };

  // Récupère l'URL de la première image ou une image de remplacement
  const imageUrl =
    property.images && property.images.length > 0
      ? getFullUrl(property.images[0].image)
      : `https://placehold.co/600x400/E5E7EB/6B7280?text=Image+non+disponible`;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.badges?.slice(0, 2).map((badge, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getBadgeClass(
                badge
              )}`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Cœur et Note */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
          </button>
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-800">
              {property.rating || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight flex-1 group-hover:text-blue-600 transition-colors duration-200">
            {property.title}
          </h3>
        </div>

        {/* Localisation */}
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Type & Disponibilité */}
        <div className="flex items-center text-gray-600 mb-2">
          <Info className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {property.property_type} •{" "}
            {property.available ? "Disponible" : "Indisponible"}
          </span>
        </div>

        {/* Date ajout */}
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            Ajouté le{" "}
            {new Date(property.date_added).toLocaleDateString("fr-FR")}
          </span>
        </div>

        {/* Chambres / Surface / Salle de bain */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1 text-blue-500" />
              <span className="text-sm font-semibold text-gray-800">
                {property.bedrooms} ch.
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1 text-blue-500" />
              <span className="text-sm font-semibold text-gray-800">
                {property.bathrooms} sdb
              </span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1 text-blue-500" />
              <span className="text-sm font-semibold text-gray-800">
                {property.area} m²
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              {property.price.toLocaleString("fr-FR")}
              <span className="text-sm font-normal text-gray-500">
                {" "}
                FCFA/mois
              </span>
            </p>
          </div>
        </div>

        {/* Commodités */}
        {property.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {property.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-xs font-medium text-gray-700"
              >
                {getAmenityIcon(amenity)}
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* Description courte */}
        {property.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {property.description}
          </p>
        )}

        {/* Lien détail */}
        <Link
          to={`/properties/${property.id}`}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform group-hover:scale-105 flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>Voir plus</span>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
