import db from '@/firebaseConfig.js';
import openAiClient from '@/openAiConfig.js';

export async function POST(request) {
    const req = await request.json();

    const receivedMessage = req.msg;
    console.log(`Api successfully called with message ${receivedMessage}`);
    
    const response = await openAiClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant"
            },
            {
                role: "user",
                content: receivedMessage
            }
        ]
    });

    const openAiResponseText = response.choices[0].message.content;

    const returnResponse = {
        isHuman: false,
        msg: openAiResponseText
    }

    return new Response(JSON.stringify(returnResponse), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 200
    });
}