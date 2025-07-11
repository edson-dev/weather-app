const jwt = require('jsonwebtoken');
import env from '../../config';
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    try{
        const token = authHeader.split(' ')[1];
        jwt.verify(token, env.SECRET)
        next();
    } catch (err) {
        console.log('JWT verification error:', err);
        return res.sendStatus(403, {error:'Invalid token'});
    }
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT;