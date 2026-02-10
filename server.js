import dotenv from "dotenv";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const EMAIL = "deesh1180.be23@chitkarauniversity.edu.in";

if (!API_KEY) {
    console.error("Missing API_KEY in .env file");
    process.exit(1);
}

const ai = new GoogleGenerativeAI(API_KEY);

async function run(prompt) {
    const model = ai.getGenerativeModel({
        model: "gemini-2.5-flash"});

    try {
        const result = await model.generateContent(prompt + " (One word only)");
        const response = await result.response;
        const text = response.text().trim();

        return text;
    } catch (error) {
        console.error("AI Error:", error.message);
        throw new Error("AI Error");
    }
}



function fibonacci(n) {
    if (typeof n !== "number" || n < 0) return null;
    if (n === 0) return [];
    if (n === 1) return [0];

    const arr = [0, 1];
    for (let i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr;
}

function isPrime(n) {
    if (typeof n !== "number" || n < 2) return false;

    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function hcf(a, b) {
    if (typeof a !== "number" || typeof b !== "number") return null;

    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    if (typeof a !== "number" || typeof b !== "number") return null;
    if (a === 0 || b === 0) return 0;

    return Math.abs((a * b) / hcf(a, b));
}


app.get("/health", (req, res) => {
    res.json({
        is_success: true,
        official_email: EMAIL
    });
});

app.post("/bfhl", async (req, res) => {
    try {
        const body = req.body;
        let output;

        if (typeof body.fibonacci === "number") {
            output = fibonacci(body.fibonacci);
            if (output === null)
                return res.status(400).json({ is_success: false, official_email: EMAIL });
        }

        else if (Array.isArray(body.prime)) {
            output = [];
            for (let num of body.prime) {
                if (isPrime(num)) {
                    output.push(num);
                }
            }
        }

        else if (Array.isArray(body.hcf) && body.hcf.length > 0) {
            if (!body.hcf.every(num => typeof num === "number")) {
                return res.status(400).json({ is_success: false, official_email: EMAIL });
            }

            output = body.hcf[0];
            for (let i = 1; i < body.hcf.length; i++) {
                output = hcf(output, body.hcf[i]);
            }
        }

        else if (Array.isArray(body.lcm) && body.lcm.length > 0) {
            if (!body.lcm.every(num => typeof num === "number")) {
                return res.status(400).json({ is_success: false, official_email: EMAIL });
            }

            output = body.lcm[0];
            for (let i = 1; i < body.lcm.length; i++) {
                output = lcm(output, body.lcm[i]);
            }
        }

        else if (typeof body.AI === "string" && body.AI.trim().length > 0) {
            output = await run(body.AI);
        }

        else {
            return res.status(400).json({
                is_success: false,
                official_email: EMAIL
            });
        }

        res.json({
            is_success: true,
            official_email: EMAIL,
            data: output
        });

    } catch (error) {
        console.error("Server Error:", error.message);

        res.status(500).json({
            is_success: false,
            official_email: EMAIL
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
