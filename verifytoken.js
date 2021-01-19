const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(400).send('Access Denied');

    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err){
        res.status(400).send('Invalid Token')
    }
}

