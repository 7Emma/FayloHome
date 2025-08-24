import React, { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  DollarSign,
  Star,
  ArrowRight,
  Heart,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import advantages from "../data/advantage";
import featuredProperties from "../data/featured";
import testimonials from "../data/testimonial";

const HomePage = () => {
  const [searchForm, setSearchForm] = useState({
    location: "",
    budget: "",
    type: "",
  });

  const handleSearchChange = (field, value) => {
    setSearchForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Recherche:", searchForm);
    // Logique de recherche ici
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Image d'arrière-plan */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop)",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Contenu Hero */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Trouvez la maison parfaite pour vos besoins,
            <span className="block text-blue-400">étudiants et familles</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-gray-200 animate-fade-in-up animation-delay-200">
            Des logements de qualité au Bénin, adaptés à votre budget et vos
            attentes
          </p>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl shadow-blue-200/50 max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {/* Ville/Quartier */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Ville / Quartier
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ex: Cotonou, Calavi..."
                    value={searchForm.location}
                    onChange={(e) =>
                      handleSearchChange("location", e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Budget (FCFA)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={searchForm.budget}
                    onChange={(e) =>
                      handleSearchChange("budget", e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 appearance-none"
                  >
                    <option value="">Sélectionner</option>
                    <option value="0-30000">0 - 30.000 FCFA</option>
                    <option value="30000-60000">30.000 - 60.000 FCFA</option>
                    <option value="60000-100000">60.000 - 100.000 FCFA</option>
                    <option value="100000+">100.000+ FCFA</option>
                  </select>
                  {/* Ajout d'une icône de chevron pour la sélection */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 11.293l-3.586-3.586L5 9.707z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Type de logement
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={searchForm.type}
                    onChange={(e) => handleSearchChange("type", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 appearance-none"
                  >
                    <option value="">Tous types</option>
                    <option value="studio">Studio</option>
                    <option value="chambre">Chambre</option>
                    <option value="appartement">Appartement</option>
                    <option value="maison">Maison</option>
                    <option value="duplex">Duplex</option>
                  </select>
                  {/* Ajout d'une icône de chevron pour la sélection */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 11.293l-3.586-3.586L5 9.707z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bouton Rechercher */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-300/50 flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Rechercher</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full opacity-75">
            <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Biens mis en avant */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biens mis en avant
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de logements populaires et récemment
              ajoutés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
                  </button>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {property.bedrooms} ch.
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {property.price}
                        <span className="text-sm font-normal text-gray-500">
                          {" "}
                          FCFA/mois
                        </span>
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform group-hover:scale-105 flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Voir plus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/maisons" className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
              Voir tous les biens
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une expertise locale et un service personnalisé pour vous
              accompagner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                >
                  <advantage.icon
                    className={`w-8 h-8 ${advantage.color} group-hover:scale-110 transition-transform duration-200`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Témoignages authentiques de nos locataires satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vous cherchez un logement ?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Créez un compte et trouvez votre maison dès aujourd'hui ! Des
            centaines de biens vous attendent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
              <Eye className="w-5 h-5" />
              <Link to="/maison">Voir les offres</Link>
            </button>

            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Créer un compte</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

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
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
