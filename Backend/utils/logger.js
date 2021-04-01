const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const nodemailer = require("nodemailer");
let path = require("path");
let fs = require("fs");
const express = require('express')
const mongoose = require('mongoose')
const constants = require('../constants')
const apiErrorLogs = mongoose.model('apiErrorLogs')

let log = async(...args) => {
  try {
    console.log("...args[1].body",args[1].body)
    console.log("...args[1].headers",args[1].headers)
    console.log("...args[1].query",args[1].query)
    console.log("...args[1].params",args[1].params)
    console.log("args[0]",args[0])
    console.log("args[1].url",args[1].url)
    console.log("args[3]",args[3])
    console.log("JSON.stringify(args[1].headers.device_type)",JSON.stringify(args[1].headers.device_type))
    console.log("JSON.stringify(args[1].headers.device)",JSON.stringify(args[1].headers.device))
    console.log("userId",args[3])
    console.log("JSON.stringify(reqBody)",JSON.stringify(reqBody))
    console.log("JSON.stringify(res)",JSON.stringify(res))


    let reqBody = {...args[1].body, ...args[1].headers, ...args[1].query, ...args[1].params }
    
    console.log("reqBody",reqBody)
    if (constants.constants.is_debug) {
      let res = [];
      res.push(args[4]) 
     if (constants.constants.DEBUG_TYPE == "database") {
      let newData = new apiErrorLogs({
        apiName: args[0],
        apiUrl: args[1].url,
        deviceType: JSON.stringify(args[1].headers.device_type),
        device: JSON.stringify(args[1].headers.device),
        userId: args[3],
        requestBody: JSON.stringify(reqBody),
        responseBody: JSON.stringify(res)
    })
    newData.save()
      }
    }
  } catch (err) {
    console.log("err from looger.js",err)
  }

}

module.exports = {
  log
}