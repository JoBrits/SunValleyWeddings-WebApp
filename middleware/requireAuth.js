// Import Model
const User = require("../models/UserModel");
// Import JWT
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  // verify authentication
 const { authorization } = req.headers
 
  // check if authorization exists
  if(!authorization)  {
    return res.status(401).json({error: 'Authorization token required'})
  }

  // Split at space and get token
  const token = authorization.split(' ')[1]   

  try {
    // Use JWT to verify token and return _id
    const {_id} = jwt.verify(token, process.env.SECRET)
    // return correct user using _id
    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }    

};

module.exports = requireAuth
