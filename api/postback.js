export default async function handler(req, res) {
  const { status, uid, payout } = req.query;

  if (!uid || !payout || !status) {
    return res.status(400).json({ message: 'Invalid request. Missing parameters.' });
  }

  // Check if this is a First Time Deposit (ftd) and that the payout meets minimum requirement
  if (status === 'ftd' && payout >= 12) {
    return res.status(200).json({ message: `Trader ID ${uid} verified. Access granted.` });
  } else {
    return res.status(200).json({ message: 'Trader not verified or deposit too low.' });
  }
}
