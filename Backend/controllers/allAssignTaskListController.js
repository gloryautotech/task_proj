const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('../utils/common-helper')
const constants = require('../constants')
const logger = require('../utils/logger')
const allAssignTaskList = mongoose.model('allAssignTaskList')

let createAllAssignTaskList = (req, res) => {
    var today = Date.now()
    var questionlistId=[]
    if(req.body.questionListId){
    req.body.questionListId.forEach(element => {
        questionlistId.push({questionId: element.questionId})
    });
}

var answerlist = []
if(req.body.answer)
req.body.answer.forEach(element => {
    console.log("element",element)
    answerlist.push({ questionId: element.questionid, answer: element.answer })
});

    let newAssignTaskList = new allAssignTaskList({
        assignTaskUserListId: req.body.assignTaskUserListId,
        questionBankList: questionlistId,
        assignTaskId: req.body.assignTaskId,
        isSubmit: req.body.isSubmit,
        answer: answerlist,
        created: today,
        lasrModified: today
    })
    newAssignTaskList.save((err, result) => {
        if (err) {
            logger.log('createAllAssignTaskList',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.DATA_ADDED,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}


let allViewById = (req, res) => {
    console.log("req.body.id",req.body.id)
    allAssignTaskList.find({ 'assignTaskUserListId': { $in: req.body.id } }, (err, result) => {
        if (err) {
            logger.log('allViewById', req, err, req.body, res)
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
    console.log("req.params.id",req.params.id)
    allAssignTaskList.find({ '_id': req.params.id }, (err, result) => {
        if (err) {
            logger.log('allViewById', req, err, req.body, res)
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

let viewByAssignTaskUserListId = (req, res) => {
    allAssignTaskList.find({ 'assignTaskUserListId': req.params.id }, (err, result) => {
        if (err) {
            logger.log('viewByAssignTaskUserListId', req, err, req.body, res)
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

let editAllAssignTaskList = (req, res) => {
    let option = req.body
    console.log("option", option)
    allAssignTaskList.update({ '_id': req.params.id }, option, { multi: true }).exec((err, result) => {
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
    createAllAssignTaskList,
    viewByAssignTaskUserListId,
    allViewById,
    editAllAssignTaskList,
    viewById
}