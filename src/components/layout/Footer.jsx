import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
  Clock,
  Users,
  Award,
  Home,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Accueil", path: "/" },
    { name: "Maisons à louer", path: "/maisons" },
    { name: "À propos", path: "/apropos" },
    { name: "Contact", path: "/contact" },
    { name: "Politique de confidentialité", path: "/confidentialite" },
    { name: "Conditions d'utilisation", path: "/conditions" },
  ];

  // Composant Link personnalisé pour la démo
  const Link = ({ to, children, className, ...props }) => (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  );

  const services = [
    { icon: Users, text: "Location résidentielle" },
    { icon: Award, text: "Gestion locative" },
    { icon: Clock, text: "Support 24h/7j" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      icon: MessageCircle,
      href: "#",
      label: "WhatsApp",
      color: "hover:text-green-400",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">FayloHome</h3>
                <p className="text-sm text-gray-400">
                  Votre partenaire immobilier
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Trouvez la maison de vos rêves au Bénin avec notre expertise
              locale et notre service personnalisé.
            </p>

            {/* Services */}
            <div className="space-y-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-sm text-gray-300"
                >
                  <service.icon className="w-4 h-4 text-blue-400" />
                  <span>{service.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Liens utiles */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Liens utiles
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></div>
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="block text-gray-300 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 transform"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Coordonnées */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Contactez-nous
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Quartier Cocotomey, Rue 123
                    <br />
                    Cotonou, Littoral
                    <br />
                    République du Bénin
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <a
                  href="tel:+22990123456"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  +229 01 91 73 24 32
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <a
                  href="mailto:contact@faylohome.com"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  faylohome@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux et horaires */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Suivez-nous
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></div>
            </h4>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center ${social.color} transition-all duration-200 transform hover:scale-110 hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Horaires */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                Horaires d'ouverture
              </h5>
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Lun - Ven</span>
                  <span>8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>9h00 - 16h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-red-400">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-400">
                © {currentYear}{" "}
                <span className="text-white font-medium">FayloHome Bénin</span>{" "}
                – Tous droits réservés.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Votre partenaire immobilier de confiance au Bénin
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <Link
                to="/confidentialite"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Confidentialité
              </Link>
              <span>•</span>
              <Link
                to="/conditions"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Conditions
              </Link>
              <span>•</span>
              <Link
                to="/mentions-legales"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Effet de vague décoratif */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          className="relative block w-full h-8"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(59, 130, 246, 0.1)"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
