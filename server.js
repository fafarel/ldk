require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

// Servez les fichiers statiques (index.html, etc.)
app.use(express.static(__dirname));

// ---------- MTN MoMo (Collections) ----------
// Env requis: MOMO_BASE_URL, MOMO_SUBSCRIPTION_KEY, MOMO_API_USER_ID, MOMO_API_KEY, MOMO_TARGET_ENV
async function getMtnAccessToken() {
    const baseUrl = process.env.MOMO_BASE_URL;
    const subscriptionKey = process.env.MOMO_SUBSCRIPTION_KEY;
    const apiUserId = process.env.MOMO_API_USER_ID;
    const apiKey = process.env.MOMO_API_KEY;
    if (!baseUrl || !subscriptionKey || !apiUserId || !apiKey) {
        throw new Error('Configuration MTN MoMo incomplète');
    }
    const basicAuth = Buffer.from(`${apiUserId}:${apiKey}`).toString('base64');
    const url = `${baseUrl}/collection/token`;
    const res = await axios.post(url, null, {
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    });
    return res.data.access_token;
}

app.post('/api/payments/mtn/initiate', async (req, res) => {
    try {
        const { amount, currency = 'XOF', phone, payerMessage = 'LDK Billets', payeeNote = 'Paiement LDK' } = req.body || {};
        if (!amount || !phone) {
            return res.status(400).json({ error: 'amount et phone sont requis' });
        }
        const baseUrl = process.env.MOMO_BASE_URL;
        const subscriptionKey = process.env.MOMO_SUBSCRIPTION_KEY;
        const targetEnv = process.env.MOMO_TARGET_ENV || 'sandbox';

        const accessToken = await getMtnAccessToken();
        const referenceId = uuidv4();
        await axios.post(`${baseUrl}/collection/v1_0/requesttopay`, {
            amount: String(amount),
            currency,
            externalId: referenceId,
            payer: { partyIdType: 'MSISDN', partyId: String(phone) },
            payerMessage,
            payeeNote
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Reference-Id': referenceId,
                'X-Target-Environment': targetEnv,
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/json'
            }
        });
        res.json({ referenceId, status: 'pending' });
    } catch (err) {
        const status = err.response?.status || 500;
        res.status(status).json({ error: 'initiate_failed', details: err.response?.data || err.message });
    }
});

app.get('/api/payments/mtn/status/:referenceId', async (req, res) => {
    try {
        const { referenceId } = req.params;
        const baseUrl = process.env.MOMO_BASE_URL;
        const subscriptionKey = process.env.MOMO_SUBSCRIPTION_KEY;
        const targetEnv = process.env.MOMO_TARGET_ENV || 'sandbox';
        const accessToken = await getMtnAccessToken();
        const resp = await axios.get(`${baseUrl}/collection/v1_0/requesttopay/${referenceId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Target-Environment': targetEnv,
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        });
        res.json(resp.data);
    } catch (err) {
        const status = err.response?.status || 500;
        res.status(status).json({ error: 'status_failed', details: err.response?.data || err.message });
    }
});

// ---------- Wave Checkout ----------
// Env requis: WAVE_BASE_URL (par défaut https://api.wave.com/v1), WAVE_SECRET_KEY, APP_PUBLIC_BASE_URL
app.post('/api/payments/wave/initiate', async (req, res) => {
    try {
        const { amount, currency = 'XOF', clientReference } = req.body || {};
        if (!amount) {
            return res.status(400).json({ error: 'amount est requis' });
        }
        const baseUrl = process.env.WAVE_BASE_URL || 'https://api.wave.com/v1';
        const secretKey = process.env.WAVE_SECRET_KEY;
        const publicBase = process.env.APP_PUBLIC_BASE_URL || 'http://localhost:3000';
        if (!secretKey) {
            return res.status(500).json({ error: 'Configuration Wave manquante' });
        }
        const resp = await axios.post(`${baseUrl}/checkout/sessions`, {
            amount: { amount: Number(amount), currency },
            client_reference: clientReference || uuidv4(),
            success_url: `${publicBase}/?payment=success`,
            cancel_url: `${publicBase}/?payment=cancel`
        }, {
            headers: { 'Authorization': `Bearer ${secretKey}` }
        });
        res.json(resp.data);
    } catch (err) {
        const status = err.response?.status || 500;
        res.status(status).json({ error: 'wave_initiate_failed', details: err.response?.data || err.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`LDK API server écoute sur http://localhost:${port}`));




