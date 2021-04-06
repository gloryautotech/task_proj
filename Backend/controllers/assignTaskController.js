const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('../utils/common-helper')
const constants = require('../constants')
const logger = require('../utils/logger')
const assignTask = mongoose.model('assignTask')

let viewByuserId = (req, res) => {
    assignTask.find({ 'userId': req.params.userid }, (err, result) => {
        if (err) {
            logger.log('viewByuserId', req, err, req.body, res)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else if (result == undefined || result == null || result == '') {
            let apiResponse = response.respons(true, constants.messages.NOT_FOUND, constants.constants.HTTP_SUCCESS, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true, constants.messages.SUCCESS, constants.constants.HTTP_SUCCESS, result)
            res.send(apiResponse)
        }
    })
}

let createassignTaskList = (req, res) => {
    var today = Date.now()
    let newUserData = new assignTask({
        userId: req.body.userId,
        emailIdOfReceiver: req.body.emailIdOfReceiver,
        assignTaskId: req.body.assignTaskId,
        assignTaskStatus: req.body.assignTaskStatus,
        assignTaskVerifiedStatus: req.body.assignTaskVerifiedStatus,
        created: today,
        lasrModified: today
    })
    newUserData.save((err, result) => {
        if (err) {
            logger.log('createassignTaskList', req, err, req.body, res)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true, constants.messages.SUCCESS, constants.constants.HTTP_SUCCESS, result)
            res.send(apiResponse)
        }
    })
}

let editassignTask = (req, res) => {
    let option = req.body
    console.log("option", option)
    assignTask.update({ '_id': req.params.assignid }, option, { multi: true }).exec((err, result) => {
        if (err) {
            logger.log('editassignTask', req, err, req.body, res)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else if (result == undefined || result == null || result == '') {
            let apiResponse = response.respons(true, constants.messages.NOT_FOUND, constants.constants.HTTP_SUCCESS, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true, constants.messages.SUCCESS, constants.constants.HTTP_SUCCESS, result)
            res.send(apiResponse)
        }
    })
}

let viewByUserIdandTaskId = (req, res) => {
    console.log("UserId", req.body.userId)
    console.log("req.body.emailIdOfReceiver", req.body.emailIdOfReceiver)
    console.log(" req.body.assignTaskId", req.body.assignTaskId)
    console.log("constat", constants.constants.HTTP_SUCCESS)
    assignTask.find({ 'userId': req.body.userId }, async (err, result) => {
        console.log("result", result)
        if (err) {
            // logger.log('LoginCeck', req, err,  req.body.username, req.body)
            logger.log('viewByUserIdandTaskId', req, err, req.body, res)
            console.log("err", err)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else if (!result) {
            console.log("null iD")
            let apiResponse = response.respons(true, constants.messages.NOT_FOUND, constants.constants.HTTP_SUCCESS, null)
            res.send(apiResponse)
        }
        else {
            console.log("result", result)
            result.forEach(element => {
                console.log("element.emailIdOfReceiver", element.emailIdOfReceiver)
                if (element.emailIdOfReceiver == req.body.emailIdOfReceiver) {
                    if (err) {
                        logger.log('viewByUserIdandTaskId', req, err, req.body, res)
                        console.log("err", err)
                        let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
                        res.send(apiResponse)
                    }
                    else {
                        [element].forEach(element1 => {
                            console.log("element.assignTaskId", element1.assignTaskId)
                            if (element1.assignTaskId == req.body.assignTaskId) {
                                let apiResponse = response.respons(true, constants.messages.SUCCESS, constants.constants.HTTP_SUCCESS, element1)
                                res.send(apiResponse)
                            }
                            else {
                                console.log("element.assignTaskId else")
                                let apiResponse = response.respons(true, constants.messages.NOT_FOUND, constants.constants.HTTP_SUCCESS, null)
                                res.send(apiResponse)
                            }
                        });
                    }
                }
                else {
                    console.log("element.emailIdOfReceiver else")
                }
            });
        }
    })
}

let viewByEmailAndId = (req, res) => {
    console.log("emailIdOfReceiver", req.body.emailIdOfReceiver)
    console.log("constat",constants.constants.HTTP_SUCCESS)
    assignTask.find({ 'emailIdOfReceiver': req.body.emailIdOfReceiver },async(err, result) => {
        console.log("result",result)
        if (err) {
            // logger.log('LoginCeck', req, err,  req.body.username, req.body)
            logger.log('viewByEmailAndId',req, err,req.body,res)
            console.log("err",err)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else if (!result) {
            console.log("null emailIdOfReceiver")
            let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
            res.send(apiResponse)
        }
        else {
            result.forEach(element => {
                console.log("element",element)
                if (element.assignTaskId == req.body.taskid) {
                    console.log("element.taskid",element.taskid)
                    let apiResponse = response.respons(true, constants.messages.LOGIN.SUCCESS, constants.constants.HTTP_SUCCESS, element )
                    res.send(apiResponse)
                }
                else {
                    console.log("esle of assigntask")
                    // let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
                    // res.send(apiResponse)
                } 
            });
        }
    })
}

module.exports = {
    viewByuserId,
    createassignTaskList,
    editassignTask,
    viewByUserIdandTaskId,
    viewByEmailAndId
}
