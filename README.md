# Review Analysis API

Esta API permite analizar reseñas de productos utilizando el modelo Gemini de Google para extraer sentimientos, aspectos clave y resúmenes.

## Instalación

1.  **Instala las dependencias:**
    ```bash
    npm install
    ```
    
2.  **Inicia el servidor:**
    ```bash
    npm start
    ```

## Configuración de Variables de Entorno

```env
PORT=3000
GEMINI_API_KEY=TU_API_KEY_DE_GEMINI
```

## Ejemplos de Uso

**Endpoint:** `POST /api/analyze-review`

### Ejemplo 1: Reseña Positiva

**Body:**

```json
{
  "review": "Este producto es increíble, la calidad es excelente y llegó muy rápido. ¡Totalmente recomendado!",
  "product_category": "electrónica"
}
```

### Ejemplo 2: Reseña Negativa con Múltiples Aspectos

**Body:**

```json
{
  "review": "El servicio al cliente fue pésimo, tardaron días en responder. Además, el empaque llegó dañado, aunque el producto en sí parece funcionar. El precio es demasiado alto para lo que ofrece.",
  "product_category": "ropa"
}
```

## Decisiones Técnicas

-   **Node.js y TypeScript:** Se eligió Node.js por su eficiencia en operaciones de I/O no bloqueantes, ideal para una API. TypeScript se utiliza para añadir tipado estático, lo que mejora la mantenibilidad, la detección de errores en tiempo de desarrollo y la escalabilidad del proyecto.

-   **Express.js:** Framework minimalista y flexible para construir la API REST.

-   **Google Gemini API:** Integración con el modelo `gemini-1.5-flash` para el análisis de texto. Este modelo fue seleccionado por su relacion costo/beneficio.

