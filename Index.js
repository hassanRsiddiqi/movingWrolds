require("@babel/register")({
  presets: [
    require.resolve("@babel/preset-env"),
    require.resolve("@babel/preset-react"),
  ],
  plugins: [
    [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
    [
      require.resolve("@babel/plugin-proposal-class-properties"),
      { loose: true },
    ],
  ],
  ignore: [/node_modules/],
});
require("@babel/polyfill");

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { default: database } = require("./config/database");
const { default: apiRoutes } = require("./routes/api");
const PORT = process.env.PORT || 5001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(passport.initialize());
database.setConnection();
require("./config/passport")(passport);

app.use("/api", apiRoutes);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
app.on("error", onError);
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
module.exports = app;
