import { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { registerUser } from "../services/api"; // <-- nouveau
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(null);
  const [focusedField, setFocusedField] = useState("");

  // Password strength calculation
  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/\d/)) strength += 1;
    if (password.match(/[^a-zA-Z\d]/)) strength += 1;
    return strength;
  };

  const getPasswordStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength === 0) return "";
    if (strength === 1) return "Faible";
    if (strength === 2) return "Moyen";
    if (strength === 3) return "Fort";
    return "Très fort";
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await registerUser({ name, email, password });
      setUser(data.user);
      setIsRegistered(true);
      console.log("Registration successful:", data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    alert("Redirection vers la page de connexion");
  };

  const resetForm = () => {
    setIsRegistered(false);
    setUser(null);
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  // Success state
  if (isRegistered && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
          <div className="text-center animate-pulse">
            <div className="mb-6 relative">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">Bienvenue !</h2>
            <p className="text-white/80 mb-2">Inscription réussie</p>
            <p className="text-white/60 mb-8 text-sm">
              Bonjour {user.name}, votre compte a été créé avec succès
            </p>
            <div className="space-y-3">
              <button
                onClick={handleLoginClick}
                className="w-full bg-white text-purple-600 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Aller à la connexion
              </button>
              <button
                onClick={resetForm}
                className="w-full border border-white/30 text-white py-3 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Créer un autre compte
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-fadeIn">
        {/* Header with animated gradient */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Inscription</h2>
          <p className="text-white/70">
            Créez votre compte en quelques secondes
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 text-red-100 rounded-2xl backdrop-blur-sm flex items-center space-x-2 animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <label className="block text-white/90 mb-2 font-medium text-sm">
              Nom complet
            </label>
            <div className="relative">
              <User
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedField === "name" ? "text-white" : "text-white/50"
                }`}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField("")}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
                placeholder="Votre nom complet"
                required
              />
            </div>
          </div>

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

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70">
                    Force du mot de passe
                  </span>
                  <span className="text-xs text-white/90 font-medium">
                    {getPasswordStrengthLabel()}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${(getPasswordStrength() / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={
              loading || !name.trim() || !email.trim() || !password.trim()
            }
            className="w-full bg-gradient-to-r from-white to-gray-100 text-purple-600 py-4 rounded-2xl font-bold text-lg hover:from-gray-100 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
          >
            {loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            )}
            <span className="relative z-10">
              {loading ? "Création du compte..." : "Créer mon compte"}
            </span>
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-white/70 text-sm">
            Déjà un compte ?{" "}
            <Link to="/login"
              className="text-white font-semibold hover:text-yellow-300 transition-colors duration-200 underline decoration-dotted underline-offset-4"
            >
              Connectez-vous
            </Link>
          </p>
        </div>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <p className="text-white/70 text-xs mb-2 font-medium">💡 Test :</p>
          <p className="text-white/60 text-xs leading-relaxed">
            Utilisez "test@example.com" pour tester l'erreur email déjà utilisé,
            ou tout autre email pour réussir l'inscription.
          </p>
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

export default Register;
