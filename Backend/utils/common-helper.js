
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

let respons = (success,message,status,data) =>{
    let response ={
        success: success,
        message: message,
        status: status,
        data: data
    }
    return response
}

let createAccessToken = async(...args) => {
    let expiresIn = new Date().getTime();
    const userId = args[0];
    const fullName = args[1]
    let accessToken = jwt.sign({userId, fullName, expiresIn: expiresIn }, process.env.SECRET_KEY, { expiresIn: '365d' });
    console.log("token",accessToken)
    try {
          return accessToken;
      } catch (error) {
        console.log(error)
      }  
  };

module.exports = {
    respons,
    createAccessToken
}