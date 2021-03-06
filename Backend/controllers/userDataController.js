require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const response = require('../utils/common-helper')
const constants = require('../constants')
const logger = require('../utils/logger')
const userDataModel = mongoose.model('userData')

const crypto = require('crypto');
const smsKey = process.env.SMS_SECRET_KEY;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;

var nodemailer = require('nodemailer');

let getUserAllData = (req, res) => {
    userDataModel.find()
        .exec((err, result) => {
            if (err) {
                logger.log('getUserAllData',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
            }
            else if (result == undefined || result == null || result == '') {
                let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
                res.send(apiResponse)
            }
            else {
                let apiResponse = response.respons(true,constants.messages.SUCCESS,constants.constants.HTTP_SUCCESS,result)
                res.send(apiResponse)
            }
        })

}
let viewById = (req, res) => {
    var v = req.params.userId;
    console.log(v)
    userDataModel.findOne({ '_id': req.params.userId }, (err, result) => {
        if (err) {
            logger.log('viewById',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
                res.send(apiResponse)
        }
        else if (result == undefined || result == null || result == '') {
            let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.SUCCESS,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}

let viewByUserName = (req, res) => {
    var v = req.params.userId;
    console.log(v)
    console.log("username",req.params.username)
    userDataModel.find({ $or:[{'email':req.params.username}, {'phone':req.params.username} ]}, (err, result) => {
        if (err) {
            logger.log('viewByUserName',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
                res.send(apiResponse)
        }
        else if (result == undefined || result == null || result == '') {
            let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
                res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.SUCCESS,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}

let createUserData = (req, res) => {
    var today = Date.now()
    let newUserData = new userDataModel({
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        gender: req.body.gender,
        userType: req.body.userType,
        dateOfBirth: req.body.dateOfBirth,
        organizationName: req.body.organizationName,
        created: today,
        lasrModified: today
    })
    //.select('-_id -__v')
    newUserData.save(async(err, result) => {
        if (err) {
            logger.log('createUserData',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else {
            console.log("new user data result", result)
            let accessToken = await response.createAccessToken(result._id , result.userFirstName, req.models); 
            console.log("accestoken",accessToken)
            accessToken = {"accessToken":accessToken}
            result = {result,accessToken}
            let apiResponse = response.respons(true,constants.messages.DATA_ADDED,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}

let createIdPassword = (req, res) => {
    var today = Date.now()
    let newUserData = new userDataModel({
        email: req.body.email,
        password: req.body.password,
        userType: "user",
        created: today,
        lasrModified: today
    })
    //.select('-_id -__v')
    newUserData.save(async(err, result) => {
        if (err) {
            logger.log('createIdPassword',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else {
            console.log("new user data result", result)
            let apiResponse = response.respons(true,constants.messages.DATA_ADDED,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}

let viewByUserTypeEmail = (req, res) => {
    var v = req.params.userId;
    console.log(v)
    console.log("username",req.params.username)
    userDataModel.find({ $and :[{'email':req.params.username}, {'userType': 'user'} ]}, (err, result) => {
        if (err) {
            logger.log('viewByUserTypeEmail',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
                res.send(apiResponse)
        }
        else if (!result) {
            let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
                res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.SUCCESS,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}

let editUserData = (req, res) => {
    let option = req.body
    console.log("option", option)
    userDataModel.update({ '_id': req.params.userId }, option, { multi: true }).exec((err, result) => {
        if (err) {
            logger.log('editUserData',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else if (result == undefined || result == null || result == '') {
            let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.SUCCESS,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}


let deleteUserNameById = (req, res) => {
    userDataModel.remove({'_id': req.params.userId}, (err, result) => {
        if (err) {
            logger.log('deleteUserNameById',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
                res.send(apiResponse)
        }
        else if (result == undefined || result == null || result == '') {
            let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.SUCCESS,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}

//login check
let loginCheck = (req, res) => {
    console.log("username", req.body.username)
    console.log("constat",constants.constants.HTTP_SUCCESS)
    userDataModel.find({ $and: [{$or: [{ 'email': req.body.username }, { 'phone': req.body.username }]},{'password': req.body.password}] },async(err, result) => {
        console.log("result",result)
        if (err) {
            // logger.log('LoginCeck', req, err,  req.body.username, req.body)
            logger.log('LoginCeck',req, err,req.body,res)
            console.log("err",err)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else if (result.length<=0) {
            console.log("null username")
            let apiResponse = response.respons(true,constants.messages.LOGIN.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
            res.send(apiResponse)
        }
        else {
            console.log("result._id",result[0]._id)
                let accessToken = await response.createAccessToken(result[0]._id , result[0].userFirstName, req.models); 
				console.log("accestoken",accessToken)
                logger.log('LoginCeck',req, result, req.body.username,req.body)
                accessToken = {"accessToken":accessToken}
                result = {result,accessToken}
                let apiResponse = response.respons(true, constants.messages.LOGIN.SUCCESS, constants.constants.HTTP_SUCCESS, result )
                res.send(apiResponse)
        }
    })
}

let sendOTP = (req, res) => {
	const username = req.body.username;
	const otp = Math.floor(100000 + Math.random() * 900000);
	const ttl = 2 * 60 * 1000;
	const expires = Date.now() + ttl;
    const data = `${username}.${otp}.${expires}`;
	const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	const fullHash = `${hash}.${expires}`;
	var type = /^[0-9\+\ ]+$/;

	if(type.test(username)){
		console.log("number otp")
		client.messages
		    .create({
			    body: `Your One Time Login Password For Task is ${otp}`,
			    from: twilioNum,
			    to: username
		    })
		    .then((messages) => console.log(messages))
		    .catch((err) => console.error(err));
	}else{
		console.log("Email otp")
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: '180013107012@adit.ac.in',
		  pass: '7567561179vidhi'
		}
	  });

	var mailOptions = {
		from: '180013107012@adit.ac.in',
		to: username,
		subject: 'OTP of Task',
		text: `Your One Time Login Password For Task is ${otp}`        
	  };

	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  })
	}
	

	res.status(200).send({ username, hash: fullHash });          // Use this way in Production
}

let verifyOTP = (req, res) => {
	console.log("req.body",req.body)
	const username = req.body.username;
	const hash = req.body.hash;
	const otp = req.body.otp;
	let [ hashValue, expires ] = hash.split('.');


	let now = Date.now();	
	if (now > parseInt(expires)) {
		return res.status(504).send({ msg: 'Timeout. Please try again' });
	}
    let data = `${username}.${otp}.${expires}`;
	let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	if (newCalculatedHash === hashValue) {
		console.log('user confirmed');
		res.status(202).send({ verification: true, msg: 'User Confirmed' })
	} else {
		console.log('not authenticated');
		return res.status(400).send({ verification: false, msg: 'Incorrect OTP' });
	}
}

module.exports = {
    getUserAllData,
    viewById,
    createUserData,
    createIdPassword,
    editUserData,
    viewByUserName,
    deleteUserNameById,
    loginCheck,
    sendOTP,
    verifyOTP,
    viewByUserTypeEmail
}