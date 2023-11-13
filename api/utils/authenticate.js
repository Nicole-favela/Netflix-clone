import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

function verifyToken(token) {
    
    try {
        console.log('in verify token', token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; //gets token from header
  
    if (!token) {//token not found
      return res.sendStatus(401);
    }
  
    const result =  verifyToken(token);
  
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
  
    req.user = result.data;
    next();
  }
  export default authenticateToken