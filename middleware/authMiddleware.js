const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    console.log("Checking authentication for user:", req.user);

    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        req.flash && req.flash('error', 'You must be logged in to access this page');
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("JWT verification failed:", err);
        req.flash && req.flash('error', 'You must be logged in to access this page');
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = { isAuthenticated };