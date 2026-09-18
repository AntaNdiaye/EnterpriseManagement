import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function askAboutBusiness(question: string, contextSummary: string) {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content:
          `You are a financial assistant for a small business owner. ` +
          `Here is a summary of their recent data:\n\n${contextSummary}\n\n` +
          `Question: ${question}\n\n` +
          `Answer plainly, in a few sentences, using only the numbers given.`
      }
    ]
  });

  const textBlock = message.content.find((b) => b.type === "text");
  return textBlock && "text" in textBlock ? textBlock.text : "";
}

export async function suggestCategory(description: string) {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 20,
    messages: [
      {
        role: "user",
        content:
          `Categorize this small-business transaction in one or two words ` +
          `(e.g. Inventory, Rent, Utilities, Payroll, Marketing, Sales): "${description}". ` +
          `Reply with only the category.`
      }
    ]
  });

  const textBlock = message.content.find((b) => b.type === "text");
  return textBlock && "text" in textBlock ? textBlock.text.trim() : "Uncategorized";
}
