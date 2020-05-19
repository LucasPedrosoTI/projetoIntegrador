const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cookieLogin = require("./middlewares/cookieLogin");
const methodOverride = require("method-override");

const viewRouter = require("./routes/routes");
const usuarioRouter = require("./routes/usuarioRouter");

const app = express();

app.use("/public/stylesheets/", express.static("./public/stylesheets"));
app.use("/public/images/", express.static("./public/images"));
app.use("/public/javascripts/", express.static("./public/javascripts"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "projetoMeuPosto",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

// faz com que a session fique disponivel em todas as paginas
app.use(function (req, res, next) {
  res.locals.USUARIO = req.session.usuario;
  res.locals.error = null;
  res.locals.msg = null;
  res.locals.active = {
    cadastro: "",
    favoritos: "",
    avaliacoes: "",
  };

  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method")); //MIDDLEWARE PARA O USO DE METHOD OVERRIDE, REQUISIÇÕES PUT E DELETE
app.use(cookieLogin);

app.use("/", viewRouter);
app.use("/usuario", usuarioRouter);

// app.use('/users', usersRouter);
// app.use('/account', accountRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
