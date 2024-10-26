const jwt = require("jsonwebtoken");

exports.authorization = async (req, res, next) => {
  const tokenIsAvailable = req.headers.authorization;
  if(tokenIsAvailable === undefined){
    return res.status(201).json({message: "token not added in request"})
  }
  const token = tokenIsAvailable.split(" ")[1]
  if (token !== undefined) {
    try {
      const data = await jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = data.id;
      next();
    } catch (err) {
        return res.status(401).json({ message: "invalid token" }); 
    }
  } else {
    return res.status(401).json({ message: "need token" });
  }
};
