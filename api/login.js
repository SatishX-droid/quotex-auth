export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { traderId } = req.body;
    const validTraderIdPattern = /^\d{8}$/;

    if (!validTraderIdPattern.test(traderId)) {
      return res.status(400).json({ message: 'Invalid Trader ID format. Must be 8 digits.' });
    }

    try {
      // Simulate forwarding traderId to @QuotexPartnerBot and getting response
      // This is just for demonstration; replace with actual logic
      const response = { isValid: true };  // Simulate successful response

      if (response.isValid) {
        return res.status(200).json({ message: 'Trader ID is valid!' });
      } else {
        return res.status(400).json({ message: 'Invalid Trader ID' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error. Try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
