import axios from "axios";

// Base URL de ton backend Django
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Instance Axios pour réutilisation
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ----------------------
// User (Authentification)
// ----------------------

export const loginUser = async (credentials) => {
  const response = await api.post("/login/", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/register/", userData);
  return response.data;
};

// ----------------------
// Propriétés
// ----------------------

// Récupérer toutes les propriétés
export const getProperties = async () => {
  const response = await api.get("/properties/");
  return response.data;
};

// Récupérer une propriété par ID
export const getPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}/`);
  return response.data;
};

// Ajouter une nouvelle propriété
export const createProperty = async (propertyData) => {
  const response = await api.post("/properties/", propertyData);
  return response.data;
};

// Mettre à jour une propriété
export const updateProperty = async (id, propertyData) => {
  const response = await api.put(`/properties/${id}/`, propertyData);
  return response.data;
};

// Supprimer une propriété
export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}/`);
  return response.data;
};

// ----------------------
// Favoris
// ----------------------

// Ajouter ou retirer des favoris
export const toggleFavorite = async (propertyId) => {
  const response = await api.post(`/favorites/toggle/`, {
    property_id: propertyId,
  });
  return response.data;
};

// Récupérer les favoris de l'utilisateur
export const getUserFavorites = async () => {
  const response = await api.get("/favorites/");
  return response.data;
};

// Vérifier si une propriété est en favori
export const checkFavorite = async (propertyId) => {
  const response = await api.get(`/favorites/check/${propertyId}/`);
  return response.data;
};

export default api;
