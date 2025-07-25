
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
import { AnalysisInput, AnalysisOutput } from "../types/analysis.types";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

function buildPrompt(review: string, productCategory: string): string {
    return `
        ANALIZA LA SIGUIENTE RESEÑA DE PRODUCTO.

        RESEÑA:
        "${review}"

        CATEGORÍA DE PRODUCTO:
        ${productCategory}

        TAREA:
        Extrae insights estructurados de la reseña y devuelve ÚNICAMENTE un objeto JSON válido. No incluyas texto adicional antes o después del JSON.

        ESTRUCTURA DEL JSON DE SALIDA:
        {
          "sentiment": {
            "overall": "positive" | "negative" | "neutral",
            "confidence": number (0.0 a 1.0)
          },
          "key_aspects": [
            {
              "aspect": "delivery" | "quality" | "price" | "customer_service" | "packaging" | "usability",
              "sentiment": "positive" | "negative" | "neutral",
              "mention": "string literal de la reseña"
            }
          ],
          "summary": "string (máximo 200 caracteres)"
        }

        INSTRUCCIONES DETALLADAS:
        1.  **sentiment.overall**: Analiza el sentimiento general de la reseña.
        2.  **sentiment.confidence**: Estima tu confianza en la clasificación del sentimiento general.
        3.  **key_aspects**: Identifica los aspectos específicos mencionados. Solo incluye aspectos de la lista permitida que se mencionen explícitamente. Para cada aspecto, determina su sentimiento y extrae la frase exacta ("mention") que lo respalda.
        4.  **summary**: Escribe un resumen conciso del análisis general.

        EJEMPLO DE SALIDA:
        {
          "sentiment": { "overall": "positive", "confidence": 0.9 },
          "key_aspects": [
            { "aspect": "delivery", "sentiment": "positive", "mention": "llegó rápido" },
            { "aspect": "quality", "sentiment": "positive", "mention": "calidad es excelente" }
          ],
          "summary": "Reseña positiva, destacando la entrega y calidad."
        }

        Ahora, analiza la reseña proporcionada y genera el objeto JSON.
    `;
}


export async function analyzeReview(input: AnalysisInput): Promise<AnalysisOutput> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = buildPrompt(input.review, input.product_category);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Limpiar la respuesta para asegurarse de que es un JSON válido
        const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsedJson: AnalysisOutput = JSON.parse(jsonText);
        return parsedJson;

    } catch (error) {
        console.error("Error analyzing review with Gemini:", error);
        throw new Error("Failed to analyze review.");
    }
}
