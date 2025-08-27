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

  export default MaisonsALouer