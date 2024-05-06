import getData from "./getData.js"
import cron from 'node-cron';
import checkMarket from "./gpt/checkMarket.js"


async function openPosition(args) {
    console.log('OPEN POSITION ' + JSON.stringify(args))

}
async function editPosition(args) {
    console.log('EDIT POSITION' + JSON.stringify(args))
}
async function closePosition(args) {
    console.log('CLOSE POSITION' + JSON.stringify(args))
}


const availableFunctions = {
    open_position: openPosition,
    edit_position: editPosition,
    close_position: closePosition
};

async function main() {
    const data = await getData()

    const tools = [
        {
            type: 'function',
            function: {
                name: "open_position",
                description: "Opens new position",
                parameters: {
                    type: "object",
                    properties: {
                        type: {
                            type: "number",
                            description: "0 - for LONG position, 1 for SHORT position"
                        },
                        sl: {
                            type: "number",
                            description: "Stop loss level for position, for example 82.30 with two decimal digits"
                        },
                        tp: {
                            type: "number",
                            description: "Tak profit level  for position, for example 82.30 with two decimal digits"
                        }

                    },
                    required: ["type", 'sl', 'tp'],
                },
            },
        },
        {
            type: 'function',
            function: {
                name: "edit_position",
                description: "Edits parameters of currently opened position",
                parameters: {
                    type: "object",
                    properties: {
                        type: {
                            type: "number",
                            description: "0 - for LONG position, 1 for SHORT position"
                        },
                        id: {
                            type: "number",
                            description: "Id of opened position"
                        },
                        sl: {
                            type: "number",
                            description: "Stop loss level for position, for example 82.30 with two digits after ."
                        },
                        tp: {
                            type: "number",
                            description: "Tak profit level  for position, for example 82.30 with two digits after ."
                        }

                    },
                    required: ["id", 'sl', 'tp'],
                },
            },
        },
        {
            type: 'function',
            function: {
                name: "close_position",
                description: "Close currently opened position",
                parameters: {
                    type: "object",
                    properties: {
                        type: {
                            type: "number",
                            description: "0 - for LONG position, 1 for SHORT position"
                        },
                        id: {
                            type: "number",
                            description: "Id of opened position"
                        },
                        sl: {
                            type: "number",
                            description: "Stop loss level for position, for example 82.30 with two digits after ."
                        },
                        tp: {
                            type: "number",
                            description: "Tak profit level  for position, for example 82.30 with two digits after ."
                        }

                    },
                    required: ["type", "id", 'sl', 'tp'],
                },
            },
        }
    ]



    const toolCalls = await checkMarket(data, tools)

    if (toolCalls) {
        for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;
            const functionToCall = availableFunctions[functionName];
            const functionArgs = JSON.parse(toolCall.function.arguments);
            const functionResponse = await functionToCall(functionArgs)
        }
    }

    return

}




cron.schedule('*/15 * * * *', async () => {
    try {
        main()
    } catch (error) {
        console.error('Error occurred while running crone:', error);
    }
});

