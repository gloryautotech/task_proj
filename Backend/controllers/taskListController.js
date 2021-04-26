const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const taskList = mongoose.model('taskList')
const constants = require('../constants')
const logger = require('../utils/logger')
const response = require('../utils/common-helper')

let getAllTaskList = (req, res) => {
    taskList.find()
        .exec((err, result) => {
            if (err) {
                logger.log('getAllTaskList',req, err,req.body,res)
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

let editTaskList = (req, res) => {
    let option = req.body
    console.log("option", option)
    taskList.update({ '_id': req.params.taskListId }, option, { multi: true }).exec((err, result) => {
        if (err) {
            logger.log('editTaskList',req, err,req.body,res)
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

let viewBytechnologyListId = (req, res) => {
    taskList.find({ 'technologyListId': req.params.technologylistid }, (err, result) => {
        if (err) {
            logger.log('viewBytechnologyListId',req, err,req.body,res)
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

let viewBytaskId = (req, res) => {
    taskList.find({ '_id': req.params.taskid }, (err, result) => {
        if (err) {
            logger.log('viewBytaskId',req, err,req.body,res)
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

let createTaskList = (req, res) => {
    var today = Date.now()
    let newUserData = new taskList({
        technologyListId: req.body.technologyListId,
        taskName: req.body.taskName,
        tasDescription: req.body.tasDescription,
        taskType: req.body.taskType,
        created: today,
        lasrModified: today
    })
    newUserData.save((err, result) => {
        if (err) {
            logger.log('createTaskList',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.DATA_ADDED,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}

let deleteTaskById = (req, res) => {
    taskList.remove({'_id': req.params.taskListId}, (err, result) => {
        if (err) {
            logger.log('deleteTaskById',req, err,req.body,res)
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

module.exports = {
    createTaskList,
    getAllTaskList,
    editTaskList,
    viewBytechnologyListId,
    deleteTaskById,
    viewBytaskId
}