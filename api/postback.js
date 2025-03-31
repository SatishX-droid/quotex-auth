export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { status, uid, payout } = req.query;
    
    if (status !== "ftd" || parseFloat(payout) < 12) {
        return res.status(400).json({ error: "Trader not eligible" });
    }

    // Forward trader ID to Telegram bot
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: `✅ Approved Trader ID: ${uid}\nDeposit: $${payout}`,
            }),
        });

        return res.status(200).json({ success: true, message: "Trader verified and notified." });

    } catch (error) {
        return res.status(500).json({ error: "Failed to send Telegram notification" });
    }
}
