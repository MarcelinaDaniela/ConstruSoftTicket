import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";

export default function Login() {
  // --- ESTADOS DEL FORMULARIO ---
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // --- NUEVO ESTADO: VER/OCULTAR CONTRASEÑA ---
  const [showPassword, setShowPassword] = useState(false);

  // --- LÓGICA DEL CARRUSEL DE IMÁGENES ---
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // --- LÓGICA DE INICIO DE SESIÓN ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); 
  };

  const togglePassword = () => {
    setShowPassword(!showPassword); // Cambia el valor al contrario (de falso a verdadero y viceversa)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/ticket"); 
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* --- COLUMNA IZQUIERDA: FONDO GRIS --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-gray-100">
        
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-gray-100">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-white font-bold text-2xl">CS</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800">ConstruSoft</h1>
            <p className="text-gray-500 text-sm mt-1">Gestión de Incidencias</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Campo Correo */}
            <InputField
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              placeholder="ejemplo@correo.com"
              required={true}
              onChange={handleChange}
            />

            {/* NUEVO: Campo Contraseña con botón de Ver/Ocultar */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required={true}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-orange-600 transition-colors"
                >
                  {/* Cambiamos el ícono SVG dependiendo del estado */}
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-1 mb-4">
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                Recordarme
              </label>
              <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-200 disabled:bg-orange-400"
            >
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          {error && (
            <div className="mt-4">
              <FormMessage type="error" message={error} />
            </div>
          )}

          <p className="text-center text-gray-600 text-sm mt-8">
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className="text-orange-600 hover:text-orange-500 font-bold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          Copyright © 2026 ConstruSoft, LLC. Todos los derechos reservados.
        </p>
      </div>

      {/* --- COLUMNA DERECHA: CARRUSEL DE IMÁGENES --- */}
      <div className="hidden md:flex md:w-1/2 relative bg-gray-900 overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full opacity-70 mix-blend-overlay"
            />
          </div>
        ))}
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 pointer-events-none p-12 text-center">
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-xl tracking-tight">Optimiza tus procesos</h2>
          <p className="text-lg text-gray-200 drop-shadow-md max-w-lg">
            Gestiona incidencias técnicas de forma rápida y eficiente con nuestro sistema automatizado.
          </p>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-10">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentImage ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}