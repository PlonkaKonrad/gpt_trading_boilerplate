import { askGPT } from "./askGPT.js"

export default async function checkMarket(data, tools) {


    const responseMessage = await askGPT(`

       HERE ADD PROMPT FOR GPT  FOR EXAMPLE HOW TO MANAGE RISK, WHEN CLOSE AND OPEN TRADES,  
       REMEMBER TO INCLUDE  data VARIABLE 
       
    `, tools);


    const toolCalls = responseMessage.content.tool_calls


    return toolCalls
}