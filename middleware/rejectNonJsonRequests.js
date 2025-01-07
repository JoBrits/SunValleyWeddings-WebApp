const rejectNonJsonRequests = async (req, res, next) => {
  try {
    const contentType = req.headers['content-type'];

      // Check if the Content-Type is application/json
    if (contentType && contentType.includes('json')) {
        next(); // Allow the request to proceed
    } else {
        res.status(415).json({ error: 'Unsupported Media Type: Only JSON is allowed' });
    }

  } catch (error) {
      // Handle any potential errors
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = rejectNonJsonRequests
