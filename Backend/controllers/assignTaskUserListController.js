const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('../utils/common-helper')
const constants = require('../constants')
const logger = require('../utils/logger')
const assignTaskUserList = mongoose.model('assignTaskUserList')

let createAssignTaskUserList = (req, res) => {
    var today = Date.now()

    let newAssignTaskUserList = new assignTaskUserList({
        assignUserEmail: req.body.assignUserEmail,
        assignBy: req.body.assignBy,
        created: today,
        lasrModified: today
    })
    newAssignTaskUserList.save((err, result) => {
        if (err) {
            logger.log('createAssignTaskUserList',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.DATA_ADDED,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}


let viewById = (req, res) => {
    assignTaskUserList.find({ '_id': req.params.id }, (err, result) => {
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

let viewByAssignUserEmail = (req, res) => {
    assignTaskUserList.find({ 'assignUserEmail': req.params.email }, (err, result) => {
        if (err) {
            logger.log('viewByAssignUserEmail', req, err, req.body, res)
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

let viewByAssignByEmail = (req, res) => {
    assignTaskUserList.find({$and: [{"assignUserEmail":req.body.assignUserEmail},{"assignBy":req.body.assignBy}] }, (err, result) => {
        if (err) {
            logger.log('viewByAssignByEmail', req, err, req.body, res)
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


let editAssignTaskUserList = (req, res) => {
    let option = req.body
    console.log("option", option)
    assignTaskUserList.update({ '_id': req.params.id }, option, { multi: true }).exec((err, result) => {
        if (err) {
            logger.log('editAllAssignTaskList', req, err, req.body, res)
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

module.exports = {
    createAssignTaskUserList,
    viewByAssignByEmail,
    viewById,
    editAssignTaskUserList,
    viewByAssignUserEmail
}