const express = require("express");
const path = require("path");
const { LineClient } = require("@evex/linejs-client");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", async (req, res) => {
    const { authToken } = req.body;

    if (!authToken) {
        return res.status(400).json({ error: "AuthTokenがありません" });
    }

    try {
        const client = new LineClient({
            authToken
        });

        await client.login();

        res.json({
            success: true,
            authToken: client.authToken
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
    console.log(`Server running on port ${PORT}`);
});