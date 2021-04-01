const express = require('express')
const appconfig = require('../config/appconfig')
const userData = require('../controllers/userDataController')
const technology = require('../controllers/technologyListController')
const task = require ('../controllers/taskListController')
const email = require('../mailService')

//middle
const auth = require('../middlewares/auth');

let setRouter = (app) => {
    let baseUrl = appconfig.apiVersion + '/userData';


    
//OTP
app.post(baseUrl + '/verifyOTP',userData.verifyOTP)
app.post(baseUrl + '/sendOTP',userData.sendOTP)

//registeruser
app.get(baseUrl + '/alluserlist',auth.isAuthenticated, userData.getUserAllData)
app.get(baseUrl + '/viewuserlist/:userId',auth.isAuthenticated, userData.viewById)
app.post(baseUrl + '/createuserlist',auth.isAuthenticated, userData.createUserData)
app.put(baseUrl + '/:userId/edituserlist',auth.isAuthenticated, userData.editUserData)
app.get(baseUrl + '/fetchuserlist',auth.isAuthenticated, userData.viewByUserName)
app.delete(baseUrl + '/:userId/deleteuserlist',auth.isAuthenticated, userData.deleteUserNameById)

//login user
app.get(baseUrl + '/loginuser', userData.loginCheck)

//Technology List
app.get(baseUrl + '/alltechnologylist',auth.isAuthenticated, technology.getAllTechnologyList)
app.post(baseUrl + '/createtechnologylist',auth.isAuthenticated, technology.createTechnologyList)
app.get(baseUrl + '/:technologyType/viewbytechnologytype',auth.isAuthenticated, technology.viewByTechnologyType)
app.put(baseUrl + '/:technologyListId/editbytechnologylistid',auth.isAuthenticated, technology.editTechnologyList)
app.delete(baseUrl + '/:technologyListId/deletetechnologylist',auth.isAuthenticated, technology.deleteTechnologyById)

//Task List
app.get(baseUrl + '/alltasklist',auth.isAuthenticated, task.getAllTaskList)
app.post(baseUrl + '/createtasklist',auth.isAuthenticated, task.createTaskList)
app.get(baseUrl + '/:technologyListId/viewbytechnologylistid',auth.isAuthenticated, task.viewBytechnologyListId)
app.put(baseUrl + '/:taskListId/editbytaskListId',auth.isAuthenticated, task.editTaskList)
app.delete(baseUrl + '/:taskListId/deletetasklist',auth.isAuthenticated, task.deleteTaskById)

//email service
app.get(baseUrl + '/email',auth.isAuthenticated, email.sendEmail)
}


module.exports = {
    setRouter: setRouter
}