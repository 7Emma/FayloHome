import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Home,
  ChevronLeft,
  ChevronRight,
  Phone,
  Filter,
  Heart,
  Star,
  Calendar,
  Wifi,
  Car,
  Shield,
  Award,
  Users,
  Building2,
  CheckCircle,
} from "lucide-react";

// Déplacez le tableau 'properties' en dehors du composant pour qu'il ne soit pas recréé à chaque rendu.
const properties = [
  {
    id: 1,
    title: "Appartement Executive - 2 Chambres Premium",
    location: "Akpakpa, Cotonou",
    price: 180000,
    type: "appartement",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    badges: ["Disponible", "Meublé", "Sécurisé"],
    available: "immediate",
    rating: 4.8,
    reviews: 24,
    amenities: ["wifi", "parking", "security", "furnished"],
    description: "Appartement moderne avec finitions haut de gamme",
    image: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700",
    yearBuilt: 2022,
    furnished: true,
  },
  {
    id: 2,
    title: "Villa Familiale de Prestige avec Jardin",
    location: "Calavi, Abomey-Calavi",
    price: 350000,
    type: "maison",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    badges: ["Nouveau", "Premium", "Jardin"],
    available: "immediate",
    rating: 4.9,
    reviews: 18,
    amenities: ["garden", "parking", "security", "pool"],
    description: "Villa contemporaine avec piscine et jardin paysager",
    image: "bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700",
    yearBuilt: 2023,
    furnished: false,
  },
  {
    id: 3,
    title: "Studio Étudiant Design et Connecté",
    location: "Fidjrossè, Cotonou",
    price: 95000,
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    badges: ["Étudiant", "Wifi", "Meublé"],
    available: "within-month",
    rating: 4.6,
    reviews: 31,
    amenities: ["wifi", "furnished", "laundry"],
    description: "Studio moderne optimisé pour les étudiants",
    image: "bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700",
    yearBuilt: 2021,
    furnished: true,
  },
  {
    id: 4,
    title: "Appartement Standing - 3 Chambres Climatisé",
    location: "Godomey, Abomey-Calavi",
    price: 220000,
    type: "appartement",
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    badges: ["Premium", "Climatisé", "Balcon"],
    available: "immediate",
    rating: 4.7,
    reviews: 19,
    amenities: ["ac", "balcony", "parking", "elevator"],
    description: "Appartement haut standing avec vue panoramique",
    image: "bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-700",
    yearBuilt: 2022,
    furnished: false,
  },
  {
    id: 5,
    title: "Maison Moderne avec Espace Bureau",
    location: "Vedoko, Cotonou",
    price: 280000,
    type: "maison",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    badges: ["Télétravail", "Parking", "Jardin"],
    available: "immediate",
    rating: 4.8,
    reviews: 15,
    amenities: ["office", "parking", "garden", "wifi"],
    description: "Parfaite pour le télétravail avec bureau dédié",
    image: "bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700",
    yearBuilt: 2021,
    furnished: false,
  },
  {
    id: 6,
    title: "Duplex Luxe avec Terrasse Panoramique",
    location: "Cocotomey, Abomey-Calavi",
    price: 450000,
    type: "appartement",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    badges: ["Luxe", "Terrasse", "Vue"],
    available: "within-month",
    rating: 5.0,
    reviews: 8,
    amenities: ["terrace", "view", "elevator", "concierge"],
    description: "Duplex d'exception avec services de conciergerie",
    image: "bg-gradient-to-br from-rose-500 via-pink-600 to-red-700",
    yearBuilt: 2023,
    furnished: true,
  },
];

