import React from "react";
import { MapPin, Users, Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import featuredProperties from "../data/featured";

const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Biens mis en avant
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:-translate-y-2 transition-all"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                />
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <MapPin className="w-4 h-4 mr-1" /> {p.location}
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-blue-600 font-bold">
                    {p.price} FCFA/mois
                  </span>
                  <Link
                    to={`/maison/${p.id}`}
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Eye className="w-4 h-4" /> Voir plus
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/maisons"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Voir tous les biens
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
