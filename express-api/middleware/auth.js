const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== 'your_api_key') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

module.exports = { authenticate };
