var jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const mongoose = require('mongoose')
const constants = require('../constants')
const userDataModel = mongoose.model('userData')


let isAuthenticated = (req, res, next) => {
  console.log("heder",req.headers['device_type'])
  let accessToken = req.headers.token;
  let deviceType = req.headers['device_type'];
  if (accessToken) {
    jwt.verify(accessToken, process.env.SECRET_KEY, async(err, decoded) => {
      if (err) {
        return res.status(constants.constants.INVALID_TOKEN).send({
          status: false,
          message: constants.messages.INVALID_TOKEN,
          code: constants.constants.INVALID_TOKEN
        });
      } else {
        req.decoded = decoded;
        let userInfo = await userDataModel.find({
          attributes:["userFirstName", "userId"],
          where: {
            id: req.decoded.userId,
            isDeleted: {
              [Op.ne]: constants.IS_DELETED
            }
          }          
        });
        console.log("user info",userInfo)
        userInfo = JSON.parse(JSON.stringify(userInfo, null, 4));
         if(userInfo.status){
            req.decoded.status = userInfo.status;
          }
        next();
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