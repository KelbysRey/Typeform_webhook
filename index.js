const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/webhook', (req, res) => {
    const data = req.body;

    // Načtení hodnot A a B z Typeformu
    const A = parseInt(data.form_response.answers[0].number);
    const B = parseInt(data.form_response.answers[1].number);

    // Výpočet @odsun
    const odsun = (A / 2) + 400;

    // Porovnání hodnot
    if (B < odsun) {
        return res.json({
            status: "error",
            message: `Prostor pro odsunutí je nedostatečný. Potřebujete alespoň ${odsun} mm.`
        });
    } else {
        return res.json({
            status: "success",
            message: `Prostor pro odsunutí je dostatečný (${B} mm >= ${odsun} mm).`
        });
    }
});

// Spuštění serveru
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
