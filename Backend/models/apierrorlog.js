const mongoose = require('mongoose')
const Schema = mongoose.Schema

let errorLog = new Schema({
    apiName: {
        type: String
    },
    apiUrl: {
        type: String
    },
    responseBody: {
        type: String
    },
    deviceType: {
        type: String
    },
    device: {
        type: String
    },
    requestBody: {
        type: String
    }
},{ collection: 'apiErrorLogs' })

mongoose.model('apiErrorLogs',errorLog)