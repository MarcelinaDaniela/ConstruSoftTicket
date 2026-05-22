import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Para redirigir al Login después de registrarse
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    if (!formData.nombre || !formData.correo || !formData.password) {
      setErrors({
        nombre: !formData.nombre ? "El nombre es obligatorio" : "",
        correo: !formData.correo ? "El correo es obligatorio" : "",
        password: !formData.password ? "La contraseña es obligatoria" : ""
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Petición al endpoint de registrar que probamos en Swagger
      const response = await fetch("http://localhost:5264/api/Auth/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage("¡Usuario registrado con éxito! Redirigiendo al login...");
        
        // Esperamos 2 segundos para que el usuario lea el mensaje y lo mandamos al Login
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessageType("error");
        setMessage(data.mensaje || "Error al registrar el usuario.");
      }
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage("Error de conexión con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Crear Cuenta</h1>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Nombre completo"
          name="nombre"
          type="text"
          value={formData.nombre}
          placeholder="Tu nombre"
          required={true}
          onChange={handleChange}
          error={errors.nombre}
        />

        <InputField
          label="Correo electrónico"
          name="correo"
          type="email"
          value={formData.correo}
          placeholder="ejemplo@correo.com"
          required={true}
          onChange={handleChange}
          error={errors.correo}
        />

        <InputField
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          placeholder="Mínimo 6 caracteres"
          required={true}
          onChange={handleChange}
          error={errors.password}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <FormMessage type={messageType} message={message} />

      <p style={{ marginTop: "15px" }}>
        ¿Ya tienes cuenta? <span style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/")}>Inicia sesión aquí</span>
      </p>
    </main>
  );
}