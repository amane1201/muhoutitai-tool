const express = require("express");
const path = require("path");
const { Client } = require("linejs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", async (req, res) => {
    const { authToken } = req.body;

    if (!authToken) {
        return res.status(400).json({ error: "AuthTokenがありません" });
    }

    try {
        const client = new Client();

        await client.login({
            authToken: authToken
        });

        // 実際に使われているAuthTokenを取得
        const currentToken = client.auth.authToken;

        res.json({
            success: true,
            authToken: currentToken
        });

        await client.logout();
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} で起動中`);
});
