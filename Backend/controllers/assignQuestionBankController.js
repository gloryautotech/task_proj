const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('../utils/common-helper')
const constants = require('../constants')
const logger = require('../utils/logger')
const assignQuestionList = mongoose.model('assignQuestionListSchema')
const questionBank = mongoose.model('questionBank')
//const questionBankOption = mongoose.model('questionBankOption')

let createAssignQuestionList = (req, res) => {
    var today = Date.now()
    var questionlistId=[]
    req.body.questionListId.forEach(element => {
        questionlistId.push({questionId: element.questionId})
    });

    let newQuestionBank = new assignQuestionList({
        assignUserEmail: req.body.assignEmail,
        questionBankList: questionlistId,
        assignBy: req.body.assignBy,
        created: today,
        lasrModified: today
    })
    newQuestionBank.save((err, result) => {
        if (err) {
            logger.log('createAssignQuestionList',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.DATA_ADDED,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}

let viewQuestionBankById = (req, res) => {
    assignQuestionList.find({ '_id': req.params.id }, (err, result) => {
        if (err) {
            logger.log('viewQuestionBankById',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else if (!result) {
            let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
            res.send(apiResponse)
        }
        else {
            let questionList = []
            result[0].questionBankList.forEach(element => {
                questionList.push(element.questionId)
            });
            console.log("questionList",questionList)
            questionBank.find({ '_id': { $in : questionList} }, (err, result) => {
                if (err) {
                    logger.log('viewByQuestionBankType',req, err,req.body,res)
                    let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
                    res.send(apiResponse)
                }
                else if (!result) {
                    let apiResponse = response.respons(true,constants.messages.NOT_FOUND,constants.constants.HTTP_SUCCESS,null)
                    res.send(apiResponse)
                }
                else {
                    console.log("resul of question",result)
                    let apiResponse = response.respons(true,constants.messages.SUCCESS,constants.constants.HTTP_SUCCESS,result)
                    res.send(apiResponse)
                }
            })

        }
    })
}


let viewAssignUserById = (req, res) => {
    assignQuestionList.find({ '_id': req.params.id }, (err, result) => {
        if (err) {
            logger.log('viewAssignUserById', req, err, req.body, res)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else if (!result) {
            let apiResponse = response.respons(true, constants.messages.NOT_FOUND, constants.constants.HTTP_SUCCESS, null)
            res.send(apiResponse)
        }
        else {
            console.log("resul of question", result)
            let apiResponse = response.respons(true, constants.messages.SUCCESS, constants.constants.HTTP_SUCCESS, result)
            res.send(apiResponse)
        }

    })
}

let viewAssignById = (req, res) => {
    assignQuestionList.find({ 'assignBy': req.params.id }, (err, result) => {
        if (err) {
            logger.log('viewAssignById', req, err, req.body, res)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else if (!result) {
            let apiResponse = response.respons(true, constants.messages.NOT_FOUND, constants.constants.HTTP_SUCCESS, null)
            res.send(apiResponse)
        }
        else {
            console.log("resul of question", result)
            let apiResponse = response.respons(true, constants.messages.SUCCESS, constants.constants.HTTP_SUCCESS, result)
            res.send(apiResponse)
        }

    })
}

let editassignQuestion = (req, res) => {
    let option = req.body
    console.log("option", option)
    assignQuestionList.update({ '_id': req.params.id }, option, { multi: true }).exec((err, result) => {
        if (err) {
            logger.log('editassignQuestion', req, err, req.body, res)
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
    createAssignQuestionList,
    viewQuestionBankById,
    viewAssignUserById,
    viewAssignById,
    editassignQuestion
}