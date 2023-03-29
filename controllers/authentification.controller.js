const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.send({
      success: true,
      message: "Signed in successfully.",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email or password is incorrect.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).send({
        success: false,
        message: "Email or password is incorrect.",
      });
    }
    res.send({
      success: true,
      data: user,
      message: "Logged in successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  login,
  signin,
};
