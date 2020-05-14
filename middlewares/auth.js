function auth(req, res, next) {
  if (typeof req.session.usuario != "undefined") {
    console.log(req.session.usuario);
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = auth;
