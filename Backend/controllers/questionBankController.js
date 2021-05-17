const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const questionBank = mongoose.model('questionBank')
//const questionBankOption = mongoose.model('questionBankOption')
const constants = require('../constants')
const logger = require('../utils/logger')
const response = require('../utils/common-helper')

let getAllQuestionList = (req, res) => {
    questionBank.find()
        .exec((err, result) => {
            if (err) {
                logger.log('getAllQuestionList',req, err,req.body,res)
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

let createQuestionBank = (req, res) => {
    var today = Date.now()
    console.log("question bank creat body",req.body)
    let newQuestionBank = new questionBank({
        questionBankType: req.body.questionBankType,
        questionBankQuestion: req.body.questionBankQuestion,
        questionBankOption: req.body.questionBankOption,
        questionBankAnswer: req.body.questionBankAnswer,
        questionOption: req.body.questionOption,
        questionLevel : req.body.questionLevel,
        created: today,
        lasrModified: today
    })
    newQuestionBank.save(async(err, result) => {
        if (err) {
            logger.log('createQuestionBank',req, err,req.body,res)
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

// let createQuestionBankOption = (req, res) => {
//     var today = Date.now()
//     console.log("question option bank creat body",req.body)
//     let newQuestionBankOption = new questionBankOption({
//         questionBankId: req.body.questionBankId,
//         questionBankAnswerOption: req.body.questionBankAnswerOption,
//         created: today,
//         lasrModified: today
//     })
//     newQuestionBankOption.save(async(err, result) => {
//         if (err) {
//             logger.log('createQuestionBankOption',req, err,req.body,res)
//             let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
//             res.send(apiResponse)
//         }
//         else {
//             console.log("new user data result", result)
//             let apiResponse = response.respons(true,constants.messages.DATA_ADDED,constants.constants.HTTP_SUCCESS,result)
//             res.send(apiResponse)
//         }
//     })
// }

let viewByQuestionBankType = (req, res) => {
    var v = req.body.questionBankType;
    console.log("questionBankType",v)
    console.log("result", req.body.questionBankLevel)
    console.log("req.body.limit",req.body.limit)
    questionBank.find({ $and :[{'questionBankType': req.body.questionBankType},{'questionLevel': req.body.questionBankLevel}] }, (err, result) => {
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
            console.log("result",result)
            let apiResponse = response.respons(true,constants.messages.SUCCESS,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    }).limit(parseInt(req.body.limit))
}

module.exports = {
    getAllQuestionList,
    createQuestionBank,
  //  createQuestionBankOption,
    viewByQuestionBankType
}