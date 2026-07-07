import { useState } from "react";

import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";
import Button from "../components/Button";
import PageContainer from "../components/PageContainer";

import MainLayout from "../layouts/MainLayout";

import { createTicket } from "../services/ticketService";
import { normalizeText } from "../utils/normalizeText";

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: ""
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validateForm = () => {
    const newErrors = {};

    const titulo = normalizeText(formData.titulo);
    const descripcion = normalizeText(formData.descripcion);

    if (!titulo) {
      newErrors.titulo = "El título es obligatorio.";
    } else if (titulo.length < 5) {
      newErrors.titulo = "El título debe tener al menos 5 caracteres.";
    }

    if (!descripcion) {
      newErrors.descripcion = "La descripción es obligatoria.";
    } else if (descripcion.length < 10) {
      newErrors.descripcion = "La descripción debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await createTicket({
        titulo: normalizeText(formData.titulo),
        descripcion: normalizeText(formData.descripcion)
      });

      setMessageType("success");
      setMessage(result.message);

      setFormData({
        titulo: "",
        descripcion: ""
      });

      setErrors({});
    } catch (error) {
      console.error(error);

      setMessageType("error");
      setMessage(
        "No se pudo registrar el ticket."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <PageContainer title="Registro de Tickets">
        <p className="text-gray-600 mb-6">
          Complete la información de la incidencia técnica.
        </p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Título del ticket"
            name="titulo"
            value={formData.titulo}
            placeholder="Ejemplo: Equipo no inicia"
            required={true}
            onChange={handleChange}
            error={errors.titulo}
          />

          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="
                block
                mb-2
                font-medium
                text-gray-700
              "
            >
              Descripción de la incidencia
            </label>

            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              placeholder="Describa detalladamente el problema"
              rows="5"
              onChange={handleChange}
              className={`
                w-full
                border
                rounded
                px-3
                py-2
                outline-none
                focus:ring-2
                ${
                  errors.descripcion
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }
              `}
            />

            {errors.descripcion && (
              <p className="text-red-500 text-sm mt-1">
                {errors.descripcion}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Registrando..."
              : "Registrar ticket"}
          </Button>
        </form>

        <FormMessage
          type={messageType}
          message={message}
        />
      </PageContainer>
    </MainLayout>
  );
}