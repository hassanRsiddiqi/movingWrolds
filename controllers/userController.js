import User from "../models/Users";
const jwt = require("jsonwebtoken");

const httpResponses = {
  onValidationError: {
    success: false,
    message: "Please enter email and password.",
  },
  onUserSaveError: {
    success: false,
    message: "That email address already exists.",
  },
  onUserSaveSuccess: {
    success: true,
    message: "Successfully created new user.",
  },
  onUserNotFound: {
    success: false,
    message: "User not found.",
  },
  onAuthenticationFail: {
    success: false,
    message: "Passwords did not match.",
  },
};

// Register new users
const signUp = async (request, response) => {
  let { email, password } = request.body;
  if (!email || !password) {
    return response.json(httpResponses.onValidationError);
  }
  let newUser = new User({
    email: email,
    password: password,
  });
  newUser.save((error) => {
    if (error) {
      return response.json(httpResponses.onUserSaveError);
    }
    response.json(httpResponses.onUserSaveSuccess);
  });
};

const signIn = async (request, response) => {
  let { email, password } = request.body;

  User.findOne(
    {
      email: email,
    },
    function (error, user) {
      if (error) throw error;
      if (!user) {
        return response.send(httpResponse.onUserNotFound);
      }
      // Check if password matches
      user.comparePassword(password, function (error, isMatch) {
        if (isMatch && !error) {
          var token = jwt.sign(
            user.toJSON(),
            'A!@#$%^&*()qwertyuiopzxcvbnm,./}{:">?><',
            {
              expiresIn: 10080,
            }
          );

          return response.json({
            success: true,
            token: "JWT " + token,
            userId: user._id,
          });
        }
        response.send(httpResponse.onAuthenticationFail);
      });
    }
  );
};

export default {
  signUp,
  signIn,
};
