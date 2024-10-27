const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Product = require("../models/productModel");

// Register a user
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 2);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Authenticate user
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({
          token,
          userInfo: { name: user.name, role: user.role, email: user.email },
          message: "login Succesfully",
        });
      } else {
        return res.json({ token, message: "worng password" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.addCart = async (req, res) => {
  const id = req.body.userId;
  const { productId, price, quantity } = req.body;
  const userData = await User.findOne({
    _id: id,
  });

  let inCart = false;

  for (let cProduct of userData.cart) {
    if (cProduct.productId == productId) {
      inCart = true;
      cProduct.quantity += quantity;
      cProduct.price += quantity + price;
      break;
    }
  }
  if (!inCart) {
    userData.cart.push(req.body);
  }
  userData.save();
  return res.status(201).json({ message: "add to cart" });
};

exports.authUser = async (req, res) => {
  const user = await User.findOne(
    { _id: req.body.userId },
    { name: 1, role: 1, email: 1 }
  );
  return res.status(201).json({ user });
};

exports.cart = async (req, res) => {
  const { cart } = await User.findOne({ _id: req.body.userId }).populate({
    path: "cart.productId",
    model: "Product",
    select: "name price imgUrl discount brand",
  });
  let total = 0;
  const cartList = [];
  for (let data of cart) {
    total += data.price;
  }
  return res.json({ cartList: cart, total });
};
