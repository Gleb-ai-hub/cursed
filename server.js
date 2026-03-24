import dotenv from "dotenv";
dotenv.config();

import express from "express";
import OpenAI from "openai";
import cors from "cors";
import fs from "fs";

// ✅ СНАЧАЛА создаём app
const app = express();

// ✅ ПОТОМ используем
app.use(cors());
app.use(express.json());

// данные компании
const companyData = JSON.parse(fs.readFileSync("company.json", "utf-8"));

// OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API
app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;
  
    // ❗ проверка ключа
    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        reply: "AI временно недоступен. Пожалуйста, попробуйте позже."
      });
    }
  
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
  Ты помощник сайта.
  
  О компании:
  ${companyData.about}
  
  Услуги:
  ${companyData.services.join(", ")}
  `
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      });
  
      res.json({
        reply: response.choices[0].message.content
      });
  
    } catch (error) {
      console.error(error);
  
      res.json({
        reply: "Ошибка AI. Попробуйте позже."
      });
    }
  });

// 👉 СТАТИКА ПОСЛЕ API
app.use(express.static("public"));

// запуск
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
