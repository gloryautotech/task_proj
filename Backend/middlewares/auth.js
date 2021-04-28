var jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const mongoose = require('mongoose')
const constants = require('../constants')
const userDataModel = mongoose.model('userData')


let isAuthenticated = (req, res, next) => {
  console.log("heder", req.headers['user-agent'])
  let accessToken = req.headers.token;
  let deviceType = req.headers['User-Agent'];
  if (accessToken) {
    jwt.verify(accessToken, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(constants.constants.INVALID_TOKEN).send({
          status: false,
          message: constants.messages.INVALID_TOKEN,
          code: constants.constants.INVALID_TOKEN
        });
      } else {
        req.decoded = decoded;
        console.log("req.decoded", req.decoded)
        let userInfo = await userDataModel.find({
          "_id": req.decoded.userId
        });
        console.log("user info", userInfo)
        if (userInfo.length > 0) {
          next();
        }
        else {
          res.status(constants.constants.INVALID_TOKEN).send({
            status: false,
            message: constants.messages.INVALID_TOKEN,
            code: constants.constants.INVALID_TOKEN
          })
        }
      }
    })
  } else {
    res.status(constants.constants.HTTP_FORBIDDEN).send({
      status: false,
      message: constants.messages.SEND_TOKEN
    });
  }

}

module.exports = {
  isAuthenticated
}