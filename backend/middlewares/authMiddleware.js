import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

//Protected Routes token base
export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ message: "No authorization header" });

    const token = authHeader.split(" ")[1];  // Remove "Bearer "
    if (!token) return res.status(401).send({ message: "Token missing" });

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};



//admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message:'Unauthrized Access'
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: 'Error in admin middleware'
        });
        
    }
}