import jwt from "jsonwebtoken";

export const IsAuthorized = (req, res, next) => {
    const jj = req.cookies.jwt;
    if (!jj) {
      return res.status(401).json({ error:'user is not authorized' });
    }
  
    jwt.verify(jj, 'dont_share_token', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
     req.user = decoded;
      next();
    });
  };
  