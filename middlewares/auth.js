function user(req, res, next) {
  if (req.session.usuario) {
    // console.log(req.session.usuario);
    return next();
  } else if (req.session.posto) {
    res.redirect("/posto/dashboard");
  } else {
    res.redirect("/login");
  }
}

function posto(req, res, next) {
  if (req.session.posto) {
    // console.log(req.session.usuario);
    return next();
  } else if (req.session.usuario) {
    res.redirect("/usuario/dashboard");
  } else {
    res.redirect("/login");
  }
}

module.exports = { user, posto };
