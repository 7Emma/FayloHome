import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MapPin,
  Home,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getProperties } from "../services/api";
import PropertyCard from "../components/ui/PropertyCard";
import Header from "../components/layout/Header";

const Appartements = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const itemsPerPage = 24; // Augmentation du nombre d'éléments par page

  //Recupere les dommee de HeroSection et fait le filtre
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get("location") || "";
  const typeQuery = searchParams.get("type") || "";

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      location: locationQuery,
      type: typeQuery,
    }));
  }, [locationQuery, typeQuery]);

  // États pour la recherche dynamique, la date et la géolocalisation
  const [currentDate, setCurrentDate] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // useEffect pour la date et l'heure
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // useEffect pour la géolocalisation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          setLocationError(error.message);
        }
      );
    } else {
      setLocationError(
        "La géolocalisation n'est pas supportée par votre navigateur."
      );
    }
  }, []);

  // Charger les propriétés depuis le backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        console.log("Données de l'API :", data);
        setProperties(data);
      } catch (error) {
        console.error("Erreur lors du chargement des propriétés :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Filtrage et tri
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
  }, [filters, sortBy, properties]);

  // Pagination
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

  {/*const handleSearch = () => {
    setCurrentPage(1);
  };*/}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Chargement des biens...
      </div>
    );
  }

  // Pagination Component
  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(
            1,
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          );
        } else {
          pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
          );
        }
      }
      return pages;
    };

    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 sm:px-4 rounded-lg transition-all duration-200 text-sm sm:text-base ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500 shadow-sm hover:shadow-md"
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Précédent</span>
          <span className="sm:hidden">Préc.</span>
        </button>

        <div className="flex space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              disabled={page === "..."}
              className={`px-3 py-2 sm:px-4 rounded-lg transition-all duration-200 text-sm sm:text-base ${
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
          className={`flex items-center px-3 py-2 sm:px-4 rounded-lg transition-all duration-200 text-sm sm:text-base ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500 shadow-sm hover:shadow-md"
          }`}
        >
          <span className="hidden sm:inline">Suivant</span>
          <span className="sm:hidden">Suiv.</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-40 sm:pt-32 md:pt-36 lg:pt-16">
      <Header onSearch={(term) => updateFilter("location", term)} />

      <div className="container mx-auto p-4 md:p-8">
        <h4 className=" font-bold text-gray-800 px-2">
          Biens disponibles à la location
        </h4>
        <p className="text-sm sm:text-base text-gray-500 px-2">
          Filtrez et trouvez facilement votre logement idéal selon vos critères
        </p>
      </div>

      {/* NOUVEAU: Informations sur la date et la géolocalisation */}
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Carte de la date et de l'heure */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Date actuelle
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {currentDate.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-600">
              {currentDate.toLocaleTimeString("fr-FR")}
            </p>
          </div>

          {/* Carte de la géolocalisation */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
            <MapPin className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-xs text-gray-500 font-medium">
                Votre localisation
              </p>
              {location ? (
                <p className="text-sm md:text-base font-bold text-gray-800">
                  Latitude: {location.latitude.toFixed(4)}, Longitude:{" "}
                  {location.longitude.toFixed(4)}
                </p>
              ) : (
                <p className="text-sm font-semibold text-gray-600">
                  {locationError || "Obtention de la localisation..."}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Properties Section */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 px-2">
            Biens disponibles à la location
          </h2>
          <div className="flex items-center space-x-2 px-2 sm:px-0">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Affichage:
            </span>
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
                className="w-4 h-4 sm:w-5 sm:h-5"
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
                className="w-4 h-4 sm:w-5 sm:h-5"
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
              </svg>
            </button>
          </div>
        </div>

        {currentProperties.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white rounded-2xl shadow-lg border border-gray-100 mx-2 sm:mx-0">
            <Home className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              Aucun bien trouvé
            </h3>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 sm:px-0"
                : "space-y-4 sm:space-y-6 px-2 sm:px-0"
            }
          >
            {currentProperties.map((property) => (
              <div
                key={property.id}
                className={viewMode === "grid" ? "w-full" : "mb-4"}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

        <Pagination />
      </main>
    </div>
  );
};

export default Appartements;
