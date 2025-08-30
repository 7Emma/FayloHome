import React, { useEffect, useState } from "react";
import { ArrowRight, Heart, Eye, Star, Users, Shield, Clock, Award, MapPin, Phone, Mail, ChevronDown, ChevronUp, Building, Home, CheckCircle } from "lucide-react";
// import { Link } from "react-router-dom"; // Commenté pour la démo
import HeroSection from "../components/HeroSection";

const BASE_BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const HomePage = () => {
  // États pour les avis clients dynamiques
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorReviews, setErrorReviews] = useState(null);
  
  // État pour les FAQ (peut être dynamique aussi)
  const [openFaq, setOpenFaq] = useState(null);

  // FAQ statiques (peuvent être rendues dynamiques plus tard)
  const faqs = [
    {
      question: "Comment puis-je rechercher un logement ?",
      answer: "Utilisez notre barre de recherche en haut de la page. Vous pouvez filtrer par localisation, type de logement, budget et autres critères pour trouver le bien idéal."
    },
    {
      question: "Quels documents sont nécessaires pour louer ?",
      answer: "Généralement, vous aurez besoin d'une pièce d'identité, de justificatifs de revenus, d'une attestation d'emploi et parfois d'un garant. Chaque propriétaire peut avoir des exigences spécifiques."
    },
    {
      question: "Y a-t-il des frais de service ?",
      answer: "Nos services de recherche et de mise en relation sont gratuits pour les locataires. Seuls les propriétaires paient des frais pour publier leurs annonces."
    },
    {
      question: "Puis-je visiter les logements ?",
      answer: "Absolument ! Nous organisons des visites avec les propriétaires. Contactez-nous ou utilisez notre système de prise de rendez-vous en ligne."
    },
    {
      question: "Que faire en cas de problème avec un logement ?",
      answer: "Notre équipe de support est disponible 24/7. Nous médirons entre vous et le propriétaire pour résoudre tout problème rapidement."
    },
    {
      question: "Comment puis-je publier mon logement ?",
      answer: "Créez un compte propriétaire, ajoutez les détails et photos de votre bien. Notre équipe vérifiera l'annonce avant publication."
    }
  ];

  // Statistiques de l'entreprise
  const companyStats = [
    { number: "5000+", label: "Logements disponibles", icon: Home },
    { number: "40+", label: "Communes couvertes", icon: MapPin },
    { number: "15000+", label: "Clients satisfaits", icon: Users },
    { number: "98%", label: "Taux de satisfaction", icon: Star }
  ];

  // Avantages de l'entreprise
  const companyAdvantages = [
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Tous nos logements sont vérifiés et nos partenaires sont certifiés pour votre sécurité.",
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description: "Notre équipe est disponible en permanence pour répondre à vos questions et vous assister.",
      color: "text-blue-600"
    },
    {
      icon: Award,
      title: "Expertise locale",
      description: "15 ans d'expérience dans l'immobilier béninois. Nous connaissons chaque quartier.",
      color: "text-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Processus simplifié",
      description: "De la recherche à la signature, nous rendons la location simple et transparente.",
      color: "text-orange-600"
    }
  ];

  useEffect(() => {
    // Récupération des avis clients depuis l'API
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/reviews/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data.slice(0, 6)); // Limiter à 6 avis
      } catch (e) {
        setErrorReviews("Impossible de charger les avis.");
        console.error("Erreur lors de la récupération des avis:", e);
        // Avis de fallback en cas d'erreur
        setReviews([
          {
            id: 1,
            name: "Marie Adjovi",
            role: "Étudiante",
            rating: 5,
            comment: "J'ai trouvé mon studio idéal en quelques jours. Le service est exceptionnel !",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
          },
          {
            id: 2,
            name: "Jean Koussou",
            role: "Fonctionnaire",
            rating: 5,
            comment: "Processus très simple et transparent. Je recommande vivement !",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          },
          {
            id: 3,
            name: "Fatouma Bello",
            role: "Commerçante",
            rating: 4,
            comment: "Excellent service client. L'équipe est très professionnelle.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
          }
        ]);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Présentation de l'entreprise */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              À propos de{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                LogementBénin
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Depuis 2009, nous sommes la référence en matière de location immobilière au Bénin. 
              Notre mission est de connecter locataires et propriétaires dans un environnement 
              de confiance et de transparence.
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {companyStats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Nos avantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyAdvantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mb-6">
                  <advantage.icon className={`w-8 h-8 ${advantage.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
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

      {/* Section FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions les plus courantes
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact pour plus de questions */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour vous aider
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+2290191732432"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appelez-nous
              </a>
              <a
                href="mailto:faylohome@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                Écrivez-nous
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Avis clients dynamiques */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Des milliers de béninois nous font confiance pour trouver leur logement idéal
            </p>
          </div>

          {loadingReviews && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
            </div>
          )}

          {errorReviews && !loadingReviews && reviews.length === 0 && (
            <div className="text-center text-red-300 text-lg">
              <p>Impossible de charger les avis pour le moment.</p>
            </div>
          )}

          {!loadingReviews && reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-6">
                    <img
                      src={review.avatar || `https://ui-avatars.com/api/?name=${review.name}&background=random`}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-white">
                        {review.name}
                      </h4>
                      <p className="text-sm text-blue-200">{review.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-blue-50 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {!loadingReviews && reviews.length === 0 && !errorReviews && (
            <div className="text-center text-blue-200 text-lg">
              <p>Aucun avis disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à trouver votre nouveau chez-vous ?
          </h2>
          <p className="text-xl mb-10 text-black">
            Rejoignez des milliers de béninois qui ont trouvé leur logement idéal avec nous. 
            Commencez votre recherche dès maintenant !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/maisons"
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <Eye className="w-5 h-5" />
              <span>Explorer les logements</span>
            </a>

            <a
              //href="/register"
              className="bg-blue-600 hover:bg-blue-700 border-2 border-white text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Créer un compte gratuit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Indicateurs de confiance */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-orange-400/30">
            <div className="flex items-center space-x-2 text-blue-400">
              <Shield className="w-5 h-5" />
              <span className="font-medium">100% Sécurisé</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Vérifié</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <Users className="w-5 h-5" />
              <span className="font-medium">15000+ Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* Styles CSS */}
      <style jsx='true'>{`
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
      `}</style>
    </div>
  );
};

export default HomePage;