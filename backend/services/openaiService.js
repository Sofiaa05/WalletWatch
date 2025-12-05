const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateSpendingInsights = async (expenseData) => {
  let categories = {};

  expenseData.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + item.amount;
  });

  const prompt = `
    Analyze this spending data and provide insights and suggestions in bullet points.
    Data: ${JSON.stringify(categories)}
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // your model here
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
  });

  return response.choices[0].message.content;
};
