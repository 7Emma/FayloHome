import { useState } from "react";
import { loginUser } from "../services/api";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [focusedField, setFocusedField] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
      setIsAuthenticated(true);
      console.log("Login successful:", data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleRegisterClick = () => {
    alert("Redirection vers la page d'inscription");
  };

  // Success state
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
          <div className="text-center animate-pulse">
            <div className="mb-6 relative">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">Bienvenue !</h2>
            <p className="text-white/80 mb-2">Connexion réussie</p>
            <p className="text-white/60 mb-8 text-sm">
              Bonjour {user.name}, vous êtes maintenant connecté
            </p>
            <div className="space-y-3">
              <button
                onClick={() => alert("Redirection vers le tableau de bord")}
                className="w-full bg-white text-blue-600 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Accéder au tableau de bord
              </button>
              <button
                onClick={handleLogout}
                className="w-full border border-white/30 text-white py-3 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-fadeIn">
        {/* Header with animated gradient */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Connexion</h2>
          <p className="text-white/70">Accédez à votre compte</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 text-red-100 rounded-2xl backdrop-blur-sm flex items-center space-x-2 animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label className="block text-white/90 mb-2 font-medium text-sm">
              Adresse email
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedField === "email" ? "text-white" : "text-white/50"
                }`}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-white/90 mb-2 font-medium text-sm">
              Mot de passe
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedField === "password" ? "text-white" : "text-white/50"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
                placeholder="Votre mot de passe"
                required
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              onClick={() =>
                alert("Redirection vers la récupération de mot de passe")
              }
              className="text-white/70 hover:text-white text-sm transition-colors duration-200 underline decoration-dotted underline-offset-4"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !email.trim() || !password.trim()}
            className="w-full bg-gradient-to-r from-white to-gray-100 text-blue-600 py-4 rounded-2xl font-bold text-lg hover:from-gray-100 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
          >
            {loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            )}
            <span className="relative z-10">
              {loading ? "Connexion en cours..." : "Se connecter"}
            </span>
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-8">
          <p className="text-white/70 text-sm">
            Pas encore de compte ?{" "}
            <Link to="/register"
              className="text-white font-semibold hover:text-yellow-300 transition-colors duration-200 underline decoration-dotted underline-offset-4"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <p className="text-white/70 text-xs mb-2 font-medium">
            🔐 Comptes de test :
          </p>
          <div className="space-y-1 text-white/60 text-xs leading-relaxed">
            <p>
              <span className="font-medium">Email:</span> demo@example.com
            </p>
            <p>
              <span className="font-medium">Mot de passe:</span> password123
            </p>
            <p className="text-white/50">ou admin@example.com / admin123</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
