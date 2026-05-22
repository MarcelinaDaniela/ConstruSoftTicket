import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- ¡Importamos el navegador interno!
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";

export default function Login() {
  const [formData, setFormData] = useState({
    correo: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // <-- Inicializamos la función para redireccionar

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    if (!formData.correo || !formData.password) {
      setErrors({
        correo: !formData.correo ? "El correo es obligatorio" : "",
        password: !formData.password ? "La contraseña es obligatoria" : ""
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:5264/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        
        setMessageType("success");
        setMessage("¡Inicio de sesión exitoso!");

        setTimeout(() => {
          navigate("/ticket");
        }, 1000);

      } else {
        setMessageType("error");
        setMessage(data.mensaje || "Error al iniciar sesión.");
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
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
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
          placeholder="********"
          required={true}
          onChange={handleChange}
          error={errors.password}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Entrar"}
        </button>
      </form>

      <FormMessage type={messageType} message={message} />

      {/* 👇 TU PETICIÓN: Opción abajo del formulario para ir a crear usuario */}
      <p style={{ marginTop: "15px" }}>
        ¿No tienes una cuenta? <span style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/registro")}>Regístrate aquí</span>
      </p>
    </main>
  );
}