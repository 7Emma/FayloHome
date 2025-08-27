import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  Home,
  ChevronLeft,
  ChevronRight,
  Award,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/ui/PropertyCard";
import { getProperties } from "../services/api";

const Location = () => {
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
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 6;

  // --- Charger les propriétés depuis le backend ---
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        console.log("Données de l'API :", data); // <-- AJOUTEZ CETTE LIGNE
        setProperties(data);
      } catch (error) {
        console.error("Erreur lors du chargement des propriétés :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // --- Filtrage et tri ---
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

  // --- Pagination ---
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Chargement des biens...
      </div>
    );
  }

  // --- Pagination Component ---
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
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
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
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white shadow-xl relative z-10 -mt-10 mx-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search Bar */}
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
                  placeholder="Ville, quartier ou adresse"
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
        </div>
      </section>

      {/* Properties Section */}
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
              <div
                key={property.id}
                className={viewMode === "grid" ? "" : "mb-4"}
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

export default Location;
