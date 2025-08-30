import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById, toggleFavorite } from "../../services/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  Heart,
  Star,
  Bed,
  Bath,
  Warehouse,
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
  Image,
  ChevronLeft,
  ChevronRight,
  Home,
  Key,
  DollarSign,
  GlassWater,
  ImageIcon,
} from "lucide-react";

// Correction pour les icônes Leaflet
// Ceci est nécessaire si les icônes ne s'affichent pas correctement
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const BASE_BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const contactWhatsApp = "2290191732432";

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
        console.log("Property data received:", data); // Affiche les données reçues
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

  // Affiche l'état du composant après le rendu
  useEffect(() => {
    console.log("État de la propriété :", property);
  }, [property]);

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Chargement des détails...</p>
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
            <Home className="w-12 h-12 text-gray-400 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Propriété introuvable
          </h2>
          <p className="text-gray-500 text-sm">
            Cette propriété n'existe pas ou a été supprimée.
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
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
      icon: <Wifi className="w-4 h-4 text-blue-500" />,
    });
  if (property.parking)
    amenities.push({
      name: "Parking",
      icon: <Car className="w-4 h-4 text-green-500" />,
    });
  if (property.security)
    amenities.push({
      name: "Sécurité",
      icon: <Shield className="w-4 h-4 text-red-500" />,
    });
  if (property.pet_friendly)
    amenities.push({
      name: "Animaux acceptés",
      icon: <GlassWater className="w-4 h-4 text-purple-500" />,
    });

  console.log(
    "Équipements détectés :",
    amenities.map((a) => a.name)
  );

  const message = `Bonjour, je suis intéressé par ce bien immobilier :

      Nom : ${property.title}
      Prix : ${property.price} FCFA
      Localisation : ${property.location}

      Voir l'image : ${property.images?.[currentImageIndex]?.image_url}
      Voir la page : ${window.location.origin}/property/${property.id}
`;
  const whatsappLink = `https://wa.me/${contactWhatsApp}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-14 sm:pt-20">
      {/* Header compact avec navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={shareProperty}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <Share2 className="w-4 h-4" />
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
                  className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale - Images, détails et carte */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section images compacte */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {property.images && property.images.length > 0 ? (
                <div className="relative">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={getFullUrl(property.images[currentImageIndex].image)}
                      alt={property.title}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => setShowImageModal(true)}
                    />

                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={goToPreviousImage}
                          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={goToNextImage}
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Image className="w-3 h-3" />
                      <span>
                        {currentImageIndex + 1} / {property.images.length}
                      </span>
                    </div>
                  </div>

                  {property.images.length > 1 && (
                    <div className="flex justify-center space-x-1 p-3">
                      {property.images.map((img, index) => (
                        <img
                          key={index}
                          src={getFullUrl(img.image)}
                          alt={`Thumbnail ${index + 1}`}
                          className={`w-12 h-12 object-cover rounded cursor-pointer transition-all duration-200 border ${
                            index === currentImageIndex
                              ? "border-blue-500 scale-105"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Image className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Aucune image disponible</p>
                  </div>
                </div>
              )}
            </div>

            {/* Informations principales compactes */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  {property.location && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      {property.rating || "Nouveau"}
                    </span>
                    {property.reviews && (
                      <span className="text-gray-500 ml-1 text-xs">
                        ({property.reviews} avis)
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl lg:text-2xl font-bold text-blue-600">
                    {property.price?.toLocaleString("fr-FR")} FCFA
                  </div>
                  <div className="text-gray-500 text-xs">par mois</div>
                </div>
              </div>

              {/* Caractéristiques principales compactes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-200">
                <div className="text-center">
                  <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Bed className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {property.bedrooms || "N/A"}
                  </div>
                  <div className="text-gray-600 text-xs">Chambres</div>
                </div>

                <div className="text-center">
                  <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Warehouse className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {property.bathrooms || "N/A"}
                  </div>
                  <div className="text-gray-600 text-xs">Salle de bain</div>
                </div>

                <div className="text-center">
                  <div className="bg-purple-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Square className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {property.area || "N/A"}
                  </div>
                  <div className="text-gray-600 text-xs">m²</div>
                </div>

                <div className="text-center">
                  <div className="bg-pink-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {property.available || "Immédiate"}
                  </div>
                  <div className="text-gray-600 text-xs">Disponibilité</div>
                </div>
              </div>

              {/* Description compacte */}
              {property.description && (
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {property.description}
                  </p>
                </div>
              )}
            </div>

            {/* Équipements compacts */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Équipements & Services
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {amenity.icon}
                      <span className="text-gray-700 text-sm">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vidéos compactes */}
            {property.video && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Play className="w-5 h-5 mr-2 text-blue-600" />
                  Vidéo de la propriété
                </h3>
                <div className="relative rounded-lg overflow-hidden">
                  <video
                    controls
                    className="w-full h-48 md:h-64 object-cover rounded-lg"
                  >
                    <source src={getFullUrl(property.video)} type="video/mp4" />
                    Votre navigateur ne supporte pas les vidéos HTML5.
                  </video>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar compacte */}
          <div className="space-y-4">
            {/* Actions principales */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <button
                onClick={addToFavorites}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                  isFavorite
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } shadow-md hover:shadow-lg`}
              >
                <Heart
                  className={`inline w-4 h-4 mr-2 ${
                    isFavorite ? "fill-current" : ""
                  }`}
                />
                {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                className="block text-center w-full mt-2 py-2.5 px-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
              >
                <Phone className="inline w-4 h-4 mr-1" />
                Contactez-nous
              </a>

              <button className="w-full mt-2 py-2.5 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm">
                <Calendar className="inline w-4 h-4 mr-1" />
                Programmer visite
              </button>
            </div>

            {/* Détails compacts */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Détails</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-right">
                    {property.type || "Non renseigné"}
                  </span>
                </div>
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
                  <span className="text-gray-600">Contrat:</span>
                  <span className="font-medium text-right">
                    {property.contract_duration || "Non renseigné"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ajouté:</span>
                  <span className="font-medium text-right">
                    {property.date_added || "Non renseigné"}
                  </span>
                </div>
              </div>
            </div>

            {/* Coûts d'entrée compacts */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Coûts d'entrée
              </h4>
              <div className="space-y-2 text-xs">
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
                  <span className="font-medium text-right">
                    {property.electricity_deposit || "Non renseigné"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dépôt eau:</span>
                  <span className="font-medium text-right">
                    {property.water_deposit || "Non renseigné"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Autres charges:</span>
                  <span className="font-medium text-right">
                    {property.other_charges || "Non renseigné"}
                  </span>
                </div>
              </div>
            </div>

            {/* Règles compactes */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Key className="w-4 h-4 mr-2" />
                Règles
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fumeurs:</span>
                  <span className="font-medium">
                    {property.smoking_allowed ? "Autorisé" : "Interdit"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fêtes:</span>
                  <span className="font-medium">
                    {property.parties_allowed ? "Autorisées" : "Interdites"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Animaux:</span>
                  <span className="font-medium">
                    {property.pets_allowed ? "Autorisés" : "Interdits"}
                  </span>
                </div>
              </div>
            </div>
            {/* Carte de localisation */}
            {property.latitude && property.longitude && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                  Localisation
                </h3>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <MapContainer
                    center={[property.latitude, property.longitude]}
                    zoom={15}
                    style={{ height: "400px", width: "100%" }}
                    className="rounded-xl"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[property.latitude, property.longitude]}>
                      <Popup>
                        <div className="text-center">
                          <strong>{property.title}</strong>
                          <br />
                          {property.location}
                          <br />
                          <a
                            href={property.map_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            📍 Ouvrir dans Google Maps
                          </a>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>

                {property.map_url && (
                  <div className="mt-4 text-center">
                    <a
                      href={property.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Voir sur Google Maps
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showImageModal && property.images.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              ✕
            </button>

            <div className="relative">
              <img
                src={getFullUrl(property.images[currentImageIndex].image)}
                alt={property.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={goToPreviousImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
