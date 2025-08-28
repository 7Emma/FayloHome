import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById, toggleFavorite } from "../../services/api";
import {
  Heart,
  Star,
  Bed,
  Bath,
  Square,
  Wifi,
  Car,
  Shield,
  MapPin,
  Calendar,
  Phone,
  Share2,
  ArrowLeft,
  Play,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Home,
  Key,
  DollarSign,
  GlassWater,
} from "lucide-react";

const BASE_BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fonction utilitaire pour obtenir l'URL complète
  const getFullUrl = (path) => {
    if (!path) {
      console.warn("Chemin d'image vide ou invalide:", path);
      return "";
    }
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    const fullUrl = `${BASE_BACKEND_URL}${path}`;
    console.log("Full URL construite:", fullUrl);
    return fullUrl;
  };

  // Fetch la propriété depuis le backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("Fetching property with ID:", id);
        const data = await getPropertyById(id);
        console.log("Property data received:", data);
        setProperty(data);
        if (data.is_favorite !== undefined) {
          setIsFavorite(data.is_favorite);
          console.log("État initial favori:", data.is_favorite);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la propriété:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // Toggle favori
  const addToFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token manquant, utilisateur non connecté");
      alert("Vous devez être connecté pour ajouter aux favoris");
      return;
    }

    try {
      console.log("Toggling favorite for property ID:", id);
      const result = await toggleFavorite(id, token);
      console.log("Résultat toggleFavorite:", result);
      setIsFavorite(!isFavorite);
      alert(isFavorite ? "Retiré des favoris !" : "Ajouté aux favoris !");
    } catch (err) {
      console.error("Erreur lors de l'opération toggleFavorite:", err);
      alert("Erreur lors de l'opération");
    }
  };

  // Partage du lien
  const shareProperty = async () => {
    try {
      const el = document.createElement("textarea");
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      console.log("Lien copié :", window.location.href);
      alert("Lien copié dans le presse-papiers !");
    } catch (err) {
      console.error("Erreur lors du partage :", err);
    }
  };

  // Navigation images
  const goToNextImage = () => {
    if (!property?.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
    console.log("Image suivante index:", currentImageIndex + 1);
  };

  const goToPreviousImage = () => {
    if (!property?.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
    console.log("Image précédente index:", currentImageIndex - 1);
  };

  if (loading) {
    console.log("Chargement en cours...");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 text-lg">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    console.warn("Propriété introuvable pour ID:", id);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4">
            <Home className="w-16 h-16 text-gray-400 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Propriété introuvable
          </h2>
          <p className="text-gray-500">
            Cette propriété n'existe pas ou a été supprimée.
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Création de la liste des équipements
  const amenities = [];
  if (property.wifi)
    amenities.push({
      name: "Wifi",
      icon: <Wifi className="w-5 h-5 text-blue-500" />,
    });
  if (property.parking)
    amenities.push({
      name: "Parking",
      icon: <Car className="w-5 h-5 text-green-500" />,
    });
  if (property.security)
    amenities.push({
      name: "Sécurité",
      icon: <Shield className="w-5 h-5 text-red-500" />,
    });
  if (property.pet_friendly)
    amenities.push({
      name: "Animaux acceptés",
      icon: <GlassWater className="w-5 h-5 text-purple-500" />,
    });

  console.log(
    "Équipements détectés :",
    amenities.map((a) => a.name)
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-40 sm:pt-32 md:pt-36 lg:pt-16">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md shadow-md z-50 relative"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={shareProperty}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={addToFavorites}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite
                    ? "text-red-600 bg-red-50 hover:bg-red-100"
                    : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section avec Images */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Vérifie s'il y a des images à afficher */}
          {property.images && property.images.length > 0 ? (
            <div className="relative">
              {/* Image principale */}
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                  src={getFullUrl(property.images[currentImageIndex].image)}
                  alt={property.title}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setShowImageModal(true)}
                />

                {/* Boutons de navigation */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={goToPreviousImage}
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Badge du nombre de photos */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <ImageIcon className="w-4 h-4" />
                  <span>
                    {currentImageIndex + 1} / {property.images.length}
                  </span>
                </div>
              </div>

              {/* Galerie de miniatures */}
              {property.images.length > 1 && (
                <div className="flex justify-center space-x-2 p-4">
                  {property.images.map((img, index) => (
                    <img
                      key={index}
                      src={getFullUrl(img.image)}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-md cursor-pointer transition-all duration-200 border-2 ${
                        index === currentImageIndex
                          ? "border-blue-500 scale-110"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                <p>Aucune image disponible</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations principales */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {property.title}
                  </h1>
                  {property.location && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg">{property.location}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-lg font-medium text-gray-700">
                      {property.rating || "Nouveau"}
                    </span>
                    {property.reviews && (
                      <span className="text-gray-500 ml-2">
                        ({property.reviews} avis)
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-1">
                    {property.price?.toLocaleString("fr-FR")} FCFA
                  </div>
                  <div className="text-gray-500">par mois</div>
                </div>
              </div>

              {/* Caractéristiques principales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-200">
                <div className="text-center">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bed className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {property.bedrooms || "N/A"}
                  </div>
                  <div className="text-gray-600">Chambres</div>
                </div>

                <div className="text-center">
                  <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bath className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {property.bathrooms || "N/A"}
                  </div>
                  <div className="text-gray-600">Salon</div>
                </div>

                <div className="text-center">
                  <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Square className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {property.area || "N/A"}
                  </div>
                  <div className="text-gray-600">m²</div>
                </div>

                {/* Ajout des informations sur la disponibilité */}
                <div className="text-center">
                  <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-pink-600" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {property.available || "Immédiate"}
                  </div>
                  <div className="text-gray-600">Disponibilité</div>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>
              )}
            </div>

            {/* Équipements */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Équipements & Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {amenity.icon}
                      <span className="text-gray-700 capitalize">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vidéos */}
            {property.video && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Play className="w-6 h-6 mr-2 text-blue-600" />
                  Vidéo de la propriété
                </h3>
                <div className="space-y-4">
                  <div
                    key={property.video}
                    className="relative rounded-xl overflow-hidden"
                  >
                    <video
                      controls
                      className="w-full h-64 md:h-80 object-cover rounded-xl"
                    >
                      <source
                        src={getFullUrl(property.video)}
                        type="video/mp4"
                      />
                      Votre navigateur ne supporte pas les vidéos HTML5.
                    </video>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bouton d'action principal */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <button
                onClick={addToFavorites}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                  isFavorite
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } shadow-lg hover:shadow-xl`}
              >
                <Heart
                  className={`inline w-5 h-5 mr-2 ${
                    isFavorite ? "fill-current" : ""
                  }`}
                />
                {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              </button>

              <a
                href="tel:0191732432"
                className="block text-center w-full mt-3 py-3 px-6 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                <Phone className="inline w-5 h-5 mr-2" />
                Contactez-nous
              </a>

              <button className="w-full mt-3 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                <Calendar className="inline w-5 h-5 mr-2" />
                Programmer une visite
              </button>
            </div>

            {/* Informations supplémentaires */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Détails</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type de bien:</span>
                  <span className="font-medium">
                    {property.type || "Non renseigné"}
                  </span>
                </div>
                {/* Ajout des champs du modèle Django */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Meublé:</span>
                  <span className="font-medium">
                    {property.furnished ? "Oui" : "Non"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">État:</span>
                  <span className="font-medium capitalize">
                    {property.state || "Non renseigné"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durée du contrat:</span>
                  <span className="font-medium">
                    {/* La durée du contrat est maintenant un champ de texte */}
                    {property.contract_duration || "Non renseignée"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ajouté le:</span>
                  <span className="font-medium">
                    {property.date_added || "Non renseigné"}
                  </span>
                </div>
              </div>
            </div>

            {/* Coûts d'entrée */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Coûts d'entrée
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avance propriétaire:</span>
                  <span className="font-medium">
                    {property.owner_advance_months} mois
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais d'agent:</span>
                  <span className="font-medium">
                    {property.agent_fee_months} mois
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dépôt électricité:</span>
                  <span className="font-medium">
                    {property.electricity_deposit || "Non renseigné"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dépôt eau:</span>
                  <span className="font-medium">
                    {property.water_deposit || "Non renseigné"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Autres charges:</span>
                  <span className="font-medium">
                    {property.other_charges || "Non renseigné"}
                  </span>
                </div>
              </div>
            </div>

            {/* Règles */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Règles de la propriété
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fumeurs autorisés:</span>
                  <span className="font-medium">
                    {property.smoking_allowed ? "Oui" : "Non"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fêtes autorisées:</span>
                  <span className="font-medium">
                    {property.parties_allowed ? "Oui" : "Non"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Animaux autorisés:</span>
                  <span className="font-medium">
                    {property.pets_allowed ? "Oui" : "Non"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal des images */}
      {showImageModal && property.images.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
            >
              ✕
            </button>

            <div className="relative">
              <img
                src={getFullUrl(property.images[currentImageIndex].image)}
                alt={property.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
