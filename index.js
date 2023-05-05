import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const configuration = new Configuration({
    organization: "org-ERJpXrYyctxjhNr9K36RWYGo",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());
app.post("/", async (req, res) => {
    const { messages } = req.body;
    console.log(messages)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are DesignGPT helpful assistant fitness workout specialist chatbot" },
            ...messages

        ]
    })
    res.json({
        completion: completion.data.choices[0].message
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});