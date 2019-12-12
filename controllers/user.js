const User = require("../models/user")
const {errorHandler} = require('../helpers/dbErrorhandler')
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check

exports.signup = (req, res) =>{

  console.log(req.body);
  const user = new User(req.body);

  user.save((err, user)=>{
    if(err) return res.status(400).json({error: errorHandler(err)});

    user.salt = undefined;
    user.hashed_password = undefined;

    res.json({user}); 
  });

}

exports.signin = (req, res) =>{

  // find the user based on emaul
  const {email, password} = req.body
  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({error: `User with such email does not exist. Please sign-up.`});
    }

    // if found - make sure email and password match
    // create auth method in user model
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password dont match'
      })
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET)  

    // persist the token as 't'  on cookie with expiry date
    res.cookie('t', token, { expires: new Date(Date.now() + 900000), httpOnly: true });

    // return response with user amd token to FE
    const {_id, name, email, role} = user; // distruct this info 
    return res.json({token: token, user: {_id, name, email, role}});


  })

}

exports.signout = (req, res) =>{

  res.clearCookie('t');
  res.json({message: "signout success"});

}

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGYyNThlNmJmYmM1MDNhMTg4YTBjNzMiLCJpYXQiOjE1NzYxNzE5Mjh9.4IKaO_HS2D946MXCNJmSNx_HiipRFUrB6BeKkH_7g7Q",
//     "user": {
//         "_id": "5df258e6bfbc503a188a0c73",
//         "name": "vlad",
//         "email": "palii.work@gmail.com",
//         "role": 0
//     }
// }