const keccak256 = require("keccak256");
const User = require("../models/user.model");

module.exports = {
  get: async (req, res, next) => {
    const users = await User.find({});
    return res.json(users);
  },
  getDetail: async (req, res, next) => {
    let matchUser;
    try {
      const matchUser = await User.findById(req.params.id);
      if (!matchUser) throw "User not found";
    } catch (err) {
      return res
        .status(500)
        .json({ message: "An error occured", error: err.message });
    }
    return res.status(200).json({ message: "Successfully", user: matchUser });
  },
  edit: async (req, res, next) => {
    let matchUser;
    try {
      const matchUser = await User.findById(req.params.id);
      if (!matchUser) throw "User not found";
      if (req.body.firstName) matchUser.firstName = req.body.firstName;
      if (req.body.lastName) matchUser.lastName = req.body.lastName;
      if (req.body.mobile) matchUser.mobile = req.body.mobile;
      if (req.body.email) matchUser.email = req.body.email;
      // if(req.body.password) matchUser.password = req.body.password;
      if (req.body.intro) matchUser.intro = req.body.intro;
      if (req.body.profile) matchUser.profile = req.body.profile;
      matchUser.save();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "An error occured", error: err.message });
    }
    return res.status(200).json({ message: "Successfully", user: matchUser });
  },
};
