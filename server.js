const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/ask", async (req, res) => {
  const question = req.body.question;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "⚠️ No response";
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "⚠️ API error occurred." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
