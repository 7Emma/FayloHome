import React, { useState } from "react";
import { MapPin, Users, DollarSign, Search } from "lucide-react";

const SearchForm = ({ onSearch }) => {
  const [form, setForm] = useState({ location: "", budget: "", type: "" });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Ville */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Ex: Cotonou, Calavi..."
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Budget */}
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={form.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Budget</option>
            <option value="0-30000">0 - 30k</option>
            <option value="30000-60000">30k - 60k</option>
            <option value="60000-100000">60k - 100k</option>
            <option value="100000+">100k+</option>
          </select>
        </div>

        {/* Type */}
        <div className="relative">
          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Tous types</option>
            <option value="studio">Studio</option>
            <option value="appartement">Appartement</option>
            <option value="maison">Maison</option>
          </select>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <Search className="w-5 h-5" />
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
