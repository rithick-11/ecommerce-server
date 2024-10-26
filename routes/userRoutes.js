const express = require("express");
const {
  signUp,
  signIn,
  addCart,
  cart,
  authUser,
} = require("../controllers/userControllers");
const { authorization } = require("../middlewares/authorization");
const router = express.Router();

router.get("/authentication", authorization, authUser);
router.post("/create-user", signUp);
router.post("/login", signIn);
router.post("/addCard", authorization, addCart);
router.get("/cart", authorization, cart);

module.exports = router;
