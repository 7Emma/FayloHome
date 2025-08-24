import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  Home,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Gérer le scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Accueil", path: "/" },
    { name: "Maisons à louer", path: "/maisons" },
    { name: "À propos", path: "/apropos" },
  ];

  // Fonction pour vérifier si le lien est actif
  const isActiveLink = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <Home className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  FayloHome
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Votre partenaire immobilier
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-colors duration-200 group py-2 ${
                  isActiveLink(item.path)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
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
            {/* Réseaux sociaux */}
            <div className="flex items-center space-x-2">
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 hover:scale-110 transform"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-pink-600 transition-colors duration-200 hover:scale-110 transform"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200 hover:scale-110 transform"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Bouton CTA */}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 group"
            >
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span>Contactez-nous</span>
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <div className="lg:hidden">
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

        {/* Menu Mobile */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg transition-all duration-200 transform hover:translate-x-1 ${
                    isActiveLink(item.path)
                      ? "text-blue-600 bg-blue-50 font-medium"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen
                      ? "slideInLeft 0.3s ease-out forwards"
                      : "none",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions Mobile */}
            <div className="mt-4 px-4 space-y-3">
              {/* Réseaux sociaux Mobile */}
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 text-gray-400 hover:text-pink-600 transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>

              {/* Bouton CTA Mobile */}
              <Link
                to="/contact"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Contactez-nous</span>
              </Link>
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
