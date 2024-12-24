const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;
const secretKey = process.env.RECAPTCHA_SECRET_KEY;

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.post('/submit', (req, res) => {

    const params = new URLSearchParams({
        secret: secretKey,
        response: req.body['g-recaptcha-response'],
        remoteip: req.ip,
    });
    fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body: params,
    }
    )
    .then(response => response.json())
    .then(data => {
            if (data.success) {
                res.json({ captchaSuccess: true });
            } else {
                res.json({ captchaSuccess: false });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.listen(port, () => {
    console.log(`Server started on https://dusanqaportfolio.com`);
});