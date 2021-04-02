module.exports = {
    checkAuthentication(req, res, next) {
      // console.log(req);
      // check if the user is logged in
      if (!req.isAuthenticated()) {
        return res.redirect("/users/login");
      }
      next();
    }
  };