const MaisonsALouer = () => {
  // Enhanced state management
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    maxPrice: 250000,
    bedrooms: "",
    availability: "",
    furnished: "",
    minRating: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("price-asc");
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 6;

  // Enhanced filtering with sorting
  const filteredProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      const matchLocation =
        !filters.location ||
        property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase());
      const matchType = !filters.type || property.type === filters.type;
      const matchPrice = property.price <= filters.maxPrice;
      const matchBedrooms =
        !filters.bedrooms ||
        (filters.bedrooms === "4+"
          ? property.bedrooms >= 4
          : property.bedrooms.toString() === filters.bedrooms);
      const matchAvailability =
        !filters.availability || property.available === filters.availability;
      const matchFurnished =
        !filters.furnished ||
        (filters.furnished === "furnished"
          ? property.furnished
          : !property.furnished);
      const matchRating =
        !filters.minRating || property.rating >= parseFloat(filters.minRating);

      return (
        matchLocation &&
        matchType &&
        matchPrice &&
        matchBedrooms &&
        matchAvailability &&
        matchFurnished &&
        matchRating
      );
    });

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "area":
        filtered.sort((a, b) => b.area - a.area);
        break;
      default:
        break;
    }

    return filtered;
  }, [filters, sortBy]); // 'properties' n'est plus une dépendance car il est statique

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const viewProperty = (property) => {
    alert(
      `${property.title}\n\n📍 ${
        property.location
      }\n💰 ${property.price.toLocaleString("fr-FR")} FCFA/mois\n⭐ ${
        property.rating
      }/5 (${property.reviews} avis)\n📐 ${property.area}m² • ${
        property.bedrooms
      } ch. • ${property.bathrooms} sdb\n\n${
        property.description
      }\n\n📞 Contactez-nous au +229 12 34 56 78`
    );
  };

  // Enhanced Property Card Component
  const PropertyCard = ({ property }) => {
    const getBadgeClass = (badge) => {
      const badgeStyles = {
        nouveau: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
        disponible: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
        premium: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
        luxe: "bg-gradient-to-r from-purple-600 to-purple-700 text-white",
        meublé: "bg-blue-100 text-blue-800 border border-blue-200",
        étudiant: "bg-indigo-100 text-indigo-800 border border-indigo-200",
      };
      return (
        badgeStyles[badge.toLowerCase()] ||
        "bg-gray-100 text-gray-800 border border-gray-200"
      );
    };

    const getAmenityIcon = (amenity) => {
      const icons = {
        wifi: <Wifi className="w-3 h-3" />,
        parking: <Car className="w-3 h-3" />,
        security: <Shield className="w-3 h-3" />,
        furnished: <Home className="w-3 h-3" />,
      };
      return icons[amenity] || <CheckCircle className="w-3 h-3" />;
    };

    return (
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        {/* Enhanced Property Image */}
        <div className={`h-52 ${property.image} relative overflow-hidden`}>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {property.badges.slice(0, 2).map((badge, index) => (
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

          {/* Rating */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-800">
              {property.rating}
            </span>
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="text-lg font-bold text-blue-600">
              {property.price.toLocaleString("fr-FR")} FCFA
            </div>
            <div className="text-xs text-gray-600">par mois</div>
          </div>
        </div>

        {/* Enhanced Property Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1">
              {property.title}
            </h3>
            <Heart className="w-5 h-5 text-gray-300 hover:text-red-500 cursor-pointer transition-colors ml-3 flex-shrink-0" />
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="text-xs text-gray-500 mb-4">
            {property.description}
          </div>

          {/* Property Features */}
          <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center text-gray-600 mb-1">
                <Bed className="w-4 h-4 mr-1 text-blue-500" />
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {property.bedrooms}
              </span>
              <span className="text-xs text-gray-500">chambres</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center text-gray-600 mb-1">
                <Bath className="w-4 h-4 mr-1 text-blue-500" />
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {property.bathrooms}
              </span>
              <span className="text-xs text-gray-500">salles de bain</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center text-gray-600 mb-1">
                <Square className="w-4 h-4 mr-1 text-blue-500" />
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {property.area}
              </span>
              <span className="text-xs text-gray-500">m²</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-5">
            {property.amenities.slice(0, 4).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 text-gray-600 px-2 py-1 rounded-md text-xs"
              >
                {getAmenityIcon(amenity)}
                <span className="ml-1 capitalize">{amenity}</span>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="flex items-center justify-between mb-5 text-xs text-gray-500">
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              <span>{property.reviews} avis</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>Construit en {property.yearBuilt}</span>
            </div>
          </div>

          <button
            onClick={() => viewProperty(property)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm"
          >
            Voir les détails
          </button>
        </div>
      </div>
    );
  };

  // Enhanced Pagination Component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500 shadow-sm hover:shadow-md"
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Précédent
        </button>

        <div className="flex space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              disabled={page === "..."}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                page === currentPage
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                  : page === "..."
                  ? "text-gray-400 cursor-default"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500 shadow-sm hover:shadow-md"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500 shadow-sm hover:shadow-md"
          }`}
        >
          Suivant
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUEiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzR2LTRoLTJ2NGgtNHYySDQ2djR2MmgtNHYtNHYtMmgtNHptMC0zMFYwaC0yVjRoLTR2Mmg0djRoMnYtNGgyVjRoLTR6TTYgMzR2LTRIMHY0SDh2MmgtNHY0aDJ2LTRoNHYtMmgtNGZNNiA0VjBoLTJWNGgtNFYyaDR2NGgyVjZoNHYtMkg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Building2 className="w-12 h-12 mr-4 text-blue-300" />
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Trouvez votre
              <span className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                logement idéal
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Des logements de qualité premium pour étudiants, familles et
              professionnels dans les meilleurs quartiers
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                <span>Vérifiés et sécurisés</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                <span>Support 24/7</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                <span>Sans frais cachés</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search & Filters Section */}
      <section className="bg-white shadow-xl relative z-10 -mt-10 mx-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Main Search Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end mb-6">
            <div className="lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Où souhaitez-vous habiter ?
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  placeholder="Ville, quartier ou adresse (ex: Cotonou, Akpakpa...)"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg"
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-lg"
              >
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
                <option value="area">Plus grands</option>
              </select>
            </div>

            <div className="lg:col-span-1">
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex items-center justify-center text-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </button>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtres avancés
              <ChevronRight
                className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
                  showFilters ? "rotate-90" : ""
                }`}
              />
            </button>

            <div className="text-sm text-gray-600">
              <span className="font-semibold">{filteredProperties.length}</span>{" "}
              bien(s) trouvé(s)
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6 bg-gray-50 rounded-xl">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Type de bien
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => updateFilter("type", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                >
                  <option value="">Tous types</option>
                  <option value="studio">Studio</option>
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Budget mensuel
                </label>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="25000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    updateFilter("maxPrice", parseInt(e.target.value))
                  }
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-blue-600 font-bold text-lg">
                  ≤ {filters.maxPrice.toLocaleString("fr-FR")} FCFA
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Chambres
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => updateFilter("bedrooms", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                >
                  <option value="">Peu importe</option>
                  <option value="1">1 chambre</option>
                  <option value="2">2 chambres</option>
                  <option value="3">3 chambres</option>
                  <option value="4+">4+ chambres</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Meublé
                </label>
                <select
                  value={filters.furnished}
                  onChange={(e) => updateFilter("furnished", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                >
                  <option value="">Peu importe</option>
                  <option value="furnished">Meublé</option>
                  <option value="unfurnished">Non meublé</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Note minimale
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => updateFilter("minRating", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                >
                  <option value="">Toutes notes</option>
                  <option value="4.5">4.5+ étoiles</option>
                  <option value="4.0">4.0+ étoiles</option>
                  <option value="3.5">3.5+ étoiles</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Enhanced Properties Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Biens disponibles à la location
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">Affichage:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              title="Affichage en grille"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              title="Affichage en liste"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3" y2="6"></line>
                <line x1="3" y1="12" x2="3" y2="12"></line>
                <line x1="3" y1="18" x2="3" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {currentProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <Home className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Aucun bien trouvé
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Ajustez vos filtres ou effectuez une nouvelle recherche pour
              trouver votre logement idéal.
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        <Pagination />
      </main>

      {/* Footer or Call to Action Section (optional) */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-4">
            Prêt à trouver votre nouveau chez-vous ?
          </h3>
          <p className="text-lg text-gray-400 mb-8">
            Contactez notre équipe d'experts pour une assistance personnalisée.
          </p>
          <button
            onClick={() => alert("Contactez-nous pour plus d'informations!")}
            className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:-translate-y-1"
          >
            <Phone className="w-5 h-5 inline-block mr-2" />
            Nous Contacter
          </button>
        </div>
      </section>
    </div>
  );
};

export default MaisonsALouer;
