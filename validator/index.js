exports.userSignupValidator = (req, res, next) => {
  req.check("name", 'Name is  required').notEmpty();
  req.check("email", "Email should be correct")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32
    });
    req.check("password", "Password is required").notEmpty();
    req.check("password")
      .isLength({min: 6})
      .withMessage("Password should contain at least 6 characters")
      .matches(/\d/)
      .withMessage("Password must contain a bumber");
    
      const errors = req.validationErrors();
      if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError});
      }
      next();
}