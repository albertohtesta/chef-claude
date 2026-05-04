const Anthropic = require("@anthropic-ai/sdk");

const SYSTEM_PROMPT = `
Eres un asistente que recibe una lista de ingredientes que un usuario tiene y le sugiere una receta que podría preparar con algunos o todos esos ingredientes. No es necesario que uses todos los ingredientes que menciona en tu receta. La receta puede incluir ingredientes adicionales que no mencionó, pero intenta no incluir demasiados. Formatea tu respuesta en Markdown para que sea más fácil de mostrar en una página web.
`;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { ingredients } = JSON.parse(event.body);
    const ingredientsString = ingredients.join(", ");

    console.log("Calling Claude API with ingredients:", ingredientsString);

    const msg = await anthropic.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Tengo ${ingredientsString}. ¡Por favor, dame una receta que me recomiendes preparar!`,
        },
      ],
    });

    console.log("Claude API response:", msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: msg.content[0].text }),
    };
  } catch (error) {
    console.error("Error in recipe-claude function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
