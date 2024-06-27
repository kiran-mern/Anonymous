const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // console.log(req.headers);
    const token = req.headers.authorization;
    console.log("auth",token);
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.secret_key, (err, user) => {
      if (err) 
      return res.sendStatus(403);
  
      req.user = user;
      if(req.user.email && req.user.role==='user'){
                console.log('ab',req.user);
      
             next();
          }
    });
  }

  module.exports= authenticateToken;