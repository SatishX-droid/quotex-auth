import fetch from 'node-fetch';
const fetch = require('node-fetch');
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { traderId } = req.body;

    // Validate Trader ID format (8-digit number)
    if (!/^\d{8}$/.test(traderId)) {
        return res.status(400).json({ message: 'Invalid Trader ID format' });
    }

    const TELEGRAM_BOT_TOKEN = '7481129580:AAEMnnKtwTHTzNGXvQjdjXJCwGi2DfrquTg';
    const QUOTEX_PARTNER_BOT = '@QuotexPartnerBot';
    const TELEGRAM_CHAT_ID = '1470722894'; // Your Telegram Chat ID

    try {
        // Send Trader ID to @QuotexPartnerBot through your bot
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: traderId
            }),
        });

        // Wait for response (simulate delay for now, ideally use webhook)
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Check if the user is verified (replace this with actual Telegram API response handling)
        const isValid = await checkPostbackStatus(traderId);

        if (isValid) {
            return res.status(200).json({ message: 'Access Granted' });
        } else {
            return res.status(401).json({ message: 'Invalid Trader ID' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Simulated function to check postback status
async function checkPostbackStatus(traderId) {
    // Here, you should check your Vercel postback endpoint for verification
    const response = await fetch(`https://trade-with-google.vercel.app/api/postback.php?uid=${traderId}`);
    const data = await response.json();
    return data.verified === true; // Replace this with actual logic
}
