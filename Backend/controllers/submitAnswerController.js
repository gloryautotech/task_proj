const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('../utils/common-helper')
const constants = require('../constants')
const logger = require('../utils/logger')
const submitAnswerList = mongoose.model('submitAnswerSchema')

let createSubmitAnswerList = (req, res) => {
    console.log("req.body",req.body)
    var today = Date.now()
    var answerlist = []
    req.body.answerBanklist.forEach(element => {
        console.log("element",element)
        answerlist.push({ questionId: element.questionid, answer: element.answer })
    });

    let newAnswerBank = new submitAnswerList({
        assignQuestionUserId: req.body.assignQuestionUserId,
        AnswerList: answerlist,
        created: today,
        lasrModified: today
    })
    newAnswerBank.save((err, result) => {
        if (err) {
            logger.log('createSubmitAnswerList', req, err, req.body, res)
            let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true, constants.messages.DATA_ADDED, constants.constants.HTTP_SUCCESS, result)
            res.send(apiResponse)
        }
    })
}

let viewAnswerBankById = (req, res) => {
    submitAnswerList.find({ '_id': req.params.id }, (err, result) => {
        if (err) {
            logger.log('viewAnswerBankById', req, err, req.body, res)
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

let viewByassignQuestionUserId = (req, res) => {
    submitAnswerList.find({ 'assignQuestionUserId': req.params.assignQuestionUserId }, (err, result) => {
        if (err) {
            logger.log('viewByassignQuestionUserId', req, err, req.body, res)
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

module.exports = {
    createSubmitAnswerList,
    viewAnswerBankById,
    viewByassignQuestionUserId
}