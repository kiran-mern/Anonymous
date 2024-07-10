const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // console.log(req);
    const token = req.headers.authorization || req.headers.token;
    console.log("auth",token);
  
    if (token == null) return res.sendStatus(400);
  
    jwt.verify(token, process.env.secret_key, async(err, user) => {
      if (err) {
        console.log(err);

        return res.sendStatus(400);
      }
  
      req.user = user;
      console.log(user);
      if(req.user.email && req.user.role==='user'){
                console.log('ab',req.user);
      
             next();
          }
    });
  }

  module.exports= authenticateToken;