import { Router } from "express";
import user from "../controllers/userController";
import url from "../controllers/urlController";
const passport = require("passport");

const router = Router();
var cors = require("cors");
router.use(cors({ origin: "http://localhost:5001" }));
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/user/signup", user.signUp);
router.post("/user/signin", user.signIn);
router.post(
  "/url/create",
  passport.authenticate("jwt", { session: false }),
  url.create
);
router.get("/:url", url.get);
router.get("/:url/stats", url.getStats);

export default router;
