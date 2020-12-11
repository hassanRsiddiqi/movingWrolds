import { nanoid } from "nanoid";
import Url from "../models/Url";
import User from "../models/Users";

const httpResponses = {
  onURLNotFound: {
    success: false,
    message: "Please enter URL.",
  },
  onUserIdNotFound: {
    success: false,
    message: "Please enter User Id.",
  },
  UrlNotFound: {
    success: false,
    message: "URL not found.",
  },
  onUserSaveError: {
    success: false,
    message: "URl already exists.",
  },
  onUserSaveSuccess: {
    success: true,
    message: "Successfully associated.",
  },
  onUserNotFound: {
    success: false,
    message: "Invalid User Id.",
  },
  somethingWrong: {
    success: false,
    message: "Something went wrong.",
  },
};
const create = async (request, response) => {
  try {
    let mongoose = require("mongoose");
    let { url, newUrl, userId } = request.body;
    if (!url) {
      return response.json(httpResponses.onURLNotFound);
    }
    if (!userId) {
      return response.json(httpResponses.onUserIdNotFound);
    }
    User.findOne(
      {
        _id: userId,
      },
      function (error, user) {
        if (error) throw error;
        if (!user) {
          return response.send(httpResponse.onUserNotFound);
        }
      }
    );
    let createURL = new Url({
      originalURL: url,
      shortURL: newUrl || nanoid(6),
      userId: mongoose.Types.ObjectId(userId),
    });
    createURL.save((error) => {
      if (error) {
        return response.json(httpResponses.onUserSaveError);
      }
      response.json({
        ...httpResponses.onUserSaveSuccess,
        ...{ shortURL: createURL.shortURL },
      });
    });
  } catch (e) {
    return response.send(httpResponses.somethingWrong);
  }
};
const get = async (request, response) => {
  try {
    let { url } = request.params;
    let getURL = await Url.findOne({
      shortURL: url,
    });
    await Url.updateOne({ _id: getURL._id }, { $inc: { count: 1 } });
    console.log(getURL);
    response.status(301).redirect(getURL["originalURL"]);
  } catch (e) {
    return response.send(httpResponses.somethingWrong);
  }
};
const getStats = async (request, response) => {
  try {
    let { url } = request.params;
    let getURL = await Url.findOne({
      shortURL: url,
    });
    response.json({
      "Original URL": getURL["originalURL"],
      "Total Views": getURL["count"],
    });
  } catch (e) {
    return response.send(httpResponses.somethingWrong);
  }
};
export default {
  create,
  get,
  getStats,
};
