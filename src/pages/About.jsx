import React from "react";
import {
  HeartHandshake,
  ShieldCheck,
  ClipboardList,
  Search,
  Phone,
  Key,
  Home,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
            Notre Engagement : Votre Sérénité
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 animate-fade-in-up animation-delay-200">
            Découvrez qui nous sommes, nos valeurs et pourquoi nous sommes le
            partenaire de confiance pour votre recherche de logement.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 -mt-24 relative z-10 border border-gray-100 animate-fade-in-up animation-delay-400">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
              Qui sommes-nous ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                <HeartHandshake className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Notre Mission</h3>
                <p className="text-sm text-gray-600">
                  Simplifier la location en connectant des locataires sérieux et
                  des propriétaires de confiance pour une expérience sereine.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                <Home className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Notre Vision</h3>
                <p className="text-sm text-gray-600">
                  Devenir la plateforme de référence pour la location
                  immobilière, où l'accès à un logement de qualité est facilité
                  pour tous.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Nos Valeurs</h3>
                <p className="text-sm text-gray-600">
                  Confiance, Transparence et Excellence : les piliers de notre
                  service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Pourquoi nous faire confiance ?
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-600">
              Nous avons mis en place un processus rigoureux pour vous garantir
              une sécurité totale et une fiabilité sans faille.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Placeholder */}
            <div className="bg-blue-100 rounded-3xl overflow-hidden p-6 md:p-10 shadow-lg">
              <div className="relative h-64 md:h-96">
                <img
                  src="https://i.imgur.com/UhH3eYN.jpeg"
                  alt="Des professionnels de l'immobilier en réunion"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-blue-800/20 rounded-2xl"></div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-start">
                <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-blue-800">
                    Biens vérifiés et sécurisés
                  </h3>
                  <p className="text-gray-600">
                    Chaque annonce est soumise à un processus de vérification
                    rigoureux, incluant l'identité du propriétaire et la
                    conformité du bien.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <ClipboardList className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-blue-800">
                    Transactions transparentes
                  </h3>
                  <p className="text-gray-600">
                    Notre plateforme assure la sécurité de vos données et
                    transactions financières. Pas de frais cachés, tout est
                    clair dès le départ.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-blue-800">
                    Support dédié
                  </h3>
                  <p className="text-gray-600">
                    Notre équipe est là pour vous accompagner à chaque étape, de
                    la recherche à la signature du bail, pour répondre à toutes
                    vos questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-12">
            Notre processus de réservation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                1. Recherchez
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Utilisez nos filtres précis pour trouver le logement qui
                correspond parfaitement à vos besoins et à votre budget.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                2. Contactez
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Contactez le propriétaire ou notre équipe directement via la
                plateforme pour planifier une visite du bien.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Key className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                3. Visitez et confirmez
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Visitez le bien pour vous assurer qu'il répond à vos attentes,
                puis confirmez votre intérêt auprès du propriétaire.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                4. Réservez
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Sécurisez votre logement en signant le contrat de location.
                Bienvenue dans votre nouveau chez-vous !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Conditions d'utilisation
            </h2>
            <p className="text-center text-lg max-w-3xl mx-auto mb-8 text-gray-600">
              Pour garantir la sécurité et la qualité de notre service, nous
              avons établi des règles claires pour tous les utilisateurs.
            </p>
            <ul className="space-y-4 text-left md:text-center max-w-xl mx-auto text-gray-700">
              <li className="flex items-start md:items-center">
                <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1 md:mt-0 mr-3" />
                <span>
                  **Exactitude des informations :** Chaque profil et annonce
                  doivent être sincères.
                </span>
              </li>
              <li className="flex items-start md:items-center">
                <ClipboardList className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1 md:mt-0 mr-3" />
                <span>
                  **Règles de réservation :** En validant, vous vous engagez à
                  respecter les conditions de location spécifiques.
                </span>
              </li>
              <li className="flex items-start md:items-center">
                <HeartHandshake className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1 md:mt-0 mr-3" />
                <span>
                  **Respect de la communauté :** Nous attendons de tous les
                  utilisateurs une interaction respectueuse et professionnelle.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
