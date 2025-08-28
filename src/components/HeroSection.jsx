import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const navigate = useNavigate();

  // Positions MSP (Maisons Secondaires de Proximité) du Bénin
  const beninLocations = [
    "Cotonou",
    "Porto-Novo",
    "Parakou",
    "Djougou",
    "Bohicon",
    "Kandi",
    "Ouidah",
    "Abomey",
    "Lokossa",
    "Dogbo",
    "Savalou",
    "Pobè",
    "Tchaourou",
    "Malanville",
    "Nikki",
    "Bembèrèkè",
    "Kérou",
    "Natitingou",
    "Tanguiéta",
    "Kouandé",
    "Bassila",
    "Glazoué",
    "Savè",
    "Dassa-Zoumé",
    "Aplahoué",
    "Comè",
    "Grand-Popo",
    "Allada",
    "Toffo",
    "Zè",
    "Abomey-Calavi",
    "Sô-Ava",
    "Dangbo",
    "Adjarra",
    "Sakété",
    "Kétou",
    "Adjohoun",
    "Bonou",
    "Aguégués",
    "Kpomassè",
  ];

  const roomTypes = [
    "Studio",
    "Chambre simple",
    "Appartement",
    "Appartement 2 pièces",
    "Appartement 3 pièces",
    "Villa",
    "Duplex",
    "Loft",
  ];

  const filteredLocations = beninLocations.filter((location) =>
    location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const handleSearch = () => {
    console.log("Recherche:", { location: searchLocation, type: searchType });
    const params = new URLSearchParams();
    if (searchLocation) params.append("location", searchLocation);
    if (searchType) params.append("type", searchType);

    navigate(`/appartements?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`,
        }}
      ></div>

      {/* Contenu Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up leading-tight">
          Trouvez le{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            logement parfait
          </span>
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl text-gray-200">
            au cœur du Bénin
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-gray-300 animate-fade-in-up animation-delay-200 max-w-3xl mx-auto">
          Découvrez des milliers de logements de qualité dans toutes les
          communes du Bénin. Votre nouveau chez-vous vous attend.
        </p>

        {/* Barre de recherche améliorée */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 animate-fade-in-up animation-delay-400 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Recherche par localisation */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Localisation
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Où cherchez-vous ?"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onFocus={() => setIsLocationOpen(true)}
                  onBlur={() => setTimeout(() => setIsLocationOpen(false), 200)}
                  className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-xl border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all placeholder-gray-500"
                />

                {/* Dropdown des suggestions */}
                {isLocationOpen &&
                  searchLocation &&
                  filteredLocations.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-48 overflow-y-auto z-50">
                      {filteredLocations.slice(0, 8).map((location, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchLocation(location);
                            setIsLocationOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <MapPin className="inline w-4 h-4 mr-2 text-gray-400" />
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {/* Type de logement */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                <Filter className="inline w-4 h-4 mr-1" />
                Type de logement
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-xl border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
              >
                <option value="">Tous les types</option>
                {roomTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Bouton de recherche */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Rechercher
              </button>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-300">Logements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">40+</div>
              <div className="text-sm text-gray-300">Communes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-sm text-gray-300">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-300">Support</div>
            </div>
          </div>
        </div>

        {/* Tags populaires */}
        <div className="mt-8 animate-fade-in-up animation-delay-600">
          <p className="text-gray-400 text-sm mb-4">Recherches populaires :</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Cotonou Centre",
              "Porto-Novo",
              "Parakou",
              "Abomey-Calavi",
              "Ouidah",
            ].map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchLocation(tag)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx="true">{`
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
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
