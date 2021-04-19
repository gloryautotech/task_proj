const express = require('express')
const appConfig = require('./config/appconfig')
const fs = require('fs')
const mongoose = require('mongoose')
const employeeDataSchema = require('./models/userData')
const technologyListSchema = require('./models/technologyList')
const taskListSchema = require('./models/taskList')
const assignTask = require('./models/assignTask')
const logger = require("./models/apierrorlog")
const questionBank = require("./models/questionBank")
const assignQuestionBank = require("./models/assignQuestionBank")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const app = express ()

//middle
app.use(cors({credentials: true, origin:'http://localhost:3000'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let routespath = './routes'
fs.readdirSync(routespath).forEach(function (file){
    if(~file.indexOf('.js')){
        console.log(routespath + '/' + file)
        let route = require(routespath + '/' + file)
        route.setRouter(app);
    }
})

let modelspath = './models'
fs.readdirSync(modelspath).forEach(function (file){
    if(~file.indexOf('.js')){
    require(modelspath + '/' + file)       
    }
})

app.listen(appConfig.port, ()=> {console.log("Hosted on port",appConfig.port)
let db = mongoose.connect(appConfig.db.uri,{useNewUrlParser: true, useUnifiedTopology: true})
})


mongoose.connection.on('error',function (err){
    console.log('databse connection error')
    console.log(err)
})

mongoose.connection.on('open',function (err){
    if (err){
        console.log("databse error");
        console.log(err);
    } else {
        console.log("databse connction open")
    }
})