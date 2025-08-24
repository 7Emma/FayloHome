import React from "react";
import { ArrowRight, Search, MapPin, Phone, Mail } from "lucide-react";

const Banner = ({
  // Configuration du contenu
  title,
  subtitle,
  description,

  // Configuration visuelle
  backgroundImage,
  backgroundColor = "from-blue-600 to-blue-800",
  height = "h-96",
  textColor = "text-white",
  overlay = "bg-black/40",

  // Configuration des boutons
  primaryButton,
  secondaryButton,

  // Configuration du formulaire de recherche
  showSearchForm = false,
  searchPlaceholder = "Rechercher...",
  onSearch,

  // Configuration du breadcrumb
  breadcrumb,

  // Classes CSS personnalisées
  className = "",
  contentClassName = "",

  // Configuration d'animation
  animated = true,

  // Taille du contenu
  size = "default", // 'small', 'default', 'large'
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  // Classes de taille
  const sizeClasses = {
    small: "py-12 md:py-16",
    default: "py-16 md:py-24",
    large: "py-24 md:py-32",
  };

  // Classes de titre selon la taille
  const titleClasses = {
    small: "text-2xl md:text-3xl",
    default: "text-3xl md:text-5xl",
    large: "text-4xl md:text-6xl",
  };

  const subtitleClasses = {
    small: "text-base md:text-lg",
    default: "text-lg md:text-xl",
    large: "text-xl md:text-2xl",
  };

  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${height} ${className}`}
    >
      {/* Image de fond ou dégradé */}
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && <div className={`absolute inset-0 ${overlay}`} />}
        </>
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${backgroundColor}`}
        />
      )}

      {/* Contenu principal */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${contentClassName}`}
      >
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className={`mb-6 ${animated ? "animate-fade-in-up" : ""}`}>
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className={`mx-2 ${textColor} opacity-60`}>/</span>
                  )}
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`${textColor} opacity-80 hover:opacity-100 transition-opacity duration-200`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className={`${textColor}`}>{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="text-center">
          {/* Titre principal */}
          {title && (
            <h1
              className={`font-bold ${titleClasses[size]} ${textColor} mb-4 ${
                animated ? "animate-fade-in-up" : ""
              }`}
            >
              {title}
            </h1>
          )}

          {/* Sous-titre */}
          {subtitle && (
            <h2
              className={`font-semibold ${
                subtitleClasses[size]
              } ${textColor} opacity-90 mb-6 ${
                animated ? "animate-fade-in-up animation-delay-200" : ""
              }`}
            >
              {subtitle}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p
              className={`${
                subtitleClasses[size]
              } ${textColor} opacity-80 mb-8 max-w-3xl mx-auto leading-relaxed ${
                animated ? "animate-fade-in-up animation-delay-300" : ""
              }`}
            >
              {description}
            </p>
          )}

          {/* Formulaire de recherche */}
          {showSearchForm && (
            <div
              className={`mb-8 ${
                animated ? "animate-fade-in-up animation-delay-400" : ""
              }`}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-2xl max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Rechercher</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          {(primaryButton || secondaryButton) && (
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${
                animated ? "animate-fade-in-up animation-delay-500" : ""
              }`}
            >
              {/* Bouton principal */}
              {primaryButton && (
                <button
                  onClick={primaryButton.onClick}
                  className={`
                    ${
                      primaryButton.variant === "outline"
                        ? "bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                        : "bg-white text-blue-600 hover:bg-gray-100"
                    }
                    ${
                      primaryButton.size === "large"
                        ? "py-4 px-8 text-lg"
                        : "py-3 px-6"
                    }
                    font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg 
                    flex items-center justify-center space-x-2
                    ${primaryButton.className || ""}
                  `}
                >
                  {primaryButton.icon && (
                    <primaryButton.icon className="w-5 h-5" />
                  )}
                  <span>{primaryButton.text}</span>
                  {primaryButton.showArrow && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* Bouton secondaire */}
              {secondaryButton && (
                <button
                  onClick={secondaryButton.onClick}
                  className={`
                    ${
                      secondaryButton.variant === "solid"
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-transparent border-2 border-white text-white hover:bg-white/10"
                    }
                    ${
                      secondaryButton.size === "large"
                        ? "py-4 px-8 text-lg"
                        : "py-3 px-6"
                    }
                    font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg 
                    flex items-center justify-center space-x-2
                    ${secondaryButton.className || ""}
                  `}
                >
                  {secondaryButton.icon && (
                    <secondaryButton.icon className="w-5 h-5" />
                  )}
                  <span>{secondaryButton.text}</span>
                  {secondaryButton.showArrow && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Éléments décoratifs optionnels */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(255, 255, 255, 0.1)"
          />
        </svg>
      </div>

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  );
};

export default Banner;
