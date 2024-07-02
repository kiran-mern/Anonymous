const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // console.log(req.headers);
    const token = req.headers.authorization || req.body;
    console.log("auth",token);
  
    if (token.token == null) return res.sendStatus(400);
  
    jwt.verify(token.token, process.env.secret_key, async(err, user) => {
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