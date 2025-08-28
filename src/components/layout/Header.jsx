import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Building2,
  UserCheck,
  Heart,
  LogIn,
  Search,
  MapPin,
  Filter,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // envoie la recherche au parent
  };
  // NOUVEAU: Utilisation de useLocation pour connaître la route actuelle
  const location = useLocation();

  // Gérer le scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Gerer l'etat de recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      //onSearch(searchTerm);
    }, 300); // 300ms après la dernière frappe
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Gérer l'état de la barre de recherche en fonction de la route
  useEffect(() => {
    // On active la recherche uniquement sur la page liste d'appartements
    if (location.pathname === "/appartements") {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Le toggle de recherche est maintenant uniquement pour le mobile
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  // Navigation items avec les nouvelles routes
  const menuItems = [
    {
      name: "Appartements",
      path: "/appartements",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      name: "Propriétaire",
      path: "/proprietaire",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      name: "Favoris",
      path: "/favoris",
      icon: Heart,
      color: "text-red-600",
    },
  ];

  // Fonction pour vérifier si le lien est actif
  const isActiveLink = (path) => {
    return currentPath === path;
  };

  const handleNavClick = (path) => {
    setCurrentPath(path);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Navigation vers Home */}
          <div className="flex-shrink-0 group">
            <Link
              onClick={() => handleNavClick("/")}
              to="/home"
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <Home className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  FayloHome{" "}
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Votre partenaire immobilier
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation et barre de recherche Desktop */}
          {/* MODIFICATION: La navigation et la barre de recherche sont maintenant affichées côte à côte si nécessaire */}
          <nav className="hidden lg:flex items-center space-x-6">
            <div
              className={`transition-all duration-300 ${
                isSearchActive ? "w-48" : "w-0 overflow-hidden"
              }`}
            >
              <form className="relative" onSubmit={handleSearch}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une ville..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    onSearch(e.target.value); // <-- filtrage immédiat
                  }}
                  className="w-full px-12 py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-base"
                />
              </form>
            </div>

            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`relative font-medium transition-colors duration-200 group py-2 px-3 rounded-lg flex items-center space-x-2 ${
                  isActiveLink(item.path)
                    ? `${item.color} bg-gray-50`
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActiveLink(item.path) ? item.color : "text-gray-500"
                  }`}
                />
                <span>{item.name}</span>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 ${
                    isActiveLink(item.path)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Drapeau du Bénin */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-6 h-4 relative overflow-hidden rounded-sm">
                <div className="w-full h-1/2 bg-yellow-400"></div>
                <div className="w-full h-1/2 bg-red-600"></div>
                <div className="absolute left-0 top-0 w-2 h-full bg-green-600"></div>
              </div>
              <span className="text-sm font-medium text-gray-700">Bénin</span>
            </div>

            {/* Bouton Connexion */}
            <button
              onClick={() => handleNavClick("/connexion")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                isActiveLink("/connexion")
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg"
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Connexion</span>
            </button>
          </div>

          {/* Boutons et menu Mobile */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              aria-label="Recherche"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transform rotate-180 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transform transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Barre de recherche mobile */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isSearchActive ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="relative py-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une ville, un quartier..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 text-base"
            />
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 transform hover:translate-x-1 ${
                    isActiveLink(item.path)
                      ? `${item.color} bg-gray-50 font-medium`
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen
                      ? "slideInLeft 0.3s ease-out forwards"
                      : "none",
                  }}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      isActiveLink(item.path) ? item.color : "text-gray-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Actions Mobile */}
            <div className="mt-4 px-4 space-y-3">
              {/* Drapeau Mobile */}
              <div className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="w-6 h-4 relative overflow-hidden rounded-sm">
                  <div className="w-full h-1/2 bg-yellow-400"></div>
                  <div className="w-full h-1/2 bg-red-600"></div>
                  <div className="absolute left-0 top-0 w-2 h-full bg-green-600"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  République du Bénin
                </span>
              </div>

              {/* Bouton Connexion Mobile */}
              <button
                onClick={() => handleNavClick("/connexion")}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Connexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Styles pour les animations */}
      <style jsx="true">{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
