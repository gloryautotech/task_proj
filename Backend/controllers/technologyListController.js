const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('../utils/common-helper')
const constants = require('../constants')
const logger = require('../utils/logger')
const technologyList = mongoose.model('technologyList')

let getAllTechnologyList = (req, res) => {
    technologyList.find()
        .exec((err, result) => {
            if (err) {
                logger.log('getAllTechnologyList',req, err,req.body,res)
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


let editTechnologyList = (req, res) => {
    let option = req.body
    console.log("option", option)
    technologyList.update({ '_id': req.params.technologyListId }, option, { multi: true }).exec((err, result) => {
        if (err) {
            logger.log('editTechnologyList',req, err,req.body,res)
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

let viewByTechnologyType = (req, res) => {
    var v = req.params.technologyType;
    console.log(v)
    technologyList.find({ 'technologyType': req.params.technologyType }, (err, result) => {
        if (err) {
            logger.log('viewByTechnologyType',req, err,req.body,res)
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

let createTechnologyList = (req, res) => {
    var today = Date.now()
    let newUserData = new technologyList({
        technologyType: req.body.technologyType,
        technologyName: req.body.technologyName,
        technologyLevel: req.body.technologyLevel,
        created: today,
        lasrModified: today
    })
    newUserData.save((err, result) => {
        if (err) {
            logger.log('createTechnologyList',req, err,req.body,res)
            let apiResponse = response.respons(false,constants.messages.INTERNAL500 + err,constants.constants.HTTP_SERVER_ERROR,null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.respons(true,constants.messages.SUCCESS,constants.constants.HTTP_SUCCESS,result)
            res.send(apiResponse)
        }
    })
}

let deleteTechnologyById = (req, res) => {
    technologyList.remove({'_id': req.params.technologyListId}, (err, result) => {
        if (err) {
            logger.log('deleteTechnologyById',req, err,req.body,res)
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
    createTechnologyList: createTechnologyList,
    getAllTechnologyList: getAllTechnologyList,
    viewByTechnologyType: viewByTechnologyType,
    editTechnologyList: editTechnologyList,
    deleteTechnologyById: deleteTechnologyById
}