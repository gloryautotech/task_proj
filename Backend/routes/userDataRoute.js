const express = require('express')
const appconfig = require('../config/appconfig')
const userData = require('../controllers/userDataController')
const technology = require('../controllers/technologyListController')
const task = require ('../controllers/taskListController')
const assignTask = require('../controllers/assignTaskController')
const email = require('../mailService')

//middle
const auth = require('../middlewares/auth');

let setRouter = (app) => {
    let baseUrl = appconfig.apiVersion ;


    
//OTP
app.post(baseUrl + '/userdata/sendOTP',userData.sendOTP)
app.post(baseUrl + '/userdata/verifyOTP',userData.verifyOTP)

//registeruser
app.post(baseUrl + '/userdata/createuserlist', userData.createUserData)
app.get(baseUrl + '/userdata/alluserlist',auth.isAuthenticated, userData.getUserAllData)
app.get(baseUrl + '/userdata/viewuserlist/:userId', userData.viewById)
app.put(baseUrl + '/userdata/edituserlist/:userId',auth.isAuthenticated, userData.editUserData)
app.get(baseUrl + '/userdata/fetchuserlist/:username', userData.viewByUserName)
app.delete(baseUrl + '/userdata/deleteuserlist/:userId',auth.isAuthenticated, userData.deleteUserNameById)

//login user
app.post(baseUrl + '/userdata/loginuser', userData.loginCheck)

//Technology List
app.get(baseUrl + '/technologylist/alltechnologylist',auth.isAuthenticated, technology.getAllTechnologyList)
app.post(baseUrl + '/technologylist/createtechnologylist',auth.isAuthenticated, technology.createTechnologyList)
app.get(baseUrl + '/technologylist/viewbytechnologytype/:technologyType',auth.isAuthenticated, technology.viewByTechnologyType)
app.get(baseUrl + '/technologylist/viewByTechnologyname/:technologyname',auth.isAuthenticated, technology.viewByTechnologyName)
app.put(baseUrl + '/technologylist/editbytechnologylistid/:technologyListId',auth.isAuthenticated, technology.editTechnologyList)
app.delete(baseUrl + '/technologylist/deletetechnologylist/:technologyListId',auth.isAuthenticated, technology.deleteTechnologyById)

//Task List
app.get(baseUrl + '/tasklist/alltasklist',auth.isAuthenticated, task.getAllTaskList)
app.post(baseUrl + '/tasklist/createtasklist',auth.isAuthenticated, task.createTaskList)
app.get(baseUrl + '/tasklist/viewbytechnologylistid/:technologylistid',auth.isAuthenticated, task.viewBytechnologyListId)
app.get(baseUrl + '/tasklist/viewbytaskId/:taskid',task.viewBytaskId)
app.put(baseUrl + '/tasklist/editbytaskListId/:taskListId',auth.isAuthenticated, task.editTaskList)
app.delete(baseUrl + '/tasklist/deletetasklist/:taskListId',auth.isAuthenticated, task.deleteTaskById)

//email service
app.post(baseUrl + '/email', email.sendEmail)

//Assign Task
app.post(baseUrl + '/assigntask/createassigntasklist',auth.isAuthenticated, assignTask.createassignTaskList)
app.get(baseUrl + '/assigntask/viewbyuserid/:userid',auth.isAuthenticated, assignTask.viewByuserId)
app.post(baseUrl + '/assigntask/viewbyuseridandtaskid', assignTask.viewByUserIdandTaskId)
app.post(baseUrl + '/assigntask/editassigntask/:assignid', assignTask.editassignTask)

}


module.exports = {
    setRouter: setRouter
}