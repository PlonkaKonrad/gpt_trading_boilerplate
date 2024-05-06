import OpenAI from "openai";
import config from '../config.json'

export async function askGPT(msg, tools) {
    console.log('ASK GPT')
    const openai = new OpenAI({ apiKey: config.GPT_API_KEY });
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: msg }],
        model: "gpt-3.5-turbo",
        tools
    });



    console.log("TOKENS USED: " + completion.usage.total_tokens)
    return {
        content: completion.choices[0].message,
        tokenUsed: completion.usage.total_tokens
    }

}
