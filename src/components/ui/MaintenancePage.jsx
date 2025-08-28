import { useState, useEffect } from "react";
import { Wrench, Clock, Mail, Home } from "lucide-react";

const MaintenancePage = () => {
  const [countdown, setCountdown] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Date estimée de fin de maintenance (à modifier selon vos besoins)
  const maintenanceEndTime = new Date("2025-08-28T18:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = maintenanceEndTime - now;

      if (distance < 0) {
        setCountdown("Maintenance terminée !");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [maintenanceEndTime]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Ici vous ajouteriez l'appel à votre API pour enregistrer l'email
      console.log("Email enregistré:", email);
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const handleGoHome = () => {
    // Redirection vers la page d'accueil
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
        <div className="text-center">
          {/* Icône et titre */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Wrench className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Site en maintenance
          </h1>
          
          <p className="text-xl text-blue-100 mb-8">
            Nous effectuons actuellement des travaux de maintenance pour améliorer votre expérience.
          </p>

          {/* Compte à rebours 
          {countdown && (
            <div className="bg-white/10 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-lg font-semibold text-white">Retour prévu dans</span>
              </div>
              <div className="text-3xl font-bold text-yellow-400">
                {countdown}
              </div>
            </div>
          )*/}

          {/* Description */}
          <div className="text-blue-100 mb-8 space-y-3">
            <p>🚀 Nous travaillons sur de nouvelles fonctionnalités passionnantes</p>
            <p>🔧 Amélioration des performances du site</p>
            <p>🛡️ Renforcement de la sécurité</p>
          </div>

          {/* Formulaire de notification */}
          {!isSubscribed ? (
            <div className="bg-white/5 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Soyez informé de la réouverture
              </h3>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Notifiez-moi
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-500/20 rounded-xl p-6 mb-8">
              <p className="text-green-100 text-center">
                ✅ Merci ! Vous serez informé dès la réouverture du site.
              </p>
            </div>
          )}

          {/* Bouton de retour */}
          <button
            onClick={handleGoHome}
            className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </button>

          {/* Contact d'urgence */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-blue-200 text-sm">
              Pour toute urgence, contactez-nous à{" "}
              <a href="mailto:support@faylohome.com" className="text-yellow-400 hover:underline">
                support@faylohome.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Animation de fond */}
      <div className="absolute inset-0 overflow-hidden z-[-1]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Hook personnalisé pour gérer l'état de maintenance
export const useMaintenanceMode = () => {
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    // Vérifier si le mode maintenance est activé
    // Vous pouvez le baser sur une variable d'environnement, une API, etc.
    const maintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";
    setIsMaintenance(maintenanceMode);
  }, []);

  return isMaintenance;
};

// Composant wrapper pour protéger les routes
export const MaintenanceWrapper = ({ children }) => {
  const isMaintenance = useMaintenanceMode();

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return children;
};

export default MaintenancePage;