import Anthropic from "@anthropic-ai/sdk";
import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
Eres un asistente que recibe una lista de ingredientes que un usuario tiene y le sugiere una receta que podría preparar con algunos o todos esos ingredientes. No es necesario que uses todos los ingredientes que menciona en tu receta. La receta puede incluir ingredientes adicionales que no mencionó, pero intenta no incluir demasiados. Formatea tu respuesta en Markdown para que sea más fácil de mostrar en una página web.
`;

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

export async function getRecipeFromChefClaude(ingredientsArr) {
  const response = await fetch("/.netlify/functions/recipe-claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientsArr }),
  });
  const data = await response.json();
  return data.recipe;
}

// Make sure you set an environment variable in Scrimba
// for HF_ACCESS_TOKEN

export async function getRecipeFromMistral(ingredientsArr) {
  const response = await fetch("/.netlify/functions/recipe-mistral", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientsArr }),
  });
  const data = await response.json();
  return data.recipe;
}
