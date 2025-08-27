import React, { useEffect, useState } from "react";
import { ArrowRight, Heart, Eye, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import advantages from "../data/advantage";
import testimonials from "../data/testimonial";
import PropertyCard from "../components/ui/PropertyCard";

const BASE_BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const HomePage = () => {
  // État pour stocker les propriétés récupérées depuis l'API
  const [properties, setProperties] = useState([]);
  // État pour gérer le chargement
  const [loading, setLoading] = useState(true);
  // État pour gérer les erreurs
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données de l'API
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/properties/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // On ne garde que les 3 premières propriétés pour la section "featured"
        setProperties(data.slice(0, 3));
      } catch (e) {
        setError("Impossible de charger les propriétés.");
        console.error("Erreur lors de la récupération des propriétés:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []); // Le tableau vide [] garantit que cet effet ne s'exécute qu'une seule fois

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden text-center text-white">
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
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up leading-tight">
            Trouvez le{" "}
            <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              logement de vos rêves
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-gray-200 animate-fade-in-up animation-delay-200">
            Votre destination pour les meilleurs logements à louer au Bénin.
          </p>
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

          {/* Affichage des états de chargement et d'erreur */}
          {loading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 text-lg">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && properties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <div
                  key={property.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && properties.length === 0 && (
            <div className="text-center text-gray-500 text-lg">
              <p>Aucun bien n'a été trouvé pour le moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/maisons"
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
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
            <Link
              to="/maisons"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <Eye className="w-5 h-5" />
              <span>Voir les offres</span>
            </Link>

            <Link
              to="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Créer un compte</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
