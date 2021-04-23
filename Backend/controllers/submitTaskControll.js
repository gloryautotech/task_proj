const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('../utils/common-helper')
const constants = require('../constants')
const logger = require('../utils/logger')
const submitTask = mongoose.model('submitTaskSchema')

let viewByAssignTaskId = (req, res) => {
    submitTask.find({ 'assignTaskId': req.params.id }, (err, result) => {
        if (err) {
            logger.log('viewByAssignTaskId', req, err, req.body, res)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else if (!result) {
            let apiResponse = response.respons(true, constants.messages.NOT_FOUND, constants.constants.HTTP_SUCCESS, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true, constants.messages.SUCCESS, constants.constants.HTTP_SUCCESS, result)
            res.send(apiResponse)
        }
    })
}

let viewById = (req, res) => {
    submitTask.find({ '_id': req.params.id }, (err, result) => {
        if (err) {
            logger.log('viewById', req, err, req.body, res)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else if (!result) {
            let apiResponse = response.respons(true, constants.messages.NOT_FOUND, constants.constants.HTTP_SUCCESS, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true, constants.messages.SUCCESS, constants.constants.HTTP_SUCCESS, result)
            res.send(apiResponse)
        }
    })
}

let createSubmitTaskList = (req, res) => {
    var today = Date.now()
    let newSubmitTask = new submitTask({
        assignTaskId: req.body.assignTaskId,
        AnswerList: req.body.AnswerList,
        created: today,
        lasrModified: today
    })
    newSubmitTask.save((err, result) => {
        if (err) {
            logger.log('createSubmitTaskList', req, err, req.body, res)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true, constants.messages.DATA_ADDED, constants.constants.HTTP_SUCCESS, result)
            res.send(apiResponse)
        }
    })
}



module.exports = {
    viewByAssignTaskId,
    viewById,
    createSubmitTaskList
}